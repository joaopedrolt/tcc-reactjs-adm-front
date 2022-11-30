import { useEffect, useState } from "react";
import { NavigateFunction, useLocation } from "react-router-dom";
import Select from "react-select";

import { DriverTruckSelect, OrdersSelectStyle, } from "../../assets/select-styles/SelectStyles";

import "../../css/gl/gldashboard.css";
import "../../css/gl/glmotoristas.css";
import "../../css/gl/glpedidos.css";
import "../../css/gl/gltransportes.css";
import "../../css/gl/glacopanharpedido.css";

import X from "../../assets/svg/x.svg";

import GlApi from "../../api/GestorLogistico.api";
import TimeZone from "../../api/TimeZone.api";

import { Truck, TruckAdd } from "../../types/Truck";
import { Order } from "../../types/Order";
import { Driver } from "../../types/Driver";
import { GlDashBoard } from "../../types/GlDashBoard";
import { Option } from "../../types/Option";

type Navigate = {
    navigate: NavigateFunction;
}

export const DashBoard = () => {

    const [info, setInfo] = useState<GlDashBoard>({
        yield: 'R$ 0,00',
        deliveries: 0,
        available: 0,
        date: "DIA/MES/ANO"
    });

    const api = new GlApi();
    const timezone = new TimeZone();

    useEffect(() => {
        async function Get() {
            try {
                const info = await api.getGlDashBoard();
                const dateSp = await timezone.getSPDate()

                const available = (await api.getAvailibleTrucks()).length;

                if (info[0].yield) {
                    const yieldString = info[0].yield.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
                    const infoCopy: GlDashBoard = { ...info[0], yield: yieldString, date: dateSp, available: available };
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
                        <div className="title-card">RECEITA TOTAl</div>
                        <div className="content-card">{info.yield}</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">TOTAL DE ENTREGAS REALIZDAS</div>
                        <div className="content-card">{info.deliveries}</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">DATA:</div>
                        <div className="content-card">{info.date}</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">VEICULOS DIPONIVEIS PRA SERVIÇO</div>
                        <div className="content-card">{info.available}</div>
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
                                <p className="driver-info">{driver.status ? 'Em entrega' : 'Disponivel'}</p>
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

export const Pedidos = ({ navigate }: Navigate) => {

    const [orders, setOrders] = useState<Order[]>([]);
    let options: Option[] = [];
    let isTherePending: boolean = false;
    let isThereOngoing: boolean = false;

    const api = new GlApi();

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

    useEffect(() => {
        Get();
    }, [])

    const HandleClick = (id: string) => {
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

    const HandleClickAccept = async (id: string) => {
        await api.acceptOrder(id, true);
        Get();
    }

    const HandleClickReject = async (id: string) => {
        await api.acceptOrder(id, false);
        Get();
    }

    return (
        <>
            <Select isClearable options={options} placeholder={"Selecione o Pedido"} styles={OrdersSelectStyle} onChange={HandleChange} noOptionsMessage={() => 'Não Encontrado'} />
            <h1 className="orders-title">{isTherePending ? 'Pendentes' : ''}</h1>
            {orders.map((order, index) => {
                let status = order.status;
                let accepted = order.accepted;
                if (!status && !accepted) {
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
                                    <div className="field" id="weith-field">
                                        <span>Peso</span>
                                        <div className="content-field">{order.weight} kg</div>
                                    </div>
                                    <div className="field" id="amount-field">
                                        <span>Distancia</span>
                                        <div className="content-field">{order.distance ? order.distance : 'A definir'}</div>
                                    </div>
                                    <div className="field" id="load-field">
                                        <span>Preço</span>
                                        <div className="content-field">{order.price ? order.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'A definir'}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-in-field">
                                        <span>Endereço de Retirada</span>
                                        <div className="content-field">{order.addressout}</div>
                                    </div>
                                    <div className="field-small" id="cep-in">
                                        <span>Cep</span>
                                        <div className="content-field">{order.cepin}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-out-field">
                                        <span>Endereço de Entrega</span>
                                        <div className="content-field">{order.addressin}</div>
                                    </div>
                                    <div className="field-small" id="cep-out">
                                        <span>Cep</span>
                                        <div className="content-field">{order.cepout}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="status-field">
                                        <span>Status</span>
                                        <div className="content-field">{order.statusdesc}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="buttons-container">
                                        <button className="button-accept" onClick={() => { HandleClickAccept(order._id) }} >Aceitar Pedido</button>
                                        <button className="button-reject" onClick={() => { HandleClickReject(order._id) }} >Rejeitar Pedido</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            })}
            {orders.map((order, index) => {
                let status = order.status;
                let accepted = order.accepted;
                if (!status && accepted) {
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
                                    <div className="field" id="weith-field">
                                        <span>Peso</span>
                                        <div className="content-field">{order.weight} kg</div>
                                    </div>
                                    <div className="field" id="amount-field">
                                        <span>Distancia</span>
                                        <div className="content-field">{order.distance ? order.distance : 'A definir'}</div>
                                    </div>
                                    <div className="field" id="load-field">
                                        <span>Preço</span>
                                        <div className="content-field">{order.price ? order.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'A definir'}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-in-field">
                                        <span>Endereço de Retirada</span>
                                        <div className="content-field">{order.addressout}</div>
                                    </div>
                                    <div className="field-small" id="cep-in">
                                        <span>Cep</span>
                                        <div className="content-field">{order.cepin}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-out-field">
                                        <span>Endereço de Entrega</span>
                                        <div className="content-field">{order.addressin}</div>
                                    </div>
                                    <div className="field-small" id="cep-out">
                                        <span>Cep</span>
                                        <div className="content-field">{order.cepout}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="status-field">
                                        <span>Status</span>
                                        <div className="content-field">{order.statusdesc}</div>
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
                                    <div className="field" id="weith-field">
                                        <span>Peso</span>
                                        <div className="content-field">{order.weight} kg</div>
                                    </div>
                                    <div className="field" id="amount-field">
                                        <span>Distancia</span>
                                        <div className="content-field">{order.distance ? order.distance : 'A definir'}</div>
                                    </div>
                                    <div className="field" id="load-field">
                                        <span>Preço</span>
                                        <div className="content-field">{order.price ? order.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'A definir'}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-in-field">
                                        <span>Endereço de Retirada</span>
                                        <div className="content-field">{order.addressout}</div>
                                    </div>
                                    <div className="field-small" id="cep-in">
                                        <span>Cep</span>
                                        <div className="content-field">{order.cepin}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="address-out-field">
                                        <span>Endereço de Entrega</span>
                                        <div className="content-field">{order.addressin}</div>
                                    </div>
                                    <div className="field-small" id="cep-out">
                                        <span>Cep</span>
                                        <div className="content-field">{order.cepout}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="status-field">
                                        <span>Status</span>
                                        <div className="content-field">{order.statusdesc}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field" id="id-field">
                                        <span>Motorista</span>
                                        <div className="content-field">{order.driver?.name}</div>
                                    </div>
                                    <div className="field" id="weith-field">
                                        <span>Transporte</span>
                                        <div className="content-field">{order.truck?.model}</div>
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

export const AcompanharPedidos = ({ navigate }: Navigate) => {

    const [order, setOrder] = useState<Order>({
        _id: '',
        desc: '',
        weight: 0,
        addressin: '',
        cepin: '',
        addressout: '',
        cepout: '',
        status: false,
        statusdesc: '',
        price: 0.0,
        accepted: false
    });

    const [truck, setTruck] = useState<Truck>({
        _id: '',
        model: '',
        plateNumber: '',
        axle: '',
        maxcapacity: 0,
        status: false
    });

    const [driver, setDriver] = useState<Driver>({
        _id: '',
        name: '',
        status: false
    });

    const location = useLocation();
    const id: string = location.pathname.substring(12);

    const api = new GlApi();

    const [optionsDrivers, setOptionsDrivers] = useState<Option[]>([{ label: '', value: '' }]);
    const [optionsTrucks, setOptionsTrucks] = useState<Option[]>([{ label: '', value: '' }]);

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
                _id: '',
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
                _id: '',
                name: '',
                status: false
            });
        }
    }

    const HandleButton = async (_id: string) => {

        if (truck.model != '' && driver.name != '') {
            const copyDriver: Driver = { ...driver, orderid: _id, status: true };
            const copyTruck: Truck = { ...truck, orderid: _id, status: true };

            await api.updateOrder(_id, copyDriver, copyTruck);
            await api.updateDriver(copyDriver);
            await api.updateTruck(copyTruck);

        } else {
            alert('Aloque os recursos corretamente!');
        }

        navigate('/gl/pedidos');

    }

    return (
        <div className="order-overview-container">
            <div className="order-overview-top">
                <div className="truck-card" id="truck-card-overview">
                    {truck.model && <>
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
                    {driver.name && <>
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
                        <div className="field" id="weith-field">
                            <span>Peso</span>
                            <div className="content-field">{order.weight} kg</div>
                        </div>
                        <div className="field" id="amount-field">
                            <span>Distancia</span>
                            <div className="content-field">{order.distance ? order.distance : 'A definir'}</div>
                        </div>
                        <div className="field" id="load-field">
                            <span>Preço</span>
                            <div className="content-field">{order.price ? order.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : 'A definir'}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Endereço de Retirada</span>
                            <div className="content-field">{order.addressout}</div>
                        </div>
                        <div className="field-small" id="cep-in">
                            <span>Cep</span>
                            <div className="content-field">{order.cepin}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-out-field">
                            <span>Endereço de Entrega</span>
                            <div className="content-field">{order.addressin}</div>
                        </div>
                        <div className="field-small" id="cep-out">
                            <span>Cep</span>
                            <div className="content-field">{order.cepout}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="status-field">
                            <span>Status</span>
                            <div className="content-field">{order.statusdesc}</div>
                        </div>
                    </div>
                    {order.truck && order.driver &&
                        <div className="row">
                            <div className="field" id="id-field">
                                <span>Motorista</span>
                                <div className="content-field">{order.driver?.name}</div>
                            </div>
                            <div className="field" id="weith-field">
                                <span>Transporte</span>
                                <div className="content-field">{order.truck?.model}</div>
                            </div>
                        </div>
                    }
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
                                <button onClick={() => { HandleButton(order._id) }} className="button-overwiew">Confirmar Pedido</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}

export const Transportes = ({ navigate }: Navigate) => {

    const [garage, setGarage] = useState<Truck[]>([]);
    const [loading, setLoadStatus] = useState(true);
    const [switchMode, setMode] = useState<boolean>(false);

    const api = new GlApi();

    async function Get() {
        try {
            let trucks = await api.getGarage();
            if (trucks.length > 0) {
                setGarage(trucks);
                setLoadStatus(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Get();
    }, [])

    const ToggleMode = () => {
        switchMode ? setMode(false) : setMode(true);
    }

    const HandleClickAdd = () => {
        const path = "/gl/garagem/add";
        navigate(path);
    }

    const HandleClickDelete = async (_id: string) => {
        await api.postDeleteTruck(_id);
        Get();
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
                                        <h4 className="truck-desc">Capacidade Máxima</h4>
                                        <p className="truck-info">{truck.maxcapacity} kg</p>
                                    </div>
                                    <div className="desc-row">
                                        <h4 className="truck-desc">Status</h4>
                                        <p className="truck-info">{truck.status ? "Indisponivel" : "Disponivel"}</p>
                                    </div>
                                    <div className="desc-row">
                                        <h4 className="truck-desc">{truck.status ? "Pedido ID" : ""}</h4>
                                        <p className="truck-info">{truck.orderid ? truck.orderid : ""}</p>
                                    </div>
                                    {switchMode && !truck.status && <div onClick={() => { HandleClickDelete(truck._id) }}><X /></div>}
                                </div>
                            </div>
                        ))} </>
                }

            </div>
            <button onClick={ToggleMode} className="button-manage">{!switchMode ? "Gerenciar Veículos" : '\u2190 Retornar'}</button>
            {switchMode && <button onClick={HandleClickAdd} className="button-manage-add">Adicionar Veículo</button>}
        </div>
    )

}

export const AdicionarTransporte = ({ navigate }: Navigate) => {

    const [model, setModel] = useState("");
    const [plate, setPlate] = useState("");
    const [axle, setAxle] = useState("");
    const [maxcapacity, setMaxCapacity] = useState("");

    const changeInput = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
        switch (id) {
            case 'model':
                setModel(event.target.value);
                break;
            case 'plate':
                setPlate(event.target.value);
                break;
            case 'axle':
                setAxle(event.target.value);
                break;
            case 'maxcapacity':
                setMaxCapacity(event.target.value);
                break;
        }
    }

    const api = new GlApi();

    const HandleCLick = () => {

        if (
            (model == '' || model == undefined) ||
            (plate == '' || plate == undefined) ||
            (axle == '' || axle == undefined) ||
            (maxcapacity == '' || maxcapacity == undefined)
        ) { alert('Insira os Dados Corretamente!') } else {

            const addTruckModel: TruckAdd = {
                model: model,
                plateNumber: plate,
                axle: axle,
                maxcapacity: parseFloat(maxcapacity)
            }

            console.log(addTruckModel);

            api.postNewTruck(addTruckModel);
            const path = "/gl/garagem/";
            navigate(path);

        }

    }

    return (
        <>
            <h1 className="garage-title">Adicionar Veículo</h1>
            <div className="container-form-add">
                <div className="flex-colunm">
                    <div className="col">
                        <div className="inputbox">
                            <span>Modelo</span>
                            <input value={model} onChange={(e) => { changeInput(e, 'model') }} className="label-form-add-item" type="text" />
                        </div>
                        <div className="inputbox">
                            <span>Placa</span>
                            <input value={plate} onChange={(e) => { changeInput(e, 'plate') }} className="label-form-add-item" type="text" />
                        </div>
                        <div className="inputbox">
                            <span>Tipo de Eixo</span>
                            <input value={axle} onChange={(e) => { changeInput(e, 'axle') }} className="label-form-add-item" type="text" />
                        </div>
                        <div className="inputbox">
                            <span>Capacidade Maxima (KG)</span>
                            <input value={maxcapacity} onChange={(e) => { changeInput(e, 'maxcapacity') }} className="label-form-add-item" type="number" />
                        </div>
                    </div>
                    <button onClick={HandleCLick} className="button-manage-add">Adicionar Veículo</button>
                </div>
            </div>
        </>
    )

}