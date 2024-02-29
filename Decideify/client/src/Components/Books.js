import React, { useEffect, useState } from "react";
import { getallbooks } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";

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
  let randomList;
  let randomBook;

  const printbooks = () => {
    randomList = Math.floor(Math.random() * bookSuggestions?.results?.lists?.length);
    randomBook = Math.floor(Math.random() * bookSuggestions?.results?.lists[randomList]?.books?.length);
    const filterTest = bookSuggestions?.results?.lists.filter((NYTList) => NYTList?.display_name.includes("Children"));
    console.log(bookSuggestions);
    console.log(filterTest);
    console.log(categories);
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
  };

  const handleControlledInputChange = (e) => {

    const newSuggestion = { ...suggestion }

    newSuggestion[`${e.target.name}`] = e.target.value

    setSuggestion(newSuggestion);

    getCategoryById(newSuggestion?.CategoryId).then((thiscategory) => setUserCategory(thiscategory));
}

const submitTest = (e) => {
  e.preventDefault();
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
      <button onClick={getbooks} className="btn btn-secondary">Test The Book API</button>
      <button onClick={printbooks} className="btn btn-secondary">Print Books</button>
      <button onClick={saveSuggestion} className="btn btn-primary">Save Book</button>
      </section>
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest}>
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
    </>

  );
}