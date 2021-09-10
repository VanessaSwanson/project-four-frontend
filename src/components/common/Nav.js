import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { removeToken, isAuthenticated } from '../../lib/auth'

function Nav( {  posts }) {
  const isLoading = !posts 
  const history = useHistory()
  const [isHome, setIsHome] = React.useState(false)
  const { pathname } = useLocation()
  const isAuth = isAuthenticated()

  React.useEffect(() => {
    // console.log(pathname)
    if (pathname === '/' || pathname === '') {
      setIsHome(true)
    } else {
      setIsHome(false)
    }
  },[pathname])

  // console.log(isHome)

  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    
    <nav className={`navbar ${isHome ? 'is-active' : ''}`}>

      {isLoading && <p>...loading</p>}
      
      <div className="navbar-brand">
        <Link to="/" className="navbar-element">
          Home
        </Link>
        <Link to="/posts" className="navbar-element">
          Explore
        </Link>
        {isAuth &&
        <>
          <Link to="/auth/profile/" className="navbar-element">
            Your Profile
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
      </div>
    </nav>
  )

}

export default Nav