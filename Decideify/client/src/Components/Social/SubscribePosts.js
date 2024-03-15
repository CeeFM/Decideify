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
             const subscriptions = await getSubscriptionsByUserId(decideifyUserObject.id); 
             let allPosts = [];
 
             for (const subscription of subscriptions) {
                 const authorId = subscription.providerUserProfileId;
                 const posts = await getPostByUserId(authorId);
                 allPosts = [...allPosts, ...posts];
             }

             setSubposts(allPosts);
     };
        fetchPosts();
    }, []);

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