import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

import {ThemeContext} from '../../context/ThemeContext'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-page-container">
      <SideBar />
      <ThemeContext.Consumer>
        {value => (
          <div className="not-found-container">
            {value.theme === 'light' ? (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                alt="not found"
              />
            ) : (
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png"
                alt="not found"
              />
            )}
            <h1>Page Not Found</h1>
            <p>We are sorry, the page you requested could not be found.</p>
          </div>
        )}
      </ThemeContext.Consumer>
    </div>
  </>
)

export default NotFound
