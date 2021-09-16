import React from 'react'
import { getAllPosts } from './lib/api'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import ExploreIndex from './components/posts/ExploreIndex'
import Home from './components/common/Home'
import PostShow from './components/posts/PostShow'
import PostLike from './components/posts/PostLike'
import PostComment from './components/posts/PostComment'
import Nav from './components/common/Nav'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import UserShow from './components/users/UserShow'
import Inbox from './components/users/Inbox'
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
            <Home 
              posts = {posts}
            />
          </Route>

          <Route exact path="/posts">
            <ExploreIndex 
              posts = {posts}
              isError = {isError}
            />
          </Route>
          <Route exact path="/posts/create/">
            <CreatePost />
          </Route>
          <Route exact path="/posts/:postId">
            <PostShow />
          </Route>
          <Route exact path="/posts/:postId/like/">
            <PostLike />
          </Route>
          <Route exact path="/posts/:postId/comment/">
            <PostComment />
          </Route>

          <Route exact path="/auth/register/">
            <Register />
          </Route>
          <Route exact path="/auth/login/">
            <Login />
          </Route>

          <Route exact path="/auth/:userId/inbox/">
            <Inbox />
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
