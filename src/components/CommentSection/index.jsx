import './index.css'
import {useState} from 'react'

const CommentSection = props => {
  const {post, onAddComment} = props
  const [comment, setComment] = useState('')

  const onSubmitComment = event => {
    event.preventDefault()

    const trimmedComment = comment.trim()
    if (trimmedComment === '') return

    onAddComment(post.post_id, trimmedComment)
    setComment('')
  }

  return (
    <div className="comment-section">
      {post.comments &&
        post.comments.map(eachComment => (
          <div key={eachComment.comment_id}>
            <p className="comment-text">
              {eachComment.user_name && (
                <span className="comment-user">{eachComment.user_name} </span>
              )}
              {eachComment.comment}
            </p>
          </div>
        ))}

      <form className="comment-form" onSubmit={onSubmitComment}>
        <label className="sr-only" htmlFor={`comment-${post.post_id}`}>
          Add a comment
        </label>
        <input
          id={`comment-${post.post_id}`}
          type="text"
          value={comment}
          placeholder="Add a comment..."
          onChange={event => setComment(event.target.value)}
          maxLength="250"
        />
        <button type="submit" disabled={comment.trim() === ''}>
          Post
        </button>
      </form>
    </div>
  )
}

export default CommentSection
