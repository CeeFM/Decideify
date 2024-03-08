import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardImg } from "reactstrap";
import { Link } from "react-router-dom";
import { getSubscriptionsByUserId } from '../../Managers/SubscriptionManager';
import { getPostByUserId } from '../../Managers/PostManager';
import { Post } from './Post';

const SubscribePosts = () => {
    const [subposts, setSubposts] = useState([]);

    const localUserProfile = localStorage.getItem("userProfile");
    const decideifyUserObject = JSON.parse(localUserProfile);

    useEffect(() => {
        
        const fetchPosts = async () => {
             // Fetch all subscriptions for the current user
             const subscriptions = await getSubscriptionsByUserId(decideifyUserObject.id); 
             let allPosts = [];
 
             // Iterate through subscriptions to fetch posts from each subscribed user
             for (const subscription of subscriptions) {
                 const authorId = subscription.providerUserProfileId;
                 // Fetch posts written by the subscribed author
                 const posts = await getPostByUserId(authorId);
                 // Concatenate the fetched posts to the existing array
                 allPosts = [...allPosts, ...posts];
             }

             // Update the state with the fetched posts
             setSubposts(allPosts);
     };
        fetchPosts();
    }, []);

    //HTML Display
    return (
        <div className='text-center' style={{marginTop: "10rem"}}>
            <h2>Posts From People You're Subscribed To:</h2>
            <div className='text-center'>
                {subposts.map(subpost => (
                <Post thisPost={subpost} />
                ))}
            </div>
        </div>
    );
};

export default SubscribePosts;