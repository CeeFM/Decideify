import React, { useEffect, useState } from "react";
import { getSuggestionsByUser } from "../../Managers/SuggestionManager";
import { addPost, getAllPosts, getPostByUserId } from "../../Managers/PostManager";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";
import { addPostTag } from "../../Managers/PostTagManager";
import { Post } from "./Post";

export default function Social() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const postForm = document.getElementById("add-post-form");
  const postToggle = document.getElementById("post-toggle-btn");

  const [modal, setModal] = useState(false);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [postFeed, setPostFeed] = useState([]);
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

 const allPosts = () => {
  getAllPosts().then((theseposts) => setPostFeed(theseposts));
 }

  const toggle = () => setModal(!modal);
  const toggleForm = () => {
    if(postForm.style.display === "none") {
      postForm.style.display = "block";
      postToggle.innerHTML = "Cancel"
    } else {
      postForm.style.display = "none"
      postToggle.innerHTML = "Write a Post"
    }
  }

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
    suggestionTagToAdd.PostId = posts[0]?.id;
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
    allPosts();
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
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>Social!</div>
      <div className="text-center">
      <button onClick={toggleForm} id="post-toggle-btn" className="btn btn-primary">Write a Post</button>
      </div>
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem", display: "none"}} id="add-post-form" onSubmit={writePost}>
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
      <div className="container">
  <Row>
    <Col md={6}>
      <div className="text-center">
        {postFeed.slice(0, Math.ceil(postFeed.length / 2)).map((post) => (
          <Post key={post.id} thisPost={post} setPostFeed={setPostFeed} />
        ))}
      </div>
    </Col>
    <Col md={6}>
      <div className="text-center">
        {postFeed.slice(Math.ceil(postFeed.length / 2)).map((post) => (
          <Post key={post.id} thisPost={post} setPostFeed={setPostFeed} />
        ))}
      </div>
    </Col>
  </Row>
</div>
      <Modal isOpen={modal} toggle={toggle} style={{marginTop: "20vh"}}>
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
        <div>
        <ModalFooter style={{backgroundColor: "#011627"}}>

          <Button color="danger" onClick={tagSuggestion} style={{marginRight: "4vw"}}>
            Confirm (add suggestion)
          </Button>{' '}
          <Button color="secondary" onClick={refresh} style={{marginRight: "3vw"}}>
            Continue (no suggestion added)
          </Button>

        </ModalFooter>
        </div>
      </Modal>
    </>

  );
}