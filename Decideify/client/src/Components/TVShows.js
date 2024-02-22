import React, { useState } from "react";
import { getalltv } from "../Managers/APIManager";

export default function TVShows() {
  const [showSuggestions, setShowSuggestions] = useState([]);

  const getshows = () => {
    getalltv().then((theseshows) => setShowSuggestions(theseshows));
  }

  const printshows = () => {
    console.log(showSuggestions);
    const randomNumber = Math.floor(Math.random() * showSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(showSuggestions?.results[randomNumber]);
  }

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>TV Shows!</div>
      <section className="text-center">
      <button onClick={getshows} className="btn btn-secondary">Test The TV API</button>
      <button onClick={printshows} className="btn btn-secondary">Print Show Suggestion State</button>
      </section>
    </>

  );
}