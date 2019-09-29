import React from 'react';
import './Footer.css';
import {constants, texts} from '../../strings';

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
    fetch(constants.endpoint + '/user',
      {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          user_login: this.state.name,
          user_password: this.state.password,
        })
      }
    )
      .then(res => res.json())
      .then(res => {
      console.log(res);
      if(res.loginStatus === "ok"){
        this.props.adminConsoleOpen();
      }
    })
    // if(this.state.name === "" && this.state.password === ""){
    //   this.props.adminConsoleOpen();
    // }
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