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
                <div onClick={handleClickOrders} className="button-my-orders">Meus Pedidos</div>
                <div onClick={handleClickExit} className="button-my-orders">Sair</div>
            </div>
        </div>
    )

}

export const Pedidos = ({ navigate }: Navigate) => {

    const [orders, setOrders] = useState<Order[]>([]);
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

    return (
        <div className="mid-section-container">
            <div className="orders-mobile-container">
                <h1 className="orders-title">Pedido</h1>
                {hasUser &&
                    <div className="orders-container">
                        <div className="order">
                            <div className="row">
                                <div className="field" id="desc-field">
                                    <span>Descrição</span>
                                    <div className="content-field">{orders[0].desc}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="id-field">
                                    <span>ID Pedido</span>
                                    <div className="content-field">{orders[0]._id}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="id-field">
                                    <span>Peso</span>
                                    <div className="content-field">{orders[0].weight}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-in-field">
                                    <span>Distancia</span>
                                    <div className="content-field">{orders[0].distance}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="id-field">
                                    <span>Preço</span>
                                    <div className="content-field">{orders[0].price}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-in-field">
                                    <span>Endereço de Retirada</span>
                                    <div className="content-field">{orders[0].cepin}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="cep-in">
                                    <span>Cep</span>
                                    <div className="content-field">{orders[0].cepin}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-out-field">
                                    <span>Endereço de Entrega</span>
                                    <div className="content-field">{orders[0].addressout}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="cep-in">
                                    <span>Cep</span>
                                    <div className="content-field">{orders[0].cepout}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="status-field">
                                    <span>Status</span>
                                    <div className="content-field">{orders[0].statusdesc}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}