import { NavigateFunction } from "react-router-dom";
import PageController from "./PageController";

type Navigate = {
    page: JSX.Element;
}

export const MobileFrame = ({ page }: Navigate) => {
    return (
        <div className="mobile-behavior">
            <div className="menu-mobile-container">
                <div className="menu-perfil menu-perfil-mobile">
                    <div className="avatar joao"></div>
                    <h3>Motorista</h3>
                    <p>Marcos Henrique</p>
                </div>
            </div>
            <PageController page={page} />
            <div className="logo-mobile-container">
                <div className="logo-mobile-behavior"></div>
            </div>
        </div>
    )
}