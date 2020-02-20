import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

const Profile = props => {

  // Declare and initalize state
  // let [serverMessage, setServerMessage] = useState('')
  // let [search, setSearch] = useState('')
  let [friendName, setFriendName] = useState('')
  let [shows, setShows] = useState('')

  useEffect(() => {
    fetchShows()
  }, [])

  const fetchShows = async () => {
    let token = localStorage.getItem('userToken')
    await fetch(`${process.env.REACT_APP_SERVER_URL}/shows`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json().then(result => {
        console.log(result)
        setShows(result)
      })
      .catch(err => {
        console.log('Error in show fetch', err)
      })
    })
  }

  const handleDelete = e => {
    e.preventDefault()
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/shows/:showId`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json().then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log('Error in deleting show', err)
      })
    })
  }

  let content;
  if (shows.length > 0) {
    content = shows.map((show, i) => {
      return (
        <div key={i} className="movie-card-container">
                <div className="image-container">
                    <div
                        className="bg-image"
                        style={{ backgroundImage: `url(${show.poster})` }}
                    />
                </div>
                <div className="movie-info">
                    {/* <h3>Movie Details</h3> */}
                    <div>
                        <h2>{show.title}</h2>
                        <small>Released Date: {show.year}</small>
                    </div>
                    <h3>{show.type}</h3>
                  <button key={i} type="submit" className="delete" onClick={handleDelete}>Remove From Queue</button>
                </div>
            </div>
      )
    })
  } else {
    content = <p>No Shows Yet...</p>
  }

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
    <div className="profile">
      <Container>
        <Row>
          <Col xs="6">
            <h2>{props.user.firstname}'s Profile</h2>
            {/* <h3>{props.user.firstname} {props.user.lastname}</h3> */}
            <img alt="profile" src={props.user.profileUrl} />
            {/* <p>
              <strong>Email:</strong>
              {props.user.email}
            </p> */}
            <br />
            <hr />
            <div className="friends">
              <h3>Search for Friends</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" name="friendName" placeholder="search for friends" onChange={e => setFriendName(e.target.value)} />
                <button type="submit" class="submit">Submit</button>
              </form>
            </div>
          </Col>
        <Col xs="6">
          <div className="shows">
            <h2>My Queue</h2>
            {content}
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Profile
