import React from 'react'
import { getAllPosts } from './lib/api'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import ExploreIndex from './components/posts/ExploreIndex'
import Nav from './components/common/Nav'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserShow from './components/users/UserShow'
import UserFollow from './components/users/UserFollow'
import CreatePost from './components/posts/CreatePost'
import EditProfile from './components/auth/EditProfile'

function App() {
  const [posts, setPosts] = React.useState(null)
  const [isError, setIsError] = React.useState(false)

  React.useEffect(() => {
    const getData = async () => {
      try {
        const response = await getAllPosts()
        setPosts(response.data)
      } catch (err) {
        setIsError(true)
      }
      
    }
    getData()
    // setTimeout(getData, 3000)
  },[])

  return (
    <BrowserRouter>
      {posts &&
      <>
        <Nav 
          posts = {posts}
        />
        <Switch>
          <Route exact path="/">
            <h1>Welcome to Kollektiv</h1>
            <p>This will be the home page</p>
            <button><Link to="/posts">Enter</Link></button>
          </Route>
          <Route exact path="/posts">
            <ExploreIndex 
              posts = {posts}
              isError = {isError}
            />
          </Route>
          <Route exact path="/auth/register/">
            <Register />
          </Route>
          <Route exact path="/auth/login/">
            <Login />
          </Route>

          <Route exact path="/posts/create/">
            <CreatePost />
          </Route>
          <Route exact path="/auth/:userId/edit/">
            <EditProfile />
          </Route>
          <Route exact path="/auth/:userId/">
            <UserShow />
          </Route>

          
          <Route exact path="/auth/:userId/follow/">
            <UserFollow />
          </Route>
          

        </Switch>
      </>
      }
    </BrowserRouter>
  )
}

export default App
