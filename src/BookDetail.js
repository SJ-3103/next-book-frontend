import { Component } from "react";
import "./bookDetails.scss";
// import NavBar from "./components/Navbar";
// import axios from "axios";

export default class BookDetail extends Component {
  // state = {
  //   book_data: null,
  //   loading: true,
  // };
  // componentDidMount = async () => {
  //   console.log(this.props);
  //   await axios
  //     .get("/api/get/details", {
  //       params: {
  //         id: this.props.match.params.bookId,
  //         name: this.props.match.params.bookSection,
  //       },
  //     })
  //     .then(({ data }) => {
  //       this.setState({
  //         book_data: data.data,
  //         loading: false,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  render() {
    return "HELLO";
    // <div className="bookDetail">
    // <NavBar />
    //   <main className="main">
    //     <section className="bookCover">
    //       <img alt="Book Cover" src={this.state.book_data?.cover_url}></img>
    //       {!this.state.loading ? (
    //         <BookData book_data={this.state.book_data} />
    //       ) : (
    //           <></>
    //         )}
    //     </section>
    //     <section className="authorInfo">
    //       <div className="dummy_text">
    //         {("About" + " " + this.state.book_data?.author).toUpperCase()}
    //       </div>
    //       <div className="author_details">
    //         <img
    //           src="https://s.gr-assets.com/assets/nophoto/user/f_111x148-8060b12280b2aec7543bafb574ee8422.png"
    //           className="author-profile"
    //           alt="Imagination"
    //         />
    //         <p>{this.state.book_data?.author}</p>
    //       </div>
    //       <p>{this.state.book_data?.author_works}</p>
    //     </section>
    //   </main>
    // </div>
  }
}

// class BookData extends Component {
//   render() {
//     const {
//       title,
//       small_title,
//       author,
//       goodreads_rating,
//       total_ratings,
//       summary,
//     } = this.props.book_data;
//     return (
//       <div className="book-data">
//         {console.log(this.props)}
//         <h2>{title}</h2>
//         <p className="small_title">{"(" + small_title + ")"}</p>
//         <p className="author_name">by {author}</p>
//         <ul>
//           <li>{"Stars" + "  (" + goodreads_rating.$numberDecimal + "/5)"}</li>
//           <li>{"Ratings" + "  (" + total_ratings + ")"}</li>
//         </ul>
//         <p id="description">{summary}</p>
//       </div>
//     );
//   }
// }
