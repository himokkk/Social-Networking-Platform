import React from "react";
import { useNavigate } from "react-router-dom";
import './ErrorPage.css';
import clearSelection from "../../functions/ClearSelection";

const ErrorPage = () => {
    const navigate = useNavigate();
        
    const onMainButtonClick = () => {
        navigate("/")
    }

    const onRegisterButtonClick = () => {
        navigate("/register")
    }

    const onLoginButtonClick = () => {
        navigate("/login")
    }

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onMainButtonClick()
        }
    }

    return <div className={"ErrorPage"} onKeyDown={(e) => onEnterClick(e) }>
        <div className={"mainContainer"}>
            <div className={"cardContainer"}>
                <div className={"titleContainer"}>
                    &gt;
                    This page does not exist
                </div>
                <div className={"inputContainerButtons"}>
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={onMainButtonClick}
                        value={"Main Page"}
                        onKeyDown={(e) => onEnterClick(e) } />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={onLoginButtonClick}
                        value={"Login"} />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={onRegisterButtonClick}
                        value={"Register"} />
                </div>
                <div className={"inputContainerReset"}>
                    <a href="/reset" tabIndex="0">
                        Forgot your password?
                    </a>
                </div>
            </div>
        </div>
    </div>
}

export default ErrorPage;
