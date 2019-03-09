import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'

//Local Environment
export default axios.create({
  baseURL: isProduction ? 'https://cybersocial.herokuapp.com' : 'http://localhost:8080'
})
