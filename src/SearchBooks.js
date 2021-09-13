import React, { useState } from "react"
import { Link } from "react-router-dom"

import axios from "axios"

import Navbar from "./components/Navbar"
import BookBlock from "./components/BookBlock"
import Footer from "./components/Footer"
import "./components/book.scss"

const SearchBooks = () => {
  const [value, setValue] = useState("")
  const [search_data, setSearchData] = useState([])

  const [search_book_id, setSearchBookId] = useState(0)
  const [search_book_name, setSearchBookName] = useState("")

  const [loading, setLoading] = useState(true)
  const [expected_data, setExpectedData] = useState({})
  const [error_msg, setErrorMsg] = useState("")

  async function my_func(value) {
    await axios
      .get("http://localhost:8000/api/nextbook", {
        params: {
          book_name: value
        }
      })
      .then(({ data }) => {
        // console.log(data)
        if (data["msg"] === "ok") {
          let keys = Object.keys(data["data"])
          let arr = []

          keys.forEach((element) => {
            arr.push(JSON.parse(data["data"][element]))
          })

          setErrorMsg(data["msg"])
          setSearchData(arr)
          setSearchBookName(data["search_book_name"])
          setSearchBookId(data["search_book_id"])
          setLoading(false)
        } else if (data["msg"] === "name error") {
          setErrorMsg(data["msg"])
          setExpectedData(data["expected"])
          setLoading(false)
        } else if (data["msg"] === "name null error") {
          setErrorMsg(data["msg"])
        }
      })
      .catch((err) => console.log(err))
  }

  function my_show_function() {
    if (error_msg === "ok") {
      if (!loading) {
        return (
          <div>
            <h2 id="title">
              Recommended Books for{" "}
              <Link to={`/book/${search_book_id}/${search_book_name}`}>
                {search_book_name}
              </Link>
            </h2>
            <div className="items">
              <NextBookBlock search_data={search_data} />
            </div>
          </div>
        )
      } else {
        return <div>Loading......</div>
      }
    } else if (error_msg === "name error") {
      return <ExpectedBookBlock expected_data={expected_data} />
    } else if (error_msg === "name null error") {
      return <div>Name cant be empty</div>
    } else {
      return <div>Search Your Next Book Above</div>
    }
  }

  return (
    <div className="book">
      <Navbar />
      <div className="search-bar">
        Search here :
        <input
          type="text"
          onChange={(event) => {
            event.preventDefault()
            setValue(event.target.value)
          }}
        />
        <button
          onClick={async (event) => {
            event.preventDefault()
            await my_func(value)
          }}
        >
          Enter
        </button>
      </div>

      {my_show_function()}

      <Footer />
    </div>
  )
}

const NextBookBlock = (props) => {
  const search_data = props.search_data
  return search_data.map((data) => {
    return (
      <BookBlock
        key={data.bookID}
        id={data.bookID}
        title={data.title}
        author={data.authors}
        average_rating={data.average_rating}
      />
    )
  })
}

const ExpectedBookBlock = (props) => {
  const data = props.expected_data
  return (
    <div className="expected-block">
      <h2>Error.....Search From Below Books</h2>
      {Object.keys(data).map((element) => {
        return (
          <h4 key={data[element].index}>
            {data[element].name}
            {console.log(data[element].name)}
          </h4>
        )
      })}
    </div>
  )
}

export default SearchBooks
