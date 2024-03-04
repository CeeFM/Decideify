import React from "react";
import yes from "../Images/YES.png"
import no from "../Images/NO.png"
import x from "../Images/X.png"

export default function Suggestion({ userSugg }) {
  return (
    <>
            <div className="text-right">
            <button style={{padding: "none", borderRadius: "5rem"}}><img style={{width: "1.5rem"}} src={x} alt="a big neon red x that you can use as a delete button for saved suggestions"/></button>
            </div>
            <div className="text-center">
            <img src={userSugg?.imageLocation} style={{width: "10rem"}} alt={userSugg?.title} />
            <p>{userSugg?.title}</p>
            <div>Recommend?</div>
            <button><img src={yes} alt="yes" style={{width: "3rem"}}/></button>
            <button><img src={no} alt="yes" style={{width: "2.75rem"}}/></button>
            </div>
    </>

  );
}