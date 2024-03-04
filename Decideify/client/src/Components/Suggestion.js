import React from "react";
import yes from "../Images/YES.png"
import no from "../Images/NO.png"

export default function Suggestion({ userSugg }) {
  return (
    <>
            <div className="text-center">
            <img src={userSugg?.imageLocation} style={{width: "10rem"}} alt={userSugg?.title} />
            <p>{userSugg?.title}</p>
            <div>Recommend?</div>
            <button><img src={yes} alt="yes" style={{width: "4rem"}}/></button>
            <button><img src={no} alt="yes" style={{width: "3.75rem"}}/></button>
            </div>
    </>

  );
}