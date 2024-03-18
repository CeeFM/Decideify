import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from 'react';
import { deleteComment, getCommentsByPostId } from "../../Managers/CommentManager";

export const Comment = ({ comment, setComments, thisPost }) => {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

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
        <button className="btn btn-warning">Edit Comment</button> <button className="btn btn-danger" onClick={deleteThisComment}>Delete Comment</button>
      </>
      :
      ""
      }
        </div>
        </>
    )

}