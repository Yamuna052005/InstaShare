import './index.css'
import {useState} from 'react'
import {useLocation} from 'react-router-dom'
import Header from '../Header'
import UserStories from '../UserStories'
import PostsList from '../PostsList'
const Home = () => {
  const [createdPosts, setCreatedPosts] = useState([])
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const isSearchView =
    searchParams.has('search') || searchParams.get('explore') === 'true'

  const onCreatePost = postDetails => {
    setCreatedPosts(previousPosts => [postDetails, ...previousPosts])
  }

  return (
    <div className="home-container">
      <Header onCreatePost={onCreatePost} />
      {!isSearchView && <UserStories />}
      <PostsList createdPosts={createdPosts} />
    </div>
  )
}

export default Home
