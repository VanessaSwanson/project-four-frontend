import React from 'react'
import like from '../common/resources/like.png'
import comment from '../common/resources/comment.png'

function PostCard({ id, image, likedBy, comments }) {
  const [isHovering, setIsHovering] = React.useState(false)

  const handleMouseOver = () => {
    setIsHovering(true)
    console.log('MOUSE IN')
  }

  const handleMouseOut = () => {
    setIsHovering(false)
    console.log('MOUSE OUT')
  }


  return (
    <div className="post-cards-container">

      <div className="post-card"
        onMouseOver={handleMouseOver}
        onMouseOut = {handleMouseOut} 
      >
        <div className="post-card-image">
          <a href={`/posts/${id}/`}>
            <img src={image} alt={id}/>
          </a>
        </div>
        {isHovering &&
        <div className="hoverable-div">
          <div className="likes">
            <img src={like} alt="number of likes"/>
            <p>{likedBy.length}</p>
          </div>
          <div className="comments">
            <img src={comment} alt="number of comments"/>
            <p>{comments.length}</p>
          </div>
        </div>

        }
      
      </div>
  
    </div>
  )
}

export default PostCard