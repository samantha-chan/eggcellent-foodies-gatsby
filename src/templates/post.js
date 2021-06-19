import * as React from "react"
import { graphql } from "gatsby"

// import Seo from "../components/seo"
import { BlogPost } from "../components/ContentBlock"

const PostTemplate = ({ data, location }) => {
  const post = data.contentfulPost.content
  const title = data.contentfulPost.title
  const siteTitle = data.site.siteMetadata?.title || `Title`
  
  return (
      <BlogPost title={title} post={post} />
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
      author {
        ... on ContentfulAuthor { 
            id
            name
          }
      }
      content {
        raw
          references {
            ... on ContentfulAsset {
              contentful_id
              __typename
              fluid(maxWidth: 2560) {
                ...GatsbyContentfulFluid_withWebp
              }
          }
        }
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
