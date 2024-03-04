import React, { useEffect, useState } from "react";
import { discogsTest, getallmusic } from "../Managers/APIManager";
import { addSuggestion, getSuggestionsByUser } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import musicLoading from "../Images/musicsuggestion1.jpg"
import Suggestion from "./Suggestion";
import ContentCarousel from "./ContentCarousel";

export default function Music() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [musicSuggestions, setMusicSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [suggestion, setSuggestion] = useState({
    ContentType: "Music",
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
    ContentType: "Music",
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
    getCategoryByContentType("music").then((thesecategories) => setCategories(thesecategories));
  };

  const getmusic = () => {
    getallmusic().then((thismusic) => setMusicSuggestions(thismusic));
  }

  const getdiscogs = () => {
    discogsTest(userCategory).then((discogsdata) => setMusicSuggestions(discogsdata));
  }

  const getUserSuggestions = () => {
    getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "Music");
        setFilteredSuggestions(filter);
      });
  };


  let thisSuggestion;
  let musicForm = document.getElementById("music-form");
  let musicRender = document.getElementById("music-render");
  let musicDetails = document.getElementById("music-details");
  let musicShow = document.getElementById("music-show");
  let musicSave = document.getElementById("music-save");

  const printmusic = () => {
    console.log(musicSuggestions);
    const randomNumber = Math.floor(Math.random() * musicSuggestions?.results?.length);
    console.log(randomNumber);
    console.log(musicSuggestions?.results[randomNumber]);
    thisSuggestion = musicSuggestions?.results[randomNumber];
    musicDetails.innerHTML = `<img src=${thisSuggestion?.cover_image} style={{width: "18.5vw", marginBottom: "6.5rem", borderRadius: "5rem"}} alt="Album cover for ${thisSuggestion?.title}"/>
    <br />
    <p>Title: <strong>${thisSuggestion?.title}</strong></p>
    <br />
    <a href="https://www.discogs.com${thisSuggestion?.uri}" target="_blank" className="btn btn-primary">More details</a>`;
    musicShow.style.display = "none";
    musicSave.style.display = "block";
  }

  const saveSuggestion = () => {
    suggestion.Title =  thisSuggestion?.title;
    suggestion.Creator = "n/a";
    suggestion.Details = "n/a";
    suggestion.ImageLocation = thisSuggestion?.cover_image;
    suggestion.ExternalId = thisSuggestion?.id.toString();
    suggestion.ExternalLink = `https://www.discogs.com${thisSuggestion?.uri}`
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
    getdiscogs();
    musicForm.style.display = "none";
    musicRender.style.display = "block";
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
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Music!</div>
      <div id="music-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest} id="music-form">
        <FormGroup>
          <Label htmlFor="Category">Music Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange}>
            <option value="">⬇️ Select A Type of Music</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <Button>DECIDEIFY MUSIC FOR ME</Button>
      </Form>
      </div>
      <div className="text-center" id="music-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="music-details">
      <img className="pulsing-glow" src={musicLoading} style={{width: "18.5vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="A record player, covered in gold and encrusted with diamonds, and there's a gold and diamond encrused record sitting on the record player that says YOUR NEW FAVORITE ALBUM"/>
      </section>
      <br />
      <section id="music-show">
      <button onClick={printmusic} className="btn btn-secondary">Show Me My Music Suggestion!</button>
      </section>
      <section id="music-save" style={{display: "none"}}>
      <button onClick={saveSuggestion} className="btn btn-primary">Save Music</button>
      <button onClick={printmusic} className="btn btn-secondary">Show Me Another Music Suggestion!</button>
      </section>
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Music!</div>

      <div id="my-music" className="container">
      {filteredSuggestions.length === 0 ?
      <p className="text-center">No music suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={filteredSuggestions} />
    }
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Add An Album!</div>


<Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} id="add-album-form" onSubmit={addUserSuggestion}>
<fieldset>
  <FormGroup>
    <Label htmlFor="Category">Album Genre</Label>
    <Input type="select" name="CategoryId" value={addEntry?.CategoryId} onChange={handleAddFormChange}>
      <option value="0">⬇️ Select A Type of Album</option>
      {categories.map((category) => (
        <option key={category?.id} value={category?.id}>{category?.name}</option>
      ))}
      </Input>
  </FormGroup>
  <FormGroup>
    <Label htmlFor="Title">Album Title</Label>
    <Input type="text" name="Title" value={addEntry?.Title} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Label htmlFor="Creator">Album Artist</Label>
    <Input type="text" name="Creator" value={addEntry?.Creator} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Label htmlFor="Details">Album Details</Label>
    <Input type="textarea" name="Details" value={addEntry?.Details} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Label htmlFor="ImageLocation">Album Cover Art URL</Label>
    <Input type="text" name="ImageLocation" value={addEntry?.ImageLocation} onChange={handleAddFormChange} />
  </FormGroup>
  <FormGroup>
    <Button>Add Album To My Library</Button>
  </FormGroup>
  </fieldset>
</Form>
    </>

  );
}