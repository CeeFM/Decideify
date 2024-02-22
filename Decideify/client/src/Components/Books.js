import React, { useState } from "react";
import { getallbooks } from "../Managers/APIManager";

export default function Books() {

  const [bookSuggestions, setBookSuggestions] = useState([]);

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  const printbooks = () => {
    console.log(bookSuggestions);
  };

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Books!</div>
      <section className="text-center">
      <button onClick={getbooks} className="btn btn-secondary">Test The Book API</button>
      <button onClick={printbooks} className="btn btn-secondary">Print Show Suggestion State</button>
      </section>
      {/* <div className="text-center" style={{paddingTop: "1vh", fontSize: "2rem"}}>Pick a Content Hub To Get Started</div>
      <div className="flex-container" style={{display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "1vh", fontSize: "3rem"}}>
          <div style={{margin: ".5rem", color: "#ff00bb"}}>Movies</div>
          <div style={{margin: ".5rem", color: "#4cf7e6"}}>TV Shows</div>
          <div style={{margin: ".5rem", color: "#ff00bb"}}>Music</div>
          <div style={{margin: ".5rem", color: "#4cf7e6"}}>Books</div>
      </div> */}
    </>

  );
}