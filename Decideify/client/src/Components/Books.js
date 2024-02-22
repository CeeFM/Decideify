import React, { useState } from "react";
import { getallbooks } from "../Managers/APIManager";

export default function Books() {

  const [bookSuggestions, setBookSuggestions] = useState([]);

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  const printbooks = () => {
    console.log(bookSuggestions);
    console.log(bookSuggestions?.results?.lists[2]?.books[3]);
  };

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Books!</div>
      <section className="text-center">
      <button onClick={getbooks} className="btn btn-secondary">Test The Book API</button>
      <button onClick={printbooks} className="btn btn-secondary">Print Show Suggestion State</button>
      </section>
    </>

  );
}