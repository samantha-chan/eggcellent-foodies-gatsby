import * as React from "react"
import { Link, graphql } from "gatsby"

// import Bio from "../components/bio"
import Layout from "../components/layout"
// import Seo from "../components/seo"
import { BlogPost } from "../components/ContentBlock"

// RICH TEXT
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"

const Bold = ({ children }) => <span className="bold" style={{color:'#f0f0f0'}}>{children}</span>
  const Text = ({ children }) => <p className="align-center">{children}</p>
  const options = {
    renderMark: {
      [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    },
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
      [BLOCKS.EMBEDDED_ASSET]: node => {
        return (
          <>
            <h2>Embedded Asset</h2>
            <pre>
              <code>{JSON.stringify(node, null, 2)}</code>
            </pre>
          </>
        )
      },
    },
  }

/**
 * Recipes Template Post
 * @param {Object} data :: all the page data 
 * @returns 
 */
const RecipeTemplate = ({ data, location }) => {
  const post = data.contentfulRecipe.content
  const steps = data.contentfulRecipe.steps
  const title = data.contentfulRecipe.title
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // const { previous, next } = data

  const output = renderRichText(post, options)
  const stepsOutput = renderRichText(steps, options)
  return (
    <Layout location={location} title={siteTitle}>
      <BlogPost title={title} post={output} />
      <BlogPost post={stepsOutput} />
    </Layout>
  )
}

export default RecipeTemplate


/** RECIPES GRAPHQL QUERY */
export const pageQuery = graphql`
  query ContentfulRecipePostBySlug(
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
    contentfulRecipe(slug: { eq: $slug }) {
      title
      author
      content {
        raw
      }
      steps {
        raw
      }
    }
  }
`


