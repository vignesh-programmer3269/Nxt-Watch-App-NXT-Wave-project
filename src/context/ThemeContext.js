import {createContext, Component} from 'react'

export const ThemeContext = createContext()

export class ThemeProvider extends Component {
  state = {
    theme: localStorage.getItem('theme') || 'light',
  }

  componentDidMount() {
    const {theme} = this.state

    document.documentElement.setAttribute('theme-data', theme)
    localStorage.setItem('theme', theme)
  }

  toggleTheme = () => {
    this.setState(
      prevState => ({theme: prevState.theme === 'light' ? 'dark' : 'light'}),
      () => {
        const {theme} = this.state

        document.documentElement.setAttribute('theme-data', theme)
        localStorage.setItem('theme', theme)
      },
    )
  }

  render() {
    const {theme} = this.state
    const {children} = this.props

    return (
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme: this.toggleTheme,
        }}
      >
        {children}
      </ThemeContext.Provider>
    )
  }
}
