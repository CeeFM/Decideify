import React, { useState } from "react";
import { getallmovies } from "../Managers/APIManager";

export default function Movies() {

  const [movieSuggestions, setMovieSuggestions] = useState([]);

  const getmovies = () => {
    getallmovies().then((thesemovies) => setMovieSuggestions(thesemovies));
  }

  const printmovies = () => {
    console.log(movieSuggestions);
    const randomNumber = Math.floor(Math.random() * movieSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(movieSuggestions?.results[randomNumber])
  }

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Movies!</div>
      <section className="text-center">
      <button onClick={getmovies} className="btn btn-secondary">Test The Movie API</button>
      <button onClick={printmovies} className="btn btn-secondary">Print Show Suggestion State</button>
      </section>
    </>

  );
}