import React, { useState } from "react";
import { discogsTest, getallmusic } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";

export default function Music() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [musicSuggestions, setMusicSuggestions] = useState([]);
  const [cover, setCover] = useState();
  const [suggestion, setSuggestion] = useState({
    ContentType: "Music",
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

  const getmusic = () => {
    getallmusic().then((thismusic) => setMusicSuggestions(thismusic));
  }

  const getdiscogs = () => {
    discogsTest().then((discogsdata) => setMusicSuggestions(discogsdata));
  }


  let thisSuggestion;

  const printmusic = () => {
    console.log(musicSuggestions);
    // const randomNumber = Math.floor(Math.random() * musicSuggestions?.["release-groups"]?.length);
    // console.log(randomNumber);
    // console.log(musicSuggestions?.["release-groups"][parseInt(randomNumber)]);
    // thisSuggestion = musicSuggestions?.["release-groups"][parseInt(randomNumber)];
  }

  const saveSuggestion = () => {
    suggestion.Title =  thisSuggestion?.title;
    suggestion.Creator = thisSuggestion?.["artist-credit"][0]?.name;
    suggestion.Details = `${thisSuggestion?.["primary-type"]}`;
    suggestion.ImageLocation = "n/a";
    suggestion.ExternalId = thisSuggestion?.id;
    suggestion.ExternalLink = "n/a"
    console.log(suggestion)
    addSuggestion(suggestion);
  }

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Music!</div>
      <section className="text-center">
      <button onClick={getdiscogs} className="btn btn-secondary">Test The Music API</button>
      <button onClick={printmusic} className="btn btn-secondary">Print Music Suggestion State</button>
      <button onClick={saveSuggestion} className="btn btn-primary">Save Suggestion</button>
      </section>
    </>

  );
}