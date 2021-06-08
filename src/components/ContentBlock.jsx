import React from 'react'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from 'gatsby-source-contentful/rich-text'

const Bold = ({ children }) => <strong>{children}</strong>
const Paragraph = ({ children }) => <p>{children}</p>

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => { 
      return <Paragraph>{children}</Paragraph>
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const imageID = node.data.target.sys.id
      console.log("🚀 ~ file: ContentBlock.jsx ~ line 18 ~ imageID", imageID)
    //   const {
    //     file: {url}, 
    //     title
    //  } = props.data.contentfulBlogPost.body.references.find(({contentful_id: id}) => id === imageID);
    //     console.log("🚀 ~ file: ContentBlock.jsx ~ line 23 ~ url", url)
    
      return (
        <>
          <h2>Embedded Asset</h2>
          <pre>
          {/* <img src={`https://${node.data.target.fields.file.url}`} /> */}
          </pre>
        </>
      )
    }
  }
}
 
export function BlogPost({title, post, ...restofProps}) {
  const postData = renderRichText(post, options)
  return (
    <div>
      <h1>{title}</h1>
      <div>{postData}</div>
    </div>
  )
}