import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/getCookie";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import { refreshAccess } from "../../functions/refreshAccess";
import { apiCall } from "../../functions/apiCall";
import clearSelection from "../../functions/clearSelection";
import InputButton from "../../components/InputButton";
import InputButtonPair from "../../components/InputButtonPair";
import './Debug.css';
import { toggleDarkmode } from "../../functions/toggleDarkmode";
import { LOGIN_URL, TERMS_URL, API_BASE_URL } from "../../urls";

const Debug = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState("")

    const onButtonClick = () => {
        if (loggedIn) {
            setLoggedIn(false);
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
        const access = getCookie("access");
        console.log("access: ", access);
        const refresh = getCookie("refresh");
        console.log("refresh token: ", refresh);
        const darkmode_cookie = getCookie("darkmode");
        console.log("darkmode: ", darkmode_cookie);
    }

    const onRefreshButtonClick = async () => {
        toggleDarkmode()
        await refreshAccess()
    }

    const createPost = async () => {
        await apiCall(API_BASE_URL + "/posts/create", "POST", JSON.stringify({
            content: "string",
            media: "string",
            privacy: 1
        }))
    }

    const commentPost = async () => {
        await apiCall(API_BASE_URL + "/posts/0/comment/create", "POST", JSON.stringify({
            "content": "string",
          }))
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
                <InputButton
                    className={"debugButton"}
                    onClick={createPost}
                    value={"Create post"} />
                <InputButton
                    className={"debugButton"}
                    onClick={commentPost}
                    value={"Comment post"} />
            </div>
        </div>
    </div>
};

export default Debug;
