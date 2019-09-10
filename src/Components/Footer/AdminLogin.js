import React from 'react';
import './Footer.css';
import {texts} from '../../strings';

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
    if(this.state.name === "" && this.state.password === ""){
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
            placeholder={texts.namePlaceholder}
            onChange={this.onNameChanged}
          />
          <input
            className={"adminConsoleProductTags"}
            type="password"
            placeholder={texts.passwordPlaceholder}
            onChange={this.onPasswordChanged}
          />
          <button className={"primaryButton"} type={"button"} onClick={this.loginPressed}>{texts.login}</button>
          <button className={"secondaryButton"} type={"button"} onClick={this.props.cancelPressed}>{texts.cancel}</button>
        </div>
      </div>
    )
  }
}

export default AdminLogin;