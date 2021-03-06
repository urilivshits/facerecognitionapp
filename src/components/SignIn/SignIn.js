//Please note: the code below contains commented out notes and samples that I left here explicitely for the learning purposes, so that I could use it as reference later on. Thank you for checking it out! 

//!SignIn component after adding states
import React, {Component} from "react";

class SignIn extends Component {
    constructor (props) {
        super (props);
        this.state = {
            signInEmail: "",
            signInPassword: ""
        };
    };

    //creating states to post data to server
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    };
    
    onSubmitSignIn = () => {
        // fetch("http://localhost:3000/signin", {
        fetch("https://arcane-badlands-99768.herokuapp.com/signin", {
            method: "post",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        //better way
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange("home");
                localStorage.setItem("user", JSON.stringify(user)); //need to stringify to pass an object
            }
        //initial way
        // .then(data => {
        //     if (data === "success") {
        //         this.props.onRouteChange("home");
        //     }
        })
    };

    componentDidMount () {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser); //need to parse to return an object
            this.props.loadUser(foundUser);
            this.props.onRouteChange("home");
            // console.log(foundUser);
            // console.log(localStorage);
        }
    };

    render () {
        const {onRouteChange} = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_in" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input 
                                    onChange={this.onEmailChange} 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email"  
                                    id="email"
                                    autoComplete="username"
                                    required
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input 
                                    onChange={this.onPasswordChange} 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password"  
                                    autoComplete="current-password"
                                    id="current-password"
                                    required
                                />
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"
                            />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
                            {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default SignIn;

// //! SignIn component before adding states
// import React from "react";

// const SignIn = ({onRouteChange}) => {
//     return (
//         <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
//             <main className="pa4 black-80">
//                 <div className="measure">
//                     <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
//                         <legend className="f1 fw6 ph0 mh0">Sign In</legend>
//                         <div className="mt3">
//                             <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
//                             <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
//                         </div>
//                         <div className="mv3">
//                             <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
//                             <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
//                         </div>
//                         {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
//                     </fieldset>
//                     <div className="">
//                         <input 
//                             onClick={() => onRouteChange("home")}
//                             className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
//                             type="submit" 
//                             value="Sign in"
//                         />
//                     </div>
//                     <div className="lh-copy mt3">
//                         <p onClick={() => onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
//                         {/* <a href="#0" className="f6 link dim black db">Forgot your password?</a> */}
//                     </div>
//                 </div>
//             </main>
//         </article>
//     )
// }

// export default SignIn;