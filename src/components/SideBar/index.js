import {Link, useLocation} from 'react-router-dom'

import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {FaGamepad} from 'react-icons/fa'
import {MdPlaylistAdd} from 'react-icons/md'

import './index.css'

const SideBar = () => {
  const location = useLocation()

  return (
    <div className="sidebar-container">
      <div>
        <Link
          to="/"
          className={`link navigater ${
            location.pathname === '/' ? 'active' : ''
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
          to="/trending "
          className={`link navigater ${
            location.pathname === '/trending' ? 'active' : ''
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
          to="/gaming "
          className={`link navigater ${
            location.pathname === '/gaming' ? 'active' : ''
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
            location.pathname === '/saved-videos' ? 'active' : ''
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
      <div className="contact-us-container">
        <p>CONTACT US</p>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
          />
        </div>
        <p>Enjoy! Now to see your channels and recommendations!</p>
      </div>
    </div>
  )
}

export default SideBar
