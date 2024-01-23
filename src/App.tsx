import { Provider } from 'react-redux';
import { store } from './store/store';
import { NavBar } from './components/Navbar'
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <Provider store={store}>
      <NavBar />
      <div className='container py-2'>
        <Outlet />
      </div>
    </Provider>
  )
}

export default App
