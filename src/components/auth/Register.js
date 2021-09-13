import React from 'react'
import { useHistory } from 'react-router'
import { registerUser } from '../../lib/api'
import ImageUpload from '../ImageUpload'

function Register() {
  const history = useHistory()

  const [formData, setFormData] = React.useState({
    username: '',
    fullName: '',
    email: '',
    profileImage: '',
    bio: '',
    password: '',
    passwordConfirmation: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleUploadedImage = (imageUrl, fieldName) => {
    setFormData({ ...formData, [fieldName]: imageUrl })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await registerUser(formData)
      console.log(response)
      history.push('/auth/login/')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className="register">
        <h2>Sign up to see photos from your friends</h2>
        <div className="form-container">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Username"
                  name="username"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Full Name</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Full Name"
                  name="fullName"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Email address"
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <ImageUpload 
                value={formData.profileImage}
                onChange={handleUploadedImage}
                name='profileImage'
                uploadPreset = {process.env.REACT_APP_CLOUDINARY_PROFILE_UPLOAD_PRESET}
                labelText='Profile Image'
              />
            </div>
            <div className="field">
              <label className="label">Bio</label>
              <div className="control">
                <textarea
                  className="input"
                  placeholder="Tell us a bit about yourself"
                  name="bio"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Password confirmation</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  placeholder="Password Confirmation"
                  name="passwordConfirmation"
                  onChange={handleChange}
                />
              </div>
            </div>
            
            <div className="field">
              <button type="submit" className="register-button">Sign me up!</button>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

export default Register