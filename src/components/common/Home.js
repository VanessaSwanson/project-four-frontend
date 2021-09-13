import React from 'react'
import { getProfile } from '../../lib/api'
import { isAuthenticated } from '../../lib/auth'

import matisse from './resources/matisse.png'
import unlike from './resources/unlike.png'
import like from './resources/like.png'
import comment from './resources/comment.png'

function Home() {
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
  console.log(isAuth)
  
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
      {/* {user && */}
      <>
        {!isAuth ?
          <h1>Login to Kollektiv</h1>
          :
        
          <div className="home-page">
            {followingPosts.length === 0 ? 
              <div className="unpopulated-home-page">  
                <div className="unpopulated-home-page-top">
                  <h4>You aren&#39;t following anybody yet. 
                    <br></br> 
                    <br></br>
                    Go to the explore page to find some cool accounts and populate your home feed.</h4>
                  <button><a href={'/posts/'}>Explore Kollektiv</a></button>
                </div>    
                <div className="unpopulated-home-page-bottom">
                  <figure>
                    <img src={matisse} alt="Henri Matisse, The Sheaf, 1953"/>
                  </figure>
                </div>    
              </div>
              :
              <>
                <div className="home-page-left">
                  <div className="home-page-posts-container">
                    {followingPosts.sort(sortPosts).map(post => (
                      // POST CARD
                      <div className="post-card" key={post.id}>
                        <div className="post-header">
                          <a className="post-header-link" href={`/auth/${post.owner?.id}`}>
                            <img className="mini-profile-image" src={post.owner?.profileImage} alt={post.owner?.username}/>
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
                                {post.likedBy.some(fan => (fan.id === user.id)) ? 
                                  <img src={unlike} alt="Unlike"/>
                                  : 
                                  <img src={like} alt="Like"/>
                                }
                              </a>
                            </button>  
                          }
                          {/* Comment button */}
                          <button className="comment-button">
                            <a href={`/posts/${post.id}/comment/`}>
                              <img src={comment} alt="Comment"/>
                            </a>
                          </button>
                        

                        </div>
                        <div className="post-info">
                          <p><strong>{post.likedBy.length} likes</strong></p>
                          <p><strong>{post.owner.username}</strong> {post.caption}</p>
                          <p>{post.createdAt}</p>
                        </div>
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
                  <h5>Suggestions for you</h5>
                  <div className="suggestion-posts-container">
                    {arrayUniqueByKey.length === 0 &&
                      <div className="unpopulated-suggestions">        
                        <h6>
                          No suggestions yet! 
                          <br></br> 
                          <br></br>
                          Go to the explore page to find some cool accounts and populate your home feed.
                        </h6>
                        <button><a href={'/posts/'}>Explore Kollektiv</a></button>
                      </div>
                    }
                    {arrayUniqueByKey.length > 0 &&
                    arrayUniqueByKey.map(suggestion=>(
                      suggestion.id === user.id || suggestion.followedBy.some(follower => (follower.id === user.id)) ?
                        ''
                        :
                        <div className="suggestion-card" key={suggestion.id}>
                          <div className="suggestion-card-left">
                            <img className="mini-profile-image" src={suggestion.profileImage} alt={suggestion.username}/>
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
              </>
            }
          </div>
        } 
      </>
      {/* } */}
    </section>
  )
  
}
export default Home