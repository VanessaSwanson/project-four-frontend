import React from 'react'
import { useHistory } from 'react-router'
import { Alert, Button } from 'react-bootstrap'

import { registerUser } from '../../lib/api'
import ImageUpload from '../ImageUpload'
import useForm from '../hooks/useForm'

const initialState = {
  username: '',
  fullName: '',
  email: '',
  profileImage: '',
  bio: '',
  password: '',
  passwordConfirmation: '',
}

function Register() {
  const history = useHistory()
  const [show, setShow] = React.useState(false)
  const [alert, setAlert] = React.useState(null)
  const { formData, formErrors, setFormErrors, handleChange, handleUploadedImage } = useForm(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await registerUser(formData)
      console.log(response)
      history.push('/auth/login/')
    } catch (err) {
      setFormErrors({ ...formErrors, ...err.response.data })
      setAlert(err.response.data)
      setShow(true)
      console.log(err.response)
    }
  }

  return (
    <>
      <section className="register">
        <div className="register-top">
          <h3>
            <span id="red">ko</span>
            <span id="yellow">ll</span>
            <span id="blue">ek</span>
            <span id="black">tiv</span>
          </h3>
          <h4>Sign up to see photos from your friends.</h4>
          <div className="form-container">
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
                  {alert?.username ?
                    <input
                      className="input-warning"
                      placeholder={'Username - ' + alert.username[0]}
                      name="username"
                      onChange={handleChange}
                    />
                    :
                    <input
                      className="input"
                      placeholder="Username"
                      name="username"
                      onChange={handleChange}
                    />
                  }
                </div>
              </div>
              <div className="field">
                <div className="control">
                  {alert?.fullName ?
                    <input
                      className="input-warning"
                      placeholder={'Full name - ' + alert.fullName[0]}
                      name="fullName"
                      onChange={handleChange}
                    />
                    :
                    <input
                      className="input"
                      placeholder="Full Name"
                      name="fullName"
                      onChange={handleChange}
                    />
                  }
                </div>
              </div>
              <div className="field">
                <div className="control">
                  {alert?.email ?
                    <input
                      className="input-warning"
                      placeholder={'Email - ' + alert.email[0]}
                      name="email"
                      onChange={handleChange}
                    />
                    :
                    <input
                      className="input"
                      placeholder="Email address"
                      name="email"
                      onChange={handleChange}
                    />
                  }
                </div>
              </div>
                
              <div className="field">
                {alert?.profileImage ?
                  <ImageUpload 
                    value={formData.profileImage}
                    onChange={handleUploadedImage}
                    name='profileImage'
                    uploadPreset = {process.env.REACT_APP_CLOUDINARY_PROFILE_UPLOAD_PRESET}
                    labelText='Profile Image - this field may not be blank'
                    className="input-warning"
                  />
                  :
                  <ImageUpload 
                    value={formData.profileImage}
                    onChange={handleUploadedImage}
                    name='profileImage'
                    uploadPreset = {process.env.REACT_APP_CLOUDINARY_PROFILE_UPLOAD_PRESET}
                    labelText='Profile Image'
                    className="file-label"
                  />
                }
              </div>
              <div className="field">
                <div className="control">
                  {alert?.bio ?
                    <textarea
                      className="input-warning"
                      placeholder={'Bio - ' + alert.bio[0]}
                      name="bio"
                      onChange={handleChange}
                    />
                    :
                    <textarea
                      className="input"
                      placeholder="Tell us a bit about yourself"
                      name="bio"
                      onChange={handleChange}
                    />
                  }
                </div>
              </div>
              <div className="field">
                <div className="control">
                  {alert?.password ?
                    <input
                      type="password"
                      className="input-warning"
                      placeholder={'Password - ' + alert.password[0]}
                      name="password"
                      onChange={handleChange}
                    />
                    :
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  }
                </div>
              </div>
              <div className="field">
                <div className="control">
                  {alert?.passwordConfirmation ?
                    <input
                      type="password"
                      className="input-warning"
                      placeholder={'Confirmation - ' + alert.passwordConfirmation[0]}
                      name="passwordConfirmation"
                      onChange={handleChange}
                    />
                    :
                    <input
                      type="password"
                      className="input"
                      placeholder="Password Confirmation"
                      name="passwordConfirmation"
                      onChange={handleChange}
                    />
                  }
                </div>
              </div>
  
              <div className="field">
                <button type="submit" className="register-button">Sign me up!</button>
              </div>

              <div className="register-terms">
                <p>By signing up, you agree to our Terms. Learn how we collect, use and share your data in our Data Policy, and how we use cookies and similar technology in our Cookie Policy.</p>
              </div>

            </form>
          </div>
        </div>
        <div className="register-bottom">
          <p>Have an account? <a href={'/auth/login/'}>Login</a></p>
        </div>
      </section>
    </>
  )
}

export default Register