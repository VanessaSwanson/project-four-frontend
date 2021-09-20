import React from 'react'
import { useHistory, useParams } from 'react-router'
import { Alert, Button } from 'react-bootstrap'
import { getProfile, sendMessage } from '../../lib/api'
import { getUserId } from '../../lib/auth'
import useForm from '../hooks/useForm'

const initialState = {
  message: '',
}

function CreateMessage () {
  const history = useHistory()
  // const location = useLocation()
  const receiver = useParams()
  const [currentUser, setCurrentUser] = React.useState(null)
  const [show, setShow] = React.useState(false)
  const [alert, setAlert] = React.useState(null)
  const { formData, handleChange } = useForm(initialState)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfile(getUserId())
        setCurrentUser(res.data)
        const response = await getProfile(getUserId())
        return setCurrentUser(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [getUserId()])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendMessage(receiver.userId, formData)
      history.push(`/auth/${currentUser.id}/inbox/`)
    } catch (err) {
      setAlert(err.response?.data)
      setShow(true)
    }
  }

  return (
    <section className="create-post-section">
      <div className="form-container">
        <h2 id="red">Send a message</h2>
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
                  placeholder={'Message - ' + alert.caption[0]}
                  name="message"
                  onChange={handleChange}
                />
                :
                <textarea
                  className="input"
                  placeholder="Type message"
                  name="message"
                  onChange={handleChange}
                />
              }
            </div>
          </div>
          
          <div className="field">
            <button type="submit">Submit</button>
          </div>

        </form>
      </div>
    </section>
  )
}

export default CreateMessage