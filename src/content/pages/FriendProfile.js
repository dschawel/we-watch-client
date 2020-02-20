import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from 'reactstrap';
import {useParams} from 'react-router-dom'
// import FriendList from '../components/friendList'

const Profile = ({match},props) => {
let [shows, setShows] = useState('')
let { id } = useParams()
// const { friendId } = match.params.id

useEffect(() => {
    fetchShows()
}, [])

const fetchShows = () => {
    let token = localStorage.getItem('userToken')
    fetch(`${process.env.REACT_APP_SERVER_URL}/friends/${id}`, {
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
console.log(props.component)
// If there is not a user, send them away
return (
    <div className="profile">
    <Container>
        <Row>
        <Col xs="6">
            <h2>{id}'s Profile</h2>
            {/* <h3>{props.user.firstname} {props.user.lastname}</h3> */}
            {/* <img alt="profile" src={props.user.profileUrl} /> */}
            {/* <p>
            <strong>Email:</strong>
            {props.user.email}
            </p> */}
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