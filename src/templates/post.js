import * as React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import Seo from "../components/seo"
import { BlogPost } from "../components/ContentBlock"

// RICH TEXT
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const PostTemplate = ({ data, location }) => {
  const post = data.contentfulPost.content
  const title = data.contentfulPost.title
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // const { previous, next } = data

  const output = renderRichText(post)
  return (
    <Layout location={location} title={siteTitle}>
      <BlogPost title={title} post={output} />
    </Layout>
    //   <Seo
    //     title={post.title}
    //     description={post.description || post.excerpt}
    //   />
  )
}

export default PostTemplate

/* POSTS GRAPHQL QUERY */
export const pageQuery = graphql`
  query ContentfulPostBySlug(
    # $id: String
    # $previousPostId: String
    # $nextPostId: String
    $slug: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPost(slug: { eq: $slug }) {
      title
      author
      content {
        raw
      }
    }
    # previous: markdownRemark(id: { eq: $previousPostId }) {
    #   fields {
    #     slug
    #   }
    #   frontmatter {
    #     title
    #   }
    # }
    # next: markdownRemark(id: { eq: $nextPostId }) {
    #   fields {
    #     slug
    #   }
    #   frontmatter {
    #     title
    #   }
    # }
  }
`
