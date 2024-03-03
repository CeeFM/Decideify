import React from "react";

export default function Suggestion({ userSugg }) {
  return (
    <>
        <div className="suggestion-container col-sm text-center">
            <div><img src={userSugg?.imageLocation} style={{width: "10rem"}} alt={userSugg?.title}/></div>
            <div>{userSugg?.title}</div>
        </div>
    </>

  );
}