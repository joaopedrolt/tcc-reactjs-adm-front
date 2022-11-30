import { Navigate } from 'react-router-dom'

type Props = {
    children: JSX.Element;
}

export const RequireAuthGl = ({ children }: Props) => {

    const userToken = localStorage.getItem("user_token");

    let isAuth = false;

    if (userToken) {
        const token = JSON.parse(userToken);
        if(token.logged == true && token.role == "Gestor Logístico"){
            isAuth = true;
        }
    } 

    if (!isAuth) {
        return <Navigate to={'/'}></Navigate>;
    }

    return children;
};