import React, { useEffect, useState } from "react";
import { getallmovies } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import movieLoading from "../Images/moviesuggestion2.jpg"

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
    CategoryId: 0,
    IsRecommended: null,
    ExternalLink: "n/a",
    ExternalId: "n/a"
  });

  const getCategories = () => {
    getCategoryByContentType("movie").then((thesecategories) => setCategories(thesecategories));
  };

  const getmovies = () => {
    getallmovies(userCategory).then((thesemovies) => setMovieSuggestions(thesemovies));
  };

  let thisSuggestion;
  let movieForm = document.getElementById("movie-form");
  let movieRender = document.getElementById("movie-render");
  let movieDetails = document.getElementById("movie-details");
  let movieShow = document.getElementById("movie-show");
  let movieSave = document.getElementById("movie-save");

  const printmovies = () => {
    console.log(movieSuggestions);
    const randomNumber = Math.floor(Math.random() * movieSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(movieSuggestions?.results[randomNumber])
    thisSuggestion = movieSuggestions?.results[randomNumber];
    movieDetails.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${thisSuggestion?.poster_path}" style={{width: "18.5vw", marginBottom: "6.5rem", borderRadius: "5rem"}} alt="Book cover for ${thisSuggestion?.title}"/>
    <br />
    <p>Title: <strong>${thisSuggestion?.title}</strong></p>
    <br />
    <p>Description: ${thisSuggestion?.overview}</p>
    <br />
    <p>Released: ${thisSuggestion?.release_date}`;
    movieShow.style.display = "none";
    movieSave.style.display = "block";
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
  if (suggestion?.CategoryId === 0) {
    window.alert("Sorry, you need to choose a genre to continue!");
    return
  } else {
    getmovies();
    movieForm.style.display = "none";
    movieRender.style.display = "block";
  };
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
      <div id="movie-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest} id="movie-form">
        <FormGroup>
          <Label htmlFor="Category">Movie Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange}>
            <option value="0">⬇️ Select A Type of Movie</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Button>Test the Movie Category</Button>
        </FormGroup>
      </Form>
      <div className="text-center" id="movie-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="movie-details">
      <img src={movieLoading} style={{width: "18.5vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="Inside of a big movie theather, covered in gold and encrusted with diamonds, and on the big screen it says NOW SHOWING: YOUR NEW FAVORITE MOVIE"/>
      </section>
      <br />
      <section id="movie-show">
      <button onClick={printmovies} className="btn btn-secondary">Show Me My Movie Suggestion!</button>
      </section>
      <section id="movie-save" style={{display: "none"}}>
      <button onClick={saveSuggestion} className="btn btn-primary">Save Movie</button>
      <button onClick={printmovies} className="btn btn-secondary">Show Me Another Movie Suggestion!</button>
      </section>
      </div>
      </div>
    </>

  );
}