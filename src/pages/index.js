/** SEE INDEX-OG FOR ORIGINAL COMPONENTS */
import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allContentfulPost.edges

  return (
    <Layout location={location}>
      <Seo title="Eggcellent Foodies" />
      <h1> Hi foodie friends! <br />
      Eggcellent Foodies is currently cooking up a new look. Please come back soon!! </h1>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPost {
      totalCount
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`
