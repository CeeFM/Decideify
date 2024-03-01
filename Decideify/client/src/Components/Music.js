import React, { useEffect, useState } from "react";
import { discogsTest, getallmusic } from "../Managers/APIManager";
import { addSuggestion } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import musicLoading from "../Images/musicsuggestion1.jpg"

export default function Music() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [musicSuggestions, setMusicSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userCategory, setUserCategory] = useState();
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

  const getCategories = () => {
    getCategoryByContentType("music").then((thesecategories) => setCategories(thesecategories));
  };

  const getmusic = () => {
    getallmusic().then((thismusic) => setMusicSuggestions(thismusic));
  }

  const getdiscogs = () => {
    discogsTest(userCategory).then((discogsdata) => setMusicSuggestions(discogsdata));
  }


  let thisSuggestion;

  const printmusic = () => {
    console.log(musicSuggestions);
    // const randomNumber = Math.floor(Math.random() * musicSuggestions?.["release-groups"]?.length);
    // console.log(randomNumber);
    // console.log(musicSuggestions?.["release-groups"][parseInt(randomNumber)]);
    // thisSuggestion = musicSuggestions?.["release-groups"][parseInt(randomNumber)];
  }

  const saveSuggestion = () => {
    suggestion.Title =  thisSuggestion?.title;
    suggestion.Creator = thisSuggestion?.["artist-credit"][0]?.name;
    suggestion.Details = `${thisSuggestion?.["primary-type"]}`;
    suggestion.ImageLocation = "n/a";
    suggestion.ExternalId = thisSuggestion?.id;
    suggestion.ExternalLink = "n/a"
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
  }
};

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Music!</div>
      <div id="music-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest}>
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
      <img src={musicLoading} style={{width: "18.5vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="A record player, covered in gold and encrusted with diamonds, and there's a gold and diamond encrused record sitting on the record player that says YOUR NEW FAVORITE ALBUM"/>
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
    </>

  );
}