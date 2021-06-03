import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import Navbar from "./components/Navbar";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
      emailId: "",
      password: "",
      firstName: "",
      lastName: "",
      errors: {
        email: "",
        password: "",
        lastName: "",
        firstName: "",
      },
    };
  }

  handleFirstName = (event) => {
    this.setState({
      firstName: event.target.value,
    });
  };

  handleLastName = (event) => {
    this.setState({
      lastName: event.target.value,
    });
  };

  handleEmail = (event) => {
    this.setState({
      emailId: event.target.value,
    });
  };

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleErrors = (errors) => {
    // to extract errors in the state and apply forEach on it
    console.log(errors);
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/api/register", {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email_id: this.state.emailId,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data);
        // this.setState({
        //   redirect: "/",
        // });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div className="body-c">
        <Navbar />
        <div id="form-container">
          <h3>Register</h3>
          <form id="register-form" onSubmit={this.handleSubmit}>
            <input
              value={this.state.firstName}
              type="text"
              onChange={this.handleFirstName}
              placeholder="Enter First name"
              className="form-input"
            />
            <p id="errors">{this.state.errors.firstName}</p>

            <input
              value={this.state.lastName}
              type="text"
              onChange={this.handleLastName}
              placeholder="Enter Last name"
              className="form-input"
            />
            <p id="errors">{this.state.errors.lastName}</p>

            <input
              value={this.state.emailId}
              type="text"
              onChange={this.handleEmail}
              placeholder="Enter Email"
              className="form-input"
            />
            <p id="errors">{this.state.errors.email}</p>

            <input
              value={this.state.password}
              type="text"
              onChange={this.handlePassword}
              placeholder="Enter Password"
              className="form-input"
            />
            <p id="errors">{this.state.errors.password}</p>

            {/* for register button */}
            <button id="button" type="submit" onClick={this.handleSubmit}>
              Register
            </button>
          </form>

          <h4>
            Already have an account?<Link to="/login">Sign In here</Link>
          </h4>
        </div>
      </div>
    );
  }
}
