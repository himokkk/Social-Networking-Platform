import React from "react";
import './ErrorPage.css';
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, REGISTER_URL, RESET_URL, ROOT_URL } from "../../urls";
import clearSelection from "../../functions/clearSelection";

const ErrorPage = () => {
    const navigate = useNavigate();

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection();
            navigate(ROOT_URL);
        }
    }

    return <div className={"ErrorPage"} onKeyDown={(e) => onEnterClick(e) }>
        <div className={"mainContainer"}>
            <div className={"cardContainer"}>
                <div className={"titleContainer"}>
                    &gt; This page does not exist
                </div>
                <div className={"inputContainerButtons"}>
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={() => navigate(ROOT_URL)}
                        value={"Main Page"}
                        onKeyDown={(e) => onEnterClick(e) } />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={() => navigate(LOGIN_URL)}
                        value={"Login"} />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={() => navigate(REGISTER_URL)}
                        value={"Register"} />
                </div>
                <div className={"inputContainerReset"} tabIndex="0" onClick={() => navigate(RESET_URL)}>
                    Forgot your password?
                </div>
            </div>
        </div>
    </div>
}

export default ErrorPage;
