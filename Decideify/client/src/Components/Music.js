import React, { useState } from "react";
import { getallmusic } from "../Managers/APIManager";

export default function Music() {

  const [musicSuggestions, setMusicSuggestions] = useState([]);

  const getmusic = () => {
    getallmusic().then((thismusic) => setMusicSuggestions(thismusic));
  }

  const printmusic = () => {
    console.log(musicSuggestions);
  }

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Music!</div>
      <section className="text-center">
      <button onClick={getmusic} className="btn btn-secondary">Test The Music API</button>
      <button onClick={printmusic} className="btn btn-secondary">Print Music Suggestion State</button>
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