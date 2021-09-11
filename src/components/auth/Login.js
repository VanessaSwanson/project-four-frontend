import React from 'react'
import { useHistory } from 'react-router'
import { setToken } from '../../lib/auth'
import { loginUser } from '../../lib/api'

function Login() {
  const history = useHistory()
  const [loggedInUserUsername, setLoggedInUserUsername] = React.useState(null)

  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser(formData)
      console.log(response)
      setToken(response.data.token)
      setLoggedInUserUsername(response.data.message.split(' ').splice(2).toString())
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  console.log(loggedInUserUsername)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <section className="login">
      <div className="container">
        <div className="columns">
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
              <button type="submit" className="login-button">Login</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
