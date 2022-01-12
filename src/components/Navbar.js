import React, { Component } from "react"
import { Redirect} from "react-router-dom"
import { Link } from "react-router-dom"
import "../styles/navbar.scss"
import axios from "axios"

export default class Navbar extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    redirect:null
  }

  componentDidMount = () => {
    axios
      .get("/api/login", { withCredentials: true })
      .then((response) => {
        if(response.data.cookie) {
          this.setState({
            isLoggedIn: true,
            username: response.data["email_id"],
            redirect: "/"
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
    if(this.state.redirect === '/'){
      <Redirect to={this.state.redirect} />
      return
    }
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
                  <Link to="/logout">Logout</Link>
                </li>
              </div> 
            )}
          </ul>
        </nav>
      </header>
    )
  }
}
