import './index.css'
import {useState, useEffect, useRef} from 'react'
import Cookies from 'js-cookie'
import UserStory from '../UserStory'
import FailureView from '../FailureView'

const suggestedSongs = [
  {
    name: 'Golden Hour',
    artist: 'Insta Share Sounds',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    name: 'City Lights',
    artist: 'Insta Share Sounds',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    name: 'Easy Sunday',
    artist: 'Insta Share Sounds',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
  {
    name: 'Midnight Drive',
    artist: 'Insta Share Sounds',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
  },
]

const getStoryStorageKey = userName =>
  `instaShareLocalStories:${encodeURIComponent(userName || 'unknown-user')}`

const UserStories = () => {
  const [stories, setStories] = useState([])
  const [profile, setProfile] = useState({})
  const [localStories, setLocalStories] = useState([])
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [storyImage, setStoryImage] = useState('')
  const [storySong, setStorySong] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const storiesListRef = useRef(null)

  useEffect(() => {
    const getStories = async () => {
      setIsLoading(true)
      setIsFailure(false)

      const jwtToken = Cookies.get('jwt_token')

      try {
        const options = {
          method: 'GET',
          headers: {Authorization: `Bearer ${jwtToken}`},
        }
        const [storiesResponse, profileResponse] = await Promise.all([
          fetch('https://apis.ccbp.in/insta-share/stories', options),
          fetch('https://apis.ccbp.in/insta-share/my-profile', options),
        ])

        if (!storiesResponse.ok) throw new Error('Unable to load stories')

        const storiesData = await storiesResponse.json()
        setStories(storiesData.users_stories)

        if (profileResponse.ok) {
          const profileData = await profileResponse.json()
          const currentProfile = profileData.profile
          setProfile(currentProfile)
          try {
            setLocalStories(
              JSON.parse(
                sessionStorage.getItem(
                  getStoryStorageKey(currentProfile.user_name),
                ),
              ) || [],
            )
          } catch {
            setLocalStories([])
          }
        }
        setIsLoading(false)
      } catch {
        setIsFailure(true)
        setIsLoading(false)
      }
    }

    getStories()
  }, [retryCount])

  const onClickRetry = () => {
    setRetryCount(retryCount + 1)
  }

  const scrollStories = direction => {
    storiesListRef.current?.scrollBy({
      left: direction * 320,
      behavior: 'smooth',
    })
  }

  const onChangeStoryImage = event => {
    const [image] = event.target.files
    if (image) setStoryImage(URL.createObjectURL(image))
  }

  const onSubmitStory = event => {
    event.preventDefault()
    if (storyImage === '') return

    const newStory = {
      story_id: `local-story-${Date.now()}`,
      user_id: 'current-user',
      user_name: profile.user_name || 'You',
      story_url: storyImage,
      song: storySong,
      isLocal: true,
    }
    const updatedStories = [newStory, ...localStories]

    setLocalStories(updatedStories)
    sessionStorage.setItem(
      getStoryStorageKey(profile.user_name),
      JSON.stringify(updatedStories),
    )
    setStoryImage('')
    setStorySong(null)
    setIsComposerOpen(false)
  }

  const onRemoveStory = storyId => {
    const updatedStories = localStories.filter(
      eachStory => eachStory.story_id !== storyId,
    )
    setLocalStories(updatedStories)
    sessionStorage.setItem(
      getStoryStorageKey(profile.user_name),
      JSON.stringify(updatedStories),
    )
  }

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

  return (
    <div className="stories-container">
      <button
        type="button"
        className="story-arrow"
        aria-label="Previous stories"
        onClick={() => scrollStories(-1)}
      >
        ←
      </button>

      <div className="stories-list" ref={storiesListRef}>
        <button
          type="button"
          className="story own-story"
          onClick={() => setIsComposerOpen(true)}
        >
          <span className="own-story-image-wrap">
            <img
              src={
                profile.profile_pic ||
                'https://res.cloudinary.com/oliceids/image/upload/v1789366123/Standard_Collection_8_ooz4dx.png'
              }
              alt="your profile"
            />
            <span className="story-add-icon">+</span>
          </span>
          <p>Your story</p>
        </button>

        {localStories.map(eachStory => (
          <UserStory
            key={eachStory.story_id}
            story={eachStory}
            onRemove={onRemoveStory}
          />
        ))}

        {stories.map(eachStory => (
          <UserStory
            key={eachStory.user_id}
            story={eachStory}
          />
        ))}
      </div>

      <button
        type="button"
        className="story-arrow"
        aria-label="Next stories"
        onClick={() => scrollStories(1)}
      >
        →
      </button>

      {isComposerOpen && (
        <div className="story-composer-overlay" role="presentation">
          <form className="story-composer" onSubmit={onSubmitStory}>
            <div className="story-composer-heading">
              <h2>Add to your story</h2>
              <button type="button" onClick={() => setIsComposerOpen(false)}>
                ×
              </button>
            </div>
            <label htmlFor="story-image">Choose a photo</label>
            <input
              id="story-image"
              type="file"
              accept="image/*"
              onChange={onChangeStoryImage}
              required
            />
            {storyImage && <img src={storyImage} alt="Story preview" />}
            <label>Add a song (optional)</label>
            <div
              id="story-song"
              className="story-suggested-songs"
              role="list"
              aria-label="Suggested songs"
            >
              {suggestedSongs.map(eachSong => (
                <button
                  key={eachSong.name}
                  type="button"
                  className={
                    storySong?.name === eachSong.name
                      ? 'story-suggested-song selected-story-song'
                      : 'story-suggested-song'
                  }
                  onClick={() => setStorySong(eachSong)}
                >
                  <span>♪</span>
                  <span>
                    <strong>{eachSong.name}</strong>
                    <small>{eachSong.artist}</small>
                  </span>
                </button>
              ))}
            </div>
            {storySong && <p>Selected: ♪ {storySong.name}</p>}
            <button className="publish-story-button" type="submit">
              Share to story
            </button>
          </form>
        </div>
      )}
    </div>
  )
}

export default UserStories
