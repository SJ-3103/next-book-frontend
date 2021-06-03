import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import "./register.scss"
import axios from "axios"
import Navbar from "./components/Navbar"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      email: "",
      password: "",
      errors: {
        email: "",
        password: ""
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
        "http://localhost:5000/api/login",
        {
          email_id: this.state.email,
          password: this.state.password
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="body-c">
        <Navbar />
        <div id="form-container">
          <h3>Login</h3>
          <form id="register-form" onSubmit={this.handleSubmit}>
            <input
              name="email"
              value={this.state.email}
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
              Login
            </button>
          </form>

          <h4>
            Doesn't have an account? <Link to="/register">Sign up here</Link>
          </h4>
        </div>
      </div>
    )
  }
}
