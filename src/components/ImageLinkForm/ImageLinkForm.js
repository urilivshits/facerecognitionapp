//Please note: the code below contains commented out notes and samples that I left here explicitely for the learning purposes, so that I could use it as reference later on. Thank you for checking it out! 

import React, { useEffect, useState } from "react";
// import "./ImageLinkForm.css";

//importing library for file upload //npm install @uploadcare/react-widget
import { Widget } from "@uploadcare/react-widget";

const ImageLinkForm = ({onInputChange, onPictureSubmit, onFileUpload, myApi, input}) => {
    
    //?upload base64 image
    // const onImageUpload = () => {
    //     let img = document.getElementById("myFile");
    //     if (img !== null) {
    //         const img64 = URL.createObjectURL(new Blob([img.files[0]]));
    //         console.log(img64);
    //         onFileUpload(img64);
    //         // onFileUpload({base64: img64});
    //     }
    // };
    
    //?adding class on drag event
    //1st way
    const [dragging, setDragging] = useState(false);
    useEffect(() => {
        const dragover = window.addEventListener("dragover", (e) => {
            e.preventDefault();
            if (!dragging) {
                setDragging(true);
                const dropArea2 = document.getElementsByClassName("uploadcare--widget__dragndrop-area")[0];
                if (dropArea2.textContent === "Drop a file here") {
                    dropArea2.textContent = "Drop an image here";
                    dropArea2.style.height = "400px";
                    dropArea2.style.lineHeight = "400px";
                    
                    // dropArea2.style.height = "150px";
                    // dropArea2.style.lineHeight = "150px";
                    // setTimeout(() => { //since i cannot manipulate uploadcare element to reset uploaded image without setting up restful api calls with user auth
                    //     dropArea2.style.height = "400px";
                    //     dropArea2.style.lineHeight = "400px";
                    // }, 100);
                }
            }
        });
        return () => {
            window.removeEventListener("dragover", dragover);
        };
    }, [dragging]);

    useEffect(() => {
        if (!dragging) {
            return
        }
        const dragleave = window.addEventListener("dragleave", () => {
                setDragging(false);
                const dropArea2 = document.getElementsByClassName("uploadcare--widget__dragndrop-area")[0];
                dropArea2.textContent = "Drop a file here";
                dropArea2.style.height = "150px";
                dropArea2.style.lineHeight = "150px";
        });
        return () => {
            window.removeEventListener("dragleave", dragleave);
        };
    }, [dragging]);

    useEffect(() => {
        const dragend = window.addEventListener("dragend", () => {
            if (dragging) {
                setDragging(false);
                const dropArea2 = document.getElementsByClassName("uploadcare--widget__dragndrop-area")[0];
                dropArea2.textContent = "Drop a file here";
                dropArea2.style.height = "150px";
                dropArea2.style.lineHeight = "150px";
            }
        });
        return () => {
            window.removeEventListener("dragend", dragend);
        };
    }, [dragging]);

    useEffect(() => {
        const drop = window.addEventListener("drop", () => {
            if (dragging) {
                setDragging(false);
                const dropArea2 = document.getElementsByClassName("uploadcare--widget__dragndrop-area")[0];
                dropArea2.textContent = "Drop a file here";
                dropArea2.style.height = "150px";
                dropArea2.style.lineHeight = "150px";
            }
        });
        return () => {
            window.removeEventListener("drop", drop);
        };
    }, [dragging]);

    // //2nd way
    // useEffect(() => {
    //     const body = document.getElementsByTagName("body")[0];
    //     const viewport = window.innerHeight;
    //     console.log(viewport);
    //     const container = document.getElementsByClassName("bg-input")[0];
    //     const dragover = window.addEventListener("dragover", () => {
    //         if (body.className !== "") {
                
    //             //1st option
    //             const button = document.getElementsByClassName("uploadcare--widget__dragndrop-area")[0];
    //             button.classList.add("dragging");
    //             console.log(button);

    //             //2nd option
    //             container.style.height = "1000px";
    //         }
    //     });
    //     return () => {
    //         // inputRef.style.height = "100px";
    //         container.style.height = "100px";
    //         window.removeEventListener("dragover", dragover);
    //     };
    // }, []);

    // //3nd way -- add  ref={inputRef} to element
    // const inputRef = useRef(null);
    // useEffect(() => {
    //     const dragover = window.addEventListener("dragover", () => {
    //         inputRef.current.style.height = "500px";
    //     });
    //     return () => {
    //         window.removeEventListener("dragover", dragover);
    //     };
    // }, []);



    return (
        <section className="container-input">
            {/* <p className="f3">This Magic Brain will detect faces in your pictures. Give it a try.</p> */}
            <div className="shadow-2 bg-input" style={dragging ? {height: "500px"} : {height: "auto"}}>
                {/* <input className="pa2 w-70 center mainInput" type="text" onChange={onInputChange} value={input}/> */}
                {/* <button className="w-30 grow link ph3 pv2 dib white bg-light-purple" onClick={onPictureSubmit}>Detect face</button> */}
                <input className="face-input" type="text" onChange={onInputChange} value={input}/>
                {/* <input onChange={onImageUpload} type="file" id="myFile" name="filename" accept="image/png, image/jpeg"/> */}
                <label style={{width: "300px"}} htmlFor='file'></label>{' '}
                <Widget publicKey={myApi.key2} id='file' 
                    onFileSelect={(file) => {
                        // console.log("file changed", file);
                        if (file) {
                            // file.progress(info => console.log("file progress", info.progress))
                            file.done(info => {
                                // console.log("file uploaded", info)
                                onFileUpload(info.cdnUrl);
                            })
                        }
                    }}
                    // onChange={info => console.log("upload complete", info)}                
                />
                <button className="face-button" onClick={onPictureSubmit} style={input.includes("http") ? {background: "#157cfc"} : {background: "#64E9EE"}}>Detect face</button>
            </div>
        </section>
    );
}

export default ImageLinkForm;