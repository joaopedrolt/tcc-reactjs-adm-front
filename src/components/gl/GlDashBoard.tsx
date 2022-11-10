import "../../css/gl/gldashboard.css";

const GlDashBoard = () => {

    return (
        <div className="conteudo-principal">
            <div className="card">
                <div className="caixa">
                    <div className="lado-esquerdo">
                        <div className="titulo-card">RECEITAS TOTAIS</div>
                        <div className="conteudo-card">R$ 25.868,78</div>
                        <div className="indicador-card">Subiu</div>
                    </div>
                </div>
                <div className="caixa">
                    <div className="lado-esquerdo">
                        <div className="titulo-card">TOTAL DE ENTREGAS REALIZDAS/MES</div>
                        <div className="conteudo-card">255</div>
                        <div className="indicador-card">Subiu</div>
                    </div>
                </div>
                <div className="caixa">
                    <div className="lado-esquerdo">
                        <div className="titulo-card">DATA:</div>
                        <div className="conteudo-card">DIA/MES/ANO</div>
                        <div className="indicador-card">HORARIO ATUAL</div>
                    </div>
                </div>
                <div className="caixa">
                    <div className="lado-esquerdo">
                        <div className="titulo-card">VEICULOS DIPONIVEIS PRA SERVIÇO</div>
                        <div className="conteudo-card">12</div>
                        <div className="indicador-card">Subiu</div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GlDashBoard;