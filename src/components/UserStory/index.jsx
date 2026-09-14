import './index.css'
import {useState} from 'react'
import UserStoriesModal from '../UserStoriesModal'

const UserStory = props => {
  const {story, onRemove} = props
  const [isModalOpen, setIsModalOpen] = useState(false)

  const onClickStory = () => {
    setIsModalOpen(true)
  }

  const onCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        type="button"
        className="story"
        onClick={onClickStory}
      >
        <img
          src={story.story_url}
          alt="user story"
        />
        <p>{story.user_name}</p>
      </button>

      {isModalOpen && (
        <UserStoriesModal
          story={story}
          onClose={onCloseModal}
          onRemove={
            story.isLocal && onRemove
              ? () => {
                  onRemove(story.story_id)
                  onCloseModal()
                }
              : undefined
          }
        />
      )}
    </>
  )
}

export default UserStory
