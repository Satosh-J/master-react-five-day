import UserProfile from "../components/UserProfile"
import UsersTable from "../components/UsersTable"
// import { UserProvider } from '../UserContext' // Remove this import

function UsersPage() {

  return (
    <>
      <UsersTable />
      <UserProfile />
    </>
  )
}

export default UsersPage
