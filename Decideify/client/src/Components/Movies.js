import React, { useState } from "react";
import { getallmovies } from "../Managers/APIManager";

export default function Movies() {

  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState({
    ContentType: "Movie",
    Title: "",
    Details: "",
    Creator: "",
    ImageLocation: "",
    UserProfileId: decideifyUserObject.id,
    ReleaseDate: new Date(),
    CategoryId: 1,
    IsRecommended: false,
    ExternalLink: "n/a",
    ExternalId: "n/a"
  });


  const getmovies = () => {
    getallmovies().then((thesemovies) => setMovieSuggestions(thesemovies));
  }

  const printmovies = () => {
    console.log(movieSuggestions);
    const randomNumber = Math.floor(Math.random() * movieSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(movieSuggestions?.results[randomNumber])
  }

  const saveSuggestion = () => {
    // suggestion.Title =  thisSuggestion?.title;
    // suggestion.Creator = thisSuggestion?.author;
    // suggestion.Details = `description: ${thisSuggestion?.description}`;
    // suggestion.ImageLocation = thisSuggestion?.book_image;
    // console.log(suggestion)
    // addSuggestion(suggestion);
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