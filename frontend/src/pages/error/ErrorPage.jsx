import React from "react";
import './ErrorPage.css';
import { useNavigate } from "react-router-dom";
import { LOGIN_URL, REGISTER_URL, RESET_URL, ROOT_URL } from "../../urls";
import clearSelection from "../../functions/clearSelection";
import InputButton from "../../components/InputButton"

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
                <div className={"titleContainer prevent-select"}>
                    &gt; This page does not exist
                </div>
                <div className={"inputContainerButtons"}>
                    <InputButton
                        className={"inputButton"}
                        onClick={() => navigate(ROOT_URL)}
                        onKeyDown={(e) => onEnterClick(e) }
                        value={"Main Page"} />
                    <InputButton
                        className={"inputButton"}
                        onClick={() => navigate(LOGIN_URL)}
                        onKeyDown={(e) => onEnterClick(e) }
                        value={"Login"} />
                    <InputButton
                        className={"inputButton"}
                        onClick={() => navigate(REGISTER_URL)}
                        onKeyDown={(e) => onEnterClick(e) }
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
