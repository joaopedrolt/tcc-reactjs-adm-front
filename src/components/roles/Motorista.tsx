import "../../css/motorista/mdashboard.css";
import "../../css/motorista/mpedidos.css";

import { useEffect, useState } from "react";
import { NavigateFunction } from "react-router-dom";

import MotoristaApi from "../../api/Motorista.api ";

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
    const [hasUser, setHasUser] = useState(false);

    const [options, setOptions] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState('');

    const [selectFirstChange, setSelectFirstChange] = useState(true);

    const [problem, setProblem] = useState<boolean>(false);
    const [finished, setFinished] = useState<boolean>(false);

    const [textAreaContent, setTextAreaContent] = useState('');

    const statusDescRange = ["Aguardando motorista sair para retirar carga", "Motorista preparando transporte", "Motorista em trânsito para retirar pedido", "Pedido coletado", "Motorista em trânsito para entrega do do pedido", "Finalizar Entrega", "Relatar Problema"];

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

    useEffect(() => {
        if (hasUser) {
            const indexDesc = statusDescRange.indexOf(orders[0].statusdesc);
            if (indexDesc != -1) {
                const optionsCopy = statusDescRange.slice(indexDesc + 1);
                setOptions(optionsCopy);
            } else {
                const optionsCopy = statusDescRange.slice(1);
                setOptions(optionsCopy);
            }
        }
    }, [hasUser])

    useEffect(() => {
        switch (selectedOption) {
            case "Finalizar Entrega":
                setFinished(true);
                setProblem(false);
                break;
            case "Relatar Problema":
                setProblem(true);
                setFinished(false);
                break;
            default:
                setFinished(false);
                setProblem(false);
                break
        }
    }, [selectedOption])

    const HandleButton = () => {

        if (selectedOption == '' || selectedOption == 'Atualize a situação do pedido') {
            alert('Por favor selecione uma das opções corretamente')
        } else if (!problem) {
            console.log(selectedOption)
            api.updateOrderDesc({
                orderId: orders[0]._id,
                statusDesc: selectedOption
            });
        } else if (problem) {
            api.updateOrderDesc({
                orderId: orders[0]._id,
                statusDesc: textAreaContent
            });
        }

        if (finished && !(selectedOption == '' || selectedOption == 'Atualize a situação do pedido')) {
            if (orders[0].price) {
                api.sumYield(orders[0].price);
            }
            alert('Pedido Finalizado');
            navigate('motorista/dashboard')
        } else if (selectedOption != '') {
            alert('Siuação atualizada, siga os proximos procedimentos de acordo');
            navigate('motorista/dashboard')
        }

    }

    const HandleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        if (selectFirstChange) {
            setSelectFirstChange(false);
        }
        setSelectedOption(e.target.value);

    }

    const HandleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaContent(e.target.value);
    }

    let finishedOrder: boolean = false;

    if (orders.length > 0) {
        finishedOrder = (orders[0].finished == true ? true : false);
    }

    return (
        <div className="mid-section-container">
            <div className="orders-mobile-container">
                {hasUser && !finishedOrder &&
                    <>
                        <h1 className="orders-title">Pedidos</h1>
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
                                        <div className="content-field mobile-field">{orders[0]._id}</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="id-field">
                                        <span className="desc-field-mobile">Peso</span>
                                        <div className="content-field mobile-field">{orders[0].weight} kg</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="field mobile-field" id="address-in-field">
                                        <span className="desc-field-mobile">Distancia</span>
                                        <div className="content-field mobile-field">{orders[0].distance} km</div>
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
                                        <span className="desc-field-mobile">Endereço de Entrega</span>
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
                        <div className="button-mobile-container">
                            <select value={selectedOption} onChange={HandleSelectChange} className="select-mobile">
                                {selectFirstChange &&
                                    <option>Atualize a situação do pedido</option>
                                }
                                {options.length > 0 ? (
                                    options.map((option, key) => (<option key={key}>{option}</option>))) :
                                    (<></>)
                                }
                            </select>
                            {problem && <><h3 className="orders-title">Informe a situação <br></br> atual do pedido</h3>
                                <textarea onChange={HandleTextAreaChange} className="input-status-mobile" maxLength={150} value={textAreaContent} /></>}
                            <button onClick={HandleButton} className={"button-mobile" + (!finished ? " button-green" : " button-red")}>{!finished ? "Atualizar Status do Pedido " : "Finalizar"}</button>
                        </div>
                    </>
                }
                {!hasUser &&
                    <>
                        <h1 className="orders-title">Nenhum Pedido Alocado</h1>
                        <h3 className="orders-title">Aguarde uma nova ordem de serviço</h3>
                    </>
                }
            </div>
        </div>
    )

}