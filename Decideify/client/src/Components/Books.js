import React, { useEffect, useState } from "react";
import { getallbooks } from "../Managers/APIManager";
import { addSuggestion, getSuggestionsByUser } from "../Managers/SuggestionManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import bookLoading from "../Images/booksuggestion1.jpg"
import Suggestion from "./Suggestion";

export default function Books() {
  
  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [bookSuggestions, setBookSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [suggestion, setSuggestion] = useState({
    ContentType: "Book",
    Title: "",
    Details: "",
    Creator: "",
    ImageLocation: "",
    UserProfileId: decideifyUserObject.id,
    ReleaseDate: new Date(),
    CategoryId: 0,
    IsRecommended: null,
    ExternalLink: "n/a",
    ExternalId: "n/a"
  });

  let book = "book";

  const getCategories = () => {
    getCategoryByContentType(book).then((thesecategories) => setCategories(thesecategories));
  };

  const getUserSuggestions = () => {
    getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "Book");
        setFilteredSuggestions(filter);
      });
  };

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  let thisSuggestion;
  let bookForm = document.getElementById("book-form");
  let bookRender = document.getElementById("book-render");
  let bookDetails = document.getElementById("book-details");
  let bookShow = document.getElementById("book-show");
  let bookSave = document.getElementById("book-save");

  const printbooks = () => {

    if (userCategory?.name === "Random"){
      let randomList = Math.floor(Math.random() * bookSuggestions?.results?.lists?.length);
      let randomBook = Math.floor(Math.random() * bookSuggestions?.results?.lists[randomList]?.books?.length);
      thisSuggestion = bookSuggestions?.results?.lists[randomList]?.books[randomBook];
    } else if (userCategory?.name === "Other") {
      let filterTest = bookSuggestions?.results?.lists.filter((NYTList) => !NYTList?.display_name.includes("Fiction") && !NYTList?.display_name.includes("Nonfiction") && !NYTList?.display_name.includes("Children") && !NYTList?.display_name.includes("Advice"));
      let randomFilteredList = Math.floor(Math.random() * filterTest?.length);
      let randomFilteredBook = Math.floor(Math.random() * filterTest[randomFilteredList]?.books?.length);
      thisSuggestion = filterTest[randomFilteredList]?.books[randomFilteredBook];
    } else {
      let filterTest = bookSuggestions?.results?.lists.filter((NYTList) => NYTList?.display_name.includes(userCategory?.name));
      let randomFilteredList = Math.floor(Math.random() * filterTest?.length);
      let randomFilteredBook = Math.floor(Math.random() * filterTest[randomFilteredList]?.books?.length);
      thisSuggestion = filterTest[randomFilteredList]?.books[randomFilteredBook];
    }

    bookDetails.innerHTML = `<img src=${thisSuggestion?.book_image} style={{width: "18.5vw", marginBottom: "6.5rem", borderRadius: "5rem"}} alt="Book cover for ${thisSuggestion?.title}"/>
    <br />
    <p>Title: <strong>${thisSuggestion?.title}</strong></p>
    <br />
    <p> Written By: ${thisSuggestion?.author}</p>
    <br />
    <p>Description: ${thisSuggestion?.description}</p>`;
    bookShow.style.display = "none";
    bookSave.style.display = "block";
  };

  const saveSuggestion = () => {
    suggestion.Title =  thisSuggestion?.title;
    suggestion.Creator = thisSuggestion?.author;
    suggestion.Details = thisSuggestion?.description;
    suggestion.ImageLocation = thisSuggestion?.book_image;
    console.log(suggestion)
    addSuggestion(suggestion);
  };

  const handleControlledInputChange = (e) => {

    const newSuggestion = { ...suggestion }

    newSuggestion[`${e.target.name}`] = e.target.value

    setSuggestion(newSuggestion);

    getCategoryById(newSuggestion?.CategoryId).then((thiscategory) => setUserCategory(thiscategory));
}

const submitCategory = (e) => {
  e.preventDefault();
  if (suggestion?.CategoryId === 0) {
    window.alert("Sorry, you need to choose a genre to continue!");
    return
  } else {
  getbooks();
  bookForm.style.display = "none";
  bookRender.style.display = "block";
  }
};


  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getUserSuggestions();
  }, []);

  return (
    <>
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>Books!</div>
      <div id="book-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitCategory} id="book-form">
        <FormGroup>
          <Label htmlFor="Category">Book Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange}>
            <option value="0">⬇️ Select A Type of Book</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Button>DECIDEIFY A BOOK FOR ME</Button>
        </FormGroup>
      </Form>
      <div className="text-center" id="book-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="book-details">
      <img src={bookLoading} style={{width: "18.5vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="A big treasure chest, covered in gold and encrusted with diamonds, as well as gold and diamond encrusted books, and it says YOUR NEW FAVORITE BOOK"/>
      </section>
      <br />
      <section id="book-show">
      <button onClick={printbooks} className="btn btn-secondary">Show Me My Book Suggestion!</button>
      </section>
      <section id="book-save" style={{display: "none"}}>
      <button onClick={saveSuggestion} className="btn btn-primary">Save Book</button>
      <button onClick={printbooks} className="btn btn-secondary">Show Me Another Book Suggestion!</button>
      </section>
      </div>
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>My Books!</div>

<div id="my-books" className="container">
  <div className="row">
{filteredSuggestions.map((suggestion) => (
  <Suggestion key={suggestion.id} userSugg={suggestion} />
))}
    </div>
</div>
    </>

  );
}