export type User = {
    _id?: string;
    role: string;
    name: string;
}

export type UserLoginReponse = {
    user?: User,
    logged: boolean
}

export type UserLogin = {
    user: string;
    password: string;
}