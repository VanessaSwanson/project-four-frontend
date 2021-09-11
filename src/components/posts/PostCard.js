import { Link } from 'react-router-dom'

function PostCard({ id, title, caption, createdAt, likedBy, owner, image }) {
  return (
    <div className="post-cards-container">
      <div className="post-card">
        <Link to={`/auth/${owner.id}/`}>
          <div className="post-card-header">
            <figure>
              <img src={owner.profileImage} alt={owner.username}/>
            </figure>
            <h4>{owner.username}</h4>
          </div>
        </Link>
        <div className="post-card-main">
          <h3>Title: {title}</h3>
          <h4>Caption: {caption}</h4>
          <p>Post id: {id}</p>
          <p>Created at: {createdAt}</p>
          <Link to={`/posts/${id}`}>
            <figure>
              <img src={image} alt={id}/>
            </figure>
          </Link>
          {console.log('owner: ', owner)}
          {console.log('liked by: ', likedBy)}
        </div>
      </div>
  
    </div>
  )
}

export default PostCard