import './index.css'
import {useState} from 'react'
import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import UserStoriesModal from '../UserStoriesModal'

const getStoryStorageKey = userName =>
  `instaShareLocalStories:${encodeURIComponent(userName || 'unknown-user')}`

const Profile = props => {
  const {profile, isMyProfile} = props
  const [selectedStory, setSelectedStory] = useState(null)
  const [, setStoryRevision] = useState(0)

  let localStories = []
  if (isMyProfile && profile.user_name) {
    try {
      localStories =
        JSON.parse(
          sessionStorage.getItem(getStoryStorageKey(profile.user_name)),
        ) || []
    } catch {
      localStories = []
    }
  }

  const posts = profile.posts || []
  const stories = profile.stories || []
  const visibleStories = isMyProfile ? [...localStories, ...stories] : stories

  const onRemoveStory = storyId => {
    const updatedStories = localStories.filter(
      eachStory => eachStory.story_id !== storyId,
    )
    sessionStorage.setItem(
      getStoryStorageKey(profile.user_name),
      JSON.stringify(updatedStories),
    )
    setStoryRevision(previousRevision => previousRevision + 1)
    setSelectedStory(null)
  }

  return (
    <div className="profile-container">

      <div className="profile-details-container">

        <img
          src={profile.profile_pic}
          alt={isMyProfile ? 'my profile' : 'user profile'}
          className="profile-image"
        />

        <div className="profile-info">

          <h1>{profile.user_name}</h1>

          <div className="profile-counts">

            <p>
              <span>
                {profile.posts_count !== undefined
                  ? profile.posts_count
                  : posts.length}
              </span>
              <br />
              posts
            </p>

            <p>
              <span>{profile.followers_count}</span>
              <br />
              followers
            </p>

            <p>
              <span>{profile.following_count}</span>
              <br />
              following
            </p>

          </div>

        </div>
      </div>

      <p className="profile-bio">
        <strong>{profile.user_name}</strong>
        <br />
        {profile.user_bio}
      </p>

      {visibleStories.length > 0 && (
        <div className="profile-stories">

          {visibleStories.map(eachStory => (
            <button
              key={eachStory.story_id || eachStory.id}
              type="button"
              className="profile-story-button"
              onClick={() => setSelectedStory(eachStory)}
            >
              <img
                src={eachStory.story_url || eachStory.image}
                alt={isMyProfile ? 'my story' : 'user story'}
                className="profile-story-image"
              />
            </button>
          ))}

        </div>
      )}

      {selectedStory && (
        <UserStoriesModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onRemove={
            selectedStory.isLocal
              ? () => onRemoveStory(selectedStory.story_id)
              : undefined
          }
        />
      )}

      <div className="posts-heading">
        <BsGrid3X3 />
        <h2>Posts</h2>
      </div>

      {posts.length === 0 ? (
        <div className="no-posts-container">
          <BiCamera />
          <h2>No Posts</h2>
        </div>
      ) : (
        <div className="profile-posts">

          {posts.map(eachPost => (
            <img
              key={eachPost.id}
              src={eachPost.image}
              alt={isMyProfile ? 'my post' : 'user post'}
              className="profile-post-image"
            />
          ))}

        </div>
      )}

    </div>
  )
}

export default Profile
