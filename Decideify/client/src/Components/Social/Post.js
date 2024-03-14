import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { getAllPostTags } from "../../Managers/PostTagManager";
import { addComment, getCommentsByPostId } from "../../Managers/CommentManager";
import { Comment } from "./Comment";
import { getAllReactions } from "../../Managers/ReactionManager";
import { PostReaction } from "./PostReaction";
import x from "../../Images/X.png"
import { Subscribe } from "./Subscribe";
import { addPostReaction, deletePostReaction, getPostReactionsByPostId } from "../../Managers/PostReactionManager";

export const Post = ({ thisPost }) => {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

    const [modal, setModal] = useState(false);
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
    const [isActive, setIsActive] = useState(false);
    const [postReactionsList, setPostReactionsList] = useState([]);
    

    const getPostsReactions = () => {
        getPostReactionsByPostId(thisPost.id).then((postReactions) => {
        setPostReactionsList(postReactions);
    })
    .catch((error) => {
        console.error("OOPS I BORKED IT WITH THIS ERROR:" , error);
    });
};

    useEffect(() => {
        getPostReactionsByPostId(thisPost.id)
            .then((postReactions) => setPostReactionsList(postReactions))
      }, []);

    const addReaction = (reaction) => {
        const reactionToSend = {
          UserProfileId: decideifyUserObject.id,
          ReactionId: reaction.id,
          PostId: thisPost.id
        };
        addPostReaction(reactionToSend)
        .then(() => {
            return getPostReactionsByPostId(thisPost.id)
        })
        .then((thesePostReactions) => setPostReactionsList(thesePostReactions))
      };
    
    const deleteReaction = (reaction) => {
      const userReactionCount = postReactionsList.filter((pr) => pr.userProfileId === decideifyUserObject.id && pr.reactionId === reaction.id && pr.postId === thisPost.id);

        deletePostReaction(userReactionCount[0].id)
        .then(() => {
            return getPostReactionsByPostId(thisPost.id)
        })
        .then((thesePostReactions) => setPostReactionsList(thesePostReactions));

    }

    const toggleDropdown = () => {
      setIsActive(!isActive);
    };

    const toggle = () => setModal(!modal);

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
      .then((theseComments) => setComments(theseComments))
      .then(setIsVisible(!isVisible))
      .then(setNewComment({
        Subject: "",
        Content: "",
        UserProfileId: decideifyUserObject.id,
        CreateDateTime: new Date(),
        PostId: thisPost.id
      }));
  };

  const truncateText = (text, limit) => {
    if (text.length > limit) {
      return text.substring(0, limit) + "...";
    }
    return text;
  }

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
        <Card style={{width: "40rem", margin: "2rem auto"}}>
          <CardBody>
            <h2 style={{color: "#ff00bb"}} onClick={toggle}>{truncateText(thisPost.title, 22)}</h2>
            <h3 style={{color: "white", fontFamily: "Bebas Neue"}} onClick={toggle}>{truncateText(thisPost.content, 37)}</h3>
            { thisTag === undefined ?
              <CardImg top src={thisPost?.imageLocation} style={{ height: '25vh', width: "auto" }} onClick={toggle}/>
              :
              <CardImg top src={thisTag?.suggestion?.imageLocation} style={{ height: '25vh', width: "auto" }} onClick={toggle}/>
            }
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: "1rem"}} className="text-center" onClick={toggle}>
  <p style={{ marginRight: '1rem', marginTop: "1.5rem" }}>
    From: {thisPost?.userProfile?.username}
  </p>
  <img src={thisPost?.userProfile?.imageLocation} alt="the post author's picture" style={{ height: '5rem', borderRadius: '8rem' }}
  />
</div>
<div className={`dropdown ${isActive ? 'active' : ''}`} onClick={toggleDropdown}>
  <button className="dropbtn">⬇️ 😊 ⬇️</button>
  <div className="dropdown-content" >
    {reactions.map((reaction) => (
    <PostReaction key={reaction.id} post={thisPost} reaction={reaction} setReactions={setReactions} postReactionsList={postReactionsList} setPostReactionsList={setPostReactionsList}/>
    ))}
  </div>
</div>
<div style={{width: "15vw", margin: "0 auto"}} >
{reactions.map((reaction) => (
  <>
    <PostReaction key={reaction.id} post={thisPost} reaction={reaction} setReactions={setReactions} postReactionsList={postReactionsList} setPostReactionsList={setPostReactionsList}/>
  </>
))
}
</div>

            </CardBody>
        </Card>
        <Modal
          isOpen={modal}
          toggle={toggle}
          backdrop="static"
        >
          <ModalBody>
          <>
          <section className="text-center">
          <button onClick={toggle} style={{marginBottom: '2rem'}}><img src={x} alt="close button" style={{height: "1rem"}}/></button>
          </section>
          <div className="text-center">
        <Card  style={{width: "40rem", marginLeft: "-5.5rem"}}>
          <CardBody>
          <Subscribe post={thisPost} />
            <h2 style={{color: "#ff00bb", marginTop: "1rem"}}>{thisPost.title}</h2>
            <h3 style={{color: "white", fontFamily: "Bebas Neue"}}>{thisPost.content}</h3>
            { thisTag === undefined ?
              <CardImg top src={thisPost?.imageLocation} style={{ height: '25vh', width: "auto" }} />
              :
              <CardImg top src={thisTag?.suggestion?.imageLocation} style={{ height: '25vh', width: "auto" }} />
            }
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: "1rem"}} className="text-center">
  <p style={{ marginRight: '1rem', marginTop: "1.5rem" }}>
    From: {thisPost?.userProfile?.username}
  </p>
  <img src={thisPost?.userProfile?.imageLocation} alt="the post author's picture" style={{ height: '5rem', borderRadius: '8rem' }}
  />
</div>
{/* Commenting out postreactions on social post modals for now because they weren't working very well and took up a lot of visual space. Will put them back in asap but trying to knock out some other things first

{reactions.map((reaction) => (
  <>
    <PostReaction key={reaction.id} post={thisPost} reaction={reaction} modal={modal}/>
  </>
))
} */}
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
            { isVisibleToo && comments.length > 0 ?
            <>
              <button className="btn btn-primary" onClick={toggleComments}>Hide Comments</button>
              <CardBody>
              <p style={{marginTop: "1rem"}}>COMMENTS</p>
              {comments.map((comm) => (
                <Comment key={comm?.id} comment={comm} />
              ))}
              </CardBody>
            </>
              : 

              <button className="btn btn-primary" onClick={toggleComments}>Show Comments</button>

            }
            </div>
      </>
          </ModalBody>
        </Modal>
      </>
    )
}