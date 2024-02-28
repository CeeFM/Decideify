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

  let start = new Date(2008, 5, 8)
  let end = new Date()

  const randomDate = () => {
    let randomYear = Math.floor(Math.random() * (2024 - 2008 + 1)) + 2008;
    let randomMonth = Math.floor(Math.random() * (12)) + 1;
    let randomDay = Math.floor(Math.random() * (28)) + 1;
    let newRandomDate = new Date(randomYear, randomMonth, randomDay);
    let allGood = false;
    while (allGood === false) {
      if (start < newRandomDate && end > newRandomDate) {
        allGood = true;
      } else {
        randomYear = Math.floor(Math.random() * (2024 - 2008 + 1)) + 2008;
        randomMonth = Math.floor(Math.random() * (12)) + 1;
        randomDay = Math.floor(Math.random() * (28)) + 1;
        newRandomDate = new Date(randomYear, randomMonth, randomDay);
      }
    };

    return newRandomDate.toISOString().split('T')[0];
  }

 const dateCreator = () => {
   const testRandomDate = randomDate();
   console.log(testRandomDate);
 };

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  let thisSuggestion;
  let randomList;
  let randomBook;

  const printbooks = () => {
    randomList = Math.floor(Math.random() * bookSuggestions?.results?.lists?.length);
    randomBook = Math.floor(Math.random() * bookSuggestions?.results?.lists[randomList]?.books?.length);
    const filterTest = bookSuggestions?.results?.lists.filter((NYTList) => NYTList?.display_name.includes("Combined Print & E-Book Fiction"));
    const dateTest = randomDate(start, end);
    console.log(dateTest);
    console.log(filterTest);
    console.log(bookSuggestions?.results?.lists[randomList]?.books[randomBook]);
    thisSuggestion = bookSuggestions?.results?.lists[randomList]?.books[randomBook];
  };

  const saveSuggestion = () => {
    suggestion.Title =  thisSuggestion?.title;
    suggestion.Creator = thisSuggestion?.author;
    suggestion.Details = thisSuggestion?.description;
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
      <button onClick={dateCreator}>Date Checker</button>
      </section>
    </>

  );
}