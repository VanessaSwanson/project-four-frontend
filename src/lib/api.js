import axios from 'axios'

// POSTS
export function getAllPosts() {
  return axios.get('/api/posts')
}

// USERS
export function registerUser(formData) {
  return axios.post('/api/auth/register/', formData)
}

export function loginUser(formData) {
  return axios.post('/api/auth/login/', formData)
}
