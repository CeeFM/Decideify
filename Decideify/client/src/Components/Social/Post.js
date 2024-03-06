import React from "react";
import { Card, CardBody, CardImg } from "reactstrap";
import { useState, useEffect } from 'react';
import { getAllPostTags } from "../../Managers/PostTagManager";

export const Post = ({ thisPost }) => {

    const [allTags, setAllTags] = useState([]);
    const [thisTag, setThisTag] = useState();

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
            <button className="btn btn-primary" onClick={tagTesting}>Tag Testing</button>
          </CardBody>
        </Card>
      </div>
      </>
    )
}