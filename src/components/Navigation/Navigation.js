import React from "react";
import Leaderboard from "../Leaderboard/Leaderboard";

const Navigation = ({onRouteChange, isSignedIn}) => {
    
        if (isSignedIn) {
            return (
                <nav style ={{display: "flex", justifyContent: "flex-end"}}>
                    {/* <p onClick={() => onRouteChange("Leaderboard")}><Leaderboard /></p> */}
                    < Leaderboard />
                    <p onClick={() => onRouteChange("SignIn")} style={{zIndex: "2"}} className="link dim black underline pointer">Sign Out</p>
                </nav>
            )
        }
        else {
            return (
                <nav style ={{display: "flex", justifyContent: "flex-end"}}>
                    <p onClick={() => onRouteChange("SignIn")} className="link dim black underline pointer">Sign In</p>
                    <p onClick={() => onRouteChange("Register")} className="link dim black underline pointer">Register</p>
                </nav>
            )
        }
};

export default Navigation;