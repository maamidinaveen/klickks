import { Component } from "react";

import { Redirect } from "react-router-dom";

import Cookies from "js-cookie";

import "./index.css";

class Login extends Component {
  state = {
    email: "",
    password: "",
    showError: false,
    errorMsg: "",
  };

  onChangeEmail = (event) => this.setState({ email: event.target.value });

  onChangePassword = (event) => this.setState({ password: event.target.value });

  onSubmitSuccess = (jwtToken) => {
    const { history } = this.props;
    Cookies.set("jwtToken", jwtToken, { expires: 10 });
    history.replace("/dashboard");
  };

  onSubmitFailure = (message) => {
    this.setState({
      showError: true,
      errorMsg: message,
    });
  };

  onSubmitLoginForm = async (event) => {
    event.preventDefault();

    try {
      const { email, password } = this.state;
      const userDetails = { email, password };
      const apiUrl = `http://localhost:3000/login/`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetails),
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok === true) {
        this.onSubmitSuccess(data.jwtToken);
      } else {
        this.onSubmitFailure(data.message);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { email, password, showError, errorMsg } = this.state;

    const token = Cookies.get("jwtToken");

    if (token !== undefined) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="login-form-container">
        <h1 className="form-title">Login</h1>
        <div className="view-container">
          <form className="form-container" onSubmit={this.onSubmitLoginForm}>
            <div className="input-container">
              <label className="input-label" htmlFor="email">
                EMAIL
              </label>
              <input
                type="text"
                id="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={this.onChangeEmail}
              />
            </div>
            <div className="input-container">
              <label className="input-label" htmlFor="password">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                className="input-field"
                onChange={this.onChangePassword}
              />
            </div>
            <button type="submit" className="submit-button">
              submit
            </button>
            {showError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
