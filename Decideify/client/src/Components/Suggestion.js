import React, { useEffect, useState } from "react";
import yes from "../Images/YES.png"
import no from "../Images/NO.png"
import subyes from "../Images/_922a7e6b-32b8-40dd-ac07-1f2aed6535fb.jpg"
import subno from "../Images/_2306b1da-d7a0-4855-83e8-02631ad111e6.jpg"
import x from "../Images/X.png"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteSuggestion } from "../Managers/SuggestionManager";
import { getprofilebyid } from "../Managers/UserProfileManager";

export default function Suggestion({ userSugg }) {

    const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [trueBtn, setTrueBtn] = useState(false);
  const [falseBtn, setFalseBtn] = useState(false);
  const [editSuggestion, setEditSuggestion] = useState({});
  const [suggestionOwner, setSuggestionOwner] = useState({});

  useEffect(() => {
    getprofilebyid(userSugg?.userProfileId)
      .then((thisProfile) => {
        setSuggestionOwner(thisProfile);
      });
  }, []);

  useEffect(() => {
    setEditSuggestion(userSugg);
    if (userSugg?.isRecommended === true) {
      setTrueBtn("pulsing-green")
      setFalseBtn("")
    } else if (userSugg?.isRecommended === false) {
      setTrueBtn("")
      setFalseBtn("pulsing-red")
    }
  }, [])

  const deleteMe = () => {
    deleteSuggestion(editSuggestion?.id);
    window.location.reload();
  }

  const updateSuggestion = (e, bool) => {
    e.preventDefault();
    if (bool === false) {
      setFalseBtn("pulsing-red");
      setTrueBtn("")
    } else if (bool === true) {
      setTrueBtn("pulsing-green");
      setFalseBtn("");
    }
    const suggestionUpdate = {...editSuggestion};
    suggestionUpdate.isRecommended = bool;

    fetch(`https://localhost:5001/api/suggestion/${userSugg.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(suggestionUpdate)
  });
  
  // .then(() => {
  //     window.location.reload();
  //   })
};

const truncateText = (text, limit) => {
  if (text.length > limit) {
    return text.substring(0, limit) + "...";
  }
  return text;
}

  const toggle = () => setModal(!modal);
  const toggleTwo = () => setModalTwo(!modalTwo);

  return (
    <>
            <div className="text-center">
            <img src={userSugg?.imageLocation} style={{height: "10rem"}} alt={userSugg?.title} onClick={toggleTwo}/>
            <p style={{fontFamily: "Bebas Neue", fontSize: "1.25rem"}}>{truncateText(userSugg?.title, 18)}</p>
        
            {decideifyUserObject.id === userSugg?.userProfileId && (
  <>
    <div style={{fontFamily: "Bebas Neue", fontSize: "1.25rem"}}>Recommend?</div>
    <button onClick={(e) => updateSuggestion(e, true)} className={trueBtn ? "pulsing-green" : ""}>
      <img src={yes} alt="yes" style={{ width: "3rem" }} value="true" />
    </button>
    <button onClick={(e) => updateSuggestion(e, false)}  className={falseBtn ? "pulsing-red" : ""}>
      <img src={no} alt="no" style={{ width: "2.75rem" }} value="false" />
    </button>
    <br />
    <button
      style={{ padding: "none", borderRadius: "5rem" }}
      onClick={toggle}
    >
      <img
        style={{ width: "1.5rem" }}
        src={x}
        alt="delete button"
      />
    </button>
  </>
)}
{decideifyUserObject.id !== userSugg?.userProfileId && (
  <>
    <h5>Recommend?</h5>

      <img src={subyes} alt="yes" style={{ width: "3rem", borderRadius: "2rem", margin: "0 1rem" }} className={trueBtn}/>
      <img src={subno} alt="no" style={{ width: "2.75rem", borderRadius: "2rem", margin: "0 1rem" }} className={falseBtn} />
    <br />
  </>
)}
            </div>
            <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>CONFIRM DELETION</ModalHeader>
        <ModalBody style={{fontFamily: "Bebas Neue", fontSize: "1.75rem"}}>
        You sure about that? You really wanna delete <strong style={{fontFamily: "Bebas Neue"}}>{editSuggestion?.title}</strong> from your {editSuggestion?.contentType} suggestions? For realzies?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteMe} style={{fontFamily: "Bebas Neue", fontSize: "1.25rem"}}>
            Confirm (for realzies)
          </Button>{' '}
          <Button color="secondary" onClick={toggle} style={{fontFamily: "Bebas Neue", fontSize: "1.25rem"}}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Modal
        isOpen={modalTwo}
        toggle={toggleTwo}
        fullscreen
      >
        <ModalBody >
          <div className="text-center" style={{marginTop: "5rem"}}>
        <button onClick={toggleTwo} style={{marginBottom: '2rem'}}>CLOSE</button>
        </div>
        <div className="text-center">
        {decideifyUserObject.id !== userSugg?.userProfileId && (
          <h3>{userSugg?.contentType} Suggestion from {suggestionOwner?.username}</h3>
        )}
            <img src={userSugg?.imageLocation} style={{height: "35rem", marginTop: "3rem"}} alt={userSugg?.title} />
            <h1 style={{color: "#ff00bb", fontFamily: "Bebas Neue"}}>{userSugg?.title}</h1>

            {userSugg?.contentType !== "Music" && (
              <h3 style={{fontFamily: "Bebas Neue", width: "50%", margin: "0 auto"}}>{userSugg?.details}</h3>
            )}
            {userSugg?.contentType === "Music" && (
                  <a style={{ fontFamily: "Bebas Neue",  fontSize: "1.5rem" }} href={`${userSugg?.externalLink}`}  target="_blank"> <button style={{ fontFamily: "Bebas Neue", fontSize: "1.5rem",  marginBottom: "1.5rem" }} className="btn btn-primary">More Details</button></a>

            )}
            <br />
            {decideifyUserObject.id === userSugg?.userProfileId && (
  <>
    <h5>Recommend?</h5>
    <button onClick={(e) => updateSuggestion(e, true)} className={trueBtn}>
      <img src={yes} alt="yes" style={{ width: "3rem" }} value="true" />
    </button>
    <button onClick={(e) => updateSuggestion(e, false)} className={falseBtn}>
      <img src={no} alt="no" style={{ width: "2.75rem" }} value="false" />
    </button>
    <br />
    <button
      style={{ padding: "none", borderRadius: "5rem" }}
      onClick={toggle}
    >
      <img
        style={{ width: "1.5rem" }}
        src={x}
        alt="delete button"
      />
    </button>
  </>
)}
{decideifyUserObject.id !== userSugg?.userProfileId && (
  <>
    <h5>Recommend?</h5>

      <img src={subyes} alt="yes" style={{ width: "3rem", margin: "0 1rem", borderRadius: "2rem" }} className={trueBtn}/>
      <img src={subno} alt="no" style={{ width: "2.75rem", margin: "0 1rem", borderRadius: "2rem" }} className={falseBtn} />
    <br />
  </>
)}
            </div>
        </ModalBody>

      </Modal>
    </>

  );
}