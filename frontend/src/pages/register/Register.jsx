import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiCall } from "../../functions/apiCall";
import { checkInResponse } from "../../functions/checkInResponse";
import { registerPasswordCheck } from "../../functions/registerPasswordCheck";
import clearSelection from "../../functions/clearSelection";
import InputText from "../../components/InputText";
import InputButtonPair from "../../components/InputButtonPair";
import './Register.css';
import { setCookie } from "../../functions/setCookie";
import { API_REGISTER, LOGIN_URL } from "../../urls";
import InputPassword from "../../components/InputPassword";

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [registerError, setRegisterError] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onRegisterButtonClick()
        }
    }

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
        setPassword(password);
        setConfirmPassword(confirmPassword);
    };

    const onRegisterButtonClick = async () => {
        // reset global error
        setRegisterError("")
        
        const checkSuccessful = await registerPasswordCheck(email, password, confirmPassword, setEmailError, setPasswordError, setConfirmPasswordError)
        if (!checkSuccessful) {
            return
        }

        // registration
        let response = null;
        try {
            response = await apiCall(API_REGISTER, "POST", JSON.stringify({
                username: email,
                password: password,
            }),)
        }
        catch (error) {
            console.log("Error awaiting post: ", error);
        }

        if (response) {
            if (response.ok) {
                console.log("Account successfully created")
                setCookie("username", email)
                navigate(LOGIN_URL)
            }
            else {
                if (checkInResponse(response, "A user with that username already exists.")) {
                    setRegisterError("An account with that username already exists")
                    return
                }
                else {
                    setRegisterError("Unknown error")
                    return
                }
            }
        }
        else {
            setRegisterError("Server not responding")
            return
        }
    }

    return <div className={"Register"}>
        <div className={"mainContainer"}>
            <div className={"cardContainer"}>
                <div className={"titleContainer prevent-select"}>
                    &gt; Register
                </div>
                <form>
                    <InputText
                        value={email}
                        placeholder="Enter your username here"
                        onChange={ev => setEmail(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        error={emailError} />
                    <InputPassword
                        value={password}
                        placeholder="Enter your password here"
                        showPassword={showPassword}
                        onTogglePassword={() => handleTogglePassword()}
                        onChange={ev => setPassword(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        autocomplete="new-password"
                        error={passwordError} />
                    <InputPassword
                        value={confirmPassword}
                        placeholder="Confirm your password here"
                        showPassword={showPassword}
                        onTogglePassword={() => handleTogglePassword()}
                        onChange={ev => setConfirmPassword(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        autocomplete="new-password"
                        error={confirmPasswordError} />
                </form>
                <InputButtonPair
                    onClick1={() => navigate(LOGIN_URL)}
                    onClick2={onRegisterButtonClick}
                    value1={"Log in"}
                    value2={"Register"} />
                <label className="errorLabel center-text">{registerError}</label>
            </div>
        </div>
    </div>
}

export default Register;
