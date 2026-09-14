import './index.css'

const FailureView = props => {
  const {onClickRetry} = props

  return (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/insta-share/failure-view.png"
        alt="failure view"
        className="failure-image"
      />

      <h1>Something went wrong</h1>

      <p>We are having trouble loading this page.</p>

      <button type="button" onClick={onClickRetry}>
        Try again
      </button>
    </div>
  )
}

export default FailureView