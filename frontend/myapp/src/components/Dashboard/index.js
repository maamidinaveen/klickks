import { Component } from "react";

import { TailSpin } from "react-loader-spinner";

import Cookies from "js-cookie";

import "./index.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  loading: "LOADING",
};

class Dashboard extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    successMsg: "",
    errorMsg: "",
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.loading,
    });

    try {
      const token = Cookies.get("jwtToken");
      const apiUrl = `http://localhost:3000/dashboard/`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok === true) {
        this.setState({
          successMsg: data.message,
          apiStatus: apiStatusConstants.success,
        });
      } else {
        this.setState({
          apiStatus: apiStatusConstants.failure,
          errorMsg: data.message,
        });
      }
    } catch (e) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
        errorMsg: "Network error. Please try again",
      });
    }
  };

  renderLoadingView = () => (
    <div className="loading-container">
      <TailSpin height={50} width={50} color="#1b8765" />
    </div>
  );

  onLogout = () => {
    const { history } = this.props;
    Cookies.remove("jwtToken");
    history.replace("/login");
  };

  renderSuccessview = () => {
    const { successMsg } = this.state;

    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <img
            src="https://res.cloudinary.com/learning-platform/image/fetch/dpr_auto,w_auto,f_auto,q_auto/https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FD560BAQEJlvQTqc_SfA%2Fcompany-logo_200_200%2FB56ZYFo15kGUAI-%2F0%2F1743851315244%3Fe%3D1759968000%26v%3Dbeta%26t%3Dr6Tm5VDEvZ3bRuhHrT7vJtGFHFk9wjFADZ-wPVUkU-s"
            alt="logo"
            className="web-image"
          />
          <h1 className="dashboard-title">Dashboard</h1>
          <button className="logout-btn" onClick={this.onLogout}>
            Logout
          </button>
        </div>

        <div className="dashboard-content">
          <h2>Welcome to Dashboard 🎉</h2>
          <p className="text">{successMsg}</p>
        </div>
      </div>
    );
  };

  renderFailureView = () => {
    const { errorMsg } = this.state;

    return (
      <div className="failure-container">
        <img
          src="https://img.freepik.com/premium-vector/access-denied-alert-vector-illustration-design_624938-543.jpg"
          alt="failure"
          className="failure-image"
        />
        <p className="failure-text">{errorMsg}</p>
      </div>
    );
  };

  renderViews = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return this.renderLoadingView();

      case apiStatusConstants.success:
        return this.renderSuccessview();

      case apiStatusConstants.failure:
        return this.renderFailureView();

      default:
        return null;
    }
  };

  render() {
    return this.renderViews();
  }
}

export default Dashboard;
