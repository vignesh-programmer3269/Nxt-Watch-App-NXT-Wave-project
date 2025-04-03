import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {HiFire} from 'react-icons/hi'

import Header from '../Header'
import SideBar from '../SideBar'
import TrendingVideo from '../TrendingVideo'

import {ThemeContext} from '../../context/ThemeContext'

import './index.css'

const apiStatusConst = {
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Trending extends Component {
  state = {
    apiStatus: apiStatusConst.process,
    videosList: [],
  }

  componentDidMount() {
    this.getTrendingVideosApi()
  }

  getTrendingVideosApi = async () => {
    this.setState({apiStatus: apiStatusConst.process})

    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/videos/trending'
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
        channel: {
          name: video.channel.name,
          profileImageUrl: video.channel.profile_image_url,
        },
        viewCount: video.view_count,
        publishedAt: video.published_at,
      }))

      this.setState({
        videosList,
        apiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderTrendingPageProcess = () => (
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

  renderTrendingPageSuccess = () => {
    const {videosList} = this.state

    return (
      <>
        <div className="trending-page-header">
          <HiFire className="trending-icon" />
          <h1>Trending</h1>
        </div>
        <div className="trending-videos-container">
          {videosList.map(video => (
            <TrendingVideo key={video.id} videoDetail={video} />
          ))}
        </div>
      </>
    )
  }

  renderTrendingPageFailure = () => (
    <ThemeContext.Consumer>
      {value => (
        <div className="failure-view-container">
          {value.theme === 'light' ? (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt="failure view"
            />
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
              alt="failure view"
            />
          )}
          <h1>Oops! Something Went Wrong</h1>
          <p>
            We are having some trouble to complete your request. <br /> Please
            try again.
          </p>
          <button type="button" onClick={this.getTrendingVideosApi}>
            Retry
          </button>
        </div>
      )}
    </ThemeContext.Consumer>
  )

  renderTrendingPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.process:
        return this.renderTrendingPageProcess()
      case apiStatusConst.success:
        return this.renderTrendingPageSuccess()
      case apiStatusConst.failure:
        return this.renderTrendingPageFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div data-testid="trending" className="trending-page-container">
          <SideBar />
          <div className="trending-page">{this.renderTrendingPage()}</div>
        </div>
      </>
    )
  }
}

export default Trending
