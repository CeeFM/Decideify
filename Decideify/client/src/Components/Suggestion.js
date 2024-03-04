import React from "react";

export default function Suggestion({ userSugg }) {
  return (
    <>
            <div className="text-center">
            <img src={userSugg?.imageLocation} style={{width: "10rem"}} alt={userSugg?.title} />
            <p>{userSugg?.title}</p>
            </div>
    </>

  );
}