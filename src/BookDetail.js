import React, { useState, useEffect } from "react"
import "./bookDetails.scss"
import NavBar from "./components/Navbar"
import axios from "axios"

function BookDetail(props) {
  const bookId = props.match.params.bookId
  const [loading, setLoading] = useState(true)
  const [stateBookId] = useState(bookId)
  const [data, setData] = useState({})
  useEffect(async () => {
    await axios
      .get("http://localhost:5000/api/detail", {
        params: {
          book_id: bookId
        }
      })
      .then((response) => {
        setData(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [stateBookId])

  return (
    <div>
      <NavBar />
      {!loading ? (
        <div className="book-detail">
          <h2>Title : {data["title"]}</h2>
          <p>Authors : {data["authors"]}</p>
          <p>Number of pages : {data["num_pages"]}</p>
          <p>Publication Date : {data["publication_date"]}</p>
          <p>Publisher : {data["publisher"]}</p>
          <p>Ratings : {data["average_rating"]}/5</p>
          <p>Language Code : {data["language_code"]}</p>
          <p>Total Ratings : {data["ratings_count"]}</p>
        </div>
      ) : (
        <div>Loading....</div>
      )}
    </div>
  )
}

export default BookDetail
