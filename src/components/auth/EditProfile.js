import React from 'react'
import { useParams, useHistory } from 'react-router'
import { getSingleUser, editProfile } from '../../lib/api'

function EditProfile() {
  const { userId } = useParams()
  const [user, setUser] = React.useState(null)
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

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getSingleUser(userId)
        setUser(data)
        // console.log(data)
        setFormData(data)
        // console.log(user)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [userId])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newProfile = { ...formData }
      await editProfile(user.id, newProfile)
      console.log(newProfile)
      history.push(`/auth/${user.id}/`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className="edit-profile-section">
        <h2>Edit your profile</h2>
        <div className="container">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className="input"
                  placeholder={user?.username}
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
                  placeholder={user?.fullName}
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
                  placeholder={user?.email}
                  name="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Profile Image</label>
              <div className="control">
                <input
                  className="input"
                  placeholder="Link to your profile image here"
                  name="profileImage"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Bio</label>
              <div className="control">
                <textarea
                  className="input"
                  placeholder={user?.bio}
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
              <button type="submit" className="register-button">Edit profile</button>
            </div>

          </form>
        </div>
      </section>
    </>
  )
}

export default EditProfile