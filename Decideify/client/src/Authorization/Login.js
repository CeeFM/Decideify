import React, { useEffect, useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";
import myImage from '../Components/DECIDEIFY.png';

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [word, setWord] = useState('Living');
  const wordsList = ['Watching', 'Laughing', 'Thriving', 'Loving', 'Crying (but in a good way)', 'Listening', 'Reading', 'Enjoying', 'Thriving', 'Crying (again)', 'Jamming', 'Dancing', 'Doing Whatever You Want', 'Chilling', 'Doing Anything Else', 'Engaging'];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * wordsList.length);
      const newWord = wordsList[randomIndex];
      setWord(newWord);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);


  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r && r.email === email && r.password === password) {
      setIsLoggedIn(true)
      navigate('/')
      }
      else{
        alert("Invalid email or password")
      }
    })
  };

  return (
    <>
    <div className="text-center" id="tagline">
    <img src={myImage} style={{width: "25vw", paddingTop: "5rem", paddingBottom: "2.5rem"}}/>
    <h1>Stop Wasting Time Deciding</h1>
    <h1 style={{paddingBottom: "4rem"}}>Start {word}</h1>
    </div>
    <Form onSubmit={loginSubmit} style={{ width: "25vw", margin: "auto", fontSize: "1.5rem"}}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup >
          <Button style={{fontSize: "1.5rem"}}>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </>
  );
}