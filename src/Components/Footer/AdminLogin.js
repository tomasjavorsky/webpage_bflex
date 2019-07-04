import React from 'react';
import './Footer.css';

class AdminLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: ""
    };
    this.loginPressed = this.loginPressed.bind(this);
  }

  loginPressed() {
    if(this.state.name === "name" && this.state.password === "password"){
      this.props.adminConsoleOpen();
    }
  }

  onNameChanged = (event) =>{
    this.setState({name: event.target.value});
  };

  onPasswordChanged = (event) =>{
    this.setState({password: event.target.value});
  };

  render() {
    return (
      <div>
        <div className={"adminLogin"}>
          <input
            className={"adminConsoleProductTags"}
            type="text"
            placeholder="Name"
            onChange={this.onNameChanged}
          />
          <input
            className={"adminConsoleProductTags"}
            type="text"
            placeholder="Password"
            onChange={this.onPasswordChanged}
          />
          <button className={"primaryButton"} type={"button"} onClick={this.loginPressed}>Login</button>
          <button className={"secondaryButton"} type={"button"} onClick={this.props.cancelPressed}>Cancel</button>
        </div>
      </div>
    )
  }
}

export default AdminLogin;