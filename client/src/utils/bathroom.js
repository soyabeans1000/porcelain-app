import axios from 'axios'

const Bathrooms = {
    getAll: (city, state) => axios.get(`/bathrooms/${city}/${state}`),
    getOne: id => axios.get(`/bathrooms/${id}`),
    postOne: bathroom => axios.post('/bathrooms', bathroom),
    putOneIncrease: id => axios.put(`/bathrooms/increase/${id}`),
    putOneDecrease: id => axios.put(`/bathrooms/decrease/${id}`)
}

export default Bathrooms