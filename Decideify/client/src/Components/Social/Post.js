import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from 'react';
import { getAllPostTags } from "../../Managers/PostTagManager";
import { addComment, getCommentsByPostId } from "../../Managers/CommentManager";
import { Comment } from "./Comment";
import { getAllReactions } from "../../Managers/ReactionManager";
import { PostReaction } from "./PostReaction";

export const Post = ({ thisPost }) => {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);
    const [allTags, setAllTags] = useState([]);
    const [thisTag, setThisTag] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleToo, setIsVisibleToo] = useState(true);
    const [reactions, setReactions] = useState([]);
    const [comments, setComments] = useState([]);
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

    const getPostComments = () => {
      getCommentsByPostId(thisPost.id).then((theseComments) => setComments(theseComments));
    };

    const allReactions = () => {
      getAllReactions().then((thesereactions) => setReactions(thesereactions));
     }

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

  const toggleComments = () => {
    setIsVisibleToo(!isVisibleToo);
  }

  const writeComment = (e) => {
    e.preventDefault();
    const commentToAdd = {...newComment};
    addComment(commentToAdd)
      .then(r => r.json)
      .then(() => {
        return getCommentsByPostId(thisPost.id)
      })
      .then((theseComments) => setComments(theseComments));
  };

    useEffect(() => {
        getAllTags();         
    }, [])

    useEffect(() => {
      getPostComments();         
  }, [])

  useEffect(() => {
    allReactions();
  }, [])

    return (
    <>
        <Card  style={{width: "40rem", margin: "2rem auto"}}>
          <CardBody>
            <h2 style={{color: "#ff00bb"}}>{thisPost.title}</h2>
            <h5 style={{color: "white"}}>{thisPost.content}</h5>
            { thisTag === undefined ?
              <CardImg top src={thisPost?.imageLocation} style={{ width: '20rem' }} />
              :
              <CardImg top src={thisTag?.suggestion?.imageLocation} style={{ width: '15.5rem' }} />
            }
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: "1rem"}} className="text-center">
  <p style={{ marginRight: '1rem', marginTop: "1.5rem" }}>
    From: {thisPost?.userProfile?.username}
  </p>
  <img src={thisPost?.userProfile?.imageLocation} alt="the post author's picture" style={{ width: '5rem', borderRadius: '8rem' }}
  />
</div>
{reactions.map((reaction) => (
  <>
    <PostReaction key={reaction.id} post={thisPost} reaction={reaction} setReactions={setReactions}/>
  </>
))
}
            </CardBody>
        </Card>
        { isVisible ?
              <button className="btn btn-primary" onClick={toggleCommentForm}>Cancel</button>
              :
              <button className="btn btn-primary" onClick={toggleCommentForm}>Add Comment</button>
            }
        {isVisible && (
          <Form style={{ width: "50%", margin: "auto" , paddingTop: "2rem", padding: "2rem"}} id="add-comment-form" onSubmit={writeComment}>
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
            { isVisibleToo ?
            <>
            <CardBody>
              <button className="btn btn-primary" onClick={toggleComments}>Hide Comments</button>
              <p style={{marginTop: "1rem"}}>COMMENTS</p>
              {comments.map((comm) => (
                <Comment key={comm?.id} comment={comm} />
              ))}
              </CardBody>
            </>
              : 
              <CardBody>
              <button className="btn btn-primary" onClick={toggleComments}>Show Comments</button>
              </CardBody>
            }
      </>
    )
}