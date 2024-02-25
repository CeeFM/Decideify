import React, { useState } from "react";
import { getalltv } from "../Managers/APIManager";

export default function TVShows() {
  const [showSuggestions, setShowSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState({
    ContentType: "TV Show",
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

  const getshows = () => {
    getalltv().then((theseshows) => setShowSuggestions(theseshows));
  };

  let currentSuggestion;

  const printshows = () => {
    console.log(showSuggestions);
    const randomNumber = Math.floor(Math.random() * showSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(showSuggestions?.results[randomNumber]);
    currentSuggestion = showSuggestions?.results[randomNumber];
  };

  const saveSuggestion = () => {
      // suggestion.Title =  thisSuggestion?.title;
      // suggestion.Creator = thisSuggestion?.author;
      // suggestion.Details = `description: ${thisSuggestion?.description}`;
      // suggestion.ImageLocation = thisSuggestion?.book_image;
      // console.log(suggestion)
      // addSuggestion(suggestion);
  };

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>TV Shows!</div>
      <section className="text-center">
      <button onClick={getshows} className="btn btn-secondary">Test The TV API</button>
      <button onClick={printshows} className="btn btn-secondary">Print Show Suggestion State</button>
      <button onClick={saveSuggestion}></button>
      </section>
    </>

  );
}