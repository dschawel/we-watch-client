import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const Profile = props => {
  // Declare and initalize state
  let [serverMessage, setServerMessage] = useState('')
  let [search, setSearch] = useState('')
  let [friendName, setFriendName] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    console.log(friendName)
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/friends/search`, {
      method: 'POST',
      body: JSON.stringify({friendName}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        response.json()
        .then(result => {
          if(response.ok){
            props.updateUser(result.token)
          }
        })
      })
      .catch(err => {
        console.log('line 32 error', err)
      })
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
          <input type="text" name="friendName" placeholder="search for friends" onChange={e => setFriendName(e.target.value)} />
          <button type="submit">Submit</button>
        </form>
      </div>
      {/* <button onClick={callServer}>Call /profile route on server</button>
      <p>{serverMessage}</p> */}
    </div>
  )
}

export default Profile
