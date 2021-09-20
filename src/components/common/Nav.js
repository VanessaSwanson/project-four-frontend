import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { getProfile } from '../../lib/api'
import { removeToken, isAuthenticated, getUserId } from '../../lib/auth'
import { Dropdown, ButtonGroup } from 'react-bootstrap'
import home from './resources/home-logo.png'
import explore from './resources/explore-logo.png'
import create from './resources/create-logo.png'
import search from './resources/search-logo.png'
import message from './resources/message-black.png'

function Nav() {
  const history = useHistory()
  const [currentUser, setCurrentUser] = React.useState(null)
  const isAuth = isAuthenticated()

  React.useEffect(() => {
    const getData = async () => {
      try {
        // const res = await getProfile(getUserId())
        const res = await getProfile(getUserId())
        setCurrentUser(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [getUserId()])

  const handleLogout = async () => {
    removeToken()
    history.push('/')
    location.reload()
  }

  return (
    
    <nav className="navbar">
      <div className="navbar-contents">
        <div className="navbar-left">
          <Link to="/" className="navbar-element logo">
            <span id="red">ko</span>
            <span id="yellow">ll</span>
            <span id="blue">ek</span>
            <span id="black">tiv</span>
          </Link>
        </div>
        {/* SEARCH */}
        {isAuth &&
        <>
          <div className="navbar-center">
            <Link to="/posts/" className="navbar-element">
              <img className="search" src={search} alt="search"/>
            </Link>
          </div>
          <div className="navbar-right">
            {/* HOME */}
            <Link to="/" className="navbar-element">
              <img className="home" src={home} alt="home"/>
            </Link>
        
            <Link to="/posts/" className="navbar-element">
              {/* EXPLORE */}
              <img className="explore" src={explore} alt="explore"/>
            </Link>
            {/* CREATE */}
            <Link to="/posts/create/" className="navbar-element">
              <img className="create" src={create} alt="create"/>
            </Link>
            {/* MESSAGE */}
            <Link to={`/auth/${currentUser?.id}/inbox/`} className="navbar-element">
              <img className="message" src={message} alt="inbox"/>
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
          </div>
        </>
        }
      </div>

    </nav>
  )

}

export default Nav