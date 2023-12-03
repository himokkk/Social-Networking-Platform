import React from "react"
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../functions/GetCookie";
import './Home.css';

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();

    const onButtonClick = () => {
        navigate("/login")
    }

    const onTermsButtonClick = () => {
        navigate("/terms")
    }

    const onTestButtonClick = async () => {
        const csrftoken = getCookie("csrftoken");
        console.log(csrftoken);
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
                        value={loggedIn ? "Log out" : "Begin now!"} />
                    <input
                        className={"debugButton"}
                        type="button"
                        onClick={onTestButtonClick}
                        value={"Log token"} />
                    {(loggedIn ? <div>
                        Your email address is {email}
                    </div> : <div/>)}
                </div>
                <div className={"inputContainerTerms"} tabIndex="0" onClick={onTermsButtonClick}>
                    By continuing you agree to terms and conditions
                </div>
            </div>
        </div>
    </div>
};

export default Home;
