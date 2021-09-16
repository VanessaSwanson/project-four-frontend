import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { getSingleUser, getProfile, followUser } from '../../lib/api'
import Loading from '../common/Loading'
import michelangelo from '../common/resources/michelangelo.png'


function UserShow() {
  const { userId } = useParams()
  const [user, setUser] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isError, setIsError] = React.useState(false)
  const isLoading = !user && !isError

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleUser(userId)
        setUser(response.data)
      } catch (err) {
        setIsError(true)
      }
    }
    getData()
  },[userId])

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

  const handleFollow = async () => {
    try { 
      await followUser(userId)
      const res = await getSingleUser(userId)
      setUser(res.data)
      history.pushState(`/auth/${userId}/`)
    } catch (err) {
      console.log(err)
    }
  } 

  const isFollowing = user?.followedBy.some(follower => {
    return follower.id === currentUser?.id
  })

  return (
    <section className="user-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <Loading />}
      {user &&
        <div className="user-show-container">
          {/* HEADER */}
          <div className="user-show-header">
            <div className="user-show-header-left">
              {/* PROFILE IMAGE */}
              <figure>
                <img className="profile-image" src={user.profileImage} alt={user.username}></img>
              </figure>
            </div>
            <div className="user-show-header-right">
              {/* HEADER RIGHT */}
              <div className="user-controls">
                <h3>{user.username}</h3>
                {
                  currentUser?.id === user.id ?
                    <button className="edit-profile-button">
                      <a href={`/auth/${user.id}/edit/`}>Edit Profile</a>
                    </button>
                    :
                    <button className="follow-button" onClick={handleFollow}>
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </button>
                }
              </div>
              <div className="user-nums">
                <p className="nums"><strong>{user.postsMade.length} </strong> posts</p>
                <p className="nums"><strong>{user.followedBy.length} </strong> followers</p>
                <p className="nums"><strong>{user.following.length} </strong> following</p>
              </div>
              <div className="user-info">
                <p><strong>{user.fullName}</strong></p>
                <p>{user.bio}</p>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="user-show-posts-container">
            {
              (currentUser?.id === user.id && user.postsMade.length === 0) ?
                <div className="unpopulated-profile-page">
                  <h3>Create your first post!</h3>
                  <button><a href={'/posts/create/'}>Post</a></button>
                  <div className="unpopulated-home-background">
                    <figure>
                      <img src={michelangelo} alt="Michelangelo's creation of Adam"/>
                    </figure>
                  </div>
                </div>
                :
                user.postsMade.map(post => (
                  <Link to={`/posts/${post.id}`} key={post.id} className="user-show-post-link">
                    <div className="user-show-post">
                      <img src={post.image} alt={post.title}></img>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      }
    </section>
  )
}

export default UserShow