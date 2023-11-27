import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import clearSelection from "../../functions/ClearSelection";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onRegisterButtonClick = () => {
        navigate("/register")
    }

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onLoginButtonClick()
        }
    }

    const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        let cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
};

    const onLoginButtonClick = async () => {
        // reset error checks
        setEmailError("")
        setPasswordError("")

        if ("" === email) {
            setEmailError("Please enter your email")
            console.log("Login: No email entered")
            return
        }

        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            console.log("Login: Invalid email entered")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            console.log("Login: No password entered")
            return
        }

        if (password.length <= 7) {
            setPasswordError("The password must be 8 characters or longer")
            console.log("Login: Too short password entered")
            return
        }

        // auth
        const csrftoken = getCookie("csrftoken");
        try {
            let response = await fetch("http://localhost:8000/user/login/", {
            method: "POST",
            headers: {
                "X-CSRFToken": csrftoken,
            },
            body: {"login": "x"},
            }).then(response => {
                return response;
            });
            console.log(response);
        }
        catch(err) {
            console.log("Error: " + err.message);
        }
    }

    return <div className={"Login"}>
        <div className={"mainContainer"}>
            <div className={"cardContainer"}>
                <div className={"titleContainer"}>
                    &gt;
                    Login
                </div>
                <div className={"inputContainerText"} tabIndex="0">
                    <input
                        value={email}
                        placeholder="Enter your email here"
                        onChange={ev => setEmail(ev.target.value)}
                        className={"inputBox"}
                        onKeyDown={(e) => onEnterClick(e) } />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <div className={"inputContainerText"} tabIndex="1">
                    <input
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={ev => setPassword(ev.target.value)}
                        className={"inputBox"}
                        onKeyDown={(e) => onEnterClick(e) } />
                    <label className="errorLabel">{passwordError}</label>
                </div>
                <div className={"inputContainerButtons"}>
                    <input
                        className={"inputButtonAlternative"}
                        type="button"
                        onClick={onRegisterButtonClick}
                        value={"Register"} />
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onLoginButtonClick}
                        value={"Log in"} />
                </div>
                <div className={"inputContainerReset"}>
                    Forgot your password?
                    &nbsp;
                    <a href="about:blank">Reset it now</a>
                </div>
            </div>
        </div>
    </div>
}

export default Login;