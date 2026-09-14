import './index.css'
import {useNavigate} from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const onClickHome = () => {
    navigate('/')
  }

  return (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/oliceids/image/upload/v1789356700/erroring_1_d3mwgy.png"
        alt="page not found"
        className="not-found-img"
      />

      <h1>Page Not Found</h1>

      <p>
        We are sorry, The page you requested couldn't be found. Please go back
        to the homepage.
      </p>

      <button
        className="button"
        type="button"
        onClick={onClickHome}
      >
        Home Page
      </button>
    </div>
  )
}

export default NotFound