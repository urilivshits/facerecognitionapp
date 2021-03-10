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
import Clarifai from "clarifai"; //these imports Clarifai api

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
        value: 40,
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

const app = new Clarifai.App({
  apiKey: "89126de9e3404d2d893506395d8ea25f"
});

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
      isSignedIn: false
    };
  };

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    console.log(event.target.value);
  };

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    // app.models.predict("89126de9e3404d2d893506395d8ea25f", `${this.state.input}`).then(
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(
      response => {
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        this.setState({boxFaces: response.outputs[0].data.regions})
        // this.displayFaceBox(this.calculateFaceLocation(response));
      }
    )
    .catch(err => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === "SignOut") {
      this.setState({isSignedIn: false});
    }
    else if (route === "home") {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  };

  render () {
    //e.g. destructuring this.state to clean things up:
    // const {isSignedIn, route, imageUrl, box, boxFaces} = this.state;
    
    return (
      <div className="App">
        <Particles params={particlesOptions} className="particles" />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn}/>
        {
        this.state.route === "home" 
          ? 
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box} boxFaces={this.state.boxFaces}/>
          </div>
          : 
          ( //this () allows adding ternary inside ternary
            this.state.route === "SignIn" 
            ?
            <SignIn onRouteChange={this.onRouteChange}/>
            :
            <Register onRouteChange={this.onRouteChange}/>
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

//   onButtonSubmit = () => {
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
//         <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
//         <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
//       </div>
//     );
//   };
// };

// export default App;