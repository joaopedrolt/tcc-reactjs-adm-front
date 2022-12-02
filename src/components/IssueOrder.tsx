import { useState } from "react";

import "../css/issueorder.css";

import { IMaskInput } from "react-imask";
import Customer from "../api/Customer.api";
import { OrderAdd } from "../types/Order";
import { NavigateFunction } from "react-router-dom";

type Navigate = {
    navigate: NavigateFunction;
}

const IssueOrder = ({ navigate }: Navigate) => {

    const [inputDesc, setInputDesc] = useState('');
    const [inputWeight, setInputWeight] = useState(0);
    const [inputNumIn, setInputNumIn] = useState('');
    const [inputNumOut, setInputNumOut] = useState('');
    const [inputAddressIn, setInputAddressIn] = useState('');
    const [inputAddressOut, setInputAddressOut] = useState('');
    const [cepIn, setCepIn] = useState('');
    const [cepOut, setCepOut] = useState('');

    const api = new Customer();

    const HandleCepAddressIn = async (value: any) => {
        const address = await api.getAddress(value);
        if (address.address != 'undefined, undefined, undefined') {
            setCepIn(value);
            setInputAddressIn(address.address);
        } else {
            alert('Insira um Cep de retirada valido');
            setInputAddressIn('');
            setInputNumIn('');
        }
    }

    const HandleCepAddressOut = async (value: any) => {
        const address = await api.getAddress(value);
        if (address.address != 'undefined, undefined, undefined') {
            setInputAddressOut(address.address);
            setCepOut(value);
        } else {
            alert('Insira um Cep de entrega valido');
            setInputAddressIn('');
            setInputNumOut('');
        }
    }

    const HandleClick = async () => {

        if (isNaN(inputWeight) || inputWeight == 0) {
            alert('Insira o Peso corretamente!');
        } else if (inputDesc == '' || inputNumIn == '' || inputNumOut == '' || inputAddressIn == '' || inputAddressOut == '') {
            alert('Preencha todos os campos');
        } else {
            alert('Pedido emitido com sucesso!');
            navigate('/')
            const newOrder: OrderAdd = {
                desc: inputDesc,
                weight: inputWeight,
                addressin: inputAddressIn + ', n: ' + inputNumIn,
                cepin: cepIn,
                addressout: inputAddressOut + ', n: ' + inputNumOut,
                cepout: cepOut,
            }
            api.postNewTruck(newOrder);
        }

    }

    return (
        <section id="login-screen">
            <div className="login-area">
                <div className="login-area--top">
                    <div className="logo"></div>
                </div>
                <div className="send-order-container ">
                    <h1 className="orders-title">Simular emissão de order de serviço</h1>
                    <div className="orders-container">
                        <div className="order">
                            <div className="row">
                                <div className="field" id="desc-field">
                                    <span>Descrição</span>
                                    <input value={inputDesc} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputDesc(e.target.value) }} type='text' className="content-field"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="weith-field">
                                    <span>Peso (Kg)</span>
                                    <input value={inputWeight} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputWeight(parseFloat(e.target.value)) }} type='number' className="content-field"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="cep-in">
                                    <span>Cep - Retirada</span>
                                    <IMaskInput onComplete={(value) => { HandleCepAddressIn(value) }} mask="00000-000" />
                                </div>
                                <div className="field" id="cep-out">
                                    <span>Cep - Entrega</span>
                                    <IMaskInput onComplete={(value) => { HandleCepAddressOut(value) }} mask="00000-000" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-out-field">
                                    <span>Endereço de Retirada</span>
                                    <input readOnly value={inputAddressIn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputAddressIn(e.target.value) }} className="content-field"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-in-field">
                                    <span>Número do Endereço de Retirada</span>
                                    <input value={inputNumIn} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputNumIn(e.target.value) }} className="content-field"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-in-field">
                                    <span>Endereço de Entrega</span>
                                    <input value={inputAddressOut} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputAddressOut(e.target.value) }} className="content-field"></input>
                                </div>
                            </div>
                            <div className="row">
                                <div className="field" id="address-in-field">
                                    <span>Número Endereço de Entrega</span>
                                    <input value={inputNumOut} onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInputNumOut(e.target.value) }} className="content-field"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={HandleClick} className="button-submit-order">Enviar ordem de serviço</button>
                </div>
            </div>
        </section>
    );
}

export default IssueOrder;