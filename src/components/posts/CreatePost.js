import React from 'react'
import { useHistory } from 'react-router'
import { createPost } from '../../lib/api'

function CreatePost () {

  const history = useHistory()

  const [formData, setFormData] = React.useState(
    {
      title: '',
      caption: '',
      image: '',
    }
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createPost(formData)
      history.push('/posts')
      location.reload()
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="comments-form-container">
      <h2>Create a post </h2>
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">Post title</label>
          <div className="control">
            <input
              className="input"
              placeholder="Post title"
              name="title"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Caption</label>
          <div className="control">
            <textarea
              className="input"
              placeholder="Type caption here"
              name="caption"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input
              className="input"
              placeholder="Image link"
              name="image"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <button type="submit">Create posts</button>
        </div>

      </form>
    </div>
  )
}

export default CreatePost