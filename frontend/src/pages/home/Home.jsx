import React from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/getCookie";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import { refreshAccess } from "../../functions/refreshAccess";
import { checkDarkmode } from "../../functions/checkDarkmode";
import clearSelection from "../../functions/clearSelection";
import InputButton from "../../components/InputButton";
import './Home.css';
import { toggleDarkmode } from "../../functions/toggleDarkmode";
import { LOGIN_URL, TERMS_URL } from "../../urls";

const onLoadFunction = async () => {
    checkDarkmode()
}
window.addEventListener("load", onLoadFunction, false)

const Home = (props) => {
    const { loggedIn, email, darkmode } = props
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
        console.log("darkmode app: ", darkmode);
    }

    const onRefreshButtonClick = async () => {
        toggleDarkmode()
        await refreshAccess(props)
    }

    return <div className={"Home"}>
        <div className="backgroundContainer">
            <div className="mainContainer">
                <div className={"titleContainer prevent-select"}>
                    <h1>Welcome to ziomki.tk!</h1>
                </div>
                <div className={"subtitleContainer prevent-select"}>
                    Hi Ziomkis! 👋
                </div>
                <div className={"buttonContainer"}>
                    <InputButton
                        className={"inputButton"}
                        onClick={onButtonClick}
                        onKeyDown={(e) => onEnterClick(e) }
                        value={loggedIn ? "Log out" : "Begin now!"} />
                    {(loggedIn ? <div className={"emailContainer"}>
                        {email !== "" ? `Logged in as ${email}` : "Logged in"}
                    </div> : <div/> )}
                </div>
                <div className={"inputContainerTerms"} tabIndex="0" onClick={() => navigate(TERMS_URL)}>
                    By continuing you agree to terms and conditions
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
    </div>
};

export default Home;
