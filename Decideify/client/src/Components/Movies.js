import React, { useEffect, useState } from "react";
import { getallmovies } from "../Managers/APIManager";
import { addSuggestion, getSuggestionsByUser } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import movieLoading from "../Images/moviesuggestion2.jpg"
import ContentCarousel from "./ContentCarousel";

export default function Movies() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);
  let thisSuggestion;
  let movieForm = document.getElementById("movie-form");
  let movieRender = document.getElementById("movie-render");
  let movieDetails = document.getElementById("movie-details");
  let movieShow = document.getElementById("movie-show");
  let movieSave = document.getElementById("movie-save");
  let myMovies = document.getElementById("my-movies");

  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [movieSuggestionTracker, setMovieSuggestionTracker] = useState([]);
  const [noMoreSuggestions, setNoMoreSuggestion] = useState(false);
  const [randomSuggestion, setRandomSuggestion] = useState();
  const [modal, setModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
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

  const [addEntry, setAddEntry] = useState({
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

  const getUserSuggestions = () => {
    getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "Movie");
        setFilteredSuggestions(filter);
      });
  };

  const getmovies = () => {
    getallmovies(userCategory).then((thesemovies) => setMovieSuggestions(thesemovies));
  };

  const printmovies = () => {
    let movieSuggestionNumbers = [...movieSuggestionTracker];
    let allGood = false;
    let randomNumber = Math.floor(Math.random() * movieSuggestions?.results?.length);
    while (allGood === false) {
      if (movieSuggestionNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * movieSuggestions?.results?.length);
      } else if (movieSuggestions?.results[randomNumber]?.poster_path === null) {
        const newMovieSuggestionNumbers = [...movieSuggestionNumbers, randomNumber];
        setMovieSuggestionTracker(newMovieSuggestionNumbers);
        randomNumber = Math.floor(Math.random() * movieSuggestions?.results?.length);
      } else if (movieSuggestionNumbers.length >= movieSuggestions?.results?.length - 1) {
        allGood = true;
        setNoMoreSuggestion(true);
      } else {
        allGood = true;
        const newMovieSuggestionNumbers = [...movieSuggestionNumbers, randomNumber];
        setMovieSuggestionTracker(newMovieSuggestionNumbers)
      }
    }
    thisSuggestion = movieSuggestions?.results[randomNumber];
    setRandomSuggestion(thisSuggestion);
    if (noMoreSuggestions) {
      movieDetails.innerHTML = `<h1 style="font-family: 'Bebas Neue';">No more suggestions for this search! Start Over to generate more!</h1>`
    } else {
    movieDetails.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${thisSuggestion?.poster_path}" style="height: 50vh; marginBottom: 6.5rem; borderRadius: 5rem;" alt="Movie poster for ${thisSuggestion?.title}"/>
    <br />
    <h1>${thisSuggestion?.title}</h1>`;
    };
    movieShow.style.display = "none";
    movieSave.style.display = "block";
  }

  const saveSuggestion = () => {
    suggestion.Title =  randomSuggestion?.title;
    suggestion.Creator = "n/a";
    suggestion.Details = randomSuggestion?.overview;
    suggestion.ImageLocation = `https://image.tmdb.org/t/p/w500${randomSuggestion?.poster_path}`;
    suggestion.ReleaseDate = randomSuggestion?.release_date;
    suggestion.ExternalId = randomSuggestion?.id.toString();
    console.log(suggestion)
    addSuggestion(suggestion)
      .then(() => {
         return getSuggestionsByUser(decideifyUserObject?.id)
        .then((suggs) => {
          setUserSuggestions(suggs);
          let filter = suggs.filter((s) => s.contentType === "Movie");
          setFilteredSuggestions(filter);
        })
      })
  };

  const handleControlledInputChange = (e) => {

    const newSuggestion = { ...suggestion }

    newSuggestion[`${e.target.name}`] = e.target.value

    setSuggestion(newSuggestion);

    getCategoryById(newSuggestion?.CategoryId).then((thiscategory) => setUserCategory(thiscategory));

};

const handleAddFormChange = (e) => {

  const newSuggestion = { ...addEntry }

  newSuggestion[`${e.target.name}`] = e.target.value

  setAddEntry(newSuggestion);
}

const addUserSuggestion = () => {
  addSuggestion(addEntry)
    .then(() => {
      getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "Movie");
        setFilteredSuggestions(filter);
      })
    })
}

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

  useEffect(() => {
    getUserSuggestions();
  }, []);

  let toggle = () => setModal(!modal);

  return (
    <>
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>Movies!</div>
      <div id="movie-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest} id="movie-form">
        <FormGroup className="text-center">
          <Label htmlFor="Category" style={{fontSize: "2rem"}}>Movie Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange} style={{fontSize: "1.5rem"}}>
            <option value="0">⬇️ Select A Type of Movie</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup className="text-center">
          <Button style={{fontSize: "1.25rem"}}>DECIDEIFY A MOVIE FOR ME</Button>
        </FormGroup>
      </Form>
      <div className="text-center" id="movie-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="movie-details">
      <img onClick={printmovies} className="pulsing-glow" src={movieLoading} style={{width: "30vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="Inside of a big movie theather, covered in gold and encrusted with diamonds, and on the big screen it says NOW SHOWING: YOUR NEW FAVORITE MOVIE"/>
      </section>
      <br />
      <section id="movie-show">
      {/* <button onClick={printmovies} className="btn btn-secondary">Show Me My Movie Suggestion!</button> */}
      </section>
      <section id="movie-save" style={{display: "none"}}>
      <button onClick={toggle} className="btn btn-warning">More Details</button>   <button onClick={saveSuggestion} className="btn btn-primary">Save Movie</button>
      <br />
      <br />
      <button onClick={printmovies} className="btn btn-secondary">Show Me Another Movie Suggestion!</button>
      </section>
      </div>
      </div>
      <div className="text-center" style={{paddingTop: "10vh", fontSize: "4rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Movies!</div>

      <div id="my-movies" className="container">
      {filteredSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.25rem"}}>No movie suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={filteredSuggestions} />
    }
      </div>

      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Add A Movie!</div>


      <Form className="text-center" style={{ width: "25vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}} id="add-movie-form" onSubmit={addUserSuggestion}>
  <fieldset>
        <FormGroup>
          <Label htmlFor="Category">Movie Type/Genre</Label>
          <Input type="select" name="CategoryId" value={addEntry?.CategoryId} onChange={handleAddFormChange} style={{fontSize: "1.25rem"}}>
            <option value="0">⬇️ Select A Type of Movie</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Title">Movie Title</Label>
          <Input type="text" name="Title" value={addEntry?.Title} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Creator">Movie Creator/Director</Label>
          <Input type="text" name="Creator" value={addEntry?.Creator} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Details">Movie Details</Label>
          <Input type="textarea" name="Details" value={addEntry?.Details} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ImageLocation">Movie Poster Art URL</Label>
          <Input type="text" name="ImageLocation" value={addEntry?.ImageLocation} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Button style={{fontSize: "1.25rem"}}>Add Movie To My Library</Button>
        </FormGroup>
        </fieldset>
      </Form>
      <Modal
    isOpen={modal}
    toggle={toggle}
    fullscreen
  >
    <ModalBody >
    { randomSuggestion && (
      <>
      <div className="text-center" style={{width: "50%", margin: "0 auto", paddingTop: "10rem"}}>
    <img src={`https://image.tmdb.org/t/p/w500${randomSuggestion?.poster_path}`} style={{height: "50vh", marginBottom: "1.5rem", borderRadius: "2rem"}} alt={`Movie poster for ${randomSuggestion?.title}`}/>
    <br />
    <h1 style={{ fontFamily: "Bebas Neue" }}>Title: <strong style={{ fontFamily: "Bebas Neue" }}>{randomSuggestion?.title}</strong></h1>
    <br />
    <h2 style={{ fontFamily: "Bebas Neue" }}>Description: {randomSuggestion?.overview}</h2>
    <br />
    <p style={{ fontFamily: "Bebas Neue", fontSize: "1.5rem" }} >Released: {randomSuggestion?.release_date}</p>
    </div>
    </>
    )}
        <div className="text-center">
    <button onClick={toggle} style={{marginBottom: '2rem'}} className="btn-danger btn">CLOSE</button>
    </div>
    </ModalBody>

  </Modal>
    </>

  );
}