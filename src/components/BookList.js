import axios from "axios"

import React, { Component } from "react"
import { Link } from "react-router-dom"

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
      .get("http://localhost:5000/api/" + this.props.name)

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
                  book_section={this.props.name}
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

class BookBlock extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.title,
      author: this.props.author,
      average_rating: this.props.average_rating,
      class_name: this.props.class_name
    }
  }
  render() {
    return (
      <div className="book-block">
        <Link to={`/book/${this.props.id}/${this.props.title}`}>
          <div>
            <h3>Title : {this.state.title}</h3>
            <h4>Author : {this.state.author}</h4>
            <p>Stars :</p>
          </div>
        </Link>
      </div>
    )
  }
}
