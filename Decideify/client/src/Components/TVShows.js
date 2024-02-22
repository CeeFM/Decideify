import React, { useState } from "react";
import { getalltv } from "../Managers/APIManager";

export default function TVShows() {
  const [showSuggestions, setShowSuggestions] = useState([]);

  const getshows = () => {
    getalltv().then((theseshows) => setShowSuggestions(theseshows));
  }

  const printshows = () => {
    console.log(showSuggestions);
  }

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>TV Shows!</div>
      <section className="text-center">
      <button onClick={getshows} className="btn btn-secondary">Test The TV API</button>
      <button onClick={printshows} className="btn btn-secondary">Print Show Suggestion State</button>
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