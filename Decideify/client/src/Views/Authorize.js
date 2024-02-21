import React from "react"
import { Route, Routes, Navigate } from "react-router-dom";
import Login from '../Components/Login'; 
import Register from '../Components/Register'


export default function Authorize({setIsLoggedIn}) {

    return(
         <Routes>
         <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
         <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn}/>} />
         <Route path="*" element={<Navigate to="/login" />} />
         </Routes>
      );
    
   }