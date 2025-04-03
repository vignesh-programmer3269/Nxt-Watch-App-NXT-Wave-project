import {Link, useLocation} from 'react-router-dom'
import Popup from 'reactjs-popup'

import {IoMdMenu, IoMdClose} from 'react-icons/io'
import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {FaGamepad} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'

import {ThemeContext} from '../../context/ThemeContext'
import './index.css'

const MenuPopup = () => {
  const location = useLocation()

  return (
    <ThemeContext.Consumer>
      {value => (
        <Popup
          modal
          trigger={
            <button type="button" className="small-logout-btn">
              <IoMdMenu
                color={value.theme === 'light' ? 'black' : 'white'}
                fontSize="26px"
              />
            </button>
          }
        >
          {close => (
            <div className="menu-popup-container">
              <button type="button" className="close-btn" onClick={close}>
                <IoMdClose />
              </button>
              <div>
                <Link
                  to="/"
                  className={`link navigater ${
                    location.pathname === '/' ? 'active-nav' : ''
                  }`}
                >
                  <AiFillHome
                    className={`nav-icon ${
                      location.pathname === '/' ? 'active-icon' : ''
                    }`}
                  />
                  Home
                </Link>
                <Link
                  to="/trending"
                  className={`link navigater ${
                    location.pathname === '/trending' ? 'active-nav' : ''
                  }`}
                >
                  <HiFire
                    className={`nav-icon ${
                      location.pathname === '/trending' ? 'active-icon' : ''
                    }`}
                  />
                  Trending
                </Link>
                <Link
                  to="/gaming"
                  className={`link navigater ${
                    location.pathname === '/gaming' ? 'active-nav' : ''
                  }`}
                >
                  <FaGamepad
                    className={`nav-icon ${
                      location.pathname === '/gaming' ? 'active-icon' : ''
                    }`}
                  />
                  Gaming
                </Link>
                <Link
                  to="/saved-videos"
                  className={`link navigater ${
                    location.pathname === '/saved-videos' ? 'active-nav' : ''
                  }`}
                >
                  <MdPlaylistAdd
                    className={`nav-icon ${
                      location.pathname === '/saved-videos' ? 'active-icon' : ''
                    }`}
                  />
                  Saved videos
                </Link>
              </div>
            </div>
          )}
        </Popup>
      )}
    </ThemeContext.Consumer>
  )
}

export default MenuPopup
