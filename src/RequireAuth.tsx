import { Navigate } from 'react-router-dom'

import { useContext } from "react";
import { AuthContext } from "./contexts/ContextAuth";

type Props = {
    children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {

    const { signed, actualRole } = useContext(AuthContext);

    console.log(signed);

    const isAuth = signed;

    if (!isAuth) {
        return <Navigate to={'/'}></Navigate>;
    }

    return children;
}

export default RequireAuth;