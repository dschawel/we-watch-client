## We-Watch
https://we-watch2.herokuapp.com/
We-Watch is an app designed to let friends share what they are watching.  Every time I'm at a dinner party my friends and I discuss what we watch and I always say to myself that I should add that to my queue when I get home.  Hence the creation of We-Watch!

## Technologies used
* MongoDB/Mongoose ODM
* Express/NodeJS
* CORS - Enables secure cross-domain resource sharing
* OMDB API
* Bcrypt - User authentication via password hashing
* JWT - JSON Web Token securing user interaction throughout the app with SSO
* React
* React-router-dom
* Reactstrap/Bootstrap

## Routes/Models
* Routes
    * Auth
    - `POST /auth/signup` - Creates a user and generates a token
    - `POST /auth/login` - Verifies user credentials and signs them in
    - `GET /auth/profile` - Gets the profile page
    * Shows
    - `GET /shows/:query` - Submits the query to the OMDB API
    - `GET /shows` - Gets all shows associated with the user
    - `POST /shows` - Allows a user to add a show to their queue
    - `DELETE /shows/:showId` - Allows a user to remove a show from their queue
    * Friends
    - `GET /friends` - Gets friends associated with the user
    - `GET /friends/:_id` - Shows the friends profile 
    - `POST /friends/search` - Able to add a friend

* Models
    - User
     firstname, lastname, email, password, profileUrl, friends
    - Show
     title, type, year, poster, user

## Use Cases
As a user I want to be able to connect with my friend and see what they are watching.  Then I can find the show and add it to my queue.
As a user I can: 
    - Search for a show and add it to my queue.
    - Remove a show from my queue.
    - Search for and add a friend.
    - View a friends queue.

## Development Process
    - February 18th 2020
    Came up with idea for this app, worked on building out the backend routes
    - February 19th 2020
    Finished backend routes and worked on getting client side code working
    - February 20th 2020
    Finished client side code and deployed via heroku
    - February 21st 2020
    Presented final app

### Get Started
For local development
1. Fork and clone
2. Run `npm i` (run `npm audit fix` if needed - stuff changes a lot in React!)
3. Create a `.env.local` file at the top level 
4. Create an environment variable called REACT_APP_SERVER_URL set to the localhost server's url
