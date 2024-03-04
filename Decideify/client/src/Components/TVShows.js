import React, { useEffect, useState } from "react";
import { getalltv } from "../Managers/APIManager";
import { addSuggestion, getSuggestionsByUser } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import tvLoading from "../Images/tvsuggestion1.jpg"
import Suggestion from "./Suggestion";
import ContentCarousel from "./ContentCarousel";

export default function TVShows() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [showSuggestions, setShowSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState({
    ContentType: "TV Show",
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
    ContentType: "TV Show",
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

  const getUserSuggestions = () => {
    getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "TV Show");
        setFilteredSuggestions(filter);
      });
  };

  const getCategories = () => {
    getCategoryByContentType("tv show").then((thesecategories) => setCategories(thesecategories));
  };

  const getshows = () => {
    getalltv(userCategory).then((theseshows) => setShowSuggestions(theseshows));
  };

  let currentSuggestion;
  let tvForm = document.getElementById("tv-form");
  let tvRender = document.getElementById("tv-render");
  let tvDetails = document.getElementById("tv-details");
  let tvShow = document.getElementById("tv-show");
  let tvSave = document.getElementById("tv-save");
  let myTV = document.getElementById("my-tv");


  const printshows = () => {
    console.log(showSuggestions);
    const randomNumber = Math.floor(Math.random() * showSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(showSuggestions?.results[randomNumber]);
    currentSuggestion = showSuggestions?.results[randomNumber];
    tvDetails.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${currentSuggestion?.poster_path}" style={{width: "18.5vw", marginBottom: "6.5rem", borderRadius: "5rem"}} alt="TV Show poster for ${currentSuggestion?.name}"/>
    <br />
    <p>Title: <strong>${currentSuggestion?.name}</strong></p>
    <br />
    <p>Description: ${currentSuggestion?.overview}</p>
    <br />
    <p>Released: ${currentSuggestion?.first_air_date}`;
    tvShow.style.display = "none";
    tvSave.style.display = "block";
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
  if (suggestion?.CategoryId === 0) {
    window.alert("Sorry, you need to choose a genre to continue!");
    return
  } else {
    getshows();
    tvForm.style.display = "none";
    tvRender.style.display = "block";
  }
};

const handleAddFormChange = (e) => {

  const newSuggestion = { ...addEntry }

  newSuggestion[`${e.target.name}`] = e.target.value

  setAddEntry(newSuggestion);
}

const addUserSuggestion = () => {
  addSuggestion(addEntry);
}

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getUserSuggestions();
  }, []);

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>TV Shows!</div>
      <div id="tv-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest} id="tv-form">
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
          <Button>DECIDEIFY A TV SHOW FOR ME</Button>
        </FormGroup>
      </Form>
      <div className="text-center" id="tv-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="tv-details">
      <img className="pulsing-glow" src={tvLoading} style={{width: "18.5vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="A big TV, covered in gold and encrusted with diamonds, and on the big screen it says COMING UP: YOUR NEW FAVORITE SHOW"/>
      </section>
      <br />
      <section id="tv-show">
      <button onClick={printshows} className="btn btn-secondary">Show Me My TV Show Suggestion!</button>
      </section>
      <section id="tv-save" style={{display: "none"}}>
      <button onClick={saveSuggestion} className="btn btn-primary">Save TV Show</button>
      <button onClick={printshows} className="btn btn-secondary">Show Me Another TV Show Suggestion!</button>
      </section>
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s TV Shows!</div>

      <div id="my-tv" className="container">
      {filteredSuggestions.length === 0 ?
      <p className="text-center">No TV suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={filteredSuggestions} />
    }
      </div>
      </div>

      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Add A TV Show!</div>


<Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} id="add-tv-form" onSubmit={addUserSuggestion}>
<fieldset>
  <FormGroup>
    <Label htmlFor="Category">TV Show Type/Genre</Label>
    <Input type="select" name="CategoryId" value={addEntry?.CategoryId} onChange={handleAddFormChange}>
      <option value="0">⬇️ Select A Type of TV Show</option>
      {categories.map((category) => (
        <option key={category?.id} value={category?.id}>{category?.name}</option>
      ))}
      </Input>
  </FormGroup>
  <FormGroup>
    <Label htmlFor="Title">TV Show Title</Label>
    <Input type="text" name="Title" value={addEntry?.Title} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Label htmlFor="Creator">TV Show Creator/Director</Label>
    <Input type="text" name="Creator" value={addEntry?.Creator} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Label htmlFor="Details">TV Show Details</Label>
    <Input type="textarea" name="Details" value={addEntry?.Details} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Label htmlFor="ImageLocation">TV Show Poster Art URL</Label>
    <Input type="text" name="ImageLocation" value={addEntry?.ImageLocation} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Button>Add TV Show To My Library</Button>
  </FormGroup>
  </fieldset>
</Form>
    </>

  );
}