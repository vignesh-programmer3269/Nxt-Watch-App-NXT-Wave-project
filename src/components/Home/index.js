import {Component} from 'react'

import Header from '../Header'
import './index.css'

class Home extends Component {
  state = {
    searchText: '',
  }

  render() {
    return <Header />
  }
}

export default Home
