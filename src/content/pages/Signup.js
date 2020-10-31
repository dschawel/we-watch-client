// Packages
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Button } from 'reactstrap';

const Signup = props => {
  // Declare and initialize state variables
  let [email, setEmail] = useState('')
  let [firstname, setFirstname] = useState('')
  let [lastname, setLastname] = useState('')
  let [message, setMessage] = useState('')
  let [password, setPassword] = useState('')
  let [profileUrl, setProfileUrl] = useState('')

  // Set message to blank if I'm typing in the form
  useEffect(() => {
    setMessage('')
  }, [firstname, lastname, email, password, profileUrl])

  const handleSubmit = e => {
    // Prevent default of form submissions
    e.preventDefault()

    // Form the data object 
    let data = {
      email,
      firstname,
      lastname,
      password,
      profileUrl
    }
    
    // Send the user sign up data to the server
    console.log(process.env.REACT_APP_SERVER_URL)
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/signup`, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(response => {
      response.json().then(result => {
        if (response.ok) {
          // I have a token - update the user information
          props.updateUser(result.token)
        }
        else {
          // Status was something other than 200
          setMessage(`${response.status} ${response.statusText}: ${result.message}`)
        }
      })
    })
    .catch(err => {
      console.log('Error', err)
      setMessage(`Error! ${err.toString()}`)
    })
  }

  // Redirect if there is already someone logged in
  if (props.user) {
    return <Redirect to="/profile" />
  }

  return (
    <div className="signup">
      <h2>Signup</h2>
      <span className="red">{message}</span>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>First Name:</Label>
          <Input name="firstname" placeholder="First name" onChange={e => setFirstname(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Last Name:</Label>
          <Input name="lastname" placeholder="Last name" onChange={e => setLastname(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input type="email" name="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Password:</Label>
          <Input type="password" name="password" placeholder="password" onChange={e => setPassword(e.target.value)} />
        </FormGroup>
        <FormGroup>
          <Label>Profile Pic URL:</Label>
          <Input type="url" name="profileUrl" placeholder="picture link" onChange={e => setProfileUrl(e.target.value)} />
        </FormGroup>
        <Button color="danger" type="submit">Sign Me Up!</Button>
      </Form>
    </div>
  )
}

export default Signup
