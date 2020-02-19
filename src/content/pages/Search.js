import React, { useState } from 'react'

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
            if (movieList.movie)
            return(
                <div key={i}>
                    <p>{movie.title}</p>
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
            {list}
        </div>
    )
}

export default Search

