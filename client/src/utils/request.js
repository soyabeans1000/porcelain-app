import axios from 'axios'

const Request = {
    getAll: _ => axios.get('/request'),
    postOne: bathroom => axios.post('/request', bathroom),
    deleteOne: id => axios.delete(`/request/${id}`)
}

export default Request