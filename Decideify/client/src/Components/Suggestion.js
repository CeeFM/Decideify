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
  const [editSuggestion, setEditSuggestion] = useState({});

  useEffect(() => {
    setEditSuggestion(userSugg);
  }, [])

  const deleteMe = () => {
    deleteSuggestion(editSuggestion?.id);
    window.location.reload();
  }

  const updateSuggestion = (e, bool) => {
    e.preventDefault();

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
            <p>{truncateText(userSugg?.title, 18)}</p>
        
            {decideifyUserObject.id === userSugg?.userProfileId && (
  <>
    <div>Recommend?</div>
    <button onClick={(e) => updateSuggestion(e, true)}>
      <img src={yes} alt="yes" style={{ width: "3rem" }} value="true" />
    </button>
    <button onClick={(e) => updateSuggestion(e, false)}>
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
        <ModalBody>
        You sure about that? You really wanna delete <strong>{editSuggestion?.title}</strong> from your {editSuggestion?.contentType} suggestions? For realzies?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteMe}>
            Confirm (for realzies)
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
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
            <h1 style={{color: "#ff00bb"}}>{userSugg?.title}</h1>
            <div style={{fontSize: "1.25rem", width: "50%", margin: "0 auto"}}>{userSugg?.details}</div>
            <br />
            {decideifyUserObject.id === userSugg?.userProfileId && (
  <>
    <h5>Recommend?</h5>
    <button onClick={(e) => updateSuggestion(e, true)}>
      <img src={yes} alt="yes" style={{ width: "3rem" }} value="true" />
    </button>
    <button onClick={(e) => updateSuggestion(e, false)}>
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