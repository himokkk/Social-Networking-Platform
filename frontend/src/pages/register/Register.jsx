import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../../functions/postData";
import { checkInResponse } from "../../functions/checkInResponse";
import { registerPasswordCheck } from "../../functions/registerPasswordCheck";
import clearSelection from "../../functions/clearSelection";
import InputText from "../../components/InputText";
import InputButtonPair from "../../components/InputButtonPair";
import './Register.css';

const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [registerError, setRegisterError] = useState("")

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onRegisterButtonClick()
        }
    }

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
            response = await postData("http://localhost:8000/user/register/", JSON.stringify({
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
                navigate("/login")
            }
            else {
                if (checkInResponse(response, "A user with that username already exists.")) {
                    setRegisterError("An account with that email already exists")
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
                <div className={"titleContainer"}>
                    &gt; Register
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
                        autocomplete="new-password"
                        error={passwordError} />
                    <InputText
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm your password here"
                        onChange={ev => setConfirmPassword(ev.target.value)}
                        onKeyDown={(e) => onEnterClick(e) }
                        autocomplete="new-password"
                        error={confirmPasswordError} />
                </form>
                <InputButtonPair
                    onClick1={() => navigate("/login")}
                    onClick2={onRegisterButtonClick}
                    value1={"Log in"}
                    value2={"Register"} />
                <label className="errorLabel">{registerError}</label>
            </div>
        </div>
    </div>
}

export default Register;
