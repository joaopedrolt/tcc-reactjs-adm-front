import "../../css/gl/glpedidos.css";

const GlPedidos = () => {

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
                            <button className="button-orders">Acompanhar Pedido</button>
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
                            <button className="button-orders">Acompanhar Pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default GlPedidos;