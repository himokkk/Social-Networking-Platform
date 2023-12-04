import React from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/getCookie";
import { postData } from "../../functions/postData";
import { setCookie } from "../../functions/setCookie";
import { filterResponse } from "../../functions/filterResponse";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import clearSelection from "../../functions/clearSelection";
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
                console.log("Successful refresh")
                const responseResults = await filterResponse(response, ["access"]);
                const csrftoken = responseResults[0];

                if (csrftoken) {
                    setCookie("csrftoken", csrftoken)
                    console.log("New access set")
                    return
                }
                else {
                    console.log("New access token missing")
                    return
                }
            }
            else {
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
                <div className={"titleContainer"}>
                    <h1>Welcome to ziomki.tk!</h1>
                </div>
                <div className={"subtitleContainer"}>
                    Hi Ziomkis! 👋
                </div>
                <div className={"buttonContainer"}>
                    <input
                        className={"inputButton"}
                        type="button"
                        onClick={onButtonClick}
                        onKeyDown={(e) => onEnterClick(e) }
                        value={loggedIn ? "Log out" : "Begin now!"} />
                    <input
                        className={"debugButton"}
                        type="button"
                        onClick={onTestButtonClick}
                        value={"Log token"} />
                    <input
                        className={"debugButton"}
                        type="button"
                        onClick={onRefreshButtonClick}
                        value={"Refresh token"} />
                    {(loggedIn ? <div className={"emailContainer"}>
                        Your email address is {email}
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
