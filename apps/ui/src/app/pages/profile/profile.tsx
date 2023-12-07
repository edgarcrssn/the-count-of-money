import React from 'react'
import { useParams } from 'react-router-dom'
// import styles from './profile.module.scss'

const Profile = () => {
  const { nickname } = useParams()

  return <div>{nickname}&apos;s Profile</div>
}

export default Profile
