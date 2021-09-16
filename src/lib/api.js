import axios from 'axios'
import { getToken } from './auth'

// AUTH
export function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// POSTS
export function getAllPosts() {
  return axios.get('/api/posts')
}

export function getSinglePost(id){
  return axios.get(`/api/posts/${id}`)
}

export function createPost(formData) {
  return axios.post('/api/posts/create/', formData, getHeaders())
}

export function deletePost(id) {
  return axios.delete(`/api/posts/${id}/`, getHeaders())
}

export function likePost(id) {
  return axios.post(`/api/posts/${id}/like/`, null, getHeaders())
}

export function commentPost(id, formData) {
  return axios.post(`/api/posts/${id}/comment/`, formData, getHeaders())
}

export function deleteCommentPost(id) {
  axios.delete(`/api/posts/${id}/comment/${id}`, getHeaders())
}


// USERS
export function registerUser(formData) {
  return axios.post('/api/auth/register/', formData)
}

export function loginUser(formData) {
  return axios.post('/api/auth/login/', formData)
}

export function getAllUsers() {
  return axios.post('/api/auth')
}

export function getSingleUser(id) {
  return axios.get(`/api/auth/${id}`)
}

export function followUser(id) {
  return axios.post(`/api/auth/${id}/follow/`, null, getHeaders())
}

export function getProfile() {
  return axios.get('/api/auth/profile', getHeaders())
}

export function editProfile(id, formData) {
  return axios.put(`/api/auth/${id}/edit/`, formData, getHeaders())
}

export function sendMessage(id, formData) {
  return axios.post(`/api/auth/${id}/message/`, formData, getHeaders())
}