import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  // Declare and initalize state
  let [serverMessage, setServerMessage] = useState('')
  let [search, setSearch] = useState('')

  const callServer = () => {
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/auth/profile`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log('In the .then() code', response)
      response.json().then(result => {
        if (response.ok) {
          console.log('YAY', result)
          setServerMessage(result.message)
        }
        else {
          console.log('Darn', result)
          setServerMessage('No secret message for you')
        }
      })
      .catch(err => {
        console.log('Error parson JSON')
      })
    })
    .catch(err => {
      console.log('Some sort of error', err)
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

  }


  // If there is not a user, send them away
  if (!props.user) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <h2>{props.user.firstname}'s Profile</h2>
      <h3>{props.user.firstname} {props.user.lastname}</h3>
      <img alt="profile" src={props.user.profileUrl} />
      <p>
        <strong>Email:</strong>
        {props.user.email}
      </p>
      <h2>Search for Friends</h2>
      <div className='friends'>
        <form onSubmit={handleSubmit}>
          <input type="text" name="search" placeholder="search for friends" onChange={e => setSearch(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* <button onClick={callServer}>Call /profile route on server</button>
      <p>{serverMessage}</p> */}
    </div>
  )
}

export default Profile
