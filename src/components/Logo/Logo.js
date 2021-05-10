import React from "react";
import Tilt from "react-tilt";
// import "./Logo.css";
import logoPNG from "./Logo.png";

const Logo = ({onRouteChange}) => {

    const reset = () => {
        onRouteChange("SignIn");
        setTimeout(() => { //since i cannot manipulate uploadcare element to reset uploaded image without setting up restful api calls with user auth
            onRouteChange("home");
        }, 10);
    };

    return (
        <div onClick={reset} className="container-logo" title="Click on me to reset session">
            <Tilt className="bg-logo br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
              <div className="bg-logo-inner pa3">
                  <img src={logoPNG} alt="logo" style={{paddingTop: "20px"}}/>
              </div>
            </Tilt>
        </div>
    );
};

export default Logo;