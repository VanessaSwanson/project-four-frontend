import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSinglePost, likePost, getProfile } from '../../lib/api'


function PostLike() {
  const { postId } = useParams()
  const [post, setPost] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const history = useHistory()

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSinglePost(postId)
        return setPost(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  },[postId])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfile()
        return setCurrentUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  const handleLike = async () => {
    try { 
      await likePost(postId)
      const res = await getProfile()
      setCurrentUser(res.data)
      history.push(`/posts/${postId}/`)
    } catch (err) {
      console.log(err)
    }
  } 

  const hasLiked = post?.likedBy.some(fan => {
    return fan.id === currentUser?.id
  })

  console.log(post)
  console.log(hasLiked)
  console.log(currentUser)

  return (
    <section className="like-section">
      {hasLiked ?
        <div className="like-card">
          <h3>Want to unlike this post from {post.owner.username}?</h3>
          <button className="like-button" onClick = {handleLike}>
        Unlike
          </button> 
          <button className="like-button">
            <a href={`/posts/${postId}`}>Cancel</a>
          </button> 
        </div>
        :
        <div className="like-card">
          <h3>Want to like this post from {post?.owner.username}?</h3>
          <button className="like-button" onClick = {handleLike}>
        Like
          </button> 
          <button className="like-button">
            <a href={`/posts/${postId}`}>Cancel</a>
          </button> 
        </div>
      }

    </section>
  )

}

export default PostLike