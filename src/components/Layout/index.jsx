import React from "react"
import { Link } from "gatsby"
import { StylesProvider, ThemeProvider } from '@material-ui/core/styles'

import { Header } from './Header'

export function Layout({ location, title, children }) {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <StylesProvider injectFirst>
      <ThemeProvider>
        <div className="global-wrapper" data-is-root-path={isRootPath}>
          <Header header={header}/>
          <main>{children}</main>
          <footer>
            © {new Date().getFullYear()}, Eggcellent Foodies
          </footer>
        </div>
      </ThemeProvider>
    </StylesProvider>
  )
}
