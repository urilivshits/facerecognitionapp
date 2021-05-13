import React, {Component} from "react";
// import './Register.css';

class Register extends Component {
    constructor (props) {
        super (props);
        this.state = {
            name: "",
            email: "",
            password: "",
            nameEmpty: "",
            emailEmpty: "",
            passwordEmpty: ""
        }
    };

    //creating states to post data to server
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    };

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    };

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    };
    
    onSubmitRegistration = () => {
        if (this.state.name !== "" && this.state.email !== "" && this.state.password !== "") {
            // fetch("http://localhost:3000/register", {
            fetch("https://arcane-badlands-99768.herokuapp.com/register", {
                method: "post",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user);
                    this.props.onRouteChange("home");
                };
            })
        }
        this.state.name === "" && this.state.nameEmpty === "" ? this.setState({nameEmpty: " navigation-shake"}) : this.setState({nameEmpty: ""});
        this.state.email === "" && this.state.emailEmpty === "" ? this.setState({emailEmpty: " navigation-shake"}) : this.setState({emailEmpty: ""});
        this.state.password === "" && this.state.passwordEmpty === "" ? this.setState({passwordEmpty: " navigation-shake"}) : this.setState({passwordEmpty: ""});
    };

    render () {
        let className ="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100";
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input 
                                    onChange={this.onNameChange} 
                                    className={className + this.state.nameEmpty} 
                                    type="text"
                                    autoComplete="name" 
                                    name="name"  
                                    id="name"
                                    required
                                    // autoFocus
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email">Email</label>
                                <input 
                                    onChange={this.onEmailChange} 
                                    className={className + this.state.emailEmpty} 
                                    type="email" 
                                    name="email" 
                                    autoComplete="username" 
                                    id="email"
                                    required
                                />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                {/* <button 
                                    className="f6"
                                    id="toggle-password" 
                                    type="button" 
                                    aria-label="Show password as plain text. Warning: this will display your password on the screen.">
                                        Show password
                                </button> */}
                                <input 
                                    onChange={this.onPasswordChange} 
                                    className={className + this.state.passwordEmpty} 
                                    type="password" 
                                    name="password"  
                                    autoComplete="new-password"
                                    id="new-password"
                                    required
                                />
                            </div>
                            {/* <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                        </fieldset>
                        <div className="">
                            <input 
                                onClick={this.onSubmitRegistration}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register"
                            />
                        </div>
                    </div>
                </main>
            </article>
        )
    }
}

export default Register;