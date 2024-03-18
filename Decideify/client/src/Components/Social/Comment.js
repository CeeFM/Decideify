import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from 'react';
import { deleteComment, getCommentsByPostId } from "../../Managers/CommentManager";

export const Comment = ({ comment, setComments, thisPost }) => {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);
 
  const [showForm, setShowForm] = useState(false)
  const [editComment, setEditComment] = useState({})

  useEffect(() => {
    setEditComment(comment);
  }, [])

  const handleControlledInputChange = (e) => {

    const newComment = { ...editComment }

    newComment[`${e.target.name}`] = e.target.value

    setEditComment(newComment)
  }

  const UpdateEntry = (e) => {
    e.preventDefault()

    const entryToSend = { ...editComment}


    fetch(`https://localhost:5001/api/comment/${comment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryToSend),
    })      
    .then(() => {
      return getCommentsByPostId(thisPost.id)
    })
    .then((theseComments) => {
      setComments(theseComments);
      setShowForm(!showForm);
    })
  } 

  const deleteThisComment = () => {
    deleteComment(comment.id)
      .then(() => {
        return getCommentsByPostId(thisPost.id)
      })
      .then((theseComments) => {
        setComments(theseComments);
      })
  }

    let commentDate = new Date(comment.createDateTime).toLocaleDateString('en-US')

    return (
        <>
        { showForm === false ? (
        <div className="container" style={{border: "gray solid 1px", color: "#4cf7e6", width: "100%", height:"auto", borderRadius: "2rem", paddingTop: "2rem", marginTop: "1.5rem", paddingBottom: "1.5rem", fontFamily: "Bebas Neue"}}>
        
        <h4>{comment?.subject}</h4>
        <div style={{fontFamily: "Bebas Neue", fontSize: "1.5rem"}}>{comment?.content}</div>
       
        <div style={{marginTop: "1rem", fontFamily: "Bebas Neue"}}>{commentDate}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-center">
  <p style={{ marginRight: '1rem', fontFamily: "Bebas Neue" }}>
    From: {comment?.userProfile?.username}
  </p>
  <img src={comment?.userProfile?.imageLocation} alt="the post author's picture" style={{ width: '3rem', borderRadius: '8rem', marginBottom: "1rem" }}
  />
</div>
{comment?.userProfileId === decideifyUserObject.id ?
      <>
        <button className="btn btn-warning" onClick={() => setShowForm(!showForm)}>Edit Comment</button> <button className="btn btn-danger" onClick={deleteThisComment}>Delete Comment</button>
      </>
      :
      ""
      }
</div>
) : (
<div className="container d-flex justify-content-center">
      <Card className="w-100" >
        <CardBody>
          <p>Comment Subject: </p>
          <input style={{fontSize: "1.25rem", fontFamily: "Bebas Neue", marginBottom: ".5vh"}} name="subject" type="text" placeholder="" value={editComment.subject} onChange={handleControlledInputChange} />
          <p>Comment Content: </p>
          <input style={{fontSize: "1.25rem", fontFamily: "Bebas Neue", marginBottom: ".5vh"}} name="content" type="text" placeholder="" value={editComment.content} onChange={handleControlledInputChange} />
        </CardBody>
        <div>
        <button className="btn btn-success" onClick={(e) => UpdateEntry(e)}> Save </button>
        <button className="btn btn-danger" onClick={() => setShowForm(!showForm)}> Cancel </button>
        </div>
      </Card>
    </div>
)}
        </>
    );

};