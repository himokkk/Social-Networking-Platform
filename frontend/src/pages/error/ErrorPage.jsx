import React from "react";
import './ErrorPage.css';
import { useNavigate } from "react-router-dom";
import clearSelection from "../../functions/clearSelection";

const ErrorPage = () => {
    const navigate = useNavigate();

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection();
            navigate("/");
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
                        onClick={() => navigate("/")}
                        value={"Main Page"}
                        onKeyDown={(e) => onEnterClick(e) } />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={() => navigate("/login")}
                        value={"Login"} />
                    <input
                        tabIndex="0"
                        className={"inputButton"}
                        type="button"
                        onClick={() => navigate("/register")}
                        value={"Register"} />
                </div>
                <div className={"inputContainerReset"} tabIndex="0" onClick={() => navigate("/reset")}>
                    Forgot your password?
                </div>
            </div>
        </div>
    </div>
}

export default ErrorPage;
