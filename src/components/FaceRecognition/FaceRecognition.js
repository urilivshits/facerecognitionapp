import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({imageUrl, box, boxFaces}) => {
    // console.log(boxFaces);
    const detectAllFaces = () => {
        if (imageUrl.length !== 0) {
            const image = document.getElementById("inputImage");
            const width = Number(image.width);
            const height = Number(image.height);
            const renderFace = boxFaces.map((face, i) => {
                // console.log(face.region_info.bounding_box);
                const clarifaiFace = face.region_info.bounding_box;
                const leftCol = clarifaiFace.left_col * width;
                const topRow = clarifaiFace.top_row * height;
                const rightCol = width - (clarifaiFace.right_col * width);
                const bottomRow = height - (clarifaiFace.bottom_row * height);
                return (
                    <div className="bounding-box" key={i} style={{top: topRow, right: rightCol, bottom: bottomRow, left: leftCol}}></div>
                ); 
            })
            return renderFace;
        };
    };
    
    return (
    <div className="center ma">
        <div className="absolute mt2">
            <img id="inputImage" alt="your img" src={imageUrl} width="500px" height="auto"/>
            {/* <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> */}
            {detectAllFaces()}
            <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
    </div>
    )
};

export default FaceRecognition;