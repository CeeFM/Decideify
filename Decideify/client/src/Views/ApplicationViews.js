import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "../Components/Hello";
import Books from "../Components/Books";
import Music from "../Components/Music";
import Movies from "../Components/Movies";
import TVShows from "../Components/TVShows";
import MyProfile from "../Components/MyProfile";
import Social from "../Components/Social/Social";
import MyLibrary from "../Components/MyLibrary";

export default function ApplicationViews() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Hello />}/>
      <Route path="/books" element={<Books />}/>
      <Route path="/music" element={<Music />}/>
      <Route path="/movies" element={<Movies />}/>
      <Route path="/tv" element={<TVShows />}/>
      <Route path="/profile" element={<MyProfile />}/>
      <Route path="/social" element={<Social />}/>
      <Route path="/tv" element={<TVShows />}/>
      <Route path="/library" element={<MyLibrary />}/>
      </Routes>
    </>
  );

}