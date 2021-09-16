import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TimeAgo from 'react-timeago'
import { Modal, Button } from 'react-bootstrap'
import { getSinglePost, getProfile, likePost, commentPost, deletePost,deleteCommentPost, followUser } from '../../lib/api'
import PostCard from './PostCard'
import Loading from '../common/Loading'
import like from '../common/resources/like.png'
import unlike from '../common/resources/unlike.png'
import comment from '../common/resources/comment.png'


function PostShow() {
  const { postId } = useParams()
  const [post, setPost] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !post && !isError
  const history = useHistory()
  const [alert, setAlert] = React.useState(null)
  const [isShow, setIsShow] = React.useState(false)
  const [formErrors, setFormErrors] = React.useState(null)
  const [formData, setFormData] = React.useState(
    {
      text: '',
    }
  )

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSinglePost(postId)
        setPost(response.data)
      } catch (err) {
        setIsError(true)
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
      // const res = await getProfile()
      const res = await getSinglePost(postId)
      setPost(res.data)
      history.push(`/posts/${postId}/`)
    } catch (err) {
      console.log(err)
    }
  } 

  const handleFollow = async (e) => {
    try { 
      const userId = e.target.name
      await followUser(userId)
      const res = await getSinglePost(postId)
      setPost(res.data)
      history.push(`/posts/${postId}/`)
    } catch (err) {
      console.log(err)
    }
  } 

  const handleDeletePost = async () => {
    try {
      await deletePost(postId)  
      history.push('/')
    } catch (err) {
      console.log(err)
    }
  }

  const handleOpenModal = async () => {
    setIsShow(true)
  }

  const handleCloseModal = async () => {
    setIsShow(false)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await commentPost(postId, formData)
      const res = await getSinglePost(postId)
      setPost(res.data)
      setFormData('')
      history.push(`/posts/${postId}/`)
    } catch (err) {
      setFormErrors({ ...formErrors, ...err.response.data })
      setAlert(err.response.data)
      console.log(err.response)
      console.log(alert)
    }
  }

  const handleDeleteComment = async (e) => {
    e.preventDefault()
    try {
      const commentId = e.target.name
      await deleteCommentPost(commentId)  
      const res = await getSinglePost(postId)
      setPost(res.data)
      const response = await getSinglePost(postId)
      setPost(response.data)
      history.push(`/posts/${postId}/`)
      // location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const isFollowing = post?.owner.followedBy.some(follower => {
    return follower === currentUser?.id
  })

  const hasLiked = post?.likedBy.some(fan => {
    return fan.id === currentUser?.id
  })

  const isOwner = post?.owner.id === currentUser?.id

  // function to sort posts in time order
  function sortPosts(a, b) {
    const bandA = a.createdAt
    const bandB = b.createdAt
    let comparison = 0
    if (bandA > bandB) {
      comparison = -1
    } else if (bandA < bandB) {
      comparison = 1
    }
    return comparison
  }

  return (
    <section className="post-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <Loading/>}
      {post &&
        <div className="post-show-container">
          {isShow &&
              <Modal.Dialog
                size="sml"
                aria-labelledby="contained-modal-title-vcenter"
                centered
              >
                <Modal.Body>
                  <h5>Are you sure you want to delete this post?</h5>
                </Modal.Body>
            
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
                  <Button variant="danger" onClick={handleDeletePost}>Delete</Button>
                </Modal.Footer>
              </Modal.Dialog>}
          <div className="post-show-main">
            <div className="post-show-left">
              {currentUser?.id === post.owner.id ?
                <div className="post-delete-button">
                  <button onClick={handleOpenModal}>...</button>
                </div>
                :
                <div style={{ display: 'none' }}></div>
              }
              <div className="post-image">
                <figure>
                  <img src={post.image} alt={post.title}></img>
                </figure>
              </div>
            </div>
            <div className="post-show-right">
              <div className="header-container">
                <div className="post-show-right-header">
                  <figure>
                    <img className="owner-profile-image" src={post.owner.profileImage} alt={post.owner.username}/>
                  </figure>
                  <p><a href={`/auth/${post.owner.id}`}><strong>{post.owner.username}</strong></a></p>
                  {
                    currentUser?.id === post.owner.id ?
                    
                      <p className="follow"><a href={`/auth/${post.owner.id}/`}>Your profile</a></p>
                
                      :
                    
                      <button className="follow" onClick={handleFollow} name={post.owner.id}>
                        {isFollowing ? 'Unfollow' : 'Follow'}
                      </button>
                  }
                </div>
              </div>
              <div className="post-show-right-main">
                {/* Caption */}
                <div>
                  <div className="post-show-caption">
                    <div className="post-show-caption-left">
                      <figure>
                        <img className="owner-profile-image" src={post.owner.profileImage} alt={post.owner.username}/>
                      </figure>
                    </div>
                    <div className="post-show-caption-right">
                      <p><strong>{post.owner.username}</strong></p>
                      <p>{post.caption}</p>
                    </div>
                  </div>
                </div>
                {/* Comments */}
                <div className="post-show-comments">
                  { post.comments.length === 0 ?
                    <p className="no-comments">No comments yet</p>
                    :
                    post.comments.map(comment =>(
                      <div className="post-show-comment-container" key={comment.id}>

                        <div className="post-show-comment-left">
                          <figure>
                            <a href={`/auth/${comment.owner.id}/`}>
                              <img className="owner-profile-image" src={comment.owner.profileImage} alt={comment.owner.username}/>
                            </a>
                          </figure>
                        </div>
                        <div className="post-show-comment-right">
                          <div className="comment">
                            <p><strong>{comment.owner.username}</strong></p>
                            <p>{comment.text}</p>
                            <div className="comment-nums">
                              <p> <TimeAgo date={comment.createdAt}/> </p>
                            </div>
                          </div>
                          {currentUser?.id === comment.owner.id ?
                            <button onClick={handleDeleteComment} name={comment.id}>x</button>
                            :
                            ''
                          }
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="post-show-nums">
                  <p>Liked by <strong>{post.likedBy.length}</strong></p>
                  <p className="created-at"><TimeAgo date={post.createdAt}/></p>
                </div>
                <div className="post-show-controls">
                  <div className="post-show-buttons">
                    {/* Like button */}
                    {isOwner ?
                      ''
                      :
                      <a className="like-button" onClick={handleLike}>
                        {hasLiked ? <img src={unlike} alt="Unlike"/>
                          : 
                          <img src={like} alt="Like"/>}
                      </a>
                    }
                  </div>
                  <div className="comments-form-container">
                    <form
                      className="form"
                      onSubmit={handleSubmit}
                    >    
                      <img src={comment} alt="Comment"/>             
                      <textarea
                        className="input"
                        placeholder="Add a comment..."
                        name="text"
                        onChange={handleChange}
                      />
                      <button type="submit">Post</button>

                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr></hr>
          <div className="post-show-lower">
            <p>More posts from <strong>{post.owner.username}</strong></p>
            {/* {console.log(post.owner)} */}
            <div className="more-posts-container">
              {post.owner.postsMade.sort(sortPosts).slice(0, 3).map(post=>
              
                <PostCard key={ post.id } {...post}/>
            
              )}
            </div> 
          </div>
        </div>
              
      }
    </section>
  )
}

export default PostShow