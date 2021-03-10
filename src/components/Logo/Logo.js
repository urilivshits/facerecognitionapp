import React from "react";
import Tilt from "react-tilt";
import "./Logo.css";
import logoPNG from "./Logo.png";

const Logo = () => {
    return (
        <div className="ma4 mt0 w-20">
            <Tilt className="Tilt br2 shadow-2" options={{ max : 35 }} style={{ height: 150, width: 150 }} >
              <div className="Tilt-inner pa3">
                  <img src={logoPNG} alt="logo" style={{paddingTop: "20px"}}/>
              </div>
            </Tilt>
        </div>
    );
};

export default Logo;