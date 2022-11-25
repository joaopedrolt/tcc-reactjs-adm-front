import { createContext } from "react";
import { User } from '../types/User'

const inicialUser = {
    _id: 1,
    role: 'João Pedro Lima Teixeira',
    name: 'Gestor Logístico'
}

export const Context = createContext<User>(inicialUser);

type Props = {
    children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({children}: Props) => {
    return (
        <Context.Provider value={inicialUser}>{children}</Context.Provider>
    );
}