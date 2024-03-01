import React from "react";
import { Link } from "react-router-dom";

export default function Suggestion({ userSugg }) {
  return (
    <>
        <div className="suggestion-container">
            <div><img src={userSugg?.imageLocation} style={{width: "1rem"}}/></div>
            <div>{userSugg?.title}</div>
        </div>
    </>

  );
}