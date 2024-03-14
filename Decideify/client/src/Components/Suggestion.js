import React, { useEffect, useState } from "react";
import yes from "../Images/YES.png"
import no from "../Images/NO.png"
import x from "../Images/X.png"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteSuggestion } from "../Managers/SuggestionManager";

export default function Suggestion({ userSugg }) {

    const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [modal, setModal] = useState(false);
  const [modalTwo, setModalTwo] = useState(false);
  const [trueBtn, setTrueBtn] = useState(false);
  const [falseBtn, setFalseBtn] = useState(false);
  const [editSuggestion, setEditSuggestion] = useState({});

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
          <div className="text-center">
        <button onClick={toggleTwo} style={{marginBottom: '2rem'}}>CLOSE</button>
        </div>
        <div className="text-center">
            <img src={userSugg?.imageLocation} style={{height: "35rem", marginTop: "5rem"}} alt={userSugg?.title} />
            <h1 style={{color: "#ff00bb", fontFamily: "Bebas Neue"}}>{userSugg?.title}</h1>

            {userSugg?.contentType !== "Music" && (
              <div style={{fontSize: "1.25rem", fontFamily: "Bebas Neue", width: "50%", margin: "0 auto"}}>{userSugg?.details}</div>
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
            </div>
        </ModalBody>

      </Modal>
    </>

  );
}