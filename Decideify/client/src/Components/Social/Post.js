import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from 'react';
import { getAllPostTags } from "../../Managers/PostTagManager";
import { addComment } from "../../Managers/CommentManager";

export const Post = ({ thisPost }) => {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);
    const [allTags, setAllTags] = useState([]);
    const [thisTag, setThisTag] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [newComment, setNewComment] = useState({
      Subject: "",
      Content: "",
      UserProfileId: decideifyUserObject.id,
      CreateDateTime: new Date(),
      PostId: thisPost.id
    });

    const getAllTags = () => {
        getAllPostTags().then((theseTags) => {
            setAllTags(theseTags);
            let isThereATagHere = theseTags.find((tag) => tag?.postId === thisPost?.id);
            setThisTag(isThereATagHere);
        });
    };

    const tagTesting = () => {
        console.log(thisPost);
        console.log(allTags);
        console.log(thisTag);
    }

    const handleControlledInputChange = (e) => {

      const userComment = { ...newComment }
  
      userComment[`${e.target.name}`] = e.target.value
  
      setNewComment(userComment);
  };

  const toggleCommentForm = () => {
    setIsVisible(!isVisible);
  }

  const writeComment = (e) => {
    e.preventDefault();
    const commentToAdd = {...newComment};
    addComment(commentToAdd);
  };

    useEffect(() => {
        getAllTags();         
    }, [])

    return (
    <>
      <div className="container d-flex justify-content-center">
        <Card className="m-4" >
          <CardBody>
            { thisTag === undefined ?
              <CardImg top src={thisPost?.imageLocation} style={{ width: '30rem' }} />
              :
              <CardImg top src={thisTag?.suggestion?.imageLocation} style={{ width: '30rem' }} />
            }
            <p>
            </p>
            <h3 style={{color: "#ff00bb"}}>{thisPost.title}</h3>
            <p>{thisPost.content}</p>
            <p>
                Written by: {thisPost?.userProfile?.username}
            </p>
            { isVisible ?
            <button className="btn btn-primary" onClick={toggleCommentForm}>Cancel</button>
            :
            <button className="btn btn-primary" onClick={toggleCommentForm}>Add Comment</button>
            }
            </CardBody>
            {isVisible && (
          <Form style={{ width: "100%", margin: "auto" , paddingTop: "2rem", padding: "2rem"}} id="add-comment-form" onSubmit={writeComment}>
      <fieldset>
        <FormGroup>
          <Label htmlFor="Subject">Subject/Headline</Label>
          <Input type="text" name="Subject" value={newComment?.Title} onChange={handleControlledInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="Content">Comment</Label>
          <Input type="textarea" name="Content" value={newComment?.Content} onChange={handleControlledInputChange}/>
        </FormGroup>
        <FormGroup>
          <Button>Publish Comment</Button>
        </FormGroup>
        </fieldset>
      </Form>
)}
        </Card>
      </div>
      </>
    )
}