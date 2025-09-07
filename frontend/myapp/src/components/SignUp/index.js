import { Component } from "react";

import "./index.css";

class SignUP extends Component {
  state = {
    email: "",
    password: "",
    showError: false,
    errorMsg: "",
    successMsg: "",
  };

  onEnterEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  onEnterPassword = (event) => this.setState({ password: event.target.value });

  onSubmitSignUpForm = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.setState({
      showError: false,
      errorMsg: "",
      successMsg: "",
    });

    try {
      const userDetails = { email, password };
      const apiUrl = `http://localhost:3000/signup/`;
      const response = await fetch(apiUrl, {
        method: "POST",
        body: JSON.stringify(userDetails),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok === true) {
        this.setState({
          email: "",
          password: "",
          errorMsg: "",
          showError: false,
          successMsg: data.message,
        });
      } else {
        this.setState({
          showError: true,
          errorMsg: data.message,
        });
      }
    } catch (e) {
      this.setState({
        showError: true,
        errorMsg: "Network Error. Please try again later.",
      });
    }
  };

  onClickLogin = () => {
    const { history } = this.props;
    history.replace("/login");
  };

  render() {
    const { email, password, showError, errorMsg, successMsg } = this.state;
    return (
      <div className="login-form-container">
        <h1 className="signup-title">SignUp</h1>
        <div className="view-container">
          <form className="form-container" onSubmit={this.onSubmitSignUpForm}>
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
                onChange={this.onEnterEmail}
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
                onChange={this.onEnterPassword}
              />
            </div>
            <button type="submit" className="signup-button">
              submit
            </button>
            {showError && <p className="error-message">{errorMsg}</p>}
            {successMsg && (
              <>
                <p className="success-message">{successMsg}</p>
                <button
                  type="button"
                  className="login-button"
                  onClick={this.onClickLogin}
                >
                  Login
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default SignUP;
