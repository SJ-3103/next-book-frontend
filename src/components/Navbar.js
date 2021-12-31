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
      .get("/api/login", { withCredentials: true })
      .then((response) => {
        console.log(response.data)

        if(response.data.cookie) {
          this.setState({
            isLoggedIn: true,
            username: response.data["email_id"]
          })
        }
        else{
          this.setState({
            isLoggedIn: false,
            username: null
          })
        }

      })
      .catch((errors) => console.log(errors))
  }

  handleLogout = async () => {
    await axios
      .get("/api/logout", { withCredentials: true })
      .then((data) => {
        console.log(data)
        this.setState({
          isLoggedIn: false,
          username: null
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
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/nextbook">Next Book</Link>
            </li>
          </ul>
          <p>The Book Recommender Website</p>
          <ul id="menu-right">
            <li>
              <Link to="/register">Register</Link>
            </li>
            {!this.state.isLoggedIn ? (
              <li>
                <Link to="/login">Sign In</Link>
              </li>
            ) : (
              <div>
                <li>{this.state.username}</li>
                <li onClick={this.handleLogout}>
                  <Link>Logout</Link>
                </li>
              </div> 
            )}
          </ul>
        </nav>
      </header>
    )
  }
}
