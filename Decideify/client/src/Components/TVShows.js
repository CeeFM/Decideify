import React, { useEffect, useState } from "react";
import { getalltv } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function TVShows() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [showSuggestions, setShowSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [suggestion, setSuggestion] = useState({
    ContentType: "TV Show",
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
    getCategoryByContentType("tv show").then((thesecategories) => setCategories(thesecategories));
  };

  const getshows = () => {
    getalltv().then((theseshows) => setShowSuggestions(theseshows));
  };

  let currentSuggestion;

  const printshows = () => {
    console.log(showSuggestions);
    const randomNumber = Math.floor(Math.random() * showSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(showSuggestions?.results[randomNumber]);
    currentSuggestion = showSuggestions?.results[randomNumber];
    console.log(currentSuggestion?.id.toString());
    console.log(typeof currentSuggestion?.id.toString());
  };

  const saveSuggestion = () => {
      suggestion.Title =  currentSuggestion?.name;
      suggestion.Creator = "n/a"
      suggestion.Details = currentSuggestion?.overview;
      suggestion.ImageLocation = `https://image.tmdb.org/t/p/w500${currentSuggestion?.poster_path}`;     
      suggestion.ReleaseDate = currentSuggestion?.first_air_date;
      suggestion.ExternalId = currentSuggestion?.id.toString();
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
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>TV Shows!</div>
      <section className="text-center">
      <button onClick={getshows} className="btn btn-secondary">Test The TV API</button>
      <button onClick={printshows} className="btn btn-secondary">Print Show Suggestion State</button>
      <button onClick={saveSuggestion}>Save Show</button>
      </section>
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest}>
        <FormGroup>
          <Label htmlFor="Category">TV Show Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange}>
            <option value="">⬇️ Select A Type of TV Show</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Button>Test TV Show Category</Button>
        </FormGroup>
      </Form>
    </>

  );
}