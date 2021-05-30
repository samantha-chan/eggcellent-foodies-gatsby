const { graphql } = require("gatsby")
const path = require(`path`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all the template types here
  const blogPost = path.resolve(`./src/templates/post.js`)
  const recipePost = path.resolve(`./src/templates/recipe.js`)

  // Gather all the content types here
  const result = await graphql(
    `
    {
      allContentfulPost {
        totalCount
        __typename
        edges {
          node {
            slug
            title
          }
        }
      }
      allContentfulRecipe {
        totalCount
        __typename
        edges {
          node {
            slug
            title
          }
        }
      }
    }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulPost.edges
  const recipes = result.data.allContentfulRecipe.edges 

  // If it's a post use the Post Template
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id
  
      createPage({
        path: post.node.slug,
        component: blogPost,
        context: {
          slug: post.node.slug,
          id: post.id,
          previousPostId,
          nextPostId,
        }
      })
    })
  }

  // If it's a recipe use the Recipe Template
  if (recipes.length > 0) {
    recipes.forEach((recipe, index) => {
      const previousPostId = index === 0 ? null : recipes[index - 1].id
      const nextPostId = index === recipes.length - 1 ? null : recipes[index + 1].id
  
      createPage({
        path: recipe.node.slug,
        component: recipePost,
        context: {
          slug: recipe.node.slug,
          id: recipe.id,
          previousPostId,
          nextPostId,
        }
      })
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
