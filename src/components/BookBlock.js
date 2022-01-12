import React from "react"
import { Link } from "react-router-dom"
import "../styles/bookblock.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"

function BookBlock(props) {
  const id = props.id
  const title = props.title
  const author = props.author
  const average_rating = props.average_rating.toFixed()
  let arr = []

  for (let i = 1; i <= average_rating; i++) {
    arr.push(<FontAwesomeIcon key={i} icon={faStar} color="orange" />)
  }
  return (
    <div className="book-block">
      <Link to={`/book/${id}/${title}`}>
        <div>
          <h3>Title : {title}</h3>
          <h4>Author : {author}</h4>
          <p>Stars : {arr}</p>
        </div>
      </Link>
    </div>
  )
}

export default BookBlock
