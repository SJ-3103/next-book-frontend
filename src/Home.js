import React from "react"
import "./styles/home.scss"

import Navbar from "./components/Navbar"
import BookList from "./components/BookList"
import Footer from "./components/Footer"

function Home() {
  return (
    <div className="body">
      <Navbar />
      <BookList title="Most Rated Books" name="MostRated" />
      <BookList title="Best Selling Books" name="BestSelling" />
      <BookList title="New Arrivals" name="NewBooks" />
      <Footer />
    </div>
  )
}
export default Home
