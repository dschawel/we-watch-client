import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap';
import {useParams} from 'react-router-dom'
// import FriendList from '../components/friendList'

const Profile = (props) => {
let [name, setName] = useState('')
let [shows, setShows] = useState('')
let { id } = useParams()
// const { friendId } = match.params.id

useEffect(() => {
    fetchShows()
}, [])

const fetchShows = () => {
    //This entire page hinges on this function, it actually fetches all the "friend" data off their ID
    //And posts it here. This is actually likely a security fault, and is a planned change for the future.
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/friends/${id}`, {
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
    })
    .then(response => {
    response.json().then(result => {
        //This can be changed, but I wanted to display a full name out of principle here.
        //Mostly because I made funny full names in my local database.
        let name = result.friend.firstname + ' ' + result.friend.lastname
        //Populates the friend's movies onto their page, as well as their name.
        //It looks simple, but this took a bit!
        setShows(result.show)
        setName(name)
        
    })
    .catch(err => {
        console.log('Error in show fetch', err)
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
                </div>
            </div>
    )
    })
} else {
    content = <p>No Shows Yet...</p>
}
return (
    <div className="profile">
    <Container>
        <Row>
        <Col xs="6">
            <h2>{name}'s Profile</h2>
            <br />
            <hr />
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