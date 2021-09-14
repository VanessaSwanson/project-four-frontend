import React from 'react'
import { useParams, useHistory } from 'react-router'
import { Alert, Button } from 'react-bootstrap'
import { editProfile, getSingleUser } from '../../lib/api'
import ImageUpload from '../ImageUpload'


function EditProfile() {
  const { userId } = useParams()
  const [user, setUser] = React.useState(null)
  const history = useHistory()
  const [show, setShow] = React.useState(false)
  const [alert, setAlert] = React.useState(null)

  const [formData, setFormData] = React.useState({
    username: '',
    fullName: '',
    email: '',
    profileImage: '',
    bio: '',
    password: '',
    passwordConfirmation: '',
  })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSingleUser(userId)
        setUser(data)
        // console.log(data)
        setFormData(data)
        console.log(user)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])

  const handleUploadedImage = (imageUrl, fieldName) => {
    setFormData({ ...formData, [fieldName]: imageUrl })
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newProfile = { ...formData }
      await editProfile(userId, newProfile)
      console.log(newProfile)
      history.push(`/auth/${userId}/`)
    } catch (err) {
      setAlert(err.response.data)
      setShow(true)
      console.log(err.response)
    }
  }

  return (
    <>
      <section className="edit-profile-section">
        <div className="form-container">
          <h2 id="red">Edit your profile</h2>
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
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                  />
                  :
                  <input
                    className="input"
                    placeholder={'Username - ' + formData.username}
                    value={formData.username}
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
                    placeholder={'Full name - ' + formData.fullName[0]}
                    value={formData.fullName}
                    name="fullName"
                    onChange={handleChange}
                  />
                  :
                  <input
                    className="input"
                    placeholder={'Full name - ' + formData.fullName}
                    value={formData.fullName}
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
                    placeholder={'Email - ' + formData.email[0]}
                    value={formData.email}
                    name="email"
                    onChange={handleChange}
                  />
                  :
                  <input
                    className="input"
                    placeholder={'Email - ' + formData.email}
                    value={formData.email}
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
                    placeholder={'Bio - ' + formData.bio[0]}
                    value={formData.bio}
                    name="bio"
                    onChange={handleChange}
                  />
                  :
                  <textarea
                    className="input"
                    placeholder={'Bio - ' + formData.bio}
                    value={formData.bio}
                    name="bio"
                    onChange={handleChange}
                  />
                }
              </div>
            </div>
            
            
            <div className="field">
              <button type="submit" className="register-button">Submit</button>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

export default EditProfile