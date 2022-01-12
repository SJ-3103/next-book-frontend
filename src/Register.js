import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import "./styles/register.scss"
import axios from "axios"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      email_error: "",
      password_error: "",
      lastName_error: "",
      firstName_error: ""
      
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value
    })
  }

  handleErrors = async() => {
    // check first name
    if(this.state.firstName === "") {
      this.setState({
        firstName_error: "First name can't be empty"
      })
    }
    else if(this.state.firstName<=4) {
      this.setState({
        firstName_error: "First name must have atleast 5 letters."
      })
    }
    else{
      this.setState({
        firstName_error: "No error"
      })
    }

    // check last name
    if(this.state.lastName === '') {
      this.setState({
        lastName_error: "Last name can't be empty"
      })
    }
    else if(this.state.lastName<=4) {
      this.setState({
        lastName_error: "Last name must have atleast 5 letters."
      })
    }
    else{
      this.setState({
        lastName_error: "No error"
      })
    }

    // check email
    if(this.state.email === '') {
      this.setState({
        email_error: "Email can't be empty"
      })
    }
    else if(!new RegExp( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(this.state.email)) {
      this.setState({
        email_error: "Enter a valid email."
      })
    }
    else{
      this.setState({
        email_error: "No error"
      })
    }

    // check password
    if(this.state.password === '') {
      this.setState({
        password_error: "Password can't be empty"
      })
    }
    else if(!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(this.state.password)) {
      this.setState({
        password_error: "Enter a valid password."
      })
    }
    else{
      this.setState({
        password_error: "No error"
      })
    }
  }

  register = async()=> {
    axios
      .post(
        "/api/register",{
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email_id: this.state.email,
          password: this.state.password
        },{ withCredentials: true }
      )
      .then((response) => {
        // console.log(response.data);
        console.log(response)
        // this.setState({
        //   redirect: "/"
        // })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    await this.handleErrors()
    
    if(this.state.firstName_error === "No error" && this.state.lastName_error === "No error" && this.state.email_error === "No error" && this.state.password_error === "No error") {
      console.log("Format ok")
      await this.register()
    }
    
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div>
        <Navbar />
        <div className="body-c">

          <div id="form-container">

            <form onSubmit={this.handleSubmit}>
              <h2>Register</h2>
              
              <h3>First Name</h3>
              <input
                name="firstName"
                value={this.state.firstName}
                type="text"
                onChange={this.handleInputChange}
                placeholder="Enter First name"
                className="form-input"
              />
              {this.state.firstName_error !== "No error" ? <p id="errors">{this.state.firstName_error}</p> : <></>}

              <h3>Last Name</h3>
              <input
                name="lastName"
                value={this.state.lastName}
                type="text"
                onChange={this.handleInputChange}
                placeholder="Enter Last name"
                className="form-input"
              />
              {this.state.lastName_error !== "No error" ? <p id="errors">{this.state.lastName_error}</p> : <></>}

              <h3>Email</h3>
              <input
                name="email"
                value={this.state.email}
                type="text"
                onChange={this.handleInputChange}
                placeholder="Enter Email"
                className="form-input"
              />
              {this.state.email_error !== "No error" ? <p id="errors">{this.state.email_error}</p> : <></>}

              <h3>Password</h3>
              <input
                name="password"
                value={this.state.password}
                type="text"
                onChange={this.handleInputChange}
                placeholder="Enter Password"
                className="form-input"
              />
              {this.state.password_error !== "No error" ? <p id="errors">{this.state.password_error}</p> : <></>}

              {/* for register button */}
              <button id="button" type="submit" onClick={this.handleSubmit}>
                Register
              </button>
              <h4>
                Already have an account?{" "}<Link to="/login">Sign In here</Link>
              </h4>
            </form>

          </div>
          
          <div id="side-image"></div>

        </div>
        <Footer/>
      </div>
    )
  }
}
