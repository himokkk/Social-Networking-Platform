import React from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/getCookie";
import { postData } from "../../functions/postData";
import { setCookie } from "../../functions/setCookie";
import { filterResponse } from "../../functions/filterResponse";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import clearSelection from "../../functions/clearSelection";
import InputButton from "../../components/InputButton";
import './Home.css';

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();

    const onButtonClick = () => {
        if (loggedIn) {
            props.setLoggedIn(false);
            deleteAllCookies();
            let login = "/login";
            navigate(login);
        }
        else {
            navigate("/login");
        }
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
    }

    const onRefreshButtonClick = async () => {
        let response = null;
        const refresh = getCookie("refresh");
        if (!refresh) {
            console.log("Refresh token empty")
            props.setLoggedIn(false);
            return
        }
        try {
            response = await postData("http://localhost:8000/user/login/refresh/", JSON.stringify({
                refresh: refresh
            }))
        }
        catch (error) {
            console.log("Error awaiting post: ", error);
        }

        if (response) {
            console.log(response)
            if (response.ok) {
                props.setLoggedIn(true);
                console.log("Successful refresh")
                const responseResults = await filterResponse(response, ["access"]);
                const csrftoken = responseResults[0];

                if (csrftoken) {
                    setCookie("csrftoken", csrftoken)
                    console.log("New access set")
                    return
                }
                else {
                    props.setLoggedIn(false);
                    console.log("New access token missing")
                    return
                }
            }
            else {
                props.setLoggedIn(false);
                console.log("Unsuccessful refresh")
            }
        }
        else {
            console.log("Server not responding")
            return
        }
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
                    <InputButton
                        className={"debugButton"}
                        onClick={onTestButtonClick}
                        value={"Log token"} />
                    <InputButton
                        className={"debugButton"}
                        onClick={deleteAllCookies}
                        value={"Clear token"} />
                    <InputButton
                        className={"debugButton"}
                        onClick={onRefreshButtonClick}
                        value={"Refresh token"} />
                    {(loggedIn ? <div className={"emailContainer"}>
                        Logged in as {email}
                    </div> : <div/>)}
                </div>
                <div className={"inputContainerTerms"} tabIndex="0" onClick={() => navigate("/terms")}>
                    By continuing you agree to terms and conditions
                </div>
            </div>
        </div>
    </div>
};

export default Home;
