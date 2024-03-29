import React, { useEffect, useState } from "react";
import { discogsTest, getallmusic } from "../Managers/APIManager";
import { addSuggestion, getSuggestionsByUser } from "../Managers/SuggestionManager";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap";
import musicLoading from "../Images/musicsuggestion1.jpg"
import Suggestion from "./Suggestion";
import ContentCarousel from "./ContentCarousel";

export default function Music() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [randomSuggestion, setRandomSuggestion] = useState();
  const [modal, setModal] = useState(false);
  const [musicSuggestions, setMusicSuggestions] = useState([]);
  const [musicSuggestionTracker, setMusicSuggestionTracker] = useState([]);
  const [noMoreSuggestions, setNoMoreSuggestion] = useState(false);
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
    let musicSuggestionNumbers = [...musicSuggestionTracker];
    let allGood = false;
    let randomNumber = Math.floor(Math.random() * musicSuggestions?.results?.length);
    while (allGood === false) {
      if (musicSuggestionNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * musicSuggestions?.results?.length);
      } else if (musicSuggestions?.results[randomNumber]?.cover_image === null) {
        const newMusicSuggestionNumbers = [...musicSuggestionNumbers, randomNumber];
        setMusicSuggestionTracker(newMusicSuggestionNumbers);
        randomNumber = Math.floor(Math.random() * musicSuggestions?.results?.length);
      } else if (musicSuggestionNumbers.length >= musicSuggestions?.results?.length - 1) {
        allGood = true;
        setNoMoreSuggestion(true);
      } else {
        allGood = true;
        const newMusicSuggestionNumbers = [...musicSuggestionNumbers, randomNumber];
        setMusicSuggestionTracker(newMusicSuggestionNumbers);
      }
    }
    thisSuggestion = musicSuggestions?.results[randomNumber];
    setRandomSuggestion(thisSuggestion);
    if (noMoreSuggestions) {
      musicDetails.innerHTML = `<h1 style="font-family: 'Bebas Neue';">No more suggestions for this search! Start Over to generate more!</h1>`
    } else {
    musicDetails.innerHTML = `<img src=${thisSuggestion?.cover_image} style="height: 50vh; marginBottom: 6.5rem; borderRadius: 5rem;" alt="Album cover for ${thisSuggestion?.title}"/>
    <br />
    <h1 style="font-family: 'Bebas Neue';">Title: <strong style="font-family: 'Bebas Neue';">${thisSuggestion?.title}</strong></h1>`;
    }
    musicShow.style.display = "none";
    musicSave.style.display = "block";
  }

  const saveSuggestion = () => {
    suggestion.Title =  randomSuggestion?.title;
    suggestion.Creator = "n/a";
    suggestion.Details = "n/a";
    suggestion.ImageLocation = randomSuggestion?.cover_image;
    suggestion.ExternalId = randomSuggestion?.id.toString();
    suggestion.ExternalLink = `https://www.discogs.com${randomSuggestion?.uri}`
    console.log(suggestion)
    addSuggestion(suggestion)
    .then(() => {
      getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "Music");
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

const addUserSuggestion = (e) => {
  e.preventDefault();
  addSuggestion(addEntry)
  .then(() => {
    return getSuggestionsByUser(decideifyUserObject?.id)
    .then((suggs) => {
      setUserSuggestions(suggs);
      let filter = suggs.filter((s) => s.contentType === "Music");
      setFilteredSuggestions(filter);
      setAddEntry({
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
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>Music!</div>
      <div id="music-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem", fontSize: "2rem"}} onSubmit={submitTest} id="music-form" >
        <FormGroup className="text-center">
          <Label htmlFor="Category">Music Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange} style={{fontSize: "1.5rem"}}>
            <option value="">⬇️ Select A Type of Music</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup className="text-center">
        <Button style={{fontSize: "1.25rem", marginTop: "-10px"}}>DECIDEIFY MUSIC FOR ME</Button>
        </FormGroup>
      </Form>
      </div>
      <div className="text-center" id="music-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="music-details">
      <img onClick={printmusic} className="pulsing-glow" src={musicLoading} style={{width: "30vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="A record player, covered in gold and encrusted with diamonds, and there's a gold and diamond encrused record sitting on the record player that says YOUR NEW FAVORITE ALBUM"/>
      </section>
      <br />
      <section id="music-show">
      {/* <button onClick={printmusic} className="btn btn-secondary">Show Me My Music Suggestion!</button> */}
      </section>
      { noMoreSuggestions ?
        <section id="music-save">
        <button onClick={() => window.location.reload()} className="btn btn-danger">Start Over</button>
        </section>
      :
        <section id="music-save" style={{display: "none"}}>
        <button onClick={toggle} className="btn btn-primary">More Details</button>       <button onClick={saveSuggestion} className="btn btn-success">Save Music</button>
        <br />
        <br />
        <button onClick={printmusic} className="btn btn-secondary">Next Suggestion</button> <button onClick={() => window.location.reload()} className="btn btn-danger">Start Over</button>
        </section>
      }
      </div>
      <div className="text-center" style={{paddingTop: "10vh", fontSize: "4rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Music!</div>

      <div id="my-music" className="container">
      {filteredSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.5rem"}}>No music suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={filteredSuggestions} setFilteredSuggestions={setFilteredSuggestions}/>
    }
      </div>
      <div className="text-center" style={{paddingTop: "10vh", fontSize: "4rem", color: "#ff00bb"}}>Add An Album!</div>


<Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}} id="add-album-form" onSubmit={(e) => addUserSuggestion(e)}>
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
<Modal
    isOpen={modal}
    toggle={toggle}
    fullscreen
  >
    <ModalBody >
    { randomSuggestion && (
      <>
      <div className="text-center" style={{width: "50%", margin: "0 auto", paddingTop: "10rem"}}>
    <img src={`${randomSuggestion?.cover_image}`} style={{height: "50vh", marginBottom: "1.5rem", borderRadius: "2rem"}} alt={`Movie poster for ${randomSuggestion?.title}`}/>
    <br />
    <h1 style={{ fontFamily: "Bebas Neue" }}>Title: <strong style={{ fontFamily: "Bebas Neue" }}>{randomSuggestion?.title}</strong></h1>
    <br />
    <a style={{ fontFamily: "Bebas Neue", fontSize: "1.5rem" }} href={`https://www.discogs.com${randomSuggestion?.uri}`}  target="_blank"> <button style={{ fontFamily: "Bebas Neue", fontSize: "1.5rem" }} className="btn btn-primary">More Details</button></a>
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