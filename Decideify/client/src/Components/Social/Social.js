import React, { useEffect, useState } from "react";
import { getSuggestionsByUser } from "../../Managers/SuggestionManager";
import { getAllPosts } from "../../Managers/PostManager";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

export default function Social() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [userSuggestions, setUserSuggestions] = useState([]);
  const [posts, setPosts] = useState([]);
  const [suggestionTag, setSuggestionTag] = useState({
    SuggestionId: 0
  });
  const [newPost, setNewPost] = useState({
    Title: "",
    Content: "",
    ImageLocation: "",
    UserProfileId: decideifyUserObject.id,
    CreateDateTime: new Date(),
    IsApproved: 1
  });

  useEffect(() => {
    getSuggestionsByUser(decideifyUserObject?.id).then((thesesuggestions) => setUserSuggestions(thesesuggestions));
  }, [])

  useEffect(() => {
    getAllPosts().then((theseposts) => setPosts(theseposts));
  }, [])

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Social!</div>
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} id="add-post-form">
  <fieldset>
        <FormGroup>
          <Label htmlFor="Subject">Post Subject</Label>
          <Input type="text" name="Subject" value={newPost?.Title} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Content">Post Content</Label>
          <Input type="textarea" name="Content" value={newPost?.Content} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ImageLocation">Post Image URL</Label>
          <Input type="text" name="ImageLocation" value={newPost?.ImageLocation} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="SuggestionId">Tag One Of Your Suggestions to This Post?</Label>
          <Input type="select" name="SuggestionId" value={suggestionTag?.SuggestionId} >
            <option value="0">⬇️ Select One Of Your Suggestions</option>
            {userSuggestions.map((sugg) => (
              <optgroup key={sugg?.contentType} label={sugg?.contentType}>
              <option key={sugg?.id} value={sugg?.id}>{sugg?.title}</option>
              </optgroup>
            ))}
            </Input>
        </FormGroup>
        <FormGroup>
          <Button>Publish Post</Button>
        </FormGroup>
        </fieldset>
      </Form>
    
    </>

  );
}