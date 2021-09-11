import React from 'react'
import { useHistory, useParams } from 'react-router'
import { commentPost } from '../../lib/api'

function PostComment () {
  const { postId } = useParams()
  const history = useHistory()

  const [formData, setFormData] = React.useState(
    {
      text: '',
    }
  )

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await commentPost(postId, formData)
      history.push(`/posts/${postId}/`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="comments-form-container">
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label className="label">Comment</label>
          <div className="control">
            <textarea
              className="input"
              placeholder="Type comment here"
              name="text"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="field">
          <button type="submit">Create comment</button>
        </div>

      </form>
    </div>
  )
}

export default PostComment