import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';
import clearSelection from "../../functions/ClearSelection";
import { PostData } from "../../functions/PostData";

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [registerError, setRegisterError] = useState("")

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

    const onRegisterButtonClick = async () => {
        // reset error checks
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")
        setRegisterError("")


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

        if (confirmPassword !== password) {
            setConfirmPasswordError("Passwords must be identical")
            console.log("Register: Different confirm password entered")
            return
        }

        // registration
        var response = null;
        try {
            response = await PostData("http://localhost:8000/user/register/", JSON.stringify({
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
                var jsonResponse = Promise.resolve(response.json())
                jsonResponse
                .then(response => {
                    let message = JSON.stringify(response.username)
                    if (message.includes("A user with that username already exists.")) {
                        setRegisterError("An account with that email already exists")
                        return
                    }
                    else {
                        setRegisterError("Unknown error")
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
            setRegisterError("Server not responding")
            return
        }
    }

    return <div className={"Register"}>
        <div className={"mainContainer"}>
            <div className={"cardContainer"}>
                <div className={"titleContainer"}>
                    &gt;
                    Register
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
                <div className={"inputContainerText"}>
                    <input
                        tabIndex="0"
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
                        tabIndex="0"
                        className={"inputButtonAlternative"}
                        type="button"
                        onClick={onLoginButtonClick}
                        value={"Log in"} />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={onRegisterButtonClick}
                        value={"Register"} />
                </div>
                <label className="errorLabel">{registerError}</label>
            </div>
        </div>
    </div>
}

export default Register;
