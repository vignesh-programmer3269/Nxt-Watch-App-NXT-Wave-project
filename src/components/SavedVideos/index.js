import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import SideBar from '../SideBar'
import TrendingVideo from '../TrendingVideo'

import {ThemeContext} from '../../context/ThemeContext'

import './index.css'

const apiStatusConst = {
  process: 'PROCESS',
  success: 'SUCCESS',
  noVideos: 'NOVIDEOS',
}

class SavedVideos extends Component {
  state = {
    apiStatus: apiStatusConst.process,
    savedVideosList: [],
  }

  componentDidMount() {
    this.getSavedVideosApi()
  }

  getSavedVideosApi = async () => {
    this.setState({apiStatus: apiStatusConst.process})

    const savedVideosList =
      JSON.parse(localStorage.getItem('saved-videos-list')) || []

    if (savedVideosList.length > 0) {
      this.setState({
        savedVideosList,
        apiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.noVideos})
    }
  }

  renderSavedVideosPageProcess = () => (
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

  renderSavedVideosPageSuccess = () => {
    const {savedVideosList} = this.state

    return (
      <>
        <div className="saved-videos-page-header">
          <MdPlaylistAdd className="saved-icon" />
          <h1>Saved Videos</h1>
        </div>
        <div className="saved-videos-container">
          {savedVideosList.map(video => (
            <TrendingVideo key={video.id} videoDetail={video} />
          ))}
        </div>
      </>
    )
  }

  renderSavedVideosPageNoVideos = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
        alt="no saved videos"
      />
      <h1>No saved videos found</h1>
      <p>You can save your videos while watching them</p>
    </div>
  )

  renderTrendingPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.process:
        return this.renderSavedVideosPageProcess()
      case apiStatusConst.success:
        return this.renderSavedVideosPageSuccess()
      case apiStatusConst.noVideos:
        return this.renderSavedVideosPageNoVideos()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div data-testid="savedVideos" className="saved-page-container">
          <SideBar />
          <div className="saved-page">{this.renderTrendingPage()}</div>
        </div>
      </>
    )
  }
}

export default SavedVideos
