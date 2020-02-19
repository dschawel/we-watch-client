import React, { useState } from 'react'
import ReactCardCarousel from 'react-card-carousel';
// import Button from '../pages/Button'

const Search = () => {
  // Declare and initialize state variables
    let [query, setQuery] = useState('')
    let [movieList, setMovieList] = useState([])
    let [movie, setMovie] = useState('')

    console.log(query)
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
                    console.log('I am the result:', result.Search)
                    setMovieList(result.Search)
                    
                    console.log('I am the list:', movieList)
                })
                .catch(err => {
                    console.log('Error Getting', err)
                })
        console.log('List:', movieList)
    }

    const addToQueue = e => {
        e.preventDefault()
        let token = localStorage.getItem('userToken')
        fetch(`${process.env.REACT_APP_SERVER_URL}/shows`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
                }
            })
            .then(response => response.json())
                .then(result => {
                    // setMovie(movie)
                    console.log('Posting show to user?')
                    console.log('Added to movie queue', movie)
                })
            .catch(err => {
                console.log('line 19 error', err)
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
            console.log(movie)
            return(
                <div className='movie' key={i} style={CARD_STYLE}>
                    <p className='movieTitle'>{movie.Title}</p>
                    <p>{movie.Year}</p>
                    <button type="submit" onClick={addToQueue} onChange={e => setMovie(e.target.value)}>Add to Queue</button>
                </div>
            )
        })
    }

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
        </div>
    )
}

export default Search

// static get CARD_STYLE() {
//     return {
//     height: '200px',
//     width: '200px',
//     paddingTop: '80px',
//     textAlign: 'center',
//     background: '#52C0F5',
//     color: '#FFF',
//     fontSize: '12px',
//     textTransform: 'uppercase',
//     borderRadius: '10px',
//     };
// }

