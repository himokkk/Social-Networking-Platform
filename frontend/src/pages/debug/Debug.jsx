import React from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/getCookie";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import { refreshAccess } from "../../functions/refreshAccess";
import clearSelection from "../../functions/clearSelection";
import InputButton from "../../components/InputButton";
import InputButtonPair from "../../components/InputButtonPair";
import './Debug.css';
import { toggleDarkmode } from "../../functions/toggleDarkmode";
import { LOGIN_URL, TERMS_URL } from "../../urls";

const Debug = () => {
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            props.setLoggedIn(false);
            deleteAllCookies();
        }
        navigate(LOGIN_URL);
        return;
    }

    const onEnterClick=(event)=> {
        if (event.key === "Enter") {
            clearSelection()
            onButtonClick()
        }
    }

    const onTestButtonClick = async () => {
        const csrftoken = getCookie("csrftoken");
        console.log("csrftoken: ", csrftoken);
        const refresh = getCookie("refresh");
        console.log("refresh token: ", refresh);
        const darkmode_cookie = getCookie("darkmode");
        console.log("darkmode: ", darkmode_cookie);
    }

    const onRefreshButtonClick = async () => {
        toggleDarkmode()
        await refreshAccess(props)
    }

    return <div className={"Debug"} onKeyDown={onEnterClick}>
        <div className="mainContainer">
            <div className={"titleContainer prevent-select"}>
                <h1>Welcome to ziomki.tk!</h1>
            </div>
            <div className={"buttons"}>
                <InputButtonPair
                    onClick1={() => navigate(TERMS_URL)}
                    onClick2={onButtonClick}
                    value1={"Terms"}
                    value2={"Begin now!"} />
            </div>
            <div className={"buttonContainer"}>
                {(loggedIn ? <div className={"emailContainer"}>
                    {email !== "" ? `Logged in as ${email}` : "Logged in"}
                </div> : <div/> )}
            </div>
            <div className={"buttonContainer"}>
                <h3> Debug section </h3>
                <InputButton
                    className={"debugButton"}
                    onClick={onTestButtonClick}
                    value={"Log token"} />
                <InputButton
                    className={"debugButton"}
                    onClick={deleteAllCookies}
                    value={"Delete all cookies"} />
                <InputButton
                    className={"debugButton"}
                    onClick={toggleDarkmode}
                    value={"Toggle darkmode"} />
                <InputButton
                    className={"debugButton"}
                    onClick={onRefreshButtonClick}
                    value={"Refresh token"} />
            </div>
        </div>
    </div>
};

export default Debug;
