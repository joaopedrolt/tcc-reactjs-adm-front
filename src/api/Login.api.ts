import { User, UserLogin, UserLoginReponse } from "../types/User";
import Api from "./ApiClass";

class Login extends Api {
    constructor() {
        super()
    }

    private baseApiPath = super.getBase();

    async checkCredentials(user: UserLogin): Promise<UserLoginReponse> {
        let response = await fetch(this.baseApiPath + 'users/check', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: { 'Content-Type': 'application/json' ,
                       'Access-Control-Request-Private-Network': 'true'}
        })
        return await response.json();
    }

}

export default Login;