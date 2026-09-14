import './index.css'
import Cookies from 'js-cookie'
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Header from '../Header'
import Profile from '../Profile'
import FailureView from '../FailureView'

const UserDetails = () => {
  const [profile, setProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [isFailure, setIsFailure] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const {id} = useParams()

  useEffect(() => {
    const getUserDetails = async () => {
      setIsLoading(true)
      setIsFailure(false)

      try {
        const jwtToken = Cookies.get('jwt_token')
        const url = `https://apis.ccbp.in/insta-share/users/${id}`

        const response = await fetch(url, {
          method: 'GET',
          headers: {Authorization: `Bearer ${jwtToken}`},
        })

        if (!response.ok) throw new Error('Unable to load profile')

        const data = await response.json()
        setProfile(data.user_details)
      } catch {
        setIsFailure(true)
      } finally {
        setIsLoading(false)
      }
    }

    getUserDetails()
  }, [id, retryCount])

  const onClickRetry = () => {
    setRetryCount(previousCount => previousCount + 1)
  }

  return (
    <div className="user-details-page">
      <Header />
      {isLoading && (
        <div className="loader-container" data-testid="loader">
          <p>Loading profile...</p>
        </div>
      )}
      {isFailure && <FailureView onClickRetry={onClickRetry} />}
      {!isLoading && !isFailure && <Profile profile={profile} isMyProfile={false} />}
    </div>
  )
}

export default UserDetails
