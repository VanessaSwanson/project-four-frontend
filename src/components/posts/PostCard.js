import React from 'react'

function PostCard({ id, image }) {

  return (
    <div className="post-cards-container">
      <a href={`/posts/${id}/`}>
        <div className="post-card"
        >
        
          <div className="post-card-image">
            <img src={image} alt={id}/>        
          </div>
        </div>
      </a> 
    </div>
  )
}

export default PostCard