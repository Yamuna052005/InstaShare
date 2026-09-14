import './index.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import PostActions from '../PostActions'
import CommentSection from '../CommentSection'

const Post = props => {
  const {post, onAddComment} = props
  const navigate = useNavigate()
  const [isCommentsOpen, setIsCommentsOpen] = useState(false)

  const onClickUserName = () => {
    navigate(post.user_id === 'current-user' ? '/my-profile' : `/users/${post.user_id}`)
  }

  const onClickComment = () => {
    setIsCommentsOpen(true)

    window.setTimeout(() => {
      const commentInput = document.getElementById(`comment-${post.post_id}`)
      commentInput?.scrollIntoView({behavior: 'smooth', block: 'center'})
      commentInput?.focus()
    }, 0)
  }

  return (
    <div className="post-container">
      <div className="post-header">
        <img
          src={post.profile_pic}
          alt="post author profile"
        />

        <button
          type="button"
          className="user-name-button"
          onClick={onClickUserName}
        >
          {post.user_name}
        </button>
      </div>

      <img
        className="post-image"
        src={post.post_details.image_url}
        alt="post"
      />

      <PostActions post={post} onClickComment={onClickComment} />

      <p className="post-caption">{post.post_details.caption}</p>

      {post.song && (
        <div className="post-song">
          <span>♪ {post.song.name}</span>
          {post.song.url && (
            <audio controls src={post.song.url}>
              Your browser does not support audio playback.
            </audio>
          )}
        </div>
      )}

      {isCommentsOpen && (
        <CommentSection post={post} onAddComment={onAddComment} />
      )}

      {post.created_at && <p className="post-time">{post.created_at}</p>}
    </div>
  )
}

export default Post
