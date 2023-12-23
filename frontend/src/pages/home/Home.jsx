import React from "react"
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../functions/deleteAllCookies";
import clearSelection from "../../functions/clearSelection";
import InputButtonPair from "../../components/InputButtonPair";
import './Home.css';
import { LOGIN_URL, TERMS_URL } from "../../urls";

const Home = () => {
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

    return <div className={"Home"} onKeyDown={onEnterClick}>
        <div className="mainContainer">
            <div className={"titleContainer prevent-select"}>
                <h1>Welcome to ziomki.tk!</h1>
            </div>
            <div className={"subtitleContainer prevent-select"}>
                Hi Ziomkis! 👋
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
        </div>
    </div>
};

export default Home;
