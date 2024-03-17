import React, { useEffect, useState } from "react";
import { getalltv } from "../Managers/APIManager";
import { addSuggestion, getSuggestionsByUser } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap";
import tvLoading from "../Images/tvsuggestion1.jpg"
import Suggestion from "./Suggestion";
import ContentCarousel from "./ContentCarousel";

export default function TVShows() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [randomSuggestion, setRandomSuggestion] = useState();
  const [modal, setModal] = useState(false);
  const [tvSuggestionTracker, setTVSuggestionTracker] = useState([]);
  const [noMoreSuggestions, setNoMoreSuggestion] = useState(false);
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
    let tvSuggestionNumbers = [...tvSuggestionTracker];
    let allGood = false;
    let randomNumber = Math.floor(Math.random() * showSuggestions?.results?.length);
    while (allGood === false) {
      if (tvSuggestionNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * showSuggestions?.results?.length);
      } else if (showSuggestions?.results[randomNumber]?.poster_path === null) {
        const newTVSuggestionNumbers = [...tvSuggestionNumbers, randomNumber];
        setTVSuggestionTracker(newTVSuggestionNumbers);
        randomNumber = Math.floor(Math.random() * showSuggestions?.results?.length);
      } else if (tvSuggestionNumbers.length >= showSuggestions?.results?.length - 1) {
        allGood = true;
        setNoMoreSuggestion(true);
      } else {
        allGood = true;
        const newTVSuggestionNumbers = [...tvSuggestionNumbers, randomNumber];
        setTVSuggestionTracker(newTVSuggestionNumbers);
      }
    }
    currentSuggestion = showSuggestions?.results[randomNumber];
    setRandomSuggestion(currentSuggestion);
    if (noMoreSuggestions) {
      tvDetails.innerHTML = `<h1 style="font-family: 'Bebas Neue';">No more suggestions for this search! Start Over to generate more!</h1>`
    } else {
    tvDetails.innerHTML = `<img src="https://image.tmdb.org/t/p/w500${currentSuggestion?.poster_path}" style="height: 50vh; marginBottom: 6.5rem; borderRadius: 5rem;" alt="TV Show poster for ${currentSuggestion?.name}"/>
    <br />
    <h1 style="font-family: 'Bebas Neue';">Title: <strong style="font-family: 'Bebas Neue';">${currentSuggestion?.name}</strong></h1>`;
    }
    tvShow.style.display = "none";
    tvSave.style.display = "block";
    console.log(tvSuggestionTracker);
    console.log(showSuggestions);
  };

  const saveSuggestion = () => {
      suggestion.Title =  randomSuggestion?.name;
      suggestion.Creator = "n/a"
      suggestion.Details = randomSuggestion?.overview;
      suggestion.ImageLocation = `https://image.tmdb.org/t/p/w500${randomSuggestion?.poster_path}`;     
      suggestion.ReleaseDate = randomSuggestion?.first_air_date;
      suggestion.ExternalId = randomSuggestion?.id.toString();
      console.log(suggestion)
      addSuggestion(suggestion)
      .then(() => {
        getSuggestionsByUser(decideifyUserObject?.id)
        .then((suggs) => {
          setUserSuggestions(suggs);
          let filter = suggs.filter((s) => s.contentType === "TV Show");
          setFilteredSuggestions(filter);
        });
      })
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
  addSuggestion(addEntry)
  .then(() => {
    getSuggestionsByUser(decideifyUserObject?.id)
    .then((suggs) => {
      setUserSuggestions(suggs);
      let filter = suggs.filter((s) => s.contentType === "TV Show");
      setFilteredSuggestions(filter);
    });
  })
}

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getUserSuggestions();
  }, []);

  let toggle = () => setModal(!modal);

  return (
    <>
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>TV Shows!</div>
      <div id="tv-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitTest} id="tv-form">
        <FormGroup className="text-center" style={{fontSize: "2rem"}}>
          <Label htmlFor="Category">TV Show Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange} style={{fontSize: "1.5rem"}}>
            <option value="">⬇️ Select A Type of TV Show</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup className="text-center">
          <Button style={{fontSize: "1.25rem"}}>DECIDEIFY A TV SHOW FOR ME</Button>
        </FormGroup>
      </Form>
      <div className="text-center" id="tv-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="tv-details">
      <img onClick={printshows} className="pulsing-glow" src={tvLoading} style={{width: "30vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="A big TV, covered in gold and encrusted with diamonds, and on the big screen it says COMING UP: YOUR NEW FAVORITE SHOW"/>
      </section>
      <br />
      <section id="tv-show">
      {/* <button onClick={printshows} className="btn btn-secondary">Show Me My TV Show Suggestion!</button> */}
      </section>
      { noMoreSuggestions?
        <section id="tv-save">
          <button onClick={() => window.location.reload()} className="btn btn-danger">Start Over</button>
        </section>
        :
        <section id="tv-save" style={{display: "none"}}>
        <button onClick={toggle} className="btn btn-primary">More Details</button>       <button onClick={saveSuggestion} className="btn btn-success">Save TV Show</button>
        <br />
        <br />
        <button onClick={printshows} className="btn btn-warning">Next TV Suggestion</button> <button onClick={() => window.location.reload()} className="btn btn-danger">Start Over</button>
        </section>
      }
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s TV Shows!</div>

      <div id="my-tv" className="container">
      {filteredSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.5rem"}}>No TV suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={filteredSuggestions} />
    }
      </div>
      </div>

      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>Add A TV Show!</div>


<Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}} id="add-tv-form" onSubmit={addUserSuggestion} className="text-center">
<fieldset>
  <FormGroup>
    <Label htmlFor="Category">TV Show Type/Genre</Label>
    <Input type="select" name="CategoryId" value={addEntry?.CategoryId} onChange={handleAddFormChange} style={{fontSize: "1.25rem"}}>
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
<Modal
    isOpen={modal}
    toggle={toggle}
    fullscreen
  >
    <ModalBody >
    { randomSuggestion && (
      <>
      <div className="text-center" style={{width: "50%", margin: "0 auto", paddingTop: "5rem"}}>
    <img src={`https://image.tmdb.org/t/p/w500${randomSuggestion?.poster_path}`} style={{height: "50vh", marginBottom: "1.5rem", borderRadius: "2rem"}} alt={`TV Show poster for ${randomSuggestion?.name}`}/>
    <br />
    <h1 style={{ fontFamily: "Bebas Neue" }}>Title: <strong style={{ fontFamily: "Bebas Neue" }}>{randomSuggestion?.name}</strong></h1>
    <br />
    <h2 style={{ fontFamily: "Bebas Neue" }}>Description: {randomSuggestion?.overview}</h2>
    <br />
    <p style={{ fontFamily: "Bebas Neue", fontSize: "1.5rem" }} >Released: {randomSuggestion?.first_air_date}</p>
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