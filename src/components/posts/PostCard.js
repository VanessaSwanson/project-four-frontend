

function PostCard({ id, title, caption, createdAt, tags, likedBy, owner }) {
  return (
    <div className="post-cards-container">
      {/* <Link to={`/women-artists/${_id}`}> */}
      <div className="post-card">
        <div className="post-card-header">
          <figure>
            <img src={owner.profileImage} alt={owner.username}/>
          </figure>
          <h4>{owner.username}</h4>
        </div>
        <h3>Title: {title}</h3>
        <h4>Caption: {caption}</h4>
        <p>Post id: {id}</p>
        <p>Created at: {createdAt}</p>
        {tags?.map(tag => (
          <p key={tag}>Tags: {tag}</p>
        ))}
        {console.log('owner: ', owner)}
        {console.log('tags: ', tags)}
        {console.log('liked by: ', likedBy)}
      </div>
      {/* </Link> */}
    </div>
  )
}

export default PostCard