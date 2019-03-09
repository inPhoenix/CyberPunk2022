import axios from 'axios'

const isProduction = process.env.NODE_ENV === 'production'
const envURL = process.env.REACT_APP_API_URL || 'https://cybersocial.herokuapp.com'

//Local Environment
export default axios.create({
  baseURL: isProduction ? envURL : 'http://localhost:8080'
})
