import {useHistory} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import './index.css'

const LogoutPopup = () => {
  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.push('/login')
  }

  return (
    <Popup
      modal
      trigger={
        <button type="button" className="logout-btn">
          Logout
        </button>
      }
    >
      {close => (
        <div className="logout-popup-container">
          <div className="popup-container">
            <p>Are you sure you want to logout?</p>
            <div>
              <button type="button" onClick={close} className="cancel-btn">
                Cancel
              </button>
              <button
                type="button"
                onClick={onClickLogout}
                className="confirm-btn"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default LogoutPopup
