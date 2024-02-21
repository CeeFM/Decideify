import React from "react";
import myImage from './DECIDEIFY.png'

export default function Hello() {
  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem"}}>WELCOME!</div>
      <div className="text-center" style={{paddingTop: "1vh", fontSize: "2rem"}}>Pick a Content Hub To Get Started</div>
      <div className="flex-container" style={{display: "flex", flexWrap: "wrap", justifyContent: "center", paddingTop: "1vh", fontSize: "3rem"}}>
          <div style={{margin: ".5rem"}}>Movies</div>
          <div style={{margin: ".5rem"}}>TV Shows</div>
          <div style={{margin: ".5rem"}}>Music</div>
          <div style={{margin: ".5rem"}}>Books</div>
      </div>
    </>

  );
}