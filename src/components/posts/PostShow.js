import React from 'react'
import { useParams } from 'react-router-dom'
import { getSinglePost, getProfile } from '../../lib/api'

function PostShow() {
  const { postId } = useParams()
  const [post, setPost] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !post && !isError

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


  const isFollowing = post?.owner.followedBy.some(follower => {
    return follower === currentUser?.id
  })

  const hasLiked = post?.likedBy.some(fan => {
    return fan.id === currentUser?.id
  })

  const isOwner = post?.owner.id === currentUser?.id

  // console.log(hasLiked)
  // console.log(currentUser)

  // function to sort posts in time order
  function sortPosts(a, b) {
    const bandA = a.createdAt
    const bandB = b.createdAt
    let comparison = 0
    if (bandA > bandB) {
      comparison = 1
    } else if (bandA < bandB) {
      comparison = -1
    }
    return comparison
  }

  return (
    <section className="post-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <p>...loading</p>}
      {post &&
        <div className="post-show-container">
          <div className="post-show-main">
            <div className="post-show-left">
              <figure>
                <img className="post-image" src={post.image} alt={post.title}></img>
              </figure>
            </div>
            <div className="post-show-right">
              <div className="post-show-right-header">
                <figure>
                  <img className="owner-profile-image" src={post.owner.profileImage} alt={post.owner.username}/>
                </figure>
                <p><a href={`/auth/${post.owner.id}`}>{post.owner.username}</a></p>
                {
                  currentUser?.id === post.owner.id ?
                    <button className="edit-profile-button">
                      <a href={`/auth/${post.owner.id}/`}>Go to your profile</a>
                    </button>
                    :
                    <button className="follow-button">
                      <a href={`/auth/${post.owner.id}/follow/`}>{isFollowing ? 'Unfollow' : 'Follow'}</a>
                    </button>
                }
              </div>
              <div className="post-show-right-main">
                {/* Caption */}
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
                <div className="post-show-comments">
                  {/* Comments */}
                  {
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
                          <p><strong>{comment.owner.username}</strong></p>
                          <p>{comment.text}</p>
                          <div className="comment-nums">
                            <p>{comment.createdAt}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <div className="post-show-controls">
                  <div className="post-show-buttons">
                    {/* Like button */}
                    {isOwner ?
                      ''
                      :
                      <button className="like-button">
                        <a href={`/posts/${post.id}/like/`}>{hasLiked ? 'Unlike' : 'Like'}</a>
                      </button>  
                    }
                    {/* Comment button */}
                    <button className="comment-button">
                      <a href={`/posts/${post.id}/comment/`}>
                        Comment
                      </a>
                    </button>
                  </div>
                  <div className="post-show-nums">
                    <p>Liked by {post.likedBy.length}</p>
                    <p>{post.createdAt}</p>
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
                <div className="more-posts-card" key={post.id}>
                  <a href={`/posts/${post.id}`}>
                    <img className="more-posts-image" src={post.image} alt={post.title}/>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
              
      }
    </section>
  )
}

export default PostShow