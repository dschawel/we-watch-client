import React, { useState } from 'react'
import ReactCardCarousel from 'react-card-carousel';
// import Button from '../pages/Button'

const Search = () => {
  // Declare and initialize state variables
    let [query, setQuery] = useState('')
    let [movieList, setMovieList] = useState([])
    let [movieArr, setMovieArr] = useState([])
    let [serverMessage, setServerMessage] = useState('')

//Button for searching for a movie / tv show!
    const handleSubmit = e => {
        e.preventDefault()
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/shows/${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
                .then(result => {
                    // Reset the state
                    setQuery('')
                    // This populates a list of 10 movies from the OMDB api
                    setMovieList(result.Search)
                })
                .catch(err => {
                    setServerMessage('Error fetching movies!')
                })
    }

    let list;
    if(movieList){
        list = movieList.map((movie, i) => {
            const CARD_STYLE = {
                'backgroundImage': 'url(' + movie.Poster + ')',
                'backgroundSize': 'cover',
                'backgroundPosition': 'center'
                };
            return(
                <div className='movie' key={i} style={CARD_STYLE}>
                    <p className='movieTitle'>{movie.Title}</p>
                    <p>{movie.Year}</p>
                    <button type="submit" name={i} onClick={(e)=>{
                        e.preventDefault()
                        //Sets the movie currently 
                        setMovieArr(movieList[e.currentTarget.name])
                        let token = localStorage.getItem('userToken')
                        let data = {
                            title: movieList[e.currentTarget.name].Title,
                            year: movieList[e.currentTarget.name].Year,
                            poster: movieList[e.currentTarget.name].Poster,
                            type: movieList[e.currentTarget.name].Type
                        }
                        fetch(`${process.env.REACT_APP_SERVER_URL}/shows`, {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                                }
                            })
                            .then(response => response.json())
                            .then(result => {
                                setServerMessage(result.message)
                            })
                        .catch(err => {
                            console.log('line 73, MUCH LESS! error', err)
                        })
                    }}>Add to Queue</button>
                    
                </div>
            )
        })
    }
    console.log(list)
    return (
        <div className="search">
            <h2>Search</h2>
            <form onSubmit={handleSubmit} >
                <div>
                    <label>Show: </label>
                    <input type="text" name="query" onChange={e => setQuery(e.target.value)} />
                </div>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
            <div className="displayMovies">
                <div className="cardContainer">
                    <ReactCardCarousel autoplay={ true } autoplay_speed={ 15000 }>
                        {list}
                    </ReactCardCarousel>
                </div>
            </div>
            <p>{serverMessage}</p>
        </div>
    )
}

export default Search
