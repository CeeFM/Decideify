import React, { useEffect, useState } from "react";
import { getallmovies } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function Movies() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [suggestion, setSuggestion] = useState({
    ContentType: "Movie",
    Title: "",
    Details: "",
    Creator: "",
    ImageLocation: "",
    UserProfileId: decideifyUserObject.id,
    ReleaseDate: new Date(),
    CategoryId: 1,
    IsRecommended: null,
    ExternalLink: "n/a",
    ExternalId: "n/a"
  });

  const getCategories = () => {
    getCategoryByContentType("movie").then((thesecategories) => setCategories(thesecategories));
  };

  const getmovies = () => {
    getallmovies().then((thesemovies) => setMovieSuggestions(thesemovies));
  };

  let thisSuggestion;

  const printmovies = () => {
    console.log(movieSuggestions);
    const randomNumber = Math.floor(Math.random() * movieSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(movieSuggestions?.results[randomNumber])
    thisSuggestion = movieSuggestions?.results[randomNumber];
  }

  const saveSuggestion = () => {
    suggestion.Title =  thisSuggestion?.title;
    suggestion.Creator = "n/a";
    suggestion.Details = thisSuggestion?.overview;
    suggestion.ImageLocation = `https://image.tmdb.org/t/p/w500${thisSuggestion?.poster_path}`;
    suggestion.ReleaseDate = thisSuggestion?.release_date;
    suggestion.ExternalId = thisSuggestion?.id.toString();
    console.log(suggestion)
    addSuggestion(suggestion);
  };

  const handleControlledInputChange = (e) => {

    const newSuggestion = { ...suggestion }

    newSuggestion[`${e.target.name}`] = e.target.value

    setSuggestion(newSuggestion);

    getCategoryById(newSuggestion?.CategoryId).then((thiscategory) => setUserCategory(thiscategory));

};

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
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Movies!</div>
      <section className="text-center">
      <button onClick={getmovies} className="btn btn-secondary">Test The Movie API</button>
      <button onClick={printmovies} className="btn btn-secondary">Print Show Suggestion State</button>
      <button onClick={saveSuggestion}>Save Suggestion</button>
      </section>
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest}>
        <FormGroup>
          <Label htmlFor="Category">Movie Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange}>
            <option value="">⬇️ Select A Type of Movie</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Button>Test the Movie Category</Button>
        </FormGroup>
      </Form>
    </>

  );
}