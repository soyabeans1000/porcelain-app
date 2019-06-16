import axios from 'axios'

const Likes = {
    getAll: userId => axios.get(`/like/${userId}` ),
    getOne: (userId, bathroomId) => axios.get(`/like/${userId}/${bathroomId}`),
    postOne: like => axios.post('/like', like),
    deleteOne: id => axios.delete(`/like/${id}`)
}

export default Likes