import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../functions/postData";
import { checkInResponse } from "../../functions/checkInResponse";
import { setCookie } from "../../functions/setCookie";
import { filterResponse } from "../../functions/filterResponse";
import clearSelection from "../../functions/clearSelection";
import InputText from "../../components/InputText";
import InputButtonPair from "../../components/InputButtonPair";
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
        else if ("" === password) {
            setPasswordError("Please enter a password")
            console.log("Login: No password entered")
            return
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
                <form>
                    <InputText
                        value={email}
                        placeholder="Enter your email here"
                        onChange={ev => setEmail(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        error={emailError} />
                    <InputText
                        type="password"
                        value={password}
                        placeholder="Enter your password here"
                        onChange={ev => setPassword(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        error={passwordError} />
                </form>
                <InputButtonPair
                    onClick1={() => navigate("/register")}
                    onClick2={onLoginButtonClick}
                    value1={"Register"}
                    value2={"Log in"} />
                <label className="errorLabel">{loginError}</label>
                <div className={"inputContainerReset"} tabIndex="0" onClick={() => navigate("/reset")}>
                    Forgot your password?
                </div>
            </div>
        </div>
    </div>
}

export default Login;
