import React, {useState} from 'react';
import {postData, postDataWithoutToken, postDataWithToken} from "../../api/api";
import {useNavigate} from "react-router-dom";

function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();


    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = (event) => {
        event.preventDefault();
        setIsLoading(true)
        postDataWithoutToken(process.env.AXIOS+"/api/login").then((response) => {
            setIsLoading(false)
            localStorage.setItem("accessToken", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            //localStorage.setItem("refreshToken", response.data.refreshToken);
            navigate("/");
        }).catch((error) => {
            setIsLoading(false)
            console.log(error)
            setErrorMessage(error?.response?.data?.message || "Une erreur est survenue")
        });
    }
    return (
        <div className={"flex justify-center h-screen"}>
            <form className={"border flex flex-col gap-4 my-auto p-4 card "}>
                <h1>Connexion</h1>
                {errorMessage && <h1 className={"text-red-500"}>{errorMessage}</h1>}
            <input type="text" value={email} onChange={handleEmailChange} placeholder={"Email"}  className={"input input-bordered"}/>
            <input type="password" value={password} onChange={handlePasswordChange} placeholder={"Mot de passe"}  className={"input input-bordered"}/>
                {isLoading ?
                    <span className={"loading loading-spinner loading-xl mx-auto"}/>
                    :
                    <button type="submit" onClick={handleLogin} className={"btn"}>Se connecter</button>
                }
            </form>
        </div>
    );
}

export default Login;