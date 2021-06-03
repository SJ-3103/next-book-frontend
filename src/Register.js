import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import "./register.scss"
import axios from "axios"
import Navbar from "./components/Navbar"

export default class Register extends Component {
  constructor(props) {
    super(props)
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
        firstName: ""
      }
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value
    })
  }

  handleErrors = (errors) => {
    // to extract errors in the state and apply forEach on it
    console.log(errors)
  }

  handleSubmit = async (event) => {
    event.preventDefault()

    axios
      .post(
        "http://localhost:5000/api/register",
        {
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email_id: this.state.emailId,
          password: this.state.password
        },
        { withCredentials: true }
      )
      .then((response) => {
        // console.log(response.data);
        console.log(response)
        this.setState({
          redirect: "/"
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    if (this.state.redirect) {
      console.log(this.state.redirect)
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="body-c">
        <Navbar />
        <div id="form-container">
          <h3>Register</h3>
          <form id="register-form" onSubmit={this.handleSubmit}>
            <input
              name="firstName"
              value={this.state.firstName}
              type="text"
              onChange={this.handleInputChange}
              placeholder="Enter First name"
              className="form-input"
            />
            <p id="errors">{this.state.errors.firstName}</p>

            <input
              name="lastName"
              value={this.state.lastName}
              type="text"
              onChange={this.handleInputChange}
              placeholder="Enter Last name"
              className="form-input"
            />
            <p id="errors">{this.state.errors.lastName}</p>

            <input
              name="emailId"
              value={this.state.emailId}
              type="text"
              onChange={this.handleInputChange}
              placeholder="Enter Email"
              className="form-input"
            />
            <p id="errors">{this.state.errors.email}</p>

            <input
              name="password"
              value={this.state.password}
              type="text"
              onChange={this.handleInputChange}
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
    )
  }
}
