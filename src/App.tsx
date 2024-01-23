import { NavBar } from './components/Navbar'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <NavBar />
      <div className='container py-2'>
        <Outlet />
      </div>
    </>
  )
}

export default App
