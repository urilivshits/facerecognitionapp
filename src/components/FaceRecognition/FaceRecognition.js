//Please note: the code below contains commented out notes and samples that I left here explicitely for the learning purposes, so that I could use it as reference later on. Thank you for checking it out! 

import React from "react";
// import "./FaceRecognition.css";

const FaceRecognition = ({imageUrl, box, boxFaces, isHidden}) => {
    // console.log(boxFaces.length);
    const detectAllFaces = () => {
        if (imageUrl.length !== 0) {
            const image = document.getElementById("inputImage");
            const width = Number(image.width);
            const height = Number(image.height);
            // console.log("width", width);
            // console.log("height", height);
            const renderFace = boxFaces.map((face, i) => {
                // console.log(face.region_info.bounding_box);
                const clarifaiFace = face.region_info.bounding_box;
                const leftCol = clarifaiFace.left_col * width;
                const topRow = clarifaiFace.top_row * height;
                const rightCol = width - (clarifaiFace.right_col * width);
                const bottomRow = height - (clarifaiFace.bottom_row * height);
                return (
                    <div className={isHidden ? null : "face-bounding-box"} key={i} style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>
                ); 
            })
            return renderFace;
        };
    };
    
    return (
    <div className="container-face">
        <div className="absolute">
            <img id="inputImage" alt="" src={imageUrl}/>
            {/* <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
            {detectAllFaces()}
        </div>
    </div>
    )
};

export default FaceRecognition;