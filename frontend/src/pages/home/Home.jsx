import React from "react"
import { useNavigate } from "react-router-dom";
import './Home.css';

const Home = (props) => {
    const { loggedIn, email } = props
    const navigate = useNavigate();
    
    const onButtonClick = () => {
        navigate("/login")
    }

    return <div className="backgroundContainer">
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
                {(loggedIn ? <div>
                    Your email address is {email}
                </div> : <div/>)}
            </div>
        </div>

    </div>
};

export default Home;
