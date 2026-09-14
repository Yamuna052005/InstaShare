import './index.css'
import {useState} from 'react'
import Cookies from 'js-cookie'
import {BsHeart} from 'react-icons/bs'
import {FcLike} from 'react-icons/fc'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

const PostActions = props => {
  const {post, onClickComment} = props

  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  const onClickLike = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/insta-share/posts/${post.post_id}/like`

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        like_status: true,
      }),
    }

    const response = await fetch(url, options)

    if (response.ok) {
      setIsLiked(true)
      setLikesCount(likesCount + 1)
    }
  }

  const onClickUnlike = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/insta-share/posts/${post.post_id}/like`

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        like_status: false,
      }),
    }

    const response = await fetch(url, options)

    if (response.ok) {
      setIsLiked(false)
      setLikesCount(likesCount - 1)
    }
  }

  const onClickShare = async () => {
    const shareData = {
      title: `${post.user_name}'s post`,
      text: post.post_details.caption,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(shareData.url)
      }
    } catch {
      // Users may close the native share dialog without selecting a destination.
    }
  }

  return (
    <div className="post-actions">
      <div className="left-actions">
        {isLiked ? (
          <button
            type="button"
            data-testid="unLikeIcon"
            onClick={onClickUnlike}
          >
            <FcLike />
          </button>
        ) : (
          <button
            type="button"
            data-testid="likeIcon"
            onClick={onClickLike}
          >
            <BsHeart />
          </button>
        )}

        <button type="button" aria-label="Add a comment" onClick={onClickComment}>
          <FaRegComment />
        </button>

        <button type="button" aria-label="Share post" onClick={onClickShare}>
          <BiShareAlt />
        </button>
      </div>

      <p>{likesCount} likes</p>
    </div>
  )
}

export default PostActions
