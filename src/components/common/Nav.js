import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { getProfile } from '../../lib/api'
import { removeToken, isAuthenticated } from '../../lib/auth'

function Nav( {  posts }) {
  const isLoading = !posts 
  const history = useHistory()
  const [currentUser, setCurrentUser] = React.useState(null)
  const [isHome, setIsHome] = React.useState(false)
  const { pathname } = useLocation()
  const isAuth = isAuthenticated()

  React.useEffect(() => {
    if (pathname === '/' || pathname === '') {
      setIsHome(true)
    } else {
      setIsHome(false)
    }
  },[pathname])

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

  const handleLogout = async () => {
    removeToken()
    history.push('/')
    location.reload()
  }

  return (
    
    <nav className={`navbar ${isHome ? 'is-active' : ''}`}>

      {isLoading && <p>...loading</p>}
      <Link to="/posts" className="navbar-element">
          Search
      </Link>
      <Link to="/" className="navbar-element">
          Home
      </Link>
      <Link to="/posts" className="navbar-element">
          Explore
      </Link>
      {isAuth &&
        <>
          <a className="navbar-element" href={`/auth/${currentUser?.id}/`}>Profile</a>
          <Link to="/posts/create/" className="navbar-element">
            Create
          </Link>
          <a className="navbar-element" onClick={handleLogout}>Log Out</a>
        </>
      }
      {!isAuth &&
        <>
          <Link to="/auth/register/" className="navbar-element">
            Register
          </Link>
          <Link to="/auth/login/" className="navbar-element">
            Login
          </Link>

        </>
      }

    </nav>
  )

}

export default Nav