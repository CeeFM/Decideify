import React, { useState } from "react";
import { getallmovies } from "../Managers/APIManager";

export default function Movies() {

  const [movieSuggestions, setMovieSuggestions] = useState([]);

  const getmovies = () => {
    getallmovies().then((thesemovies) => setMovieSuggestions(thesemovies));
  }

  const printmovies = () => {
    console.log(movieSuggestions);
    console.log(movieSuggestions?.results[0])
  }

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Movies!</div>
      <section className="text-center">
      <button onClick={getmovies} className="btn btn-secondary">Test The Movie API</button>
      <button onClick={printmovies} className="btn btn-secondary">Print Show Suggestion State</button>
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