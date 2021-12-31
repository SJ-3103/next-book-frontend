import React, { Component } from "react"
import { Redirect, Link } from "react-router-dom"
import "./register.scss"
import axios from "axios"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: null,
      email: '',
      password: '',
      email_error: '',
      password_error: ''
    }
  }

  handleInputChange = (event) => {
    const value = event.target.value
    const name = event.target.name
    this.setState({
      [name]: value
    })
  }

  handleErrors = async()=>{
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
      console.log("Email ok")
      this.setState({
        email_error: 'No error'
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
      console.log("Password ok")
      this.setState({
        password_error: 'No error'
      })
    }
  }


  loginUser = () =>{
    axios
        .post(
          "/api/login",
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

  handleSubmit = async (event) => {
    event.preventDefault()

    await this.handleErrors()
    if(this.state.email_error === "No error" && this.state.password_error === "No error") {
      console.log("Format is ok")
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
            <form id="register-form" onSubmit={this.handleSubmit}>
        
              <h2>Login</h2>
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
              {this.state.password_error !== "No error" ? <p id="errors">{this.state.email_error}</p> : <></>}

              {/* for register button */}
              <button id="button" type="submit" onClick={this.handleSubmit}>
                Login
              </button>
              <h4>
                Doesn't have an account? <Link to="/register">Sign up here</Link>
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
