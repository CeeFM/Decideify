import React, { useState } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Header";
import ApplicationViews from "./Views/ApplicationViews";
import { useEffect } from 'react';
import Authorize from './Views/Authorize';
import Footer from './Components/Footer';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);


    useEffect(() => {
        if (!localStorage.getItem("userProfile")) {
            setIsLoggedIn(false)

        }
    }, [isLoggedIn])

    return (
        <Router>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            {isLoggedIn ?
                <ApplicationViews />
                :
                <Authorize setIsLoggedIn={setIsLoggedIn} />
            }
            <div style={{marginBottom: "7.5rem"}}></div>
            <Footer />
        </Router>
    );
}

export default App;