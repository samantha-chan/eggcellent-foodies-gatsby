// custom typefaces
import "typeface-montserrat"
import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

import React from 'react'
import { Layout } from './src/components/Layout'

// Logs when the client route changes
export const onRouteUpdate = ({ location, prevLocation }) => {
    console.log("new pathname", location.pathname)
    console.log("old pathname", prevLocation ? prevLocation.pathname : null)
  }

export const wrapPageElement = ({ element, props }) => {
console.log("🚀 ~ file: gatsby-browser.js ~ line 22 ~ wrapPageElement ~ props", props)
    return <Layout {...props}>{element}</Layout>
}