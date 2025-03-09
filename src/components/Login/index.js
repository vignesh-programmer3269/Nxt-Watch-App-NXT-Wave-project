import {Component} from 'react'
import Cookies from 'js-cookie'
import {ThemeContext} from '../../context/ThemeContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    isError: false,
    errMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  onClickLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const fetchUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(fetchUrl, options)
    const data = await response.json()

    if (response.ok) {
      const token = data.jwt_token
      Cookies.set('jwt_token', token, {expires: 30})

      const {history} = this.props
      history.replace('/')
    } else {
      const errMsg = data.error_msg
      console.log(data)
      this.setState({isError: true, errMsg})
    }
  }

  render() {
    const {username, password, showPassword, isError, errMsg} = this.state

    return (
      <ThemeContext.Consumer>
        {value => (
          <div className="login-container">
            <form className="login-form" onSubmit={this.onClickLogin}>
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
              <label htmlFor="username">USERNAME</label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                onChange={this.onChangeUsername}
                value={username}
              />
              <label htmlFor="password">PASSWORD</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                placeholder="Password"
                onChange={this.onChangePassword}
                value={password}
              />
              <div>
                <input
                  type="checkbox"
                  id="showPassword"
                  onChange={this.onChangeShowPassword}
                />
                <label htmlFor="showPassword">Show Password</label>
              </div>
              <button type="submit">Login</button>
              {isError && <p>*{errMsg}</p>}
            </form>
          </div>
        )}
      </ThemeContext.Consumer>
    )
  }
}

export default Login
