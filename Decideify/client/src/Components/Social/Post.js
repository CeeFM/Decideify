import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap";
import { useState, useEffect } from 'react';
import { getAllPostTags } from "../../Managers/PostTagManager";
import { addComment, getCommentsByPostId } from "../../Managers/CommentManager";
import { Comment } from "./Comment";
import { getAllReactions } from "../../Managers/ReactionManager";
import { PostReaction } from "./PostReaction";
import x from "../../Images/X.png"
import thumbsup from "../../Images/_922a7e6b-32b8-40dd-ac07-1f2aed6535fb.jpg"
import thumbsdown from "../../Images/_2306b1da-d7a0-4855-83e8-02631ad111e6.jpg"
import { Subscribe } from "./Subscribe";
import { addPostReaction, deletePostReaction, getPostReactionsByPostId } from "../../Managers/PostReactionManager";
import { getSubscriptionsByUserId } from "../../Managers/SubscriptionManager";

export const Post = ({ thisPost }) => {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

    const [modal, setModal] = useState(false);
    const [allTags, setAllTags] = useState([]);
    const [uniqueReactionCount, setUniqueReactionCount] = useState(0);
    const [thisTag, setThisTag] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleToo, setIsVisibleToo] = useState(false);
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
    const [subscriptions, setSubscriptions] = useState([]);
    
    const allSubscriptions = () => {
      getSubscriptionsByUserId(decideifyUserObject?.id).then((thesesubscriptions) => setSubscriptions(thesesubscriptions));
  };

    const getPostsReactions = () => {
        getPostReactionsByPostId(thisPost.id).then((postReactions) => {
        setPostReactionsList(postReactions);
    })
    .catch((error) => {
        console.error("OOPS I BORKED IT WITH THIS ERROR:" , error);
    });
};

    useEffect(() => {
        let reactionIds = new Set();
        getPostReactionsByPostId(thisPost.id)
            .then((postReactions) => {
              setPostReactionsList(postReactions);
              postReactions.forEach(obj => reactionIds.add(obj.reactionId));
              setUniqueReactionCount(reactionIds.size);
            })
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
        .then((thesePostReactions) => {
          let reactionIds = new Set();
          setPostReactionsList(thesePostReactions);
          thesePostReactions.forEach(obj => reactionIds.add(obj.reactionId));
          setUniqueReactionCount(reactionIds.size);
        })
      };
    
    const deleteReaction = (reaction) => {
      const userReactionCount = postReactionsList.filter((pr) => pr.userProfileId === decideifyUserObject.id && pr.reactionId === reaction.id && pr.postId === thisPost.id);

        deletePostReaction(userReactionCount[0].id)
        .then(() => {
            return getPostReactionsByPostId(thisPost.id)
        })
        .then((thesePostReactions) => {
          let reactionIds = new Set();
          setPostReactionsList(thesePostReactions);
          thesePostReactions.forEach(obj => reactionIds.add(obj.reactionId));
          setUniqueReactionCount(reactionIds.size);
        });

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

  useEffect(() => {
    allSubscriptions();
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
              thisTag?.suggestion?.isRecommended === null ?
              <CardImg top src={thisTag?.suggestion?.imageLocation} style={{ height: '25vh', width: "auto" }} onClick={toggle}/>
              : thisTag?.suggestion?.isRecommended === true ?
              <>
              <div>
              <CardImg top src={thisTag?.suggestion?.imageLocation} style={{ height: '25vh', width: "auto" }} onClick={toggle}/>
              </div>
              <div style={{position: "absolute", left: "3vw", top: "25vh"}}>
              <img src={thumbsup} style={{height: "4vh", borderRadius: "5rem"}}/>              
              </div>
              </>
              : 
              <>
              <div>
              <CardImg top src={thisTag?.suggestion?.imageLocation} style={{ height: '25vh', width: "auto" }} onClick={toggle}/>
              </div>
              <div style={{position: "absolute", left: "3vw", top: "25vh"}}>
              <img src={thumbsdown} style={{height: "4vh", borderRadius: "5rem"}}/>
              </div>
              </>
            }
<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: "1rem"}} className="text-center" onClick={toggle}>
  <p style={{ marginRight: '1rem', marginTop: "1.5rem" }}>
    From: {thisPost?.userProfile?.username}
  </p>
  <img src={thisPost?.userProfile?.imageLocation} alt="the post author's picture" style={{ height: '5rem', borderRadius: '8rem' }}
  />
</div>
<div className={`dropdown ${isActive ? 'active' : ''}`} onClick={toggleDropdown}>
  <button className="dropbtn btn btn-secondary">⬇️ 😊 ⬇️</button>
  <div className="dropdown-content" >
    {reactions.map((reaction) => (
      <button
  key={reaction.name}
  className="reactionbtn btn btn-secondary"
  style={{ border: "none" }}
  onClick={() =>
    postReactionsList.some(pr => pr.userProfileId === decideifyUserObject.id && pr.postId === thisPost.id && pr.reactionId === reaction.id)
      ? deleteReaction(reaction)
      : addReaction(reaction)
  }
>
  <img
    key={reaction.id}
    src={reaction.imageLocation}
    style={{ height: "7vh", width: "3.5vw" }}
    alt={reaction.name}
  />
</button>    ))}
  </div>
</div>
{postReactionsList.length > 0 && uniqueReactionCount <= 6 && postReactionsList.length !== 0 ?
<div style={{width: "22vw", height: "15vh", margin: "0 auto", paddingTop: "2.5rem"}} >
{reactions.map((reaction) => (
  <>
    <PostReaction key={reaction.id} post={thisPost} reaction={reaction} setReactions={setReactions} postReactionsList={postReactionsList} setPostReactionsList={setPostReactionsList} uniqueReactionCount={uniqueReactionCount} setUniqueReactionCount={setUniqueReactionCount}/>
  </>
))
}
</div>
:
 postReactionsList.length !== 0 ?
<div style={{width: "22vw", height: "15vh", margin: "0 auto", paddingTop: ""}} >
{reactions.map((reaction) => (
  <>
    <PostReaction key={reaction.id} post={thisPost} reaction={reaction} setReactions={setReactions} postReactionsList={postReactionsList} setPostReactionsList={setPostReactionsList} uniqueReactionCount={uniqueReactionCount} setUniqueReactionCount={setUniqueReactionCount} />
  </>
))
}
</div>
:
<div style={{width: "22vw", height: "15vh", margin: "0 auto", paddingTop: "5rem"}} >
  <h4>No reactions yet! C'mon and add one!</h4>
</div>
}
<div style={{marginTop: "1vh"}}>
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
                <Comment key={comm?.id} comment={comm} setComments={setComments} thisPost={thisPost} />
              ))}
              </CardBody>
            </>
              : 

              <button className="btn btn-primary" onClick={toggleComments}>Show Comments ({comments.length})</button>

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
          <Subscribe post={thisPost} subscriptions={subscriptions} setSubscriptions={setSubscriptions}/>
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
<div className={`dropdown ${isActive ? 'active' : ''}`} onClick={toggleDropdown}>
  <button className="dropbtn btn btn-secondary">⬇️ 😊 ⬇️</button>
  <div className="dropdown-content" >
    {reactions.map((reaction) => (
      <button
  className="reactionbtn btn btn-secondary"
  style={{ border: "none" }}
  onClick={() =>
    postReactionsList.some(pr => pr.userProfileId === decideifyUserObject.id && pr.postId === thisPost.id && pr.reactionId === reaction.id)
      ? deleteReaction(reaction)
      : addReaction(reaction)
  }
>
  <img
    key={reaction.id}
    src={reaction.imageLocation}
    style={{ height: "7vh", width: "3.5vw" }}
    alt={reaction.name}
  />
</button>    ))}
  </div>
</div>

<div style={{width: "22vw", margin: "0 auto"}} >
{reactions.map((reaction) => (
  <>
    <PostReaction key={reaction.id} post={thisPost} reaction={reaction} setReactions={setReactions} postReactionsList={postReactionsList} setPostReactionsList={setPostReactionsList} uniqueReactionCount={uniqueReactionCount} setUniqueReactionCount={setUniqueReactionCount}/>
  </>
))
}
</div>

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
                <Comment key={comm?.id} comment={comm} setComments={setComments} thisPost={thisPost}/>
              ))}
              </CardBody>
            </>
              : 

              <button className="btn btn-primary" onClick={toggleComments}>Show Comments ({comments.length})</button>

            }
            </div>
      </>
          </ModalBody>
        </Modal>
      </>
    )
}