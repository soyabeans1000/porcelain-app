import axios from 'axios'

const Image = {
    postOne: fd => axios.post('/image', fd)
}

export default Image