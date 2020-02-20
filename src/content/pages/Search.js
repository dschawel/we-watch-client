import React, { useState } from 'react'
import ReactCardCarousel from 'react-card-carousel';

const Search = () => {
  // Declare and initialize state variables
    let [query, setQuery] = useState('')
    let [movieList, setMovieList] = useState([])

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
        </div>
    )
}

export default Search