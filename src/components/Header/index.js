import {withRouter} from 'react-router-dom'

import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'
import './index.css'

import LogoutPopup from '../LogoutPopup'
import {ThemeContext} from '../../context/ThemeContext'

const Header = () => (
  <ThemeContext.Consumer>
    {value => (
      <div className="header-container">
        <div>
          {value.theme === 'light' ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="logo"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png"
              alt="logo"
            />
          )}
        </div>
        <div>
          {value.theme === 'light' ? (
            <button
              type="button"
              data-testid="theme"
              onClick={value.toggleTheme}
            >
              <FaMoon color="black" fontSize="24px" />
            </button>
          ) : (
            <button
              type="button"
              data-testid="theme"
              onClick={value.toggleTheme}
            >
              <FiSun color="white" fontSize="24px" />
            </button>
          )}
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
            alt="profile"
          />
          <LogoutPopup />
        </div>
      </div>
    )}
  </ThemeContext.Consumer>
)

export default withRouter(Header)
