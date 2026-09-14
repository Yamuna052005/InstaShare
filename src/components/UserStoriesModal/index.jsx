import './index.css'

const UserStoriesModal = props => {
  const {story, onClose, onRemove} = props

  return (
    <div className="modal-container">
      <button type="button" onClick={onClose}>
        ×
      </button>

      {onRemove && (
        <button type="button" className="remove-story-button" onClick={onRemove}>
          Remove story
        </button>
      )}

      <img src={story.story_url || story.image} alt="user story" />

      {story.song && (
        <div className="story-song-player">
          <span>♪ {story.song.name}</span>
          <audio controls autoPlay src={story.song.url}>
            Your browser does not support audio playback.
          </audio>
        </div>
      )}
    </div>
  )
}

export default UserStoriesModal
