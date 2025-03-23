import { useState } from 'react'
import './App.css'
import SideNav from './components/Sidenav';
import Topnav from './components/Topnav';
import BottomNav from './components/BottomNav';

function App({ Component }) {
  const [width, setWidth] = useState(window.innerWidth);
  const updateWindowDimensions = () => {
    setWidth(window.innerWidth);
  };
  window.addEventListener("resize", updateWindowDimensions);

  return (
    <>
      <div className={width > 768 ? 'containerDesk' : 'containerMobile'}>
        {width > 768 ? <SideNav></SideNav> : <Topnav></Topnav>}
        <div className='componentApp'>
          <Component/>
        </div>
        {width < 768 &&
          <div className='bottomNavContainer'>
            <BottomNav/>
          </div>
        }
      </div>
    </>
  )
}

export default App
