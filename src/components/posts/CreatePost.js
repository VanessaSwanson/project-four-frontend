import React from 'react'
// import { useHistory } from 'react-router'
import { Alert, Button } from 'react-bootstrap'
import { createPost } from '../../lib/api'
import ImageUpload from '../ImageUpload'
import useForm from '../hooks/useForm'

const initialState = {
  title: '',
  caption: '',
  image: '',
}

function CreatePost () {
  // const history = useHistory()
  const [show, setShow] = React.useState(false)
  const [alert, setAlert] = React.useState(null)
  const { formData, handleUploadedImage, handleChange } = useForm(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await createPost(formData)
      history.push('/posts')
      location.reload()
      console.log(response.data)
    } catch (err) {
      setAlert(err.response.data)
      setShow(true)
      console.log(err.response)
    }
  }

  return (
    <section className="create-post-section">
      <div className="form-container">
        <h2 id="red">Create a post </h2>
        <form
          className="form"
          onSubmit={handleSubmit}
        >
          <Alert show={show} variant="danger" className="alert">
            <p>Oops! </p>
            <Button onClick={() => setShow(false)} variant="danger">
            x
            </Button>
          </Alert>

          <div className="field">
            <div className="control">
              {alert?.caption ?
                <textarea
                  className="input-warning"
                  placeholder={'Caption - ' + alert.caption[0]}
                  name="caption"
                  onChange={handleChange}
                />
                :
                <textarea
                  className="input"
                  placeholder="Type caption here"
                  name="caption"
                  onChange={handleChange}
                />
              }
            </div>
          </div>
          <div className="field">
            {alert?.image ?
              <ImageUpload 
                value={formData.image}
                onChange={handleUploadedImage}
                name='image'
                uploadPreset = {process.env.REACT_APP_CLOUDINARY_POSTS_UPLOAD_PRESET}
                labelText='Image - this field may not be blank'
                className="input-warning"
              />
              :
              <ImageUpload 
                value={formData.image}
                onChange={handleUploadedImage}
                name='image'
                uploadPreset = {process.env.REACT_APP_CLOUDINARY_POSTS_UPLOAD_PRESET}
                labelText='Image'
              />
            }
          </div>

          <div className="field">
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default CreatePost