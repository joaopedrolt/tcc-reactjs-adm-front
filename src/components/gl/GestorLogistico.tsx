import { NavigateFunction } from "react-router-dom";
import "../../css/gl/gldashboard.css";
import "../../css/gl/glmotoristas.css";
import "../../css/gl/glpedidos.css";
import "../../css/gl/gltransportes.css";
import "../../css/gl/glacopanharpedido.css";

type PedidosProps = {
    navigate: NavigateFunction;
}

export const DashBoard = () => {

    return (
        <div className="main-content">
            <div className="card">
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">RECEITAS TOTAIS</div>
                        <div className="content-card">R$ 25.868,78</div>
                        <div className="index-card">Subiu</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">TOTAL DE ENTREGAS REALIZDAS/MES</div>
                        <div className="content-card">255</div>
                        <div className="index-card">Subiu</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">DATA:</div>
                        <div className="content-card">DIA/MES/ANO</div>
                        <div className="index-card">HORARIO ATUAL</div>
                    </div>
                </div>
                <div className="box">
                    <div className="left-side">
                        <div className="title-card">VEICULOS DIPONIVEIS PRA SERVIÇO</div>
                        <div className="content-card">12</div>
                        <div className="index-card">Subiu</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export const Motoristas = () => {

    return (
        <div className="flex-colunm">
            <h1 className="drivers-title">Situação Motoristas</h1>
            <div className="drivers">
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Em entrega</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Disponivel</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Em entrega</p>
                        </div>
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Pedido ID</h4>
                            <p className="driver-info">001</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Em entrega</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Em entrega</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Em entrega</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Em entrega</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Em entrega</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export const Pedidos = ({ navigate }: PedidosProps) => {

    const HandleClick = (id: number) => {
        let path = "/gl/pedidos/" + id;
        navigate(path);
    }

    return (
        <>
            <div className="orders-container">
                <div className="order">
                    <div className="row">
                        <div className="field" id="desc-field">
                            <span>Descrição</span>
                            <div className="content-field">3 KILOS DE BOMBA DE TRIOG</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="id-field">
                            <span>ID Pedido</span>
                            <div className="content-field">2</div>
                        </div>
                        <div className="field" id="size-field">
                            <span>Dimensão da Caixa</span>
                            <div className="content-field">22m</div>
                        </div>
                        <div className="field" id="weith-field">
                            <span>Peso Total Unitario</span>
                            <div className="content-field">44kg</div>
                        </div>
                        <div className="field" id="amount-field">
                            <span>Quantidade Total</span>
                            <div className="content-field">4</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Endereço de Retirada</span>
                            <div className="content-field">Rua etore caraturadsad 3 - jardim</div>
                        </div>
                        <div className="field-small" id="load-field">
                            <span>Ocupação Bau</span>
                            <div className="content-field">2</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-out-field">
                            <span>Endereço de Entrega</span>
                            <div className="content-field">Rua etore caraturadsad 3 - jardim</div>
                        </div>
                        <div className="field-small" id="status-field">
                            <span>Status</span>
                            <div className="content-field">2</div>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <button onClick={() => { HandleClick(1) }} className="button-orders">Acompanhar Pedido</button>
                        </div>
                    </div>
                </div>
                <div className="order">
                    <div className="row">
                        <div className="field" id="desc-field">
                            <span>Descrição</span>
                            <div className="content-field">3 KILOS DE BOMBA DE TRIOG</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="id-field">
                            <span>ID Pedido</span>
                            <div className="content-field">2</div>
                        </div>
                        <div className="field" id="size-field">
                            <span>Dimensão da Caixa</span>
                            <div className="content-field">22m</div>
                        </div>
                        <div className="field" id="weith-field">
                            <span>Peso Total Unitario</span>
                            <div className="content-field">44kg</div>
                        </div>
                        <div className="field" id="amount-field">
                            <span>Quantidade Total</span>
                            <div className="content-field">4</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Endereço de Retirada</span>
                            <div className="content-field">Rua etore caraturadsad 3 - jardim</div>
                        </div>
                        <div className="field-small" id="load-field">
                            <span>Ocupação Bau</span>
                            <div className="content-field">2</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-out-field">
                            <span>Endereço de Entrega</span>
                            <div className="content-field">Rua etore caraturadsad 3 - jardim</div>
                        </div>
                        <div className="field-small" id="status-field">
                            <span>Status</span>
                            <div className="content-field">2</div>
                        </div>
                    </div>
                    <div className="row">
                        <div>
                            <button className="button-orders" onClick={() => { HandleClick(1) }} >Acompanhar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export const AcompanharPedidos = () => {

    return (
        <div className="order-overview-container">
            <div className="order-overview-top">
                <div className="truck-card" id="truck-card-overview">
                    <div className="truck-card-top flex-colunm">
                        <div className="truck-img-container"></div>
                        <h3 className="truck-name">Merces Beazn 55 300</h3>
                    </div>
                    <div className="truck-card-bottom flex-colunm">
                        <div className="desc-row">
                            <h4 className="truck-desc">Tipo de Eixo</h4>
                            <p className="truck-info">Eixos triplos</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Capacidade Maxima</h4>
                            <p className="truck-info">1 Tonelada</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Quantidade Disponivel p/ Transporte</h4>
                            <p className="truck-info">400 kilos</p>
                        </div>
                    </div>
                </div>
                <div className="driver-card" id="driver-card-overview">
                    <div className="driver-card-top flex-colunm">
                        <div className="driver-img-container"></div>
                        <h3 className="driver-name">Joao Pedro Lima Teixeira</h3>
                    </div>
                    <div className="driver-card-bottom">
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Status</h4>
                            <p className="driver-info">Disponivel</p>
                        </div>
                        <div className="desc-row flex-colunm">
                            <h4 className="driver-desc">Cargo</h4>
                            <p className="driver-info">Motorista</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="order-overview-bottom">
                <div className="order">
                    <div className="row">
                        <div className="field" id="desc-field">
                            <span>Descrição</span>
                            <div className="content-field">3 KILOS DE BOMBA DE TRIOG</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="id-field">
                            <span>ID Pedido</span>
                            <div className="content-field">2</div>
                        </div>
                        <div className="field" id="size-field">
                            <span>Dimensão da Caixa</span>
                            <div className="content-field">22m</div>
                        </div>
                        <div className="field" id="weith-field">
                            <span>Peso Total Unitario</span>
                            <div className="content-field">44kg</div>
                        </div>
                        <div className="field" id="amount-field">
                            <span>Quantidade Total</span>
                            <div className="content-field">4</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-in-field">
                            <span>Endereço de Retirada</span>
                            <div className="content-field">Rua etore caraturadsad 3 - jardim</div>
                        </div>
                        <div className="field-small" id="load-field">
                            <span>Ocupação Bau</span>
                            <div className="content-field">2</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="address-out-field">
                            <span>Endereço de Entrega</span>
                            <div className="content-field">Rua etore caraturadsad 3 - jardim</div>
                        </div>
                        <div className="field-small" id="status-field">
                            <span>Status</span>
                            <div className="content-field">2</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="field" id="select-t-field">
                            <span>Alocar Transporte</span>
                            <select className="select-order">
                                <option>001</option>
                                <option>002</option>
                                <option>003</option>
                                <option>1500</option>
                            </select>
                        </div>
                        <div className="field" id="select-m-field">
                            <span>Alocar Motorista</span>
                            <select className="select-order">
                                <option>001</option>
                                <option>002</option>
                                <option>003</option>
                                <option>1500</option>
                            </select>
                        </div>
                        <div className="field" id="button-c-field">
                            <button className="button-overwiew">Confirmar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export const Transportes = () => {

    return (
        <div className="flex-colunm">
            <h1 className="garage-title">Veículos disponíveis</h1>
            <div className="garage">
                <div className="truck-card">
                    <div className="truck-card-top flex-colunm">
                        <div className="truck-img-container"></div>
                        <h3 className="truck-name">Merces Beazn 55 300</h3>
                    </div>
                    <div className="truck-card-bottom flex-colunm">
                        <div className="desc-row">
                            <h4 className="truck-desc">Tipo de Eixo</h4>
                            <p className="truck-info">Eixos triplos</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Capacidade Maxima</h4>
                            <p className="truck-info">1 Tonelada</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Quantidade Disponivel p/ Transporte</h4>
                            <p className="truck-info">400 kilos</p>
                        </div>
                    </div>
                </div>
                <div className="truck-card">
                    <div className="truck-card-top flex-colunm">
                        <div className="truck-img-container"></div>
                        <h3 className="truck-name">Merces Beazn 55 300</h3>
                    </div>
                    <div className="truck-card-bottom flex-colunm">
                        <div className="desc-row">
                            <h4 className="truck-desc">Tipo de Eixo</h4>
                            <p className="truck-info">Eixos triplos</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Capacidade Maxima</h4>
                            <p className="truck-info">1 Tonelada</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Quantidade Disponivel p/ Transporte</h4>
                            <p className="truck-info">400 kilos</p>
                        </div>
                    </div>
                </div>
                <div className="truck-card">
                    <div className="truck-card-top flex-colunm">
                        <div className="truck-img-container"></div>
                        <h3 className="truck-name">Merces Beazn 55 300</h3>
                    </div>
                    <div className="truck-card-bottom flex-colunm">
                        <div className="desc-row">
                            <h4 className="truck-desc">Tipo de Eixo</h4>
                            <p className="truck-info">Eixos triplos</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Capacidade Maxima</h4>
                            <p className="truck-info">1 Tonelada</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Quantidade Disponivel p/ Transporte</h4>
                            <p className="truck-info">400 kilos</p>
                        </div>
                    </div>
                </div>
                <div className="truck-card">
                    <div className="truck-card-top flex-colunm">
                        <div className="truck-img-container"></div>
                        <h3 className="truck-name">Merces Beazn 55 300</h3>
                    </div>
                    <div className="truck-card-bottom flex-colunm">
                        <div className="desc-row">
                            <h4 className="truck-desc">Tipo de Eixo</h4>
                            <p className="truck-info">Eixos triplos</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Capacidade Maxima</h4>
                            <p className="truck-info">1 Tonelada</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Quantidade Disponivel p/ Transporte</h4>
                            <p className="truck-info">400 kilos</p>
                        </div>
                    </div>
                </div>
                <div className="truck-card">
                    <div className="truck-card-top flex-colunm">
                        <div className="truck-img-container"></div>
                        <h3 className="truck-name">Merces Beazn 55 300</h3>
                    </div>
                    <div className="truck-card-bottom flex-colunm">
                        <div className="desc-row">
                            <h4 className="truck-desc">Tipo de Eixo</h4>
                            <p className="truck-info">Eixos triplos</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Capacidade Maxima</h4>
                            <p className="truck-info">1 Tonelada</p>
                        </div>
                        <div className="desc-row">
                            <h4 className="truck-desc">Quantidade Disponivel p/ Transporte</h4>
                            <p className="truck-info">400 kilos</p>
                        </div>
                    </div>
                </div>
            </div>
            <button className="button-manage">Gerenciar Veículos</button>
        </div>
    )

}