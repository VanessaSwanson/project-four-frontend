import React from 'react'
import { useHistory } from 'react-router'
import { Alert, Button } from 'react-bootstrap'

import { setToken } from '../../lib/auth'
import { loginUser } from '../../lib/api'
import useForm from '../hooks/useForm'


const initialState = {
  username: '',
  password: '',
}

function Login() {
  const history = useHistory()
  const [show, setShow] = React.useState(false)
  const [alert, setAlert] = React.useState(null)
  // const [loggedInUserUsername, setLoggedInUserUsername] = React.useState(null)
  const { formData, formErrors, handleChange, setFormErrors } = useForm(initialState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser(formData)
      console.log(response)
      setToken(response.data.token)
      // setLoggedInUserUsername(response.data.message.split(' ').splice(2).toString())
      history.push('/')
    } catch (err) {
      setFormErrors({ ...formErrors, ...err.response.data.errors })
      setAlert(err.response.data.detail)
      setShow(true)
      console.log(err.response)
    }
  }

  return (
    <section className="login">

      <div className="login-top">
        <h3>
          <span id="red">ko</span>
          <span id="yellow">ll</span>
          <span id="blue">ek</span>
          <span id="black">tiv</span>
        </h3>
        
        <div className="form-container">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <Alert show={show} variant="danger" className="alert">
              <p>Oops! Error: {alert}</p>
              <Button onClick={() => setShow(false)} variant="danger">
                x
              </Button>
            </Alert>
            <div className="field">
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
              <div className="control">
                <input
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
      <div className="login-bottom">
        <p>No account yet? <a href={'/auth/register/'}>Sign up</a></p>
      </div>
    </section>
  )
}

export default Login
