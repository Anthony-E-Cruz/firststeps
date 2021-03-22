import { useUser } from '../lib/hooks'
import Layout from '../components/layout'

const Profile = () => {
  const user = useUser({ redirectTo: '/login' })

  const profileDetails = () => {
    if (user) {
      return (
        <>
          <p>{user.firstname}</p>
          <p>{user.lastname}</p>
          <p>{user.email}</p>
        </>
      )
    }
  }

  return (
    <Layout>
      <h1>Profile</h1>
      {profileDetails()}
      <style jsx>{`
        pre {
          white-space: pre-wrap;
          word-wrap: break-word;
        }
      `}</style>
    </Layout>
  )
}

export default Profile