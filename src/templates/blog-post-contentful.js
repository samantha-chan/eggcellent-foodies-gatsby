import * as React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { BlogPost } from "./blog-post"

const BlogPostContentfulTemplate = ({ data, location }) => {
  const post = data.contentfulPost
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <BlogPost {...post} />
    </Layout>
    //   <Seo
    //     title={post.title}
    //     description={post.description || post.excerpt}
    //   />
    //   <article
    //     className="blog-post"
    //     itemScope
    //     itemType="http://schema.org/Article"
    //   >
    //     <header>
    //       <h1 itemProp="headline">{post.title}</h1>
    //       <p>{post.date}</p>
    //     </header>
    //     <section
    //       dangerouslySetInnerHTML={{ __html: post.html }}
    //       itemProp="articleBody"
    //     />
    //     <hr />
    //     <footer>
    //       <Bio />
    //     </footer>
    //   </article>
    //   <nav className="blog-post-nav">
    //     <ul
    //       style={{
    //         display: `flex`,
    //         flexWrap: `wrap`,
    //         justifyContent: `space-between`,
    //         listStyle: `none`,
    //         padding: 0,
    //       }}
    //     >
    //       <li>
    //         {previous && (
    //           <Link to={previous.fields.slug} rel="prev">
    //             ← {previous.title}
    //           </Link>
    //         )}
    //       </li>
    //       <li>
    //         {next && (
    //           <Link to={next.fields.slug} rel="next">
    //             {next.title} →
    //           </Link>
    //         )}
    //       </li>
    //     </ul>
    //   </nav>
    // </Layout>
  )
}

export default BlogPostContentfulTemplate

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug(
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
