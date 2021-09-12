import React from 'react'
import { getProfile } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

function EventIndex() {
  const [user, setUser] = React.useState(null)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProfile()
        setUser(response.data)
      } catch (err) {
        console.log(err)
      }    
    }
    getData()
  },[])

  const isAuth = isAuthenticated()
  
  // These lines filter the home page so it shows posts from those you are following only, as well as your own posts
  const following = []
  const followingPosts = []

  user?.following?.map(account =>(
    following.push(account.postsMade)
  ))

  following.map(account => (
    followingPosts.push(...account)
  ))

  user?.postsMade.map(post => (
    followingPosts.push(post)
  ))

  // These lines filter users for your suggestions. It suggests accounts that people you follow are following.
  const key = 'username'
  const followingAccounts = []
  const suggestions = []

  user?.following.map(account => (
    followingAccounts.push(account)
  ))

  followingAccounts.map(account => (
    suggestions.push(...account.following)
  ))

  const arrayUniqueByKey = [...new Map(suggestions.map(item =>
    [item[key], item])).values()]

  // console.log(arrayUniqueByKey)
  // console.log('This is the user', user)
  // console.log('This is the people the user follows', user?.following)
  // console.log('This is the followingAccounts array', followingAccounts)
  // console.log('This is the suggestions array', suggestions)
  // console.log('This is the user postsMade', user?.postsMade)
  // console.log('This is the following array', following)
  // console.log('This is the followingObjs array', followingPosts)

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
    <section className="home-page-section">
      {user &&
        <>
          {isAuth ? 
            <div className="home-page">
              <div className="home-page-left">
                <div className="home-page-posts-container">
                  {followingPosts.sort(sortPosts).map(post => (
                    <div className="post-card" key={post.id}>
                      <div className="post-header">
                        <a className="post-header-link" href={`/auth/${post.owner?.id}`}>
                          <img src={post.owner?.profileImage} alt={post.owner?.username}/>
                          <p>{post.owner?.username}</p>
                        </a>
                      </div>
                      <img src={post.image} alt={post.title}/>
                      <div className="post-controls">
                        {/* Like button */}
                        {post.owner?.id === user.id ?
                          ''
                          :
                          <button className="like-button">
                            <a href={`/posts/${post.id}/like/`}>
                              {post.likedBy.some(fan => (fan.id === user.id)) ? 'Unlike' 
                                : 
                                'Like'}</a>
                          </button>  
                        }
                        {/* Comment button */}
                        <button className="comment-button">
                          <a href={`/posts/${post.id}/comment/`}>
                        Comment
                          </a>
                        </button>
                      </div>
                      <p>{post.likedBy.length} likes</p>
                      <p><strong>{post.owner.username}</strong> {post.caption}</p>
                      <p>{post.createdAt}</p>
                      <div className="home-comment-container">
                        {post.comments.map(comment=>(
                          <p key={comment.id}><strong>{comment.owner.username}</strong> {comment.text}</p>
                        ))
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="home-page-right">
                <h4>Suggestions for you</h4>
                <div className="suggestion-posts-container">
                  {arrayUniqueByKey.map(suggestion=>(
                    suggestion.id === user.id || suggestion.followedBy.some(follower => (follower.id === user.id)) ?
                      ''
                      :
                      <div className="suggestion-card" key={suggestion.id}>
                        <div className="suggestion-card-left">
                          <img src={suggestion.profileImage} alt={suggestion.username}/>
                        </div>
                        <div className="suggestion-card-right">
                          <div className="suggestion-card-name">
                            <p><strong>{suggestion.username}</strong></p>
                            <p>Suggested for you</p>
                          </div>
                          <button className="follow-button">
                            <a href={`/auth/${suggestion.id}/follow/`}>Follow</a>
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>
            :
            <h1>Login to Kollektiv</h1>
          }
        </>
      }
    </section>
  )
  
}
export default EventIndex