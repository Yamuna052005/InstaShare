import './index.css'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const navigate = useNavigate()

  const onChangeUsername = event => {
    setUsername(event.target.value)
    setErrorMsg('')
  }

  const onChangePassword = event => {
    setPassword(event.target.value)
    setErrorMsg('')
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    setErrorMsg('')
    setIsSubmitting(true)

    const userDetails = {
      username,
      password,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        Cookies.set('jwt_token', data.jwt_token, {
          expires: 60,
        })

        navigate('/', {replace: true})
        return
      }

      setErrorMsg(data.error_msg || 'Unable to log in. Please try again.')
    } catch {
      setErrorMsg('Unable to connect. Check your internet connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="login-form-container">
      <div className="landing-image-container">
        <img
          src="https://res.cloudinary.com/oliceids/image/upload/v1789038281/Illustration_vi2vuh.png"
          alt="website login"
          className="landing-image"
        />
      </div>

      <form
        className="form-container"
        onSubmit={onSubmitForm}
      >
        <div className="logo-container">
          <img
            src="https://res.cloudinary.com/oliceids/image/upload/v1789366123/Standard_Collection_8_ooz4dx.png"
            alt="website logo"
            className="login-logo"
          />
        </div>

        <h1>Login to Insta Share</h1>
        <p className="para-style">
          Share your moments with friends
        </p>

        <div className="input-container">
          <label htmlFor="username">USERNAME</label>

          <input
            type="text"
            id="username"
            placeholder="username"
            value={username}
            onChange={onChangeUsername}
            className="username-input-field"
            required
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">PASSWORD</label>

          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
            className="password-input-field"
            required
          />
        </div>

        <button
          type="submit"
          className="login-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>

        {errorMsg !== '' && (
          <p className="error-msg">
            {errorMsg}
          </p>
        )}
      </form>
    </div>
  )
}

export default LoginForm