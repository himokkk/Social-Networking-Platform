import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import { getCookie } from "../../functions/getCookie";
import { refreshAccess } from "../../functions/refreshAccess";
import clearSelection from "../../functions/clearSelection";
import InputButtonPair from "../../components/InputButtonPair";
import './Home.css';
import { LOGIN_URL, MAIN_URL, TERMS_URL } from "../../urls";

const Home = () => {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState("")
    const [email, setEmail] = useState("")

    const onBeginButtonClick = () => {
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
            onBeginButtonClick()
        }
    }

    const checkIfLoggedIn = async () => {
        let username = getCookie("username")
        if (username) {
            setEmail(username)
        }
        let loggedIn = await refreshAccess()
        if (loggedIn) {
            navigate(MAIN_URL)
        }
    }

    useEffect(() => {
        checkIfLoggedIn()
      }, []);

    return <div className={"Home"} onKeyDown={onEnterClick}>
        <div className="mainContainer">
            <div className={"titleContainer prevent-select"}>
                <h1>Welcome to ziomki.online!</h1>
            </div>
            <div className={"subtitleContainer prevent-select"}>
                Hi Ziomkis! 👋
            </div>
            <div className={"buttons"}>
                <InputButtonPair
                    onClick1={() => navigate(TERMS_URL)}
                    onClick2={onBeginButtonClick}
                    value1={"Terms"}
                    value2={"Begin now!"} />
            </div>
            <div className={"buttonContainer"}>
                {(loggedIn ? <div className={"emailContainer"}>
                    {email !== "" ? `Logged in as ${email}` : "Logged in"}
                </div> : <div/> )}
            </div>
        </div>
    </div>
};

export default Home;
