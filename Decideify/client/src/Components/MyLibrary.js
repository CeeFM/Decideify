import React, { useEffect, useState } from "react";
import { getSuggestionsByUser } from "../Managers/SuggestionManager";
import Suggestion from "./Suggestion";
import ContentCarousel from "./ContentCarousel";
import { getSubscriptionsByUserId } from "../Managers/SubscriptionManager";

export default function MyLibrary() {

  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);

  const [subsuggs, setSubsuggs] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [musicSuggestions, setMusicSuggestions] = useState([]);
  const [movieSuggestions, setMovieSuggestions] = useState([]);
  const [tvSuggestions, setTvSuggestions] = useState([]);
  const [bookSuggestions, setBookSuggestions] = useState([]);

  const getUserSuggestions = () => {
    getSuggestionsByUser(decideifyUserObject?.id)
      .then((suggs) => {
        setUserSuggestions(suggs);
        let music = suggs.filter((s) => s.contentType === "Music");
        setMusicSuggestions(music);
        let movie = suggs.filter((s) => s.contentType === "Movie");
        setMovieSuggestions(movie);
        let book = suggs.filter((s) => s.contentType === "Book");
        setBookSuggestions(book);
        let tvshow = suggs.filter((s) => s.contentType === "TV Show");
        setTvSuggestions(tvshow);
      });
  };

  useEffect(() => {
      
    const fetchSubsuggs = async () => {
         const subscriptions = await getSubscriptionsByUserId(decideifyUserObject.id); 
         let allSuggestions = [];

         for (const subscription of subscriptions) {
             const authorId = subscription.providerUserProfileId;
             const suggestions = await getSuggestionsByUser(authorId);
             allSuggestions = [...allSuggestions, ...suggestions];
         }

         setSubsuggs(allSuggestions);
 };
    fetchSubsuggs();
}, []);

  useEffect(() => {
    getUserSuggestions();
  }, []);

  return (
    <>
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "4rem", color: "#ff00bb"}}>{decideifyUserObject?.username}'s Library!</div>
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "3rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Movies!</div>

<div id="my-movies-library" className="container">
{movieSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.5rem"}}> No movie suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={movieSuggestions} setFilteredSuggestions={setMovieSuggestions}/>
    }
</div>
<div className="text-center" style={{paddingTop: "5vh", fontSize: "3rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s TV Shows!</div>

<div id="my-tv-library" className="container">
    {tvSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.5rem"}}>No TV suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={tvSuggestions} setFilteredSuggestions={setTvSuggestions}/>
    }
      </div>
<div className="text-center" style={{paddingTop: "5vh", fontSize: "3rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Music!</div>

      <div id="my-music-library" className="container">
      {musicSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.5rem"}}>No music suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={musicSuggestions} setFilteredSuggestions={setMusicSuggestions}/>
    }
      </div>
      <div className="text-center" style={{paddingTop: "5vh", fontSize: "3rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Books!</div>

      <div id="my-books-library" className="container">
      {bookSuggestions.length === 0 ?
      <p className="text-center" style={{fontSize: "1.5rem"}}>No book suggestions added yet! Add some and they'll appear here!</p>
      :
      <ContentCarousel filteredSuggestions={bookSuggestions} setFilteredSuggestions={setBookSuggestions}/>
    }
</div>
<div className="text-center" style={{paddingTop: "5vh", fontSize: "3rem", color: "#4cf7e6"}}>{decideifyUserObject?.username}'s Subscribed Suggestions!</div>

<div id="my-subscribed-library" className="container" style={{marginBottom: "18rem"}}>
{subsuggs.length === 0 ?
<p className="text-center" style={{fontSize: "1.5rem"}}>No subscribed suggestions added yet! Subscribe to someone to see their content suggestions here!</p>
:
<ContentCarousel filteredSuggestions={subsuggs} />
}
</div>

    </>

  );
}