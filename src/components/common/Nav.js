import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getProfile } from '../../lib/api'
import { removeToken, isAuthenticated } from '../../lib/auth'
import { Dropdown, ButtonGroup } from 'react-bootstrap'
import home from './resources/home-logo.png'
import explore from './resources/explore-logo.png'
import create from './resources/create-logo.png'
import search from './resources/search-logo.png'

function Nav( {  posts }) {
  const isLoading = !posts 
  const history = useHistory()
  const [currentUser, setCurrentUser] = React.useState(null)
  const isAuth = isAuthenticated()

  React.useEffect(() => {
    const getData = async () => {
      try {
        const res = await getProfile()
        setCurrentUser(res.data)
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

  // console.log(currentUser)
  // console.log(currentUser.id)
  // console.log(isAuth)

  return (
    
    <nav className="navbar">
      <div className="navbar-contents">
        {isLoading && <p>...loading</p>}
        <div className="navbar-left">
          <Link to="/" className="navbar-element logo">
            <span id="red">ko</span>
            <span id="yellow">ll</span>
            <span id="blue">ek</span>
            <span id="black">tiv</span>
          </Link>
          {/* SEARCH */}
          <Link to="/posts" className="navbar-element">
            <img className="search" src={search} alt="search"/>
          </Link>
        </div>
        <div className="navbar-right">
          {/* HOME */}
          <Link to="/" className="navbar-element">
            <img className="home" src={home} alt="home"/>
          </Link>
          {isAuth &&
        <>
          <Link to="/posts" className="navbar-element">
            {/* EXPLORE */}
            <img className="explore" src={explore} alt="explore"/>
          </Link>
          {/* CREATE */}
          <Link to="/posts/create/" className="navbar-element">
            <img className="create" src={create} alt="create"/>
          </Link>
          {/* PROFILE AND LOGOUT*/}
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle id="custon-dropdown">
              <img className="profile" src={currentUser?.profileImage} alt="profile"/>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href={`/auth/${currentUser?.id}/`}>
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
      </div>

    </nav>
  )

}

export default Nav