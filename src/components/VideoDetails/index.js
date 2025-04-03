import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {formatDistanceToNow} from 'date-fns'

import {BiLike, BiDislike} from 'react-icons/bi'
import {MdPlaylistAdd} from 'react-icons/md'

import Header from '../Header'
import SideBar from '../SideBar'

import {ThemeContext} from '../../context/ThemeContext'

import './index.css'

const apiStatusConst = {
  process: 'PROCESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class VideoDetails extends Component {
  state = {
    apiStatus: apiStatusConst.process,
    videoDetail: {},
    isLiked: '',
    isSaved: false,
  }

  async componentDidMount() {
    await this.getVideoDetailsApi()
    this.checkIfVideoIsSaved()
  }

  checkIfVideoIsSaved = () => {
    const {videoDetail} = this.state
    const savedVideosList =
      JSON.parse(localStorage.getItem('saved-videos-list')) || []
    const isSaved = savedVideosList.some(video => video.id === videoDetail.id)

    this.setState({isSaved})
  }

  getVideoDetailsApi = async () => {
    this.setState({apiStatus: apiStatusConst.process})

    const {match} = this.props
    const {params} = match
    const videoId = params.id
    const url = `https://apis.ccbp.in/videos/${videoId}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const videoDetail = {
        id: data.video_details.id,
        title: data.video_details.title,
        videoUrl: data.video_details.video_url,
        thumbnailUrl: data.video_details.thumbnail_url,
        channelName: data.video_details.channel.name,
        profileImageUrl: data.video_details.channel.profile_image_url,
        subscriberCount: data.video_details.channel.subscriber_count,
        viewCount: data.video_details.view_count,
        publishedAt: data.video_details.published_at,
        description: data.video_details.description,
      }

      this.setState({
        videoDetail,
        apiStatus: apiStatusConst.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConst.failure})
    }
  }

  renderVideoDetailsPageProcess = () => (
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

  onClickLikeBtn = () => {
    this.setState({isLiked: 'LIKED'})
  }

  onClickDislikeBtn = () => {
    this.setState({isLiked: 'DISLIKED'})
  }

  onClickSaveBtn = () => {
    const {videoDetail} = this.state
    const {
      id,
      title,
      thumbnailUrl,
      viewCount,
      channelName,
      publishedAt,
      profileImageUrl,
    } = videoDetail
    const newVideo = {
      id,
      title,
      thumbnailUrl,
      viewCount,
      channel: {
        name: channelName,
        profileImageUrl,
      },
      publishedAt,
    }

    const savedVideosList =
      JSON.parse(localStorage.getItem('saved-videos-list')) || []

    const videoIndex = savedVideosList.findIndex(video => video.id === id)

    if (videoIndex !== -1) {
      savedVideosList.splice(videoIndex, 1)
      localStorage.setItem('saved-videos-list', savedVideosList)
    } else {
      savedVideosList.push(newVideo)
    }
    localStorage.setItem('saved-videos-list', JSON.stringify(savedVideosList))
    this.setState({isSaved: videoIndex === -1})
  }

  renderVideoDetailsPageSuccess = () => {
    const {videoDetail, isSaved, isLiked} = this.state
    const {
      id,
      title,
      publishedAt,
      viewCount,
      videoUrl,
      thumbnailUrl,
      channelName,
      profileImageUrl,
      subscriberCount,
      description,
    } = videoDetail

    const formatedDate = formatDistanceToNow(new Date(publishedAt), {
      addSuffix: true,
    })
    const [first, ...rest] = formatedDate.split(' ')

    return (
      <ThemeContext.Consumer>
        {value => {
          const btnColor = value.theme === 'light' ? '#424242' : '#909090'

          return (
            <>
              <ReactPlayer url={videoUrl} className="video" />
              <p>{title}</p>
              <div>
                <p>
                  {viewCount} views • {rest.join(' ')}
                </p>
                <div className="like-save">
                  <button
                    type="button"
                    onClick={this.onClickLikeBtn}
                    style={{
                      color: isLiked === 'LIKED' ? '#3b82f6' : btnColor,
                    }}
                  >
                    <BiLike className="icon" /> Like
                  </button>
                  <button
                    type="button"
                    onClick={this.onClickDislikeBtn}
                    style={{
                      color: isLiked === 'DISLIKED' ? '#3b82f6' : btnColor,
                    }}
                  >
                    <BiDislike className="icon" /> Dislike
                  </button>
                  <button
                    type="button"
                    onClick={this.onClickSaveBtn}
                    style={{
                      color: isSaved ? '#3b82f6' : btnColor,
                    }}
                  >
                    <MdPlaylistAdd className="icon" /> Save
                  </button>
                </div>
              </div>
              <hr className="video-details-hr" />
              <div className="channel-details">
                <img src={profileImageUrl} alt={channelName} />
                <div>
                  <p>{channelName}</p>
                  <p>{subscriberCount} subscribers</p>
                </div>
              </div>
              <p>{description}</p>
            </>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  renderVideoDetailsPageFailure = () => (
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
          <button type="button" onClick={this.getVideoDetailsApi}>
            Retry
          </button>
        </div>
      )}
    </ThemeContext.Consumer>
  )

  renderVideoDetailsPage = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConst.process:
        return this.renderVideoDetailsPageProcess()
      case apiStatusConst.success:
        return this.renderVideoDetailsPageSuccess()
      case apiStatusConst.failure:
        return this.renderVideoDetailsPageFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />

        <div
          data-testid="videoItemDetails"
          className="video-details-page-container"
        >
          <SideBar />
          <div className="video-details-page">
            {this.renderVideoDetailsPage()}
          </div>
        </div>
      </>
    )
  }
}

export default VideoDetails
