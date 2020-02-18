import React, { useState } from 'react'

const Search = props => {
  // Declare and initialize state variables
    let [query, setQuery] = useState('')
    
    const handleSubmit = e => {
        e.preventDefault()
        let token = localStorage.getItem('userToken')
        // let q = {
        //     query
        // }
        fetch(`${process.env.REACT_APP_SERVER_URL}/shows`, {
            method: 'GET',
            // body: JSON.stringify(q),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
            // .then(response => response.json())
            // .then(result => {
            //     // Reset the state
            //     setQuery('')
            //     console.log(result)
            // })
            // .catch(err => {
            //     console.log('Error Posting', err)
            // })
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
        </div>
    )
}

export default Search

