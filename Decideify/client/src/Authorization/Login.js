import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useNavigate, Link } from "react-router-dom";
import { login } from "../Managers/UserProfileManager";
import myImage from '../Components/DECIDEIFY.png';

export default function Login({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const loginSubmit = (e) => {
    e.preventDefault();
    login({email, password})
      .then(r =>{
      if(r.email === email && r.password === password) {
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
    <img src={myImage} style={{width: "25vw", paddingTop: "10rem", paddingBottom: "2.5rem"}}/>
    <h2>Stop Wasting Time Deciding</h2>
    <h2 style={{paddingBottom: "4rem"}}>Start Living</h2>
    </div>
    <Form onSubmit={loginSubmit} style={{ width: "25vw", margin: "auto" }}>
      <fieldset>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Button>Login</Button>
        </FormGroup>
        <em>
          Not registered? <Link to="/register">Register</Link>
        </em>
      </fieldset>
    </Form>
    </>
  );
}