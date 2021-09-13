import axios from "axios"

import React, { Component } from "react"
import BookBlock from "./BookBlock"

import "../components/book.scss"

export default class BookList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      arr: [],
      loading: true
    }
  }

  componentDidMount = async () => {
    await axios
      .get("http://localhost:8000/api/" + this.props.name)

      .then(({ data, keys, arr }) => {
        keys = Object.keys(data)
        arr = []

        keys.forEach((element) => {
          arr.push(JSON.parse(data[element]))
        })

        this.setState({
          arr: arr,
          loading: false
        })
      })

      .catch((err) => {
        console.log(err)
      })
  }

  render() {
    return (
      <div className="book">
        <h2 id="title">{this.props.title}</h2>
        <div className="items">
          {!this.state.loading ? (
            this.state.arr.map((data) => {
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
          ) : (
            <div>Loading....</div>
          )}
        </div>
      </div>
    )
  }
}
