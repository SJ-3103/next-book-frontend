import React, { Component } from "react"
import Footer from "./components/Footer"
import NavBar from "./components/Navbar"

class About extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div style={{height:'75vh'}}>
          <h1>This is about page.</h1>
        </div>
        <Footer/>
      </div>
    )
  }
}
export default About
