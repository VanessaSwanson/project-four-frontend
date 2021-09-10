import React from 'react'
import PostCard from './PostCard'


function ExploreIndex( { isError, posts }) {

  const isLoading = !posts && !isError

  return (
    <>
      
      <section className="explore-index">
        <h1>This is the Explore Page</h1>
        <div className="explore-posts-container">
          {isError && <p>Oops!</p>}
          {isLoading && <p>...loading</p>}
          {posts && 
            posts.map(post => (
              <PostCard key={ post._id } {...post}/>
            ))
          }
        </div> 
      </section>
    </>
  )
}

export default ExploreIndex

