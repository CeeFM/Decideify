import React, { useEffect, useState } from "react";
import { getallbooks } from "../Managers/APIManager";
import { addSuggestion, getSuggestionsByUser } from "../Managers/SuggestionManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { getCategoryByContentType, getCategoryById } from "../Managers/CategoryManager";
import bookLoading from "../Images/booksuggestion1.jpg"
import Suggestion from "./Suggestion";
import ContentCarousel from "./ContentCarousel";

export default function Books() {
  
  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);
  const [randomSuggestion, setRandomSuggestion] = useState();
  const [bookSuggestionTracker, setBookSuggestionTracker] = useState([]);
  const [noMoreSuggestions, setNoMoreSuggestion] = useState(false);
  const [modal, setModal] = useState(false);
  const [bookSuggestions, setBookSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [userCategory, setUserCategory] = useState();
  const [suggestion, setSuggestion] = useState({
    ContentType: "Book",
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
    ContentType: "Book",
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
    getCategoryByContentType("book").then((thesecategories) => setCategories(thesecategories));
  };

  const getUserSuggestions = () => {
    getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "Book");
        setFilteredSuggestions(filter);
      });
  };

  const getbooks = () => {
    getallbooks().then((thesebooks) => setBookSuggestions(thesebooks));
  };

  let thisSuggestion;
  let bookForm = document.getElementById("book-form");
  let bookRender = document.getElementById("book-render");
  let bookDetails = document.getElementById("book-details");
  let bookShow = document.getElementById("book-show");
  let bookSave = document.getElementById("book-save");


  const printbooks = () => {
    let bookSuggestionNumbers = [...bookSuggestionTracker];
    let allGood = false;
    if (userCategory?.name === "Random"){
      let randomList = Math.floor(Math.random() * bookSuggestions?.results?.lists?.length);
      let randomBook = Math.floor(Math.random() * bookSuggestions?.results?.lists[randomList]?.books?.length);
      while (allGood === false) {
        if (bookSuggestionNumbers.includes(randomBook)) {
          randomBook = Math.floor(Math.random() * bookSuggestions?.results?.lists[randomList]?.books?.length); 
        } else if (bookSuggestionNumbers.length >= bookSuggestions?.results?.lists[randomList]?.books?.length - 1) {
          allGood = true;
          setNoMoreSuggestion(true);
        } else {
          allGood = true;
          const newBookSuggestionNumbers = [...bookSuggestionNumbers, randomBook];
          setBookSuggestionTracker(newBookSuggestionNumbers)
        }
      }
      thisSuggestion = bookSuggestions?.results?.lists[randomList]?.books[randomBook];
    } else if (userCategory?.name === "Other") {
      let filterTest = bookSuggestions?.results?.lists.filter((NYTList) => !NYTList?.display_name.includes("Fiction") && !NYTList?.display_name.includes("Nonfiction") && !NYTList?.display_name.includes("Children") && !NYTList?.display_name.includes("Advice"));
      let randomFilteredList = 0;
      let randomFilteredBook = Math.floor(Math.random() * filterTest[randomFilteredList]?.books?.length);
      while (allGood === false) {
        if (bookSuggestionNumbers.includes(randomFilteredBook)) {
          randomFilteredBook = Math.floor(Math.random() * filterTest[randomFilteredList]?.books?.length);
        } else if (bookSuggestionNumbers.length >= filterTest[randomFilteredList]?.books?.length - 1) {
          allGood = true;
          setNoMoreSuggestion(true);
        } else {
          allGood = true;
          const newBookSuggestionNumbers = [...bookSuggestionNumbers, randomFilteredBook];
          setBookSuggestionTracker(newBookSuggestionNumbers)
        }
      }
      thisSuggestion = filterTest[randomFilteredList]?.books[randomFilteredBook];
    } else {
      let filterTest = bookSuggestions?.results?.lists.filter((NYTList) => NYTList?.display_name.includes(userCategory?.name));
      let randomFilteredList = 0;
      let randomFilteredBook = Math.floor(Math.random() * filterTest[randomFilteredList]?.books?.length);
      while (allGood === false) {
        if (bookSuggestionNumbers.includes(randomFilteredBook)) {
          randomFilteredBook = Math.floor(Math.random() * filterTest[randomFilteredList]?.books?.length);
        } else if (bookSuggestionNumbers.length >= filterTest[randomFilteredList]?.books?.length - 1) {
          allGood = true;
          setNoMoreSuggestion(true);
        }  else {
          allGood = true;
          const newBookSuggestionNumbers = [...bookSuggestionNumbers, randomFilteredBook];
          setBookSuggestionTracker(newBookSuggestionNumbers);
        }
      }
      thisSuggestion = filterTest[randomFilteredList]?.books[randomFilteredBook];
    }

    setRandomSuggestion(thisSuggestion);
    if (noMoreSuggestions) {
      bookDetails.innerHTML = `<h1 style="font-family: 'Bebas Neue';">No more suggestions for this search! Start Over to generate more!</h1>`
    } else {
      bookDetails.innerHTML = `<img src=${thisSuggestion?.book_image} style="height: 50vh; marginBottom: 6.5rem; borderRadius: 5rem;" alt="Book cover for ${thisSuggestion?.title}"/>
      <br />
      <h1 style="font-family: 'Bebas Neue';">Title: <strong style="font-family: 'Bebas Neue';">${thisSuggestion?.title}</strong></h1>
      <br />`;
    }
    bookShow.style.display = "none";
    bookSave.style.display = "block";
  };

  const saveSuggestion = () => {
    suggestion.Title =  randomSuggestion?.title;
    suggestion.Creator = randomSuggestion?.author;
    suggestion.Details = randomSuggestion?.description;
    suggestion.ImageLocation = randomSuggestion?.book_image;
    console.log(suggestion)
    addSuggestion(suggestion)
    .then(() => {
     return getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let filter = suggs.filter((s) => s.contentType === "Book");
        setFilteredSuggestions(filter);
      });
    })
  };

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

  const handleControlledInputChange = (e) => {

    const newSuggestion = { ...suggestion }

    newSuggestion[`${e.target.name}`] = e.target.value

    setSuggestion(newSuggestion);

    getCategoryById(newSuggestion?.CategoryId).then((thiscategory) => setUserCategory(thiscategory));
}

const handleAddFormChange = (e) => {

  const newSuggestion = { ...addEntry }

  newSuggestion[`${e.target.name}`] = e.target.value

  setAddEntry(newSuggestion);
}

const submitCategory = (e) => {
  e.preventDefault();
  if (suggestion?.CategoryId === 0) {
    window.alert("Sorry, you need to choose a genre to continue!");
    return
  } else {
  getbooks();
  bookForm.style.display = "none";
  bookRender.style.display = "block";
  }
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
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>Books!</div>
      <div id="book-container">
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} onSubmit={submitCategory} id="book-form">
        <FormGroup className="text-center" style={{fontSize: "2rem"}}>
          <Label htmlFor="Category">Book Type</Label>
          <Input type="select" name="CategoryId" id="Category" value={suggestion?.CategoryId} onChange={handleControlledInputChange} style={{fontSize: "1.25rem"}}>
            <option value="0">⬇️ Select A Type of Book</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup className="text-center">
          <Button style={{fontSize: "1.25rem"}}>DECIDEIFY A BOOK FOR ME</Button>
        </FormGroup>
      </Form>
      <div className="text-center" id="book-render" style={{display: "none", width: "50vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}}>
      <section id="book-details">
      <img onClick={printbooks} className="pulsing-glow" src={bookLoading} style={{width: "30vw", marginBottom: "2.5rem", borderRadius: "5rem"}} alt="A big treasure chest, covered in gold and encrusted with diamonds, as well as gold and diamond encrusted books, and it says YOUR NEW FAVORITE BOOK"/>
      </section>
      <br />
      <section id="book-show">
      {/* <button onClick={printbooks} className="btn btn-secondary">Show Me My Book Suggestion!</button> */}
      </section>
      <section id="book-save" style={{display: "none"}}>
      <button onClick={toggle} className="btn btn-warning">More Details</button>
      <br />
      <br />
      <button onClick={printbooks} className="btn btn-secondary">Show Me Another Book Suggestion!</button>
      <br />
      <br />
      <button onClick={saveSuggestion} className="btn btn-primary">Save Book</button>
      </section>
      </div>
      </div>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Books!</div>

<div id="my-books" className="container">
{filteredSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.5rem"}}>No book suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={filteredSuggestions} />
    }
</div>
<div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Add A Book!</div>

<Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem", fontSize: "1.5rem"}} id="add-book-form" onSubmit={addUserSuggestion} className="text-center">
  <fieldset>
        <FormGroup>
          <Label htmlFor="Category" style={{fontSize: "1.25rem"}}>Book Type/Genre</Label>
          <Input type="select" name="CategoryId" value={addEntry?.CategoryId} onChange={handleAddFormChange} style={{fontSize: "1.25rem"}}>
            <option value="0">⬇️ Select A Type of Book</option>
            {categories.map((category) => (
              <option key={category?.id} value={category?.id}>{category?.name}</option>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Title">Book Title</Label>
          <Input type="text" name="Title" value={addEntry?.Title} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Creator">Book Author</Label>
          <Input type="text" name="Creator" value={addEntry?.Creator} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Details">Book Details</Label>
          <Input type="textarea" name="Details" value={addEntry?.Details} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ImageLocation">Book Cover Art URL</Label>
          <Input type="text" name="ImageLocation" value={addEntry?.ImageLocation} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Button style={{fontSize: "1.25rem"}}>Add Book To My Library</Button>
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
    <img src={`${randomSuggestion?.book_image}`} style={{height: "50vh", marginBottom: "1.5rem", borderRadius: "2rem"}} alt={`Movie poster for ${randomSuggestion?.title}`}/>
    <br />
    <h1 style={{ fontFamily: "Bebas Neue" }}>Title: <strong style={{ fontFamily: "Bebas Neue" }}>{randomSuggestion?.title}</strong></h1>
    <br />
    <h2 style={{ fontFamily: "Bebas Neue" }}>Description: {randomSuggestion?.description}</h2>
    <br />
    <p style={{ fontFamily: "Bebas Neue", fontSize: "1.5rem" }} >Written By: {randomSuggestion?.author}</p>
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