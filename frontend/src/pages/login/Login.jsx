import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../functions/postData";
import { checkInResponse } from "../../functions/checkInResponse";
import { setCookie } from "../../functions/setCookie";
import { filterResponse } from "../../functions/filterResponse";
import clearSelection from "../../functions/clearSelection";
import './Login.css';

const Login = (props) => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginError, setLoginError] = useState("")
    
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
        let response = null;
        try {
            response = await postData("http://localhost:8000/user/login/", JSON.stringify({
                username: email,
                password: password,
            }),)
        }
        catch (error) {
            console.log("Error awaiting post: ", error);
        }

        if (response) {
            if (response.ok) {
                const responseResults = await filterResponse(response, ["access", "refresh"]);
                const csrftoken = responseResults[0];
                const refresh = responseResults[1];
                if (csrftoken) {
                    setCookie("csrftoken", csrftoken)
                    setCookie("refresh", refresh)
                    props.setLoggedIn(true)
                    props.setEmail(email)
                    console.log("Successfully logged in")
                    navigate("/")
                }
                else {
                    console.log("Access token not returned")
                    setLoginError("Couldn't retrieve access token")
                    return
                }
            }
            else {
                if (checkInResponse(response, "No active account found with the given credentials")) {
                    setLoginError("No active account found with the given credentials")
                    return
                }
                else {
                    setLoginError("Unknown error")
                    return
                }
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
                    &gt; Login
                </div>
                <div className={"inputContainerText"}>
                    <input
                        tabIndex="0"
                        value={email}
                        placeholder="Enter your email here"
                        onChange={ev => setEmail(ev.target.value)}
                        className={"inputBox"}
                        onKeyDown={(e) => onEnterClick(e) } />
                    <label className="errorLabel">{emailError}</label>
                </div>
                <div className={"inputContainerText"}>
                    <input
                        tabIndex="0"
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
                        tabIndex="0"
                        className={"inputButtonAlternative"}
                        type="button"
                        onClick={() => navigate("/register")}
                        value={"Register"} />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={onLoginButtonClick}
                        value={"Log in"} />
                </div>
                <label className="errorLabel">{loginError}</label>
                <div className={"inputContainerReset"} tabIndex="0" onClick={() => navigate("/reset")}>
                    Forgot your password?
                </div>
            </div>
        </div>
    </div>
}

export default Login;
