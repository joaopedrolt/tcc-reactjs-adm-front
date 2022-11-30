import { createContext, useState } from "react";
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

    return (
        <UserContext.Provider value={{ user, setUserContext }}>{children}</UserContext.Provider>
    );
}