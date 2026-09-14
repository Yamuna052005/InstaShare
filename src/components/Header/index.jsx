import './index.css'
import {useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'

const suggestedSongs = [
  {name: 'Sunset Drive', artist: 'Insta Share Sounds'},
  {name: 'Lo-fi Evening', artist: 'Insta Share Sounds'},
  {name: 'Weekend Energy', artist: 'Insta Share Sounds'},
  {name: 'Soft Focus', artist: 'Insta Share Sounds'},
]

const Header = props => {
  const {onCreatePost = () => {}} = props
  const [searchInput, setSearchInput] = useState('')
  const [isComposerOpen, setIsComposerOpen] = useState(false)
  const [imagePreview, setImagePreview] = useState('')
  const [caption, setCaption] = useState('')
  const [song, setSong] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()

  const onClickLogo = () => {
    navigate('/')
  }

  const onClickHome = () => {
    setSearchInput('')
    navigate('/')
  }

  const onClickProfile = () => {
    navigate('/my-profile')
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  const onChangeSearch = event => {
    setSearchInput(event.target.value)
  }

  const onFocusSearch = () => {
    if (location.search !== '?explore=true') {
      navigate('/?explore=true')
    }
  }

  const onSubmitSearch = event => {
    event.preventDefault()
    const searchValue = searchInput.trim()
    navigate(
      searchValue === ''
        ? '/?explore=true'
        : `/?search=${encodeURIComponent(searchValue)}`,
    )
  }

  const onSubmitPost = event => {
    event.preventDefault()

    if (imagePreview === '' || caption.trim() === '') return

    onCreatePost({
      post_id: `local-${Date.now()}`,
      user_id: 'current-user',
      user_name: 'You',
      profile_pic:
        'https://res.cloudinary.com/oliceids/image/upload/v1789366123/Standard_Collection_8_ooz4dx.png',
      post_details: {image_url: imagePreview, caption: caption.trim()},
      comments: [],
      created_at: 'Just now',
      song,
    })
    setImagePreview('')
    setCaption('')
    setSong(null)
    setIsComposerOpen(false)
  }

  const onChangeImage = event => {
    const [image] = event.target.files
    if (image) {
      setImagePreview(URL.createObjectURL(image))
    }
  }

  const onChangeSong = event => {
    const [audio] = event.target.files
    if (audio) setSong({name: audio.name, url: URL.createObjectURL(audio)})
  }

  return (
    <header className="header-container">
      <button
        type="button"
        className="logo-button"
        onClick={onClickLogo}
      >
        <img
          src="https://res.cloudinary.com/oliceids/image/upload/v1789366123/Standard_Collection_8_ooz4dx.png"
          alt="website logo"
          className="website-logo"
        />

        <h1>Insta Share</h1>
      </button>

      <div className="header-right">
        <button
          type="button"
          className="header-link"
          onClick={onClickHome}
        >
          Home
        </button>

        <button
          type="button"
          className="header-link"
          onClick={onClickProfile}
        >
          Profile
        </button>

        <button
          type="button"
          className="create-post-button"
          onClick={() => setIsComposerOpen(true)}
        >
          Create post
        </button>

        <form className="search-container" onSubmit={onSubmitSearch}>
          <input
            type="search"
            placeholder="Search"
            value={searchInput}
            onChange={onChangeSearch}
            onFocus={onFocusSearch}
          />

          <button
            type="submit"
            data-testid="searchIcon"
          >
            <FaSearch />
          </button>
        </form>

        <button
          type="button"
          className="logout-button"
          onClick={onClickLogout}
        >
          Logout
        </button>
      </div>

      {isComposerOpen && (
        <div className="post-composer-overlay" role="presentation">
          <form className="post-composer" onSubmit={onSubmitPost}>
            <div className="composer-heading">
              <h2>Create a post</h2>
              <button type="button" onClick={() => setIsComposerOpen(false)}>
                ×
              </button>
            </div>
            <label htmlFor="post-image">Choose an image</label>
            <input
              id="post-image"
              type="file"
              accept="image/*"
              onChange={onChangeImage}
              required
            />
            {imagePreview && (
              <img
                className="post-image-preview"
                src={imagePreview}
                alt="Selected post preview"
              />
            )}
            <label htmlFor="post-caption">Caption</label>
            <textarea
              id="post-caption"
              value={caption}
              onChange={event => setCaption(event.target.value)}
              placeholder="Write a caption..."
              maxLength="500"
              required
            />
            <label htmlFor="post-song">Add a song (optional)</label>
            <div className="suggested-songs" role="list" aria-label="Suggested songs">
              {suggestedSongs.map(eachSong => (
                <button
                  key={eachSong.name}
                  type="button"
                  className={
                    song?.name === eachSong.name
                      ? 'suggested-song selected-song-button'
                      : 'suggested-song'
                  }
                  onClick={() => setSong(eachSong)}
                >
                  <span>♪</span>
                  <span>
                    <strong>{eachSong.name}</strong>
                    <small>{eachSong.artist}</small>
                  </span>
                </button>
              ))}
            </div>
            <label className="upload-song-label" htmlFor="post-song">
              Or upload your own audio
            </label>
            <input
              id="post-song"
              type="file"
              accept="audio/*"
              onChange={onChangeSong}
            />
            {song && <p className="selected-song">Selected: ♪ {song.name}</p>}
            <button className="publish-post-button" type="submit">
              Publish
            </button>
          </form>
        </div>
      )}
    </header>
  )
}

export default Header
