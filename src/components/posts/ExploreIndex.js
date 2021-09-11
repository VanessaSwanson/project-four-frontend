import React from 'react'
import PostCard from './PostCard'


function ExploreIndex( { isError, posts }) {

  const isLoading = !posts && !isError

  function sortPosts(a, b) {
    const bandA = a.createdAt
    const bandB = b.createdAt
    let comparison = 0
    if (bandA > bandB) {
      comparison = -1
    } else if (bandA < bandB) {
      comparison = 1
    }
    return comparison
  }

  return (
    <>
      
      <section className="explore-index">
        <h1>This is the Explore Page</h1>
        <div className="explore-posts-container">
          {isError && <p>Oops!</p>}
          {isLoading && <p>...loading</p>}
          {posts && 
            posts.sort(sortPosts).map(post => (
              <PostCard key={ post._id } {...post}/>
            ))
          }
        </div> 
      </section>
    </>
  )
}

export default ExploreIndex

