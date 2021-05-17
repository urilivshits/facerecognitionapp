//Please note: the code below contains commented out notes and samples that I left here explicitely for the learning purposes, so that I could use it as reference later on. Thank you for checking it out! 

import React, {Component} from "react";
import './App.css';
import Navigation from "./components/Navigation/Navigation.js";
import Logo from "./components/Logo/Logo.js";
import Rank from "./components/Rank/Rank.js";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm.js";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition.js";
import SignIn from "./components/SignIn/SignIn.js";
import Register from "./components/Register/Register.js";
import Particles from 'react-particles-js'; //these are the cool particles lib

//? setting up clarifai api
// import Clarifai from "clarifai"; //these imports Clarifai api, removed from here and moved to backend
import {myApi} from "./myApi.js";  //removed clarifai part from here and moved to backend, only uploadcare remained

// const app = new Clarifai.App({
//   apiKey: myApi.key
// }); // removed from here and moved to backend

//configuring particles options
const particlesOptions = {
    particles: {
      line_linked: {
        shadow: {
          enable: true,
          color: "#3CA9D1",
          blur: 5
        }
      },
      number: {
        value: 20,
        density: {
          enable: true,
          value_area: 400
        }
      },
      move: {
        speed: 3
      }
    },
     interactivity: {
        events: {
          onhover: {
            enable: true,
            mode: "grab"
          }
        },
        detect_on: "window"
      }
};



//! identifying all the faces on an image
class App extends Component {
  constructor () {
    super ();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      boxFaces: [],
      route: "SignIn",
      isSignedIn: false,
      isHidden: false,
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: ""
      }
    };
  };

  //used to get user info upon log in
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value, imageUrl: event.target.value, isHidden: true});
  };

  onFileUpload = (file) => {
    this.setState({input: file, imageUrl: file, isHidden: true});
    // console.log("input", this.state.input);
    // console.log("imageUrl", this.state.imageUrl);
    // let mainInput = document.getElementsByClassName("mainInput")[0].innerText;
    // mainInput = file;
    // console.log(mainInput);
  };

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // app.models.predict("89126de9e3404d2d893506395d8ea25f", `${this.state.input}`).then( //removed from here and moved to backend
    // app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input) //removed from here and moved to backend
    // fetch("http://localhost:3000/imageurl", {
    fetch("https://arcane-badlands-99768.herokuapp.com/imageurl", {
      method: "post",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({input: this.state.input})
    })
    .then(response => response.json()) //since now its fetching from server and not from clarifai api that responds already in json
    .then(
      response => {
        this.setState({boxFaces: response.outputs[0].data.regions})
        // console.log(response);
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        if (response) {
          // fetch ("http://localhost:3000/image", {
          fetch ("https://arcane-badlands-99768.herokuapp.com/image", {
            method: "put",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                id: this.state.user.id,
                picsSubmitted: this.state.boxFaces.length
            })
          })
          .then(response => response.json())
          .then(response => {
            //this way will erase the {name} of the user retrieved on sign in
            // this.setState({user: {entries: response}})
            //this way it will update the user object without erasing the {name}
            //Object.assign() allows us to update the object without recreating it
            this.setState(Object.assign(this.state.user, {entries: response[0].entries}));
            this.setState({isHidden: false});
            
            //updating entries count and lastactive on localStorage
            const loggedInUser = localStorage.getItem("user");
            if (loggedInUser) {
                const foundUser = JSON.parse(loggedInUser); //need to parse to return an object
                // console.log(foundUser);
                foundUser.entries = response[0].entries;
                foundUser.lastactive =response[0].lastactive;
                localStorage.setItem("user", JSON.stringify(foundUser)); //need to stringify to pass an object
            }
          })
        };
      }
    )
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "SignIn") {
      this.setState({isSignedIn: false, imageUrl: "", boxFaces: [], input: ""});
      localStorage.clear();
    }
    else if (route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  };

  render () {
    return (
      <div className="App">
        <Particles params={particlesOptions} className="bg-particles" />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
        this.state.route === "home" 
          ? 
          <div>
            <section>
              <Logo onRouteChange={this.onRouteChange}/>
              <Rank name={this.state.user.name} entries={this.state.user.entries} faces={this.state.boxFaces.length}/>
            </section>
              <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit} onFileUpload={this.onFileUpload} myApi={myApi} input={this.state.input}/>
              <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} boxFaces={this.state.boxFaces} isHidden={this.state.isHidden}/>
          </div>
          : 
          ( //this () allows adding ternary inside ternary
            this.state.route === "SignIn" 
            ?
            <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            :
            <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          )
        }
      </div>
    );
  };
};

export default App;

//! identyfing only 1 face by default
// class App extends Component {
//   constructor () {
//     super ();
//     this.state = {
//       input: "",
//       imageUrl: "",
//       box: {}
//     };
//   };

//   onInputChange = (event) => {
//     this.setState({input: event.target.value});
//     console.log(event.target.value);
//   };

//   onPictureSubmit = () => {
//     this.setState({imageUrl: this.state.input});
//     // app.models.predict("89126de9e3404d2d893506395d8ea25f", `${this.state.input}`).then(
//     app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
//     .then(
//       response => {
//         console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
//         this.displayFaceBox(this.calculateFaceLocation(response));
//       }
//     )
//     .catch(err => console.log(err));
//   };

//   calculateFaceLocation = (data) => {
//     const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
//     const image = document.getElementById("inputImage");
//     const width = Number(image.width);
//     const height = Number(image.height);

//     console.log(clarifaiFace, image, width, height);

//     return {
//       leftCol: clarifaiFace.left_col * width,
//       topRow: clarifaiFace.top_row * height,
//       rightCol: width - (clarifaiFace.right_col * width),
//       bottomRow: height - (clarifaiFace.bottom_row * height)
//     }
//   };

//   displayFaceBox = (box) => {
//     console.log(box);
//     this.setState({box: box});
//   };

//   render () {
//     return (
//       <div className="App">
//         <Particles params={particlesOptions} className="particles" />
//         <Navigation />
//         <Logo />
//         <Rank />
//         <ImageLinkForm onInputChange={this.onInputChange} onPictureSubmit={this.onPictureSubmit}/>
//         <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
//       </div>
//     );
//   };
// };

// export default App;