import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {IoMdClose, IoMdSearch} from 'react-icons/io'

import Header from '../Header'
import SideBar from '../SideBar'
import HomeVideo from '../HomeVideo'

import {ThemeContext} from '../../context/ThemeContext'

import './index.css'

const apiStatusConst = {
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
  noVideo: 'NOVIDEO',
}

class Home extends Component {
  state = {
    searchText: '',
    videosList: [],
    apiStatus: apiStatusConst.process,
    bannerStatus: true,
  }

  componentDidMount() {
    this.getVideosApi()
  }

  onChangeSearchField = event => {
    this.setState({searchText: event.target.value})
  }

  onSubmitSearchField = event => {
    event.preventDefault()

    this.getVideosApi()
  }

  getVideosApi = async () => {
    this.setState({apiStatus: apiStatusConst.process})
    const {searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/videos/all?search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()

      if (data.total > 0) {
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
        this.setState({apiStatus: apiStatusConst.noVideo})
      }
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderHomePageProccess = () => (
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

  renderHomePageSuccess = () => {
    const {videosList} = this.state

    return (
      <div className="videos-container">
        {videosList.map(video => (
          <HomeVideo key={video.id} videoDetail={video} />
        ))}
      </div>
    )
  }

  renderNoVideoPage = () => (
    <div className="home-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt=""
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button type="button" onClick={this.getVideosApi}>
        Retry
      </button>
    </div>
  )

  renderHomePageFailure = () => (
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
          <button type="button" onClick={this.getVideosApi}>
            Retry
          </button>
        </div>
      )}
    </ThemeContext.Consumer>
  )

  renderHomePage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.process:
        return this.renderHomePageProccess()
      case apiStatusConst.success:
        return this.renderHomePageSuccess()
      case apiStatusConst.noVideo:
        return this.renderNoVideoPage()
      case apiStatusConst.failure:
        return this.renderHomePageFailure()
      default:
        return null
    }
  }

  closeBanner = () => {
    this.setState({bannerStatus: false})
  }

  render() {
    const {searchText, bannerStatus} = this.state

    return (
      <>
        <Header />

        <div className="home-page-container">
          <SideBar />
          <div className="home-page">
            {bannerStatus && (
              <div className="home-banner-container">
                <div>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                    alt="logo"
                    className="home-banner-logo"
                  />
                  <button
                    type="button"
                    className="banner-close-btn"
                    onClick={this.closeBanner}
                  >
                    <IoMdClose fontSize="18px" />
                  </button>
                </div>
                <p>Buy Nxt Watch Premium prepaid plans with UPI</p>
                <button type="button">GET IT NOW</button>
              </div>
            )}
            <form onSubmit={this.onSubmitSearchField} className="search-field">
              <input
                type="search"
                value={searchText}
                onChange={this.onChangeSearchField}
                placeholder="Search"
              />
              <button type="submit" data-testid="searchButton">
                <IoMdSearch />
              </button>
            </form>
            {this.renderHomePage()}
          </div>
        </div>
      </>
    )
  }
}

export default Home
