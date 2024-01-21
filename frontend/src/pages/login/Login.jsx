import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../functions/apiCall";
import { checkInResponse } from "../../functions/checkInResponse";
import { setCookie } from "../../functions/setCookie";
import { getCookie } from "../../functions/getCookie";
import { filterResponse } from "../../functions/filterResponse";
import clearSelection from "../../functions/clearSelection";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import InputButtonPair from "../../components/InputButtonPair";
import './Login.css';
import { API_LOGIN, REGISTER_URL, MAIN_URL } from "../../urls";

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [loginError, setLoginError] = useState("")

    const onEnterClick = (event) => {
        if (event.key === "Enter") {
            clearSelection()
            onLoginButtonClick()
        }
    }

    const loadUsername = async () => {
        let username = getCookie("username")
        if (username) {
            setEmail(username)
            return username
        }
        else
            return null
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
        else if ("" === password) {
            setPasswordError("Please enter a password")
            console.log("Login: No password entered")
            return
        }

        // auth
        let response = null;
        try {
            response = await apiCall(API_LOGIN, "POST", JSON.stringify({
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
                const access = responseResults[0];
                const refresh = responseResults[1];
                if (access) {
                    setCookie("access", access)
                    setCookie("refresh", refresh)
                    console.log("Successfully logged in")
                    setCookie("username", email)
                    navigate(MAIN_URL)
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
                <div className={"titleContainer prevent-select"}>
                    &gt; Login
                </div>
                <form>
                    <InputText
                        value={email}
                        placeholder="Enter your email here"
                        onChange={ev => setEmail(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        onFocus={() => loadUsername()}
                        error={emailError} />
                    <InputPassword
                        value={password}
                        placeholder="Enter your password here"
                        onChange={ev => setPassword(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        error={passwordError} />
                </form>
                <InputButtonPair
                    onClick1={() => navigate(REGISTER_URL)}
                    onClick2={onLoginButtonClick}
                    value1={"Register"}
                    value2={"Log in"} />
                <label className="errorLabel">{loginError}</label>
            </div>
        </div>
    </div>
}

export default Login;
