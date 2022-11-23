import { NavigateFunction, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Select from "react-select";
import { DriverTruckSelect, OrdersSelectStyle, } from "../../assets/select-styles/SelectStyles";

import "../../css/gl/gldashboard.css";
import "../../css/gl/glmotoristas.css";
import "../../css/gl/glpedidos.css";
import "../../css/gl/gltransportes.css";
import "../../css/gl/glacopanharpedido.css";

import GlApi from "../../api/GestorLogistico.api";

import { Truck } from "../../types/Truck";
import { Order } from "../../types/Order";
import { Driver } from "../../types/Driver";
import { GlDashBoard } from "../../types/GlDashBoard";
import { Option } from "../../types/Option";
import TimeZone from "../../api/TimeZone.api";

type PedidosProps = {
    navigate: NavigateFunction;
}

export const DashBoard = () => {

    const [info, setInfo] = useState<GlDashBoard>({
        yield: '0,00',
        deliveries: 0,
        available: 0,
        date: "DIA/MES/ANO"
    });

    const api = new GlApi();
    const timezone = new TimeZone();

    useEffect(() => {
        async function Get() {
            try {
                let info = await api.getGlDashBoard();
                let dateSp = await timezone.getSPDate()
                if (info.yield) {
                    let infoCopy = { ...info, date: dateSp };
                    setInfo(infoCopy);
                }
            } catch (error) {
                console.log(error);
            }
        };
        Get();
    }, [])

    return (
        <div className="main-content">
            <div className="card">
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">RECEITAS TOTAIS</div>
                        <div className="content-card">{info.yield}</div>
                        <div className="index-card">Subiu</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">TOTAL DE ENTREGAS REALIZDAS/MES</div>
                        <div className="content-card">{info.deliveries}</div>
                        <div className="index-card">Subiu</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">DATA:</div>
                        <div className="content-card">{info.date}</div>
                        <div className="index-card">HORARIO ATUAL</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">VEICULOS DIPONIVEIS PRA SERVIÇO</div>
                        <div className="content-card">{info.available}</div>
                        <div className="index-card">Subiu</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export const Motoristas = () => {

    const [drivers, setDrivers] = useState<Driver[]>([]);

    const api = new GlApi();

    useEffect(() => {
        async function Get() {
            try {
                let drivers = await api.getDrivers();
                if (drivers.length > 0) {
                    setDrivers(drivers);
                }
            } catch (error) {
                console.log(error);
            }
        };
        Get();
    }, [])

    return (
        <div className="flex-colunm">
            <h1 className="drivers-title">Situação Motoristas</h1>
            <div className="drivers">

                {drivers.map((driver, index) => (
                    <div className="driver-card">
                        <div className="driver-card-top flex-colunm">
                            <div className="driver-img-container"></div>
                            <h3 className="driver-name">{driver.name}</h3>
                        </div>
                        <div className="driver-card-bottom">
                            <div className="desc-row flex-colunm">
                                <h4 className="driver-desc">Status</h4>
                                <p className="driver-info">{driver.status ? 'Disponivel' : 'Em entrega'}</p>
                            </div>
                            <div className="desc-row flex-colunm">
                                <h4 className="driver-desc">{driver.orderid ? 'Pedido ID' : ''}</h4>
                                <p className="driver-info">{driver.orderid ? driver.orderid : ''}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )

}

export const Pedidos = ({ navigate }: PedidosProps) => {

    const [orders, setOrders] = useState<Order[]>([]);
    let options: Option[] = [];
    let isTherePending: boolean = false;
    let isThereOngoing: boolean = false;

    const api = new GlApi();

    useEffect(() => {
        async function Get() {
            try {
                let orders = await api.getOrders();
                if (orders.length > 0) {
                    setOrders(orders);
                }
            } catch (error) {
                console.log(error);
            }
        };
        Get();
    }, [])

    const HandleClick = (id: number) => {
        let path = "/gl/pedidos/" + id;
        navigate(path);
    }

    const HandleChange = async (selectedOption: any) => {
        if (selectedOption) {
            let order = orders.filter(a => a._id == selectedOption.value)
            setOrders(order);
        } else {
            try {
                let orders = await api.getOrders();
                if (orders.length > 0) {
                    setOrders(orders);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    orders.map((order) => {
        options.push({ label: order.desc, value: order._id });
        if (!order.status) {
            isTherePending = true;
        } else {
            isThereOngoing = true;
        }
    })

    return (
        <>
            <Select isClearable options={options} placeholder={"Selecione o Pedido"} styles={OrdersSelectStyle} onChange={HandleChange} noOptionsMessage={() => 'Não Encontrado'} />
            <h1 className="orders-title">{isTherePending ? 'Pendentes' : ''}</h1>
            {orders.map((order, index) => {
                let status = order.status;
                if (!status) {
                    return (
                        <div key={index} className="orders-container">
                            <div className="order">
                                <div className="row">
                                    <div className="field" id="desc-field">
                                        <span>Descrição</span>
                                        <div className="content-field">{order.desc}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="id-field">
                                        <span>ID Pedido</span>
                                        <div className="content-field">{order._id}</div>
                                    </div>
                                    <div className="field" id="size-field">
                                        <span>Dimensão da Caixa</span>
                                        <div className="content-field">{order.size}</div>
                                    </div>
                                    <div className="field" id="weith-field">
                                        <span>Peso Total Unitario</span>
                                        <div className="content-field">{order.weight}</div>
                                    </div>
                                    <div className="field" id="amount-field">
                                        <span>Quantidade Total</span>
                                        <div className="content-field">{order.amount}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-in-field">
                                        <span>Endereço de Retirada</span>
                                        <div className="content-field">{order.addressout}</div>
                                    </div>
                                    <div className="field-small" id="load-field">
                                        <span>Ocupação Bau</span>
                                        <div className="content-field">{order.container}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-out-field">
                                        <span>Endereço de Entrega</span>
                                        <div className="content-field">{order.addressin}</div>
                                    </div>
                                    <div className="field-small" id="status-field">
                                        <span>Status</span>
                                        <div className="content-field">{order.status ? "Em andamento" : "Aguardando Direcionamento"}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                        <button className="button-orders" onClick={() => { HandleClick(order._id) }} >Acompanhar Pedido</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            <h1 className="orders-title">{isThereOngoing ? 'Em andamento' : ''}</h1>
            {orders.map((order, index) => {
                let status = order.status;
                if (status) {
                    return (
                        <div key={index} className="orders-container">
                            <div className="order">
                                <div className="row">
                                    <div className="field" id="desc-field">
                                        <span>Descrição</span>
                                        <div className="content-field">{order.desc}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="id-field">
                                        <span>ID Pedido</span>
                                        <div className="content-field">{order._id}</div>
                                    </div>
                                    <div className="field" id="size-field">
                                        <span>Dimensão da Caixa</span>
                                        <div className="content-field">{order.size}</div>
                                    </div>
                                    <div className="field" id="weith-field">
                                        <span>Peso Total Unitario</span>
                                        <div className="content-field">{order.weight}</div>
                                    </div>
                                    <div className="field" id="amount-field">
                                        <span>Quantidade Total</span>
                                        <div className="content-field">{order.amount}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-in-field">
                                        <span>Endereço de Retirada</span>
                                        <div className="content-field">{order.addressout}</div>
                                    </div>
                                    <div className="field-small" id="load-field">
                                        <span>Ocupação Bau</span>
                                        <div className="content-field">{order.container}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-out-field">
                                        <span>Endereço de Entrega</span>
                                        <div className="content-field">{order.addressin}</div>
                                    </div>
                                    <div className="field-small" id="status-field">
                                        <span>Status</span>
                                        <div className="content-field">{order.status ? "Em andamento" : "Aguardando Direcionamento"}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div>
                                        <button className="button-orders" onClick={() => { HandleClick(order._id) }} >Acompanhar Pedido</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
        </>
    )

}

export const AcompanharPedidos = () => {

    const [order, setOrder] = useState<Order>({
        _id: 999,
        desc: '',
        size: 0,
        weight: 0,
        amount: 0,
        container: 0,
        addressin: '',
        addressout: '',
        status: false
    });

    const [truck, setTruck] = useState<Truck>({
        _id: 0,
        model: '',
        plateNumber: '',
        axle: '',
        maxcapacity: 0,
        status: false
    });

    const [driver, setDriver] = useState<Driver>({
        _id: 0,
        name: '',
        status: false
    });

    const location = useLocation();
    const id: string = location.pathname.substring(12);

    const api = new GlApi();

    const [optionsDrivers, setOptionsDrivers] = useState<Option[]>([{ label: '', value: 0 }]);
    const [optionsTrucks, setOptionsTrucks] = useState<Option[]>([{ label: '', value: 0 }]);

    useEffect(() => {

        async function Get() {
            try {

                const order = await api.getOrderByID(id);
                const availibleDrivers = await api.getAvailibleDrivers();
                const availibleTrucks = await api.getAvailibleTrucks();

                if (order._id) {
                    setOrder(order);
                }

                if (order.truck && order.driver) {
                    setDriver(order.driver);
                    setTruck(order.truck);
                }

                let copyDrivers: Option[] = [];
                let copyTrucks: Option[] = [];

                availibleDrivers.forEach((driver) => {
                    copyDrivers.push({ label: driver.name, value: driver._id })
                })

                setOptionsDrivers(copyDrivers);

                availibleTrucks.forEach((truck) => {
                    copyTrucks.push({ label: truck.model, value: truck._id })
                })

                setOptionsTrucks(copyTrucks);

            } catch (error) {
                console.log(error);
            }
        };

        Get();

    }, [])

    const HandleChangeTruck = async (selectedOption: any) => {
        if (selectedOption) {
            const availibleTrucks = await api.getAvailibleTrucks();

            let truck = availibleTrucks.find(a => a._id == selectedOption.value);

            if (truck) {
                setTruck(truck);
            }

        } else {
            setTruck({
                _id: 0,
                model: '',
                plateNumber: '',
                axle: '',
                maxcapacity: 0,
                status: false
            });
        }
    }

    const HandleChangeDriver = async (selectedOption: any) => {
        if (selectedOption) {
            const availibleDrivers = await api.getAvailibleDrivers();

            let driver = availibleDrivers.find(a => a._id == selectedOption.value);

            if (driver) {
                setDriver(driver);
            }

        } else {
            setDriver({
                _id: 0,
                name: '',
                status: false
            });
        }
    }


    return (
        <div className="order-overview-container">
            <div className="order-overview-top">
                <div className="truck-card" id="truck-card-overview">
                    {truck.status && <>
                        <div className="truck-card-top flex-colunm">
                            <div className="truck-img-container"></div>
                            <h3 className="truck-name">{truck.model}</h3>
                        </div>
                        <div className="truck-card-bottom flex-colunm">
                            <div className="desc-row">
                                <h4 className="truck-desc">Placa</h4>
                                <p className="truck-info">{truck.plateNumber}</p>
                            </div>
                            <div className="desc-row">
                                <h4 className="truck-desc">Tipo de Eixo</h4>
                                <p className="truck-info">{truck.axle}</p>
                            </div>
                            <div className="desc-row">
                                <h4 className="truck-desc">Capacidade Maxima</h4>
                                <p className="truck-info">{truck.maxcapacity}</p>
                            </div>
                        </div>
                    </>}
                </div>
                <div className="driver-card" id="driver-card-overview">
                    {driver.status && <>
                        <div className="driver-card-top flex-colunm">
                            <div className="driver-img-container"></div>
                            <h3 className="driver-name">{driver.name}</h3>
                        </div>
                        <div className="driver-card-bottom">
                            <div className="desc-row flex-colunm">
                                <h4 className="driver-desc">Status</h4>
                                <p className="driver-info">{driver.status ? 'Em entrega' : 'Disponivel'}</p>
                            </div>
                            <div className="desc-row flex-colunm">
                                <h4 className="driver-desc">Cargo</h4>
                                <p className="driver-info">{driver.status ? 'Motorista' : 'Motorista'}</p>
                            </div>
                        </div>
                    </>}
                </div>
            </div>
            <div className="order-overview-bottom">
                <div className="order">
                    <div className="row">
                        <div className="field" id="desc-field">
                            <span>Descrição</span>
                            <div className="content-field">{order.desc}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="id-field">
                            <span>ID Pedido</span>
                            <div className="content-field">{order._id}</div>
                        </div>
                        <div className="field" id="size-field">
                            <span>Dimensão da Caixa</span>
                            <div className="content-field">{order.size}</div>
                        </div>
                        <div className="field" id="weith-field">
                            <span>Peso Total Unitario</span>
                            <div className="content-field">{order.weight}</div>
                        </div>
                        <div className="field" id="amount-field">
                            <span>Quantidade Total</span>
                            <div className="content-field">{order.amount}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Endereço de Retirada</span>
                            <div className="content-field">{order.addressout}</div>
                        </div>
                        <div className="field-small" id="load-field">
                            <span>Ocupação Bau</span>
                            <div className="content-field">{order.container}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-out-field">
                            <span>Endereço de Entrega</span>
                            <div className="content-field">{order.addressin}</div>
                        </div>
                        <div className="field-small" id="status-field">
                            <span>Status</span>
                            <div className="content-field">{order.status ? "Em andamento" : "Aguardando Direcionamento"}</div>
                        </div>
                    </div>
                    {!order.truck && !order.driver &&
                        <div className="row">
                            <div className="field" id="select-t-field">
                                <span>Alocar Transporte</span>
                                <Select isClearable options={optionsTrucks} placeholder={"Selecione um veículo"} styles={DriverTruckSelect} noOptionsMessage={() => 'Indisponível'} onChange={HandleChangeTruck} />
                            </div>
                            <div className="field" id="select-m-field">
                                <span>Alocar Motorista</span>
                                <Select isClearable options={optionsDrivers} placeholder={"Selecione um motorista"} styles={DriverTruckSelect} noOptionsMessage={() => 'Indisponível'} onChange={HandleChangeDriver} />
                            </div>
                            <div className="field" id="button-c-field">
                                <button className="button-overwiew">Confirmar Pedido</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}

export const Transportes = () => {

    const [garage, setGarage] = useState<Truck[]>([]);
    const [loading, setLoadStatus] = useState(true);
    const [switchMode, setMode] = useState<boolean>(false);

    const api = new GlApi();

    useEffect(() => {
        async function Get() {
            try {
                let trucks = await api.getGarage();
                if (trucks.length > 0) {
                    setGarage(trucks);
                    setLoadStatus(false);
                }
                console.log('aaa')
            } catch (error) {
                console.log(error);
            }
        };
        Get();
    }, [])

    const ToggleMode = () => {
        switchMode ? setMode(false) : setMode(true);
    }

    return (
        <div className="flex-colunm">
            <h1 className="garage-title">Veículos disponíveis</h1>
            <div className="garage">

                {!loading &&
                    <>
                        {garage.map((truck, index) => (
                            <div key={index} className="truck-card">
                                <div className="truck-card-top flex-colunm">
                                    <div className="truck-img-container"></div>
                                    <h3 className="truck-name">{truck.model}</h3>
                                </div>
                                <div className="desc-row">
                                    <h4 className="truck-desc">Placa</h4>
                                    <p className="truck-info">{truck.plateNumber}</p>
                                </div>
                                <div className="truck-card-bottom flex-colunm">
                                    <div className="desc-row">
                                        <h4 className="truck-desc">Tipo de Eixo</h4>
                                        <p className="truck-info">{truck.axle}</p>
                                    </div>
                                    <div className="desc-row">
                                        <h4 className="truck-desc">Capacidade Maxima</h4>
                                        <p className="truck-info">{truck.maxcapacity}</p>
                                    </div>
                                    <div className="desc-row">
                                        <h4 className="truck-desc">Status</h4>
                                        <p className="truck-info">{truck.status ? "Indisponivel" : "Disponivel"}</p>
                                    </div>
                                </div>
                            </div>
                        ))} </>
                }

            </div>
            <button onClick={ToggleMode} className="button-manage">Gerenciar Veículos</button>
        </div>
    )

}