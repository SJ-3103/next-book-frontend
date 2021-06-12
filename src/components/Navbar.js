import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./navbar.scss"
import axios from "axios"

export default class Navbar extends Component {
  state = {
    isLoggedIn: false,
    username: null
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:5000/api/login", { withCredentials: true })
      .then((response) => {
        console.log(response.data)
        response.data.cookie
          ? this.setState({
              isLoggedIn: true,
              username: response.data.email_id
            })
          : this.setState({
              isLoggedIn: false
            })
      })
      .catch((errors) => console.log(errors))
  }

  handleLogout = async () => {
    await axios
      .get("http://localhost:5000/api/logout", { withCredentials: true })
      .then((data) => {
        console.log(data)
        this.setState({
          isLoggedIn: false
        })
      })
      .catch((errors) => console.log(errors))
  }

  render() {
    return (
      <header>
        <nav className="navbar">
          <ul id="menu-left">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/nextbook">Next Book</Link>
            </li>
          </ul>
          <ul id="menu-right">
            <li>
              <Link to="/register">Register</Link>
            </li>
            {!this.state.isLoggedIn ? (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            ) : (
              <>
                <li>{this.state.username}</li>
                <li onClick={this.handleLogout}>
                  <Link>Logout</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    )
  }
}
