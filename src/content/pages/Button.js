import React from 'react'

const Button = props => {
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
                    console.log('Posting show to user?')
                    console.log(result)
                })
            .catch(err => {
                console.log('line 19 error', err)
            })
    }

    return (
        <div>
            <button type="submit" onClick={addToQueue}>Add to Queue</button>
        </div>
    )
}

export default Button