import * as React from "react"
import { graphql } from "gatsby"

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
  // const post = data.contentfulRecipe.content
  const preRecipeContent = data.contentfulRecipe.preRecipeContent
  const postRecipeContent = data.contentfulRecipe.postRecipeContent
  const steps = data.contentfulRecipe.instructions
  const title = data.contentfulRecipe.title
  const siteTitle = data.site.siteMetadata?.title || `Title`
  // const { previous, next } = data

  const preOutput = renderRichText(preRecipeContent, options)
  const postOutput = renderRichText(postRecipeContent, options)
  const stepsOutput = renderRichText(steps, options)
  return (
      <>
        <BlogPost title={title} post={preOutput} />
        <BlogPost post={stepsOutput} />
        <BlogPost title={title} post={postOutput} />
      </>
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
      ingredients
      author {
        ... on ContentfulAuthor {
            id
            name
          }
      }
      postRecipeContent {
        raw
      }
      preRecipeContent {
        raw
      }
      instructions {
        raw
      }
    }
  }
`


