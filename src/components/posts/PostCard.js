function PostCard({ id, image, owner, caption }) {
  // title, caption, createdAt, likedBy, owner

  return (
    <div className="post-cards-container">

      <div className="post-card">
        <div className="post-card-image">
          <a href={`/posts/${id}`}>
            <img src={image} alt={id}/>
          </a>
        </div>
        <p>{owner.fullName}</p>
        <p>{owner.username}</p>
        <p>{caption}</p>
      
      </div>
  
    </div>
  )
}

export default PostCard