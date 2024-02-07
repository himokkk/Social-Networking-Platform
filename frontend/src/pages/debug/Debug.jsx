import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/getCookie";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import { refreshAccess } from "../../functions/refreshAccess";
import { filterResponse } from "../../functions/filterResponse";
import { apiCall } from "../../functions/apiCall";
import clearSelection from "../../functions/clearSelection";
import InputButton from "../../components/InputButton";
import InputButtonPair from "../../components/InputButtonPair";
import ImageUploader from "../../components/ImageUploader";
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
            privacy: 1
        }))
    }

    const commentPost = async () => {
        await apiCall(API_BASE_URL + "/posts/1/comment/create", "POST", JSON.stringify({
            "content": "string",
          }))
    }

    const userData = async() => {
        let response = null;
        try {
            response = await apiCall("http://localhost:8000/user/current/", "GET")
        }
        catch (error) {
            console.log("Error awaiting get: ", error);
        }

        if (response) {
            if (response.ok) {
                const responseResults = await filterResponse(response, ["id", "username"]);
                const id = responseResults[0];
                const username = responseResults[1];
                console.log("id: ", id)
                console.log("username: ", username)
            }
        }
        else {
            console.log("Server not responding")
            return
        }
    }

    return <div className={"Debug"} onKeyDown={onEnterClick}>
        <div className="mainContainer">
            <div className={"titleContainer prevent-select"}>
                <h1>Welcome to ziomki.online!</h1>
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
                <InputButton
                    className={"debugButton"}
                    onClick={userData}
                    value={"Get user data"} />
                <ImageUploader/>
            </div>
        </div>
    </div>
};

export default Debug;
