import React from "react";
import { Button, Card, CardBody, CardImg, Form, FormGroup, Input, Label } from "reactstrap";
import { useState, useEffect } from 'react';
import { addSubscription, deleteSubscription, getAllSubscriptions, getSubscriptionsByUserId } from "../../Managers/SubscriptionManager";
import { getAllPosts } from "../../Managers/PostManager";

export const Subscribe = ({ post, subscriptions, setSubscriptions }) => {

    const localUserProfile = localStorage.getItem("userProfile");
    const decideifyUserObject = JSON.parse(localUserProfile);

    const [ newSubscription, setNewSubscription] = useState({
        SubscribeUserProfileId: decideifyUserObject.id,
        ProviderUserProfileId: post.userProfileId
    });

    const isSubscribed = subscriptions.find(sub => sub.subscribeUserProfileId === decideifyUserObject.id && sub.providerUserProfileId === post.userProfileId)

    const allSubscriptions = () => {
        getSubscriptionsByUserId(decideifyUserObject?.id).then((thesesubscriptions) => setSubscriptions(thesesubscriptions));
    };

    const createSubscription = () => {
        addSubscription(newSubscription)
            .then(() => {
               return getSubscriptionsByUserId(decideifyUserObject?.id)
            })
            .then((theseSubscriptions) => setSubscriptions(theseSubscriptions))
    };

    const unsubscribe = () => {
        deleteSubscription(decideifyUserObject.id, post.userProfileId)
        .then(() => {
            return getSubscriptionsByUserId(decideifyUserObject?.id)
         })
         .then((theseSubscriptions) => setSubscriptions(theseSubscriptions))
    };

    useEffect(() => {
        allSubscriptions();
    }, [])


    return (
        <>
{decideifyUserObject.id !== post.userProfileId && 
  (isSubscribed === undefined ? (
    <Button onClick={createSubscription}>Subscribe</Button>
  ) : (
    <Button onClick={unsubscribe}>Unsubscribe</Button>
  ))}
            </>
    )

}