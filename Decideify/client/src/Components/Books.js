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
    ExternalLink: "www.google.com",
    ExternalId: "69420"
  });

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  let thisSuggestion;

  const printbooks = () => {
    console.log(bookSuggestions);
    console.log(bookSuggestions?.results?.lists[2]?.books[3]);
    thisSuggestion = bookSuggestions?.results?.lists[2]?.books[3];
  };

  const saveSuggestion = () => {
    suggestion.Title =  bookSuggestions?.results?.lists[2]?.books[3]?.title;
    suggestion.Creator = bookSuggestions?.results?.lists[2]?.books[3]?.author;
    suggestion.Details = `description: ${bookSuggestions?.results?.lists[2]?.books[3]?.description}`;
    suggestion.ImageLocation = bookSuggestions?.results?.lists[2]?.books[3]?.book_image;
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