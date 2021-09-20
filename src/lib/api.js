import axios from 'axios'
import { getToken } from './auth'

const baseUrl = '/api'

// AUTH
export function getHeaders() {
  return {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
}

// POSTS
export function getAllPosts() {
  return axios.get(`${baseUrl}/posts/`)
}

export function getSinglePost(id){
  return axios.get(`${baseUrl}/posts/${id}/`)
}

export function createPost(formData) {
  return axios.post(`${baseUrl}/posts/create/`, formData, getHeaders())
}

export function deletePost(id) {
  return axios.delete(`${baseUrl}/posts/${id}/`, getHeaders())
}

export function likePost(id) {
  return axios.post(`${baseUrl}/posts/${id}/like/`, null, getHeaders())
}

export function commentPost(id, formData) {
  return axios.post(`${baseUrl}/posts/${id}/comment/`, formData, getHeaders())
}

export function deleteCommentPost(id) {
  axios.delete(`${baseUrl}/posts/${id}/comment/${id}/`, getHeaders())
}


// USERS
export function registerUser(formData) {
  return axios.post(`${baseUrl}/auth/register/`, formData)
}

export function loginUser(formData) {
  return axios.post(`${baseUrl}/auth/login/`, formData)
}

export function getAllUsers() {
  return axios.post(`${baseUrl}/auth/`)
}

export function getSingleUser(id) {
  return axios.get(`${baseUrl}/auth/${id}/`)
}

export function followUser(id) {
  return axios.post(`${baseUrl}/auth/${id}/follow/`, null, getHeaders())
}

export function getProfile() {
  return axios.get(`${baseUrl}/auth/profile/`, getHeaders())
}

export function editProfile(id, formData) {
  return axios.put(`${baseUrl}/auth/${id}/edit/`, formData, getHeaders())
}

export function sendMessage(id, formData) {
  return axios.post(`${baseUrl}/auth/${id}/message/`, formData, getHeaders())
}