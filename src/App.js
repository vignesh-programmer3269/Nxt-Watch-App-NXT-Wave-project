import {Route, Switch} from 'react-router-dom'
import {ThemeProvider} from './context/ThemeContext'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'
import Trending from './components/Trending'

import './App.css'

const App = () => (
  <ThemeProvider>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/trending" component={Trending} />
    </Switch>
  </ThemeProvider>
)

export default App
