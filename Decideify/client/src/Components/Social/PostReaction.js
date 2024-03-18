import React, { useEffect, useState } from "react";
import { addPostReaction, deletePostReaction, getPostReactionsByPostId, getpostreactionsbypostid } from "../../Managers/PostReactionManager";

export const PostReaction = ({ post, reaction, modal, postReactionsList, setPostReactionsList, uniqueReactionCount, setUniqueReactionCount }) => {
    const localUserProfile = localStorage.getItem("userProfile");
    const decideifyUserObject = JSON.parse(localUserProfile);

    const [visibleButton, setVisibleButton] = useState("inline");
    const [postReaction, setPostReaction] = useState({
        UserProfileId: decideifyUserObject.id,
        ReactionId: reaction.id,
        PostId: post.id
    });

    const getPostsReactions = () => {
        getPostReactionsByPostId(post.id).then((postReactions) => {
        setPostReactionsList(postReactions);
    })
    .catch((error) => {
        console.error("OOPS I BORKED IT WITH THIS ERROR:" , error);
    });
};

    const addReaction = () => {
        const reactionToSend = {
            ...postReaction
        };
        addPostReaction(reactionToSend)
        .then(() => {
            return getPostReactionsByPostId(post.id)
        })
        .then((thesePostReactions) => {
          setPostReactionsList(thesePostReactions);
          let thisReactionCount = thesePostReactions.filter((pr) => pr.reactionId === reaction.id);
          if (thisReactionCount.length === 0) {
            setVisibleButton("none");
          } else if (thisReactionCount.length >= 1) {
            setVisibleButton("inline")
          }
          let reactionIds = new Set();
          setPostReactionsList(thesePostReactions);
          thesePostReactions.forEach(obj => reactionIds.add(obj.reactionId));
          setUniqueReactionCount(reactionIds.size);
        })
      };
    
    const deleteReaction = () => {
        deletePostReaction(userReactionCount[0].id)
        .then(() => {
            return getPostReactionsByPostId(post.id)
        })
        .then((thesePostReactions) => {
          setPostReactionsList(thesePostReactions);
          let thisReactionCount = thesePostReactions.filter((pr) => pr.reactionId === reaction.id);
          if (thisReactionCount.length === 0) {
            setVisibleButton("none");
          } else if (thisReactionCount.length >= 1) {
            setVisibleButton("inline")
          }
          let reactionIds = new Set();
          setPostReactionsList(thesePostReactions);
          thesePostReactions.forEach(obj => reactionIds.add(obj.reactionId));
          setUniqueReactionCount(reactionIds.size);
        });

    }

    useEffect(() => {
      let reactionIds = new Set();
      getPostReactionsByPostId(post.id)
        .then((postReactions) => {
        setPostReactionsList(postReactions);
        let thisReactionCount = postReactions.filter((pr) => pr.reactionId === reaction.id);
        if (thisReactionCount.length === 0) {
          setVisibleButton("none");
        } else if (thisReactionCount.length >= 1) {
          setVisibleButton("inline")
        }
        postReactions.forEach(obj => reactionIds.add(obj.reactionId));
        setUniqueReactionCount(reactionIds.size);
    })
    }, [])

    const userReactionCount = postReactionsList.filter((pr) => pr.userProfileId === decideifyUserObject.id && pr.reactionId === reaction.id);
    const reactionCount = postReactionsList.filter((pr) => pr.reactionId === reaction.id);

    return (
        <>
              {userReactionCount.length === 0 ? (
                <>
                  <button className="btn btn-secondary m-1" onClick={addReaction} style={{ fontFamily: "Bebas Neue", display: `${visibleButton}` }}>
                    <img className="reaction-btn" alt={reaction.name} src={reaction.imageLocation} />
                    <br />
                    {reactionCount.length}
                  </button>
                </>
              ) : (
                <button className="btn btn-primary m-1" id="reacted" onClick={deleteReaction} style={{ fontFamily: "Bebas Neue", display: "inline" }}>
                  <img className="reaction-btn" alt={reaction.name} src={reaction.imageLocation} />
                  <br />
                  {reactionCount.length}
                </button>
              )}
            </>

      );

}