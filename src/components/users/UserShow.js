import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleUser, getProfile } from '../../lib/api'

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

  const isFollowing = user?.followedBy.some(follower => {
    return follower.id === currentUser?.id
  })

  console.log(isFollowing)
  console.log(currentUser)

  return (
    <section className="user-show-section">
      {isError && <p>Oops!</p>}
      {isLoading && <p>...loading</p>}
      {user &&
        <div className="user-show-container">
          <div className="user-show-header">
            <div className="user-show-header-left">
              <figure>
                <img className="profile-image" src={user.profileImage} alt={user.username}></img>
              </figure>
            </div>
            <div className="user-show-header-right">
              <div className="user-controls">
                <h3>{user.username}</h3>
                {
                  currentUser?.id === user.id ?
                    <button className="edit-profile-button">
                      <a href={`/auth/${user.id}/edit/`}>Edit Profile</a>
                    </button>
                    :
                    <button className="follow-button">
                      <a href={`/auth/${user.id}/follow/`}>{isFollowing ? 'Unfollow' : 'Follow'}</a>
                    </button>
                }
              </div>
              <div className="user-nums">
                <p className="nums">{user.postsMade.length} posts</p>
                <p className="nums">{user.followedBy.length} followers</p>
                <p className="nums">{user.following.length} following</p>
              </div>
              <p>{user.fullName}</p>
              <p>{user.bio}</p>
              {console.log(user)}
            </div>
          </div>
          <hr></hr>
          <div className="user-show-posts-container">
            {user.postsMade.map(post => (
              <div className="user-show-post" key={post.id}>
                <figure>
                  <img src={post.image} alt={post.title}/>
                </figure>
              </div>
            ))}
          </div>
        </div>
      }
    </section>
  )
}

export default UserShow