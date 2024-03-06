import React, { useEffect, useState } from "react";
import { getSuggestionsByUser } from "../../Managers/SuggestionManager";
import { addPost, getAllPosts, getPostByUserId } from "../../Managers/PostManager";
import { Button, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { addPostTag } from "../../Managers/PostTagManager";

export default function Social() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [modal, setModal] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestionTag, setSuggestionTag] = useState({
    SuggestionId: 0,
    PostId: 0
  });
  const [newPost, setNewPost] = useState({
    Title: "",
    Content: "",
    ImageLocation: "",
    UserProfileId: decideifyUserObject.id,
    CreateDateTime: new Date(),
    IsApproved: true
  });

 const getMyPosts = () => {
  getPostByUserId(decideifyUserObject.id).then((theseposts) => setPosts(theseposts));
 };

  const toggle = () => setModal(!modal);

  const writePost = (e) => {
    e.preventDefault();
    const postToAdd = {...newPost};
    addPost(postToAdd)
      .then(getMyPosts)
      .then(() => {
        toggle();
      })
  }

  const tagSuggestion = () => {
    const suggestionTagToAdd = {...suggestionTag};
    suggestionTagToAdd.PostId = posts[posts.length - 1]?.id;
    console.log(suggestionTagToAdd);
    addPostTag(suggestionTagToAdd)
      .then(() => {
        window.location.reload();
      })
  }

  const refresh = () => {
    window.location.reload();
  }

  useEffect(() => {
    getSuggestionsByUser(decideifyUserObject?.id).then((thesesuggestions) => setUserSuggestions(thesesuggestions));
  }, [])

  useEffect(() => {
    getAllPosts().then((theseposts) => setPosts(theseposts));
  }, [])

  const handleControlledInputChange = (e) => {

    const userPost = { ...newPost }

    userPost[`${e.target.name}`] = e.target.value

    setNewPost(userPost);
};

const handleModalInputChange = (e) => {

  const userTag = { ...suggestionTag }

  userTag[`${e.target.name}`] = parseInt(e.target.value)

  setSuggestionTag(userTag);
};

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Social!</div>
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} id="add-post-form" onSubmit={writePost}>
  <fieldset>
        <FormGroup>
          <Label htmlFor="Title">Post Title</Label>
          <Input type="text" name="Title" value={newPost?.Title} onChange={handleControlledInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Content">Post Content</Label>
          <Input type="textarea" name="Content" value={newPost?.Content} onChange={handleControlledInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ImageLocation">Post Image URL</Label>
          <Input type="text" name="ImageLocation" value={newPost?.ImageLocation} onChange={handleControlledInputChange}/>
        </FormGroup>
        <FormGroup>
          <Button>Publish Post</Button>
        </FormGroup>
        </fieldset>
      </Form>
      <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>Add Suggestion To Your Post?</ModalHeader>
        <ModalBody>
        <Form>
        <FormGroup>
          <Label htmlFor="SuggestionId">Want to add a suggestion to this post? Select it below! If not, press CONTINUE!</Label>
          <Input type="select" name="SuggestionId" value={suggestionTag?.SuggestionId} onChange={handleModalInputChange}>
            <option value="0">⬇️ Select One Of Your Suggestions</option>
            {userSuggestions.map((sugg) => (
              <optgroup key={sugg?.id} label={sugg?.contentType}>
              <option key={sugg?.id} value={sugg?.id}>{sugg?.title}</option>
              </optgroup>
            ))}
            </Input>
        </FormGroup>
        </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={tagSuggestion}>
            Confirm (add suggestion)
          </Button>{' '}
          <Button color="secondary" onClick={refresh}>
            Continue (no suggestion added)
          </Button>
        </ModalFooter>
      </Modal>
    </>

  );
}