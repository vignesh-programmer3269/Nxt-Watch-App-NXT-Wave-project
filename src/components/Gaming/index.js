import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGamepad} from 'react-icons/fa'

import Header from '../Header'
import SideBar from '../SideBar'
import GamingVideo from '../GamingVideo'

import {ThemeContext} from '../../context/ThemeContext'

import './index.css'

const apiStatusConst = {
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Gaming extends Component {
  state = {
    apiStatus: apiStatusConst.process,
    videosList: [],
  }

  componentDidMount() {
    this.getGamingVideosApi()
  }

  getGamingVideosApi = async () => {
    this.setState({apiStatus: apiStatusConst.process})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/gaming'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      const videosList = data.videos.map(video => ({
        id: video.id,
        title: video.title,
        thumbnailUrl: video.thumbnail_url,
        viewCount: video.view_count,
      }))

      this.setState({
        videosList,
        apiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderGamingPageProcess = () => (
    <ThemeContext.Consumer>
      {value => (
        <div className="loader-container" data-testid="loader">
          <Loader
            type="ThreeDots"
            color={value.theme === 'light' ? '#3b82f6' : '#ffffff'}
            width={50}
            height={50}
          />
        </div>
      )}
    </ThemeContext.Consumer>
  )

  renderGamingPageSuccess = () => {
    const {videosList} = this.state

    console.log(this.props)

    return (
      <>
        <div className="gaming-page-header">
          <FaGamepad className="gaming-icon" />
          <h1>Gaming</h1>
        </div>
        <div className="gaming-videos-container">
          {videosList.map(video => (
            <GamingVideo key={video.id} videoDetail={video} />
          ))}
        </div>
      </>
    )
  }

  renderGamingPageFailure = () => (
    <ThemeContext.Consumer>
      {value => (
        <div className="failure-view-container">
          {value.theme === 'light' ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt=""
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              alt=""
            />
          )}
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. <br /> Please
            try again.
          </p>
          <button type="button" onClick={this.getGamingVideosApi}>
            Retry
          </button>
        </div>
      )}
    </ThemeContext.Consumer>
  )

  renderGamingPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.process:
        return this.renderGamingPageProcess()
      case apiStatusConst.success:
        return this.renderGamingPageSuccess()
      case apiStatusConst.failure:
        return this.renderGamingPageFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div className="gaming-page-container">
          <SideBar />
          <div className="gaming-page">{this.renderGamingPage()}</div>
        </div>
      </>
    )
  }
}

export default Gaming
