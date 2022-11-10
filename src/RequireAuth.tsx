import { Navigate } from 'react-router-dom'

type Props = {
    children: JSX.Element;
}

const RequireAuth = ({ children }: Props) => {
    const isAuth = true;

    if (!isAuth) {
        return <Navigate to={'/'}></Navigate>;
    }

    return children;
}

export default RequireAuth;