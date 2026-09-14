import './index.css'
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useLocation} from 'react-router-dom'
import Post from '../Post'
import FailureView from '../FailureView'

const PostsList = props => {
  const {createdPosts} = props
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const [addedComments, setAddedComments] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const searchInput = searchParams.get('search')
  const isExploring = searchParams.get('explore') === 'true'

  useEffect(() => {
    const getPosts = async () => {
      setIsLoading(true)
      setIsFailure(false)

      const jwtToken = Cookies.get('jwt_token')

      let url = 'https://apis.ccbp.in/insta-share/posts'

      if (searchInput !== null) {
        url = `https://apis.ccbp.in/insta-share/posts?search=${encodeURIComponent(
          searchInput,
        )}`
      }

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(url, options)

      if (response.ok === true) {
        const data = await response.json()
        const searchedPosts = data.posts || []
        setPosts(searchedPosts)

        // The API search only indexes a subset of post fields. Keep a local
        // copy of the feed so valid user names and captions are still found.
        if (searchInput !== null && searchedPosts.length === 0) {
          const allPostsResponse = await fetch(
            'https://apis.ccbp.in/insta-share/posts',
            options,
          )
          if (allPostsResponse.ok) {
            const allPostsData = await allPostsResponse.json()
            setAllPosts(allPostsData.posts || [])
          }
        } else if (searchInput === null) {
          setAllPosts(searchedPosts)
        }
        setIsLoading(false)
      } else {
        setIsFailure(true)
        setIsLoading(false)
      }
    }

    getPosts()
  }, [searchInput, retryCount])

  const onClickRetry = () => {
    setRetryCount(retryCount + 1)
  }

  const onAddComment = (postId, comment) => {
    const newComment = {
      comment_id: `${postId}-${Date.now()}`,
      user_name: 'You',
      comment,
    }

    setAddedComments(previousComments => ({
      ...previousComments,
      [postId]: [...(previousComments[postId] || []), newComment],
    }))
  }

  const matchingCreatedPosts =
    searchInput === null
      ? createdPosts
      : createdPosts.filter(post =>
          `${post.user_name} ${post.post_details.caption}`
            .toLowerCase()
            .includes(searchInput.toLowerCase()),
        )

  const normalizedSearch = searchInput?.trim().toLowerCase() || ''
  const fallbackPosts =
    searchInput !== null && posts.length === 0 && normalizedSearch !== ''
      ? allPosts.filter(post =>
          `${post.user_name || ''} ${post.post_details?.caption || ''}`
            .toLowerCase()
            .includes(normalizedSearch),
        )
      : posts

  const displayedPosts = [...matchingCreatedPosts, ...fallbackPosts].map(post => ({
    ...post,
    comments: [...(post.comments || []), ...(addedComments[post.post_id] || [])],
  }))

  if (isLoading) {
    return (
      <div className="loader-container" data-testid="loader">
        <p>Loading...</p>
      </div>
    )
  }

  if (isFailure) {
    return <FailureView onClickRetry={onClickRetry} />
  }

  if (searchInput !== null && displayedPosts.length === 0) {
    return (
      <div className="search-not-found-container">
        <img
          src="https://res.cloudinary.com/oliceids/image/upload/v1789369131/Group_rrrhpm.png"
          alt="search not found"
          className="search-not-found-image"
        />

        <h1>Search Not Found</h1>
        <p>Try different search words</p>
      </div>
    )
  }

  return (
    <div className="posts-container">
      {isExploring && <h1 className="explore-heading">Explore posts</h1>}
      {displayedPosts.map(eachPost => (
        <Post
          key={eachPost.post_id}
          post={eachPost}
          onAddComment={onAddComment}
        />
      ))}
    </div>
  )
}

export default PostsList
