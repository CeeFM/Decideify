import React, { useState } from "react";
import { getallmusic } from "../Managers/APIManager";

export default function Music() {

  const [musicSuggestions, setMusicSuggestions] = useState([]);

  const getmusic = () => {
    getallmusic().then((thismusic) => setMusicSuggestions(thismusic));
  }

  const printmusic = () => {
    console.log(musicSuggestions);
    const randomNumber = Math.floor(Math.random() * musicSuggestions?.artists?.length);
    console.log(randomNumber);
    console.log(musicSuggestions?.artists[randomNumber]);
  }

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Music!</div>
      <section className="text-center">
      <button onClick={getmusic} className="btn btn-secondary">Test The Music API</button>
      <button onClick={printmusic} className="btn btn-secondary">Print Music Suggestion State</button>
      </section>
    </>

  );
}