// Packages
import React from 'react'
import { Route } from 'react-router-dom'

// Custom componentd
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Signup from './pages/Signup'
import Search from './pages/Search'
import FriendProfile from './pages/FriendProfile'

// import Button from './pages/Button'

const Content = props => {
  return (
    <div className="container">
      <Route exact path="/" component={Home} />
      <Route path="/login" render={
        () => <Login user={props.user} updateUser={props.updateUser} />
      } />
      <Route path="/profile" render={
        () => <Profile user={props.user} updateUser={props.updateUser} />
      } />
      <Route path="/search" render={
        () => <Search user={props.user} />
      } />
      <Route path="/signup" render={
        () => <Signup user={props.user} updateUser={props.updateUser} />
      } />
      <Route path="/friend/:id" render={
        () => <FriendProfile user={props.user} component={ Profile } />
      } />
    </div>
  )
}

export default Content
