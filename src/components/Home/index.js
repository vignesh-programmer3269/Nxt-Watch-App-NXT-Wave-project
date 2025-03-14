import {Component} from 'react'

import Header from '../Header'
import SideBar from '../SideBar'

import './index.css'

class Home extends Component {
  state = {
    searchText: '',
  }

  render() {
    return (
      <>
        <Header />
        <SideBar />
      </>
    )
  }
}

export default Home
