import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SubscribePosts from "./Social/SubscribePosts";
import { getSubscriptionsByUserId } from "../Managers/SubscriptionManager";

export default function Hello() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [scrips, setScrips] = useState([]);
  const isSubscribed = scrips.find(sub => sub.subscribeUserProfileId === decideifyUserObject.id)

  const allSubscriptions = () => {
      getSubscriptionsByUserId(decideifyUserObject?.id).then((thesesubscriptions) => setScrips(thesesubscriptions));
  };

  useEffect(() => {
    allSubscriptions();
  }, [])

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>Welcome, {decideifyUserObject?.username}!</div>
      <div className="text-center" style={{paddingTop: "1vh", fontSize: "2rem"}}>Pick a Content Hub To Get Started</div>
      <div className="flex-container" style={{display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "1vh", fontSize: "3rem"}}>
          <Link to="/movies" className="text-decoration-none big-link"><div style={{margin: ".5rem", color: "#ff00bb"}}>Movies</div></Link>
          <Link to="/tv" className="text-decoration-none big-link"><div style={{margin: ".5rem", color: "#4cf7e6"}}>TV Shows</div></Link>
          <Link to="/music" className="text-decoration-none big-link"><div style={{margin: ".5rem", color: "#ff00bb"}}>Music</div></Link>
          <Link to="/books" className="text-decoration-none big-link"><div style={{margin: ".5rem", color: "#4cf7e6"}}>Books</div></Link>
      </div>
      {isSubscribed === undefined ?
       ""
       :
       <SubscribePosts setScrips={setScrips}/>
      }
    </>

  );
}