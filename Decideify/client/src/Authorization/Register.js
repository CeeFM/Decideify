import React, { useState} from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import { useNavigate } from "react-router-dom";
import { register } from "../Managers/UserProfileManager";
import myImage from "../Components/DECIDEIFY.png"


export default function Register({setIsLoggedIn}) {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [imageLocation, setImageLocation] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [isPublic, setIsPublic] = useState();

  const handleIsPublic = (e) => {

    let updatePublic = {...isPublic}

    if (e.target.value === "true" || e.target.value === "false") {
      const booleanVersion = e.target.value.toLowerCase() === "true";
      updatePublic[`${e.target.name}`] = booleanVersion;    
    };

    setIsPublic(updatePublic);
  }

  const registerClick = (e) => {
    e.preventDefault();
    if (password && password !== confirmPassword) {
      alert("Passwords don't match. Do better.");
    } else {
      const userProfile = { firstName, lastName, userName, imageLocation, email, password, isPublic };
      register(userProfile)
        .then(() => {
          setIsLoggedIn(true)
          navigate('/')
        });
    }
 };

  return (
    <>
    <div className="text-center">
    <img src={myImage} style={{width: "25vw", paddingTop: "5rem", paddingBottom: "2.5rem"}}/>
    </div>
    <div className="container">
  <Row>
    <Col md={6}>
      <Form onSubmit={registerClick} style={{ width: "100%", fontSize: "1.5rem" }}>
        <fieldset>
          <FormGroup>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" type="text" onChange={e => setFirstName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" type="text" onChange={e => setLastName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="userName">Display Name</Label>
            <Input id="userName" type="text" onChange={e => setUserName(e.target.value)} />
          </FormGroup>
          <FormGroup>
        <Label htmlFor="isPublic">Share My Suggestions Publicly?</Label>
        <Input type="select" name="isPublic" onChange={e => setIsPublic(e.target.value)}>
          <option value="false">No</option>
          <option value="true">Yes</option>
        </Input>
      </FormGroup>
        </fieldset>
      </Form>
    </Col>
    <Col md={6}>
      <Form onSubmit={registerClick} style={{ width: "100%", fontSize: "1.5rem" }}>
        <fieldset>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input id="email" type="text" onChange={e => setEmail(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="imageLocation">Profile Image URL</Label>
            <Input id="imageLocation" type="text" onChange={e => setImageLocation(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" type="password" onChange={e => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input id="confirmPassword" type="password" onChange={e => setConfirmPassword(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Button style={{ fontSize: "1.5rem" }}>Register</Button>
          </FormGroup>
        </fieldset>
      </Form>
    </Col>
  </Row>
</div>
    </>
  );
}