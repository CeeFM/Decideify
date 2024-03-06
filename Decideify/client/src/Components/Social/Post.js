import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { getAllPostTags, getPostTagByPostId } from "../../Managers/PostTagManager";

export const Post = ({ thisPost }) => {

    return (
    <>
      <div className="container d-flex justify-content-center">
        <Card className="m-4" >
          <CardBody>
              <CardImg top src={thisPost?.imageLocation} style={{ width: '30rem' }} />
            <p>
            </p>
            <h3 style={{color: "#ff00bb"}}>{thisPost.title}</h3>
            <p>{thisPost.content}</p>
            <p>
                Written by: {thisPost?.userProfile?.username}
            </p>
          </CardBody>
        </Card>
      </div>
      </>
    )
}