import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Form } from "reactstrap";

export default function MyProfile() {
  const localUserProfile = localStorage.getItem("userProfile");
  const decideifyUserObject = JSON.parse(localUserProfile);
  

  const [currentUser, setCurrentUser] = useState();

  const handleAddFormChange = (e) => {

    const updateUser = { ...currentUser }
  
    updateUser[`${e.target.name}`] = e.target.value
  
    setCurrentUser(updateUser);
  }
  
  const updateProfile = (e) => {
    e.preventDefault()
    console.log(currentUser);
    fetch(`https://localhost:5001/api/userprofile/${currentUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser)
  }).then(localStorage.setItem("userProfile", JSON.stringify(currentUser)))
    .then(() => {
      window.location.reload();
    })
};

  useEffect(() => {
    setCurrentUser(decideifyUserObject);
  }, [])

  return (
    <>
      <div className="text-center" style={{paddingTop: "15vh", fontSize: "4rem", color: "#ff00bb"}}>{decideifyUserObject?.username}'s Profile!</div>
      <section className="text-center">
      <img src={decideifyUserObject?.imageLocation} alt={decideifyUserObject?.username} style={{width: "15rem", borderRadius: "5rem"}}/>
      </section>
      <Form style={{ width: "25vw", margin: "auto" , paddingTop: "2rem"}} id="update-profile" onSubmit={updateProfile}>
  <fieldset>
        <FormGroup>
          <Label htmlFor="firstName">First Name</Label>
          <Input type="text" name="firstName" value={currentUser?.firstName} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="lastName">Last Name</Label>
          <Input type="text" name="lastName" value={currentUser?.lastName} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input type="text" name="username" value={currentUser?.username} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="imageLocation">Profile Picture URL</Label>
          <Input type="text" name="imageLocation" value={currentUser?.imageLocation} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="bio">Bio</Label>
          <Input type="textarea" name="bio" value={currentUser?.bio} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input type="text" name="email" value={currentUser?.email} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password</Label>
          <Input type="password" name="password" value={currentUser?.password} onChange={handleAddFormChange} />
        </FormGroup>
        <FormGroup>
          <Button>Update User Profile</Button>
        </FormGroup>
        </fieldset>
      </Form>
    </>

  );
}