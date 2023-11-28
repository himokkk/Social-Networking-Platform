import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './ResetPassword.css';
import clearSelection from "../../functions/ClearSelection";

const ResetPassword = () => {
    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [resetError, setResetError] = useState("")

    const navigate = useNavigate();

    const onLoginButtonClick = () => {
        navigate("/login")
    }

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onResetButtonClick()
        }
    }

    const onResetButtonClick = () => {
        setEmailError("")
        setResetError("")

        if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)) {
            setEmailError("Please enter a valid email")
            console.log("Register: Invalid email entered")
            return
        }

        // password reset
    }

    return <div className={"ResetPassword"}>
        <div className={"mainContainer"}>
            <div className={"cardContainer"}>
                <div className={"titleContainer"}>
                    &gt;
                    Reset
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
                <div className={"inputContainerButtons"}>
                    <input
                        tabIndex="0"
                        className={"inputButtonAlternative"}
                        type="button"
                        onClick={onLoginButtonClick}
                        value={"Login"} />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={onResetButtonClick}
                        value={"Reset"} />
                </div>
                <label className="errorLabel">{resetError}</label>
            </div>
        </div>
    </div>
}

export default ResetPassword;
