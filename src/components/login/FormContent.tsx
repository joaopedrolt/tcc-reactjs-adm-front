import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useContext } from "react";
import { UserContext } from "../../contexts/ContextUser";

import Login from '../../api/Login.api'
import { UserLogin } from "../../types/User";

export const FormContent = () => {

    const api = new Login();

    const navigate = useNavigate();

    let [user, setUser] = useState<string>("");
    let [password, setPassword] = useState<string>("");

    const changeInputUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser(event.target.value);
    }

    const changeInputPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }

    const HandleSubmit = async () => {

        const userLogin: UserLogin = {
            user,
            password
        }

        const userCredentials = await api.checkCredentials(userLogin);

        if (userCredentials.logged && userCredentials.user) {

            const { role, name } = userCredentials.user;
            
            const logged = true;
            
            localStorage.setItem("user_token", JSON.stringify({ role, logged, name }));

            switch (role) {
                case 'Motorista':
                    navigate('/motorista/dashboard');
                    break;
                case 'Gestor Logístico':
                    navigate('/gl/dashboard');
                    break;
            }

        } else {
            alert('Usuário ou senha incorreto');
        }

    }

    return (
        <div className="login-form">
            <div className="inputfild">
                <div className="input-logo">
                    <svg fill="#000000" viewBox="0 0 30 30" width="30px" height="30px">
                        <path
                            d="M18,19v-2c0.45-0.223,1.737-1.755,1.872-2.952c0.354-0.027,0.91-0.352,1.074-1.635c0.088-0.689-0.262-1.076-0.474-1.198 c0,0,0.528-1.003,0.528-2.214c0-2.428-0.953-4.5-3-4.5c0,0-0.711-1.5-3-1.5c-4.242,0-6,2.721-6,6c0,1.104,0.528,2.214,0.528,2.214 c-0.212,0.122-0.562,0.51-0.474,1.198c0.164,1.283,0.72,1.608,1.074,1.635C10.263,15.245,11.55,16.777,12,17v2c-1,3-9,1-9,8h24 C27,20,19,22,18,19z" />
                    </svg>
                </div>
                <input placeholder="Usuario" value={user} onChange={changeInputUser} />
            </div>
            <div className="inputfild">
                <div className="input-logo">
                    <svg fill="#000000" viewBox="0 0 30 30" width="30px" height="30px">
                        <path
                            d="M 15 2 C 11.145666 2 8 5.1456661 8 9 L 8 11 L 6 11 C 4.895 11 4 11.895 4 13 L 4 25 C 4 26.105 4.895 27 6 27 L 24 27 C 25.105 27 26 26.105 26 25 L 26 13 C 26 11.895 25.105 11 24 11 L 10 11 L 10 9 C 10 6.2263339 12.226334 4 15 4 C 17.184344 4 19.022854 5.3946656 19.708984 7.3339844 A 1.0001 1.0001 0 1 0 21.59375 6.6660156 C 20.631881 3.9473344 18.037656 2 15 2 z" />
                    </svg>
                </div>
                <input type="password" name="pass" placeholder="Senha" value={password} onChange={changeInputPass} />
            </div>
            <button onClick={HandleSubmit}>Login</button>
        </div>
    )

}

export default FormContent;