import React, { useEffect, useState } from "react";
import yes from "../Images/YES.png"
import no from "../Images/NO.png"
import x from "../Images/X.png"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { deleteSuggestion } from "../Managers/SuggestionManager";

export default function Suggestion({ userSugg }) {

  const [modal, setModal] = useState(false);
  const [editSuggestion, setEditSuggestion] = useState({});

  useEffect(() => {
    setEditSuggestion(userSugg);
  }, [])

  const deleteMe = () => {
    deleteSuggestion(editSuggestion?.id);
    window.location.reload();
  }

  const toggle = () => setModal(!modal);

  return (
    <>
            <div className="text-right">
            <Button style={{padding: "none", borderRadius: "5rem"}} onClick={toggle}><img style={{width: "1.5rem"}} src={x} alt="a big neon red x that you can use as a delete button for saved suggestions"/></Button>
            </div>
            <div className="text-center">
            <img src={userSugg?.imageLocation} style={{width: "10rem"}} alt={userSugg?.title} />
            <p>{userSugg?.title}</p>
            <div>Recommend?</div>
            <button><img src={yes} alt="yes" style={{width: "3rem"}}/></button>
            <button><img src={no} alt="yes" style={{width: "2.75rem"}}/></button>
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
    </>

  );
}