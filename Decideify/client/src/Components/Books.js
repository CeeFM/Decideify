import React, { useState } from "react";
import { getallbooks } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";

export default function Books() {
  
  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [bookSuggestions, setBookSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState({
    ContentType: "Book",
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

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  let thisSuggestion;
  let randomList;
  let randomBook;

  const printbooks = () => {
    randomList = Math.floor(Math.random() * bookSuggestions?.results?.lists?.length);
    randomBook = Math.floor(Math.random() * bookSuggestions?.results?.lists[randomList]?.books?.length);
    console.log(randomList);
    console.log(randomBook);
    console.log(bookSuggestions);
    console.log(bookSuggestions?.results?.lists[randomList]?.books[randomBook]);
    thisSuggestion = bookSuggestions?.results?.lists[randomList]?.books[randomBook];
  };

  const saveSuggestion = () => {
    suggestion.Title =  thisSuggestion?.title;
    suggestion.Creator = thisSuggestion?.author;
    suggestion.Details = ${thisSuggestion?.description};
    suggestion.ImageLocation = thisSuggestion?.book_image;
    console.log(suggestion)
    addSuggestion(suggestion);
  }


  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Books!</div>
      <section className="text-center">
      <button onClick={getbooks} className="btn btn-secondary">Test The Book API</button>
      <button onClick={printbooks} className="btn btn-secondary">Print Books</button>
      <button onClick={saveSuggestion}>Save Book</button>
      </section>
    </>

  );
}