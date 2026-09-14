import './index.css'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import Header from '../Header'
import Profile from '../Profile'
import FailureView from '../FailureView'

const MyProfile = () => {
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const getProfile = async () => {
      setIsLoading(true)
      setIsFailure(false)

      const jwtToken = Cookies.get('jwt_token')

      const url = 'https://apis.ccbp.in/insta-share/my-profile'

      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const response = await fetch(url, options)

      if (response.ok === true) {
        const data = await response.json()
        setProfile(data.profile)
        setIsLoading(false)
      } else {
        setIsFailure(true)
        setIsLoading(false)
      }
    }

    getProfile()
  }, [retryCount])

  const onClickRetry = () => {
    setRetryCount(retryCount + 1)
  }

  return (
    <div className="my-profile-container">
      <Header />

      {isLoading && (
        <div className="loader-container" data-testid="loader">
          <p>Loading...</p>
        </div>
      )}

      {isFailure && (
        <FailureView onClickRetry={onClickRetry} />
      )}

      {!isLoading && !isFailure && (
        <Profile
          profile={profile}
          isMyProfile={true}
        />
      )}
    </div>
  )
}

export default MyProfile