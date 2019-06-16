import axios from 'axios'

const Comments = {
    getAll: userId => axios.get(`/comment/${userId}`),
    postOne: comment => axios.post('/comment', comment),
    deleteOne: commentId => axios.delete(`/comment/${commentId}`)

}

export default Comments