import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';

const Profile = props => {
  let [friendName, setFriendName] = useState('')
  let [shows, setShows] = useState('')
  let [friendArr, setFriendArr] = useState([])

  useEffect(() => {
    fetchShows()
  }, [])

  useEffect(() => {
    getFriends(props)
  }, [])


  const fetchShows = () => {
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/shows`, {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json().then(result => {
        setShows(result)
      })
      .catch(err => {
        console.log('Error in show fetch', err)
      })
    })
  }

  // Function to delete from your queue
  const handleDelete = e => {
    e.preventDefault()
    
    setShows(shows.filter(show => show._id !== e.target.value))
    console.log(e.target.value)
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/shows/${e.target.value}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json().then(result => {
        console.log('Line 51', result)
      })
      .catch(err => {
        console.log('Error in deleting show', err)
      })
    })
  }
    
  // Conditional rendering of movie cards
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
                        <h3>{show.title}</h3>
                        <small>Released Date: {show.year}</small>
                    </div>
                    <small><strong>{show.type}</strong></small>
                  <button key={i} value={show._id} className="delete" onClick={handleDelete}>Remove From Queue</button>
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
        console.log('Error on search submittal', err)
      })
    }

  // If there is not a user, send them away
  if (!props.user) {
    return <Redirect to="/" />
  }

  const getFriends = (props) => {
    console.log(props.user)
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/friends/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      response.json()
      .then(result => {
        if(response.ok){
          console.log(result.friends)
          setFriendArr(result.friends)
        }
      })
    })
    
  }

let friendList;
//if props.user.friends.length == friendsarr.length THEN MAP AND FORM DIVS

// if(props.user.friends.length === friendArr.length){
  friendList = friendArr.map((friend, i) => {
    return(
      <div key={i} className="friend">
        <Link className="link" to={{pathname:`/friend/${friend._id}`, state: friend}}><h4>{friend.firstname}</h4></Link>
      </div>
    )
  })
  return (
    <div className="profile">
      <Container>
        <Row>
          <Col xs="6">
            <h2>{props.user.firstname}'s Profile</h2>
            <img alt="profile" src={props.user.profileUrl} />
            <br />
            <hr />
            <div className="friends">
              <h3>Search for Friends</h3>
              <form onSubmit={handleSubmit}>
                <input type="text" name="friendName" placeholder="search for friends" onChange={e => setFriendName(e.target.value)} />
                <button type="submit" className="submit">Submit</button>
              </form>
              <hr />
              <div className="friendList">
                <h2>My Friends</h2>
                {friendList}
              </div>
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