import {Route, Switch} from 'react-router-dom'
import {ThemeProvider} from './context/ThemeContext'

import ProtectedRoute from './components/ProtectedRoute'
import Login from './components/Login'
import Home from './components/Home'

import './App.css'

const App = () => (
  <ThemeProvider>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
    </Switch>
  </ThemeProvider>
)

export default App
