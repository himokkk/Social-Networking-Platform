import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import clearSelection from "../../functions/ClearSelection";
import { Authenticate } from "../../functions/Auth";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    
    const navigate = useNavigate();
        
    const onLoginButtonClick = () => {
        navigate("/login")
    }

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onRegisterButtonClick()
        }
    }

    const onRegisterButtonClick = () => {
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            console.log("Register: No email entered")
            return
        }

        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            console.log("Register: Invalid email entered")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            console.log("Register: No password entered")
            return
        }

        if (password.length <= 7) {
            setPasswordError("The password must be 8 characters or longer")
            console.log("Register: Too short password entered")
            return
        }

        if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords must be identical")
            console.log("Register: Different confirm password entered")
            return
        }

        // register
        Authenticate("http://localhost:8000/user/register/", email, password)
    }

    return <div className={"Register"}>
        <div className={"mainContainer"}>
            <div className={"cardContainer"}>
                <div className={"titleContainer"}>
                    &gt;
                    Register
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
                <div className={"inputContainerText"} tabIndex="2">
                    <input
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirm your password here"
                        onChange={ev => setConfirmPassword(ev.target.value)}
                        className={"inputBox"}
                        onKeyDown={(e) => onEnterClick(e) } />
                    <label className="errorLabel">{confirmPasswordError}</label>
                </div>
                <div className={"inputContainerButtons"}>
                    <input
                        className={"inputButtonAlternative"}
                        type="button"
                        onClick={onLoginButtonClick}
                        value={"Log in"} />
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onRegisterButtonClick}
                        value={"Register"} />
                </div>
            </div>
        </div>
    </div>
}

export default Register;