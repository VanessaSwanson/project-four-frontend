import React from 'react'
import { useHistory } from 'react-router'
import { createPost } from '../../lib/api'
import ImageUpload from '../ImageUpload'

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

  const handleUploadedImage = (imageUrl, fieldName) => {
    setFormData({ ...formData, [fieldName]: imageUrl })
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
    <div className="form-container">
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
          <label className="label caption">Caption</label>
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
          <ImageUpload 
            value={formData.image}
            onChange={handleUploadedImage}
            name='image'
            uploadPreset = {process.env.REACT_APP_CLOUDINARY_POSTS_UPLOAD_PRESET}
            labelText='Image'
          />
        </div>

        <div className="field">
          <button type="submit">Submit</button>
        </div>

      </form>
    </div>
  )
}

export default CreatePost