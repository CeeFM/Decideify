import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from 'react';

export const Comment = ({ comment }) => {

    let commentDate = new Date(comment.createDateTime).toLocaleDateString('en-US')

    return (
        <>
        <div className="container" style={{border: "gray solid 1px", color: "#4cf7e6", width: "40%", height:"auto", borderRadius: "2rem", paddingTop: "2rem", marginTop: "1.5rem", paddingBottom: "1.5rem"}}>
        
        <h4>{comment?.subject}</h4>
        <div>{comment?.content}</div>
       
        <div style={{marginTop: "1rem"}}>{commentDate}</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-center">
  <p style={{ marginRight: '1rem' }}>
    From: {comment?.userProfile?.username}
  </p>
  <img src={comment?.userProfile?.imageLocation} alt="the post author's picture" style={{ width: '3rem', borderRadius: '8rem', marginBottom: "1rem" }}
  />
</div>
        </div>
        </>
    )

}