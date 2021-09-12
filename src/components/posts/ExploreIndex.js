import React from 'react'
import PostCard from './PostCard'


function ExploreIndex( { isError, posts }) {
  const [searchValue, setSearchValue] = React.useState('')
  const isLoading = !posts && !isError

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
  }

  const filteredExplore = () => {
    return posts.filter(post => {
      return (post.owner.fullName.toLowerCase().includes(searchValue.toLocaleLowerCase())) 
      ||
      (post.owner.username.toLowerCase().includes(searchValue.toLocaleLowerCase())
      ||
      (post.caption.toLowerCase().includes(searchValue.toLocaleLowerCase()))
      || searchValue === 'Clear search'
      )
    })
  }

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
        {isError && <p>Oops!</p>}
        {isLoading && <p>...loading</p>}
        <div className="explore-posts-container">
          <div className="explore-posts-container-header">
            <div className="search-left">
              <input className="input"
                placeholder="Search"
                onChange = {handleSearch}
              />
            </div>
            <div className="search-right">
              <p>Some suggested searches:</p>
              <input
                type="button"
                value="#ModernArt"
                onClick={handleSearch}
              />
              <input
                type="button"
                value="#SelfPortrait"
                onClick={handleSearch}
              />
              <input
                type="button"
                value="Clear search"
                onClick={handleSearch}
              />
            </div>
          </div>
          <div className = "explore-posts-container-main">
            {posts && 
            filteredExplore().sort(sortPosts).map(post => (
              <PostCard key={ post._id } {...post}/>
            ))
            }
          </div>
        </div> 
      </section>
    </>
  )
}

export default ExploreIndex

