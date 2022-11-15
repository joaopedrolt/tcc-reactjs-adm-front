import "../../css/gl/gldashboard.css";

const GlDashBoard = () => {

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

export default GlDashBoard;