import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
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

    const onRegisterButtonClick = () => {

        // Set initial error values to empty
        setEmailError("")
        setPasswordError("")

        // Check if the user has entered both fields correctly
        if ("" === email) {
            setEmailError("Please enter your email")
            return
        }

        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            return
        }

        if ("" === password) {
            setPasswordError("Please enter a password")
            return
        }

        if (password.length < 7) {
            setPasswordError("The password must be 8 characters or longer")
            return
        }

        if (confirmPassword.length != password) {
            setConfirmPasswordError("Passwords must be identical")
            return
        }

        // Authentication calls will be made here...       

    }

    return <div className={"mainContainer"}>
        <div className={"cardContainer"}>
        <div className={"titleContainer"}>
            <div>Register</div>
        </div>
        <br />
        <div className={"inputContainerText"}>
            <input
                value={email}
                placeholder="Enter your email here"
                onChange={ev => setEmail(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{emailError}</label>
        </div>
        <br />
        <div className={"inputContainerText"}>
            <input
                value={password}
                placeholder="Enter your password here"
                onChange={ev => setPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
        <div className={"inputContainerText"}>
            <input
                value={confirmPassword}
                placeholder="Confirm your password here"
                onChange={ev => setConfirmPassword(ev.target.value)}
                className={"inputBox"} />
            <label className="errorLabel">{confirmPasswordError}</label>
        </div>
        <br />
        <div className={"inputContainerButtons"}>
            <input
                className={"inputButton"}
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
}

export default Register