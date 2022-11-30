import { NavigateFunction } from "react-router-dom";
import "../../css/motorista/mdashboard.css";

type Navigate = {
    navigate: NavigateFunction;
}

export const DashBoard = ({navigate}: Navigate) => {

    const handleClickExit = () => {
        navigate('/');
    }

    return (
            <div className="mid-section-container">
                <div className="mobile-dashboard-buttons">
                    <div className="button-my-orders">Meus Pedidos</div>
                    <div onClick={handleClickExit} className="button-my-orders">Sair</div>
                </div>
            </div>
    )

}