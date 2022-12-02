import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import GlApi from "../../api/GestorLogistico.api";
import MotoristaApi from "../../api/Motorista.api ";
import "../../css/motorista/mdashboard.css";
import "../../css/motorista/mpedidos.css";
import { Order } from "../../types/Order";

type Navigate = {
    navigate: NavigateFunction;
}

export const DashBoard = ({ navigate }: Navigate) => {

    const handleClickOrders = () => {
        navigate('/motorista/pedidos');
    }

    const handleClickExit = () => {
        navigate('/');
    }

    return (
        <div className="mid-section-container dahsboard-mid">
            <div className="mobile-dashboard-buttons">
                <button className="button-100 button-green" onClick={handleClickOrders}>Meus Pedidos</button>
                <button className="button-100 button-red" onClick={handleClickExit}>Sair</button>
            </div>
        </div>
    )

}

export const Pedidos = ({ navigate }: Navigate) => {

    const [orders, setOrders] = useState<Order[]>([]);
    const [finished, setFinished] = useState(false);
    const [hasUser, setHasUser] = useState(false);

    const api = new MotoristaApi();

    async function Get() {
        try {

            let userToken = localStorage.getItem("user_token");

            let user: string = '';

            if (userToken) {
                user = JSON.parse(userToken).name;
            }

            let order = await api.getDriverOrder(user);

            if (!(Object.keys(order).length === 0)) {
                setOrders([order]);
                setHasUser(true);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        Get();
    }, [])

    const HandleButton = () => {
        if(finished){
            alert('Pedido Finalizado');
            navigate('motorista/dashboard')
        } else{
            alert('Siuação atualizada, siga os proximos procedimentos de acordo');
        }
    }

    return (
        <div className="mid-section-container">
            <div className="orders-mobile-container">
                <h1 className="orders-title">Pedidos</h1>
                {hasUser &&
                    <div className="orders-container">
                        <div className="order">
                            <div className="row">
                                <div className="field mobile-field" id="desc-field">
                                    <span className="desc-field-mobile">Descrição</span>
                                    <div className="content-field mobile-field">{orders[0].desc}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="id-field">
                                    <span className="desc-field-mobile">ID Pedido</span>
                                    <div className="content-field mobile-field">{orders[0]._id.substring(0, 16)}<br></br>{orders[0]._id.substring(17)}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="id-field">
                                    <span className="desc-field-mobile">Peso</span>
                                    <div className="content-field mobile-field">{orders[0].weight}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="address-in-field">
                                    <span className="desc-field-mobile">Distancia</span>
                                    <div className="content-field mobile-field">{orders[0].distance}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="address-in-field">
                                    <span className="desc-field-mobile">Endereço de Retirada</span>
                                    <div className="content-field mobile-field">{orders[0].cepin}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="cep-in">
                                    <span className="desc-field-mobile">Cep</span>
                                    <div className="content-field mobile-field">{orders[0].cepin}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="address-out-field">
                                    <span className="desc-field-mobile" >Endereço de Entrega</span>
                                    <div className="content-field mobile-field">{orders[0].addressout}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="cep-in">
                                    <span className="desc-field-mobile">Cep</span>
                                    <div className="content-field mobile-field">{orders[0].cepout}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field mobile-field" id="status-field">
                                    <span className="desc-field-mobile">Status</span>
                                    <div className="content-field mobile-field">{orders[0].statusdesc}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="button-mobile-container">
                    <select className="select-mobile">
                        <option>Outro</option>
                    </select>
                    {/*                     <h3 className="orders-title">Informe a situação <br></br> atual do pedido</h3>
                    <textarea className="input-status-mobile" maxLength={150}/> */}
                    <button onClick={HandleButton} className={"button-mobile" + (!finished ? " button-green" : " button-red")}>{!finished ? "Atualizar Status do Pedido " : "Finalizar"}</button>
                </div>
            </div>

        </div>
    )

}