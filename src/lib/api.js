import axios from 'axios'

export function getAllPosts() {
  return axios.get('/api/posts')
}