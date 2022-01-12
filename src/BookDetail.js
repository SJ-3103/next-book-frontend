import React, { useState, useEffect } from "react"
import "./styles/bookDetails.scss"
import NavBar from "./components/Navbar"
import axios from "axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import Footer from "./components/Footer"

function BookDetail(props) {
  const bookId = props.match.params.bookId
  const [loading, setLoading] = useState(true)
  const [stateBookId] = useState(bookId)
  const [data, setData] = useState({})
  let [arr, setArr] = useState([])

  useEffect(()=>{
    async function fetchData() {
      await axios
        .get("/api/detail", {
          params: {
            book_id: bookId
          }
        })
        .then(({ data }) => {
          let newarr = []
          for (let i = 1; i <= data["average_rating"].toFixed(); i++) {
            newarr.push(<FontAwesomeIcon key={i} icon={faStar} color="orange" />)
          }
          setArr(newarr)
          setData(data)
          setLoading(false)
        })
        .catch((err) => {
          console.error(err)
        })
    }
    fetchData()
  }, [stateBookId])

  return (
    <div>
      <NavBar />
      {!loading ? (
        <div className="book-detail" style={{height:"70vh"}}>
          <h2>Book Title : {data["title"]}</h2>
          <p>Authors : {data["authors"]}</p>
          <p>Number of pages : {data["num_pages"]}</p>
          <p>Publication Date : {data["publication_date"]}</p>
          <p>Publisher : {data["publisher"]}</p>
          <p>Ratings : {arr}</p>
          <p>Language Code : {data["language_code"]}</p>
          <p>Total Ratings : {data["ratings_count"]}</p>
        </div>
      ) : (
        <div>Loading....</div>
      )}
      <Footer/>
    </div>
  )
}

export default BookDetail
