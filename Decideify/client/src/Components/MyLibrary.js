import React, { useEffect, useState } from "react";
import { getSuggestionsByUser } from "../Managers/SuggestionManager";
import Suggestion from "./Suggestion";

export default function MyLibrary() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [userSuggestions, setUserSuggestions] = useState([]);
  const [musicSuggestions, setMusicSuggestions] = useState([]);
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [tvSuggestions, setTvSuggestions] = useState([]);
  const [bookSuggestions, setBookSuggestions] = useState([]);

  const getUserSuggestions = () => {
    getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let music = suggs.filter((s) => s.contentType === "Music");
        setMusicSuggestions(music);
        let movie = suggs.filter((s) => s.contentType === "Movie");
        setMovieSuggestions(movie);
        let book = suggs.filter((s) => s.contentType === "Book");
        setBookSuggestions(book);
        let tvshow = suggs.filter((s) => s.contentType === "TV Show");
        setTvSuggestions(tvshow);
      });
  };

  useEffect(() => {
    getUserSuggestions();
  }, []);

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>My Library!</div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>My Movies!</div>

<div id="my-movies" className="container">
  <div className="row">
{movieSuggestions.map((suggestion) => (
  <Suggestion key={suggestion.id} userSugg={suggestion} />
))}
    </div>
</div>
<div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>My TV Shows!</div>

<div id="my-tv" className="container">
        <div className="row">
      {tvSuggestions.map((suggestion) => (
        <Suggestion key={suggestion.id} userSugg={suggestion} />
      ))}
          </div>
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>My Music!</div>

      <div id="my-music" className="container">
        <div className="row">
      {musicSuggestions.map((suggestion) => (
        <Suggestion key={suggestion.id} userSugg={suggestion} />
      ))}
          </div>
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>My Books!</div>

      <div id="my-books" className="container">
  <div className="row">
{bookSuggestions.map((suggestion) => (
  <Suggestion key={suggestion.id} userSugg={suggestion} />
))}
    </div>
</div>
    </>

  );
}