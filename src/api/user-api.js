import axios from 'axios';

const create = (user) => {
    console.log("API Create method")
    return fetch(
        axios.post('http://localhost:5000/users/new', user)
        .then((result) => {
          return result.data
        })
    )
}

export {
  create
}