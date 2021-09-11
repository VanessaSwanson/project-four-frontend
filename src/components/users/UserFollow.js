import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { getSingleUser, followUser, getProfile } from '../../lib/api'


function UserFollow() {
  const { userId } = useParams()
  const [user, setUser] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState(null)
  const history = useHistory()

  React.useEffect(()=> {
    const getData = async () => {
      try {
        const response = await getSingleUser(userId)
        console.log(response.data)
        return setUser(response.data)
      } catch (err) {
        console.log(err)
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
      const res = await getProfile()
      setCurrentUser(res.data)
      history.push(`/auth/${userId}/`)
    } catch (err) {
      console.log(err)
    }
  } 

  const isFollowing = user?.followedBy.some(follower => {
    return follower.id === currentUser?.id
  })

  // console.log(currentUser)
  // console.log(isFollowing)

  return (
    <section className="follow-section">
      {isFollowing ?
        <div className="follow-card">
          <h3>Want to unfollow {user?.username}?</h3>
          <button className="follow-button" onClick = {handleFollow}>
          Unfollow
          </button> 
          <button className="follow-button">
            <a href={`/auth/${user?.id}`}>Cancel</a>
          </button> 
        </div>
        :
        <div className="follow-card">
          <h3>Want to follow {user?.username}?</h3>
          <button className="follow-button" onClick = {handleFollow}>
          Follow
          </button> 
          <button className="follow-button">
            <a href={`/auth/${user?.id}`}>Cancel</a>
          </button> 
        </div>
      }

    </section>
  )

}

export default UserFollow