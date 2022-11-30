import { createContext, useEffect, useState } from "react";

type AuthContextType = {
    signed: boolean;
    setSigned?: React.Dispatch<React.SetStateAction<boolean>>,
    setActualRole?: React.Dispatch<React.SetStateAction<string>>,
    actualRole: string;
}

export const AuthContext = createContext<AuthContextType>({
    signed: false,
    actualRole: ''
});

type Props = {
    children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {

    const [signed, setSigned] = useState(false);
    const [actualRole, setActualRole] = useState('');

    return (
        <AuthContext.Provider value={{ signed, setSigned, actualRole, setActualRole }}>{children}</AuthContext.Provider>
    );
}