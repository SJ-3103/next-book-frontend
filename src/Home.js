import React from "react"
import "./home.scss"

import Navbar from "./components/Navbar"
import BookList from "./components/BookList"

function Home() {
  return (
    <div className="body">
      <Navbar />

      <BookList title="Most Rated Books" name="MostRated" />
      <BookList title="Best Selling Books" name="BestSelling" />
      <BookList title="New Arrivals" name="NewBooks" />

      <footer>Created By Shubham Jain</footer>
    </div>
  )
}
export default Home
