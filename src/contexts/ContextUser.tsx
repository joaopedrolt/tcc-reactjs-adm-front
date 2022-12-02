import React, { createContext, useEffect, useState } from "react";
import { User } from "../types/User";

type UserContextType = {
    user: User;
    setUserContext?: React.Dispatch<React.SetStateAction<User>>;
}

export const UserContext = createContext<UserContextType>({
    user: {
        name: '',
        role: ''
    }
});

type Props = {
    children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }: Props) => {

    const [user, setUserContext] = useState<User>({
        name: '',
        role: ''
    });

    function getUser() {
        const userToken = localStorage.getItem("user_token");

        if (userToken) {
            const token = JSON.parse(userToken);
            setUserContext({
                name: token.name,
                role: token.role
            })
        }
    }

    useEffect(() => {
        getUser();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUserContext }}>{children}</UserContext.Provider>
    );
}