// import React, { useState } from 'react'

// const Button = props => {
//     let [title, setTitle] = useState('')
//     let [type, setType] = useState('')
//     let [year, setYear] = useState('')
//     let [poster, setPoster] = useState('')

//     const addToQueue = e => {
//         e.preventDefault()
//         let token = localStorage.getItem('userToken')
//         fetch(`${process.env.REACT_APP_SERVER_URL}/shows`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//                 }
//             })
//             .then(response => response.json())
//                 .then(result => {
//                     setTitle(title)
//                     setType(type)
//                     setYear(year)
//                     setPoster(poster)
//                     console.log('Posting show to user?')
//                     console.log(result)
//                 })
//             .catch(err => {
//                 console.log('line 19 error', err)
//             })
//     }

//     return (
//         <div>
//             <button type="submit" onClick={addToQueue}>Add to Queue</button>
//         </div>
//     )
// }

// export default Button