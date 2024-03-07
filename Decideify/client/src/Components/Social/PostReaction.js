import React, { useEffect, useState } from "react";
import { addPostReaction, deletePostReaction, getPostReactionsByPostId, getpostreactionsbypostid } from "../../Managers/PostReactionManager";

export const PostReaction = ({ post, reaction }) => {
    const localUserProfile = localStorage.getItem("userProfile");
    const decideifyUserObject = JSON.parse(localUserProfile);

    const [postReaction, setPostReaction] = useState({
        UserProfileId: decideifyUserObject.id,
        ReactionId: reaction.id,
        PostId: post.id
    });

    const [postReactionsList, setPostReactionsList] = useState([]);

    const getPostsReactions = () => {
        getPostReactionsByPostId(post.id).then((postReactions) => {
        setPostReactionsList(postReactions);
        console.log(postReactionsList);
    })
    .catch((error) => {
        console.error("OOPS I FUCKED UP WITH THIS ERROR:" , error);
    });
};

    useEffect(() => {
        getPostsReactions();
      }, []);

    const addReaction = () => {
        const reactionToSend = {
            ...postReaction
        };
        addPostReaction(reactionToSend)
        .then(() => getPostsReactions());
        window.location.reload();
      };
    
    const deleteReaction = () => {
        deletePostReaction(userReactionCount[0].id);
        window.location.reload();

    }

    const userReactionCount = postReactionsList.filter((pr) => pr.userProfileId === decideifyUserObject.id && pr.reactionId === reaction.id);
    const reactionCount = postReactionsList.filter((pr) => pr.reactionId === reaction.id);

    return <>
        {reactionCount.length === 0 || userReactionCount.length === 0 ? (
            <>
                <button className="btn btn-secondary m-1" onClick={addReaction}>
                <img className="reaction-btn" alt={reaction.name} src={reaction.imageLocation} />
                <br />
                <span className="h6 m-3">{reactionCount.length}</span>
                </button>
            </>
        ) : (
            <button className="btn btn-primary m-1" id="reacted" onClick={deleteReaction}>
            <img className="reaction-btn" alt={reaction.name} src={reaction.imageLocation} />
            <br />
            <span className="h6 m-3">{reactionCount.length}</span>
            </button> 
        )}
        </>

}