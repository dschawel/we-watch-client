import React, { useState } from 'react'

const Search = props => {

    let [query, setQuery] = useState('')
    
    const handleSubmit = e => {
        e.preventDefault()
        let q = {
            query
        }
        fetch(process.env.REACT_APP_SERVER_URL + '/shows', {
            method: 'POST',
            body: JSON.stringify(q),
            headers: {
                'Content-Type': 'application/json'
            }
        .then(response => {
            response.json().then(result => {
                console.log(result)
            })
        .catch(err => {
            console.log('error', err)
            })
        })
    })
}

    return (
        <div className="search">
            <h2>Search</h2>
            <form onSubmit={handleSubmit} />
                <label>Show: </label>
                <input type="text" name="query" onChange={e => setQuery(e.target.value)} />
                <button type="submit">Submit</button>
            <form />
        </div>
    )
}

export default Search

