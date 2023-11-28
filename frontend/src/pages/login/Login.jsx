import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';
import clearSelection from "../../functions/ClearSelection";
import { PostData } from "../../functions/PostData";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginError, setLoginError] = useState("")
    
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

    const onLoginButtonClick = async () => {
        // reset error checks
        setEmailError("")
        setPasswordError("")
        setLoginError("")

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

        if (!(/\d/.test(password))) {
            setPasswordError("The password must contain at least one digit")
            console.log("Register: Password doesn't contain at least one digit")
            return
        }

        if (!(/[A-Z]/.test(password))) {
            setPasswordError("The password must contain at least one capital letter")
            console.log("Register: Password doesn't contain at least one capital letter")
            return
        }

        if (!(/[a-z]/.test(password))) {
            setPasswordError("The password must contain at least one small letter")
            console.log("Register: Password doesn't contain at least one small letter")
            return
        }

        if (!(/[^A-Za-z0-9]/.test(password))) {
            setPasswordError("The password must contain at least one special character");
            console.log("Register: Password doesn't contain at least one special character");
            return;
        }

        // auth
        var response = null;
        try {
            response = await PostData("http://localhost:8000/user/login/", JSON.stringify({
                username: email,
                password: password,
            }),)
        }
        catch (error) {
            console.log("Error awaiting post: ", error);
        }

        if (response) {
            if (response.ok) {
                console.log("Successfully logged in")
                navigate("/")
            }
            else {
                var jsonResponse = Promise.resolve(response.json())
                jsonResponse
                .then(response => {
                    let detail = JSON.stringify(response.detail)
                    if (detail.includes("No active account found with the given credentials")) {
                        setLoginError("No active account found with the given credentials")
                        return
                    }
                    else {
                        setLoginError("Unknown error")
                        return
                    }
                })
                .catch(error => {
                    console.error('Error fetching or processing data:', error);
                    return
                });

            }
        }
        else {
            setLoginError("Server not responding")
            return
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
                <label className="errorLabel">{loginError}</label>
                <div className={"inputContainerReset"}>
                    <a href="about:blank">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    </div>
}

export default Login;
