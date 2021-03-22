import { useUser } from '../lib/hooks'
import Layout from '../components/layout'

const Profile = () => {
  const mongoDBUserObj = useUser({ redirectTo: '/login' })
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let user = null
  if (mongoDBUserObj) {
    user = JSON.parse(JSON.stringify(mongoDBUserObj)).user
    console.log(user)
  } else {
    console.log("not yet")
  }

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