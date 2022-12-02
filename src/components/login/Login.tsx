import FormContent from "./FormContent";
import "../../css/login.css"
import "../../css/sectiondefaults.css";

const Login = () => {

    localStorage.clear();
    
    return (
        <section id="login-screen">
            <div className="login-area">
                <div className="login-area--top">
                    <div className="logo"></div>
                </div>
                <div className="login-area--bottom">
                    <FormContent />
                </div>
            </div>
        </section>
    )

}

export default Login;