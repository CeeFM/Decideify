import React, { useEffect, useState } from "react";
import { getallbooks } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import bookLoading from "../Images/booksuggestion1.jpg"

export default function Books() {
  
  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [bookSuggestions, setBookSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [suggestion, setSuggestion] = useState({
    ContentType: "Book",
    Title: "",
    Details: "",
    Creator: "",
    ImageLocation: "",
    UserProfileId: decideifyUserObject.id,
    ReleaseDate: new Date(),
    CategoryId: "",
    IsRecommended: null,
    ExternalLink: "n/a",
    ExternalId: "n/a"
  });

  let book = "book";

  const getCategories = () => {
    getCategoryByContentType(book).then((thesecategories) => setCategories(thesecategories));
  };

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  let thisSuggestion;
  // let randomList;
  // let randomBook;
  let bookForm = document.getElementById("book-form");
  let bookRender = document.getElementById("book-render");
  let bookImage = document.getElementById("book-img");
  let bookShow = document.getElementById("book-show");
  let bookSave = document.getElementById("book-save");

  const printbooks = () => {
    // randomList = Math.floor(Math.random() * bookSuggestions?.results?.lists?.length);
    // randomBook = Math.floor(Math.random() * bookSuggestions?.results?.lists[randomList]?.books?.length);
    const filterTest = bookSuggestions?.results?.lists.filter((NYTList) => NYTList?.display_name.includes(userCategory?.name));
    let randomFilteredList = Math.floor(Math.random() * filterTest?.length);
    let randomFilteredBook = Math.floor(Math.random() * filterTest[randomFilteredList]?.books?.length);
    console.log(filterTest);
    console.log(filterTest[randomFilteredList]?.books[randomFilteredBook]);
    // console.log(bookSuggestions?.results?.lists[randomList]?.books[randomBook]);
    // thisSuggestion = bookSuggestions?.results?.lists[randomList]?.books[randomBook];
    thisSuggestion = filterTest[randomFilteredList]?.books[randomFilteredBook];
    bookImage.innerHTML = `<img src=${thisSuggestion?.book_image} style={{width: "18.5vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="Book cover for ${thisSuggestion?.title}"/>`;
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

const submitTest = (e) => {
  e.preventDefault();
  getbooks();
  bookForm.style.display = "none";
  bookRender.style.display = "block";
  console.log(suggestion);
  console.log(userCategory);
};


  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Books!</div>
      <section className="text-center">

      </section>
      <div id="book-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest} id="book-form">
        <FormGroup>
          <Label htmlFor="Category">Book Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange}>
            <option value="">⬇️ Select A Type of Book</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Button>Submit This Test</Button>
        </FormGroup>
      </Form>
      <div className="text-center" id="book-render" style={{display: "none"}}>
      <section id="book-img">
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
    </>

  );
}