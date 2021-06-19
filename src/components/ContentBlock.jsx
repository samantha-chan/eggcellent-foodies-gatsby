import React from 'react'
import { BLOCKS, MARKS } from "@contentful/rich-text-types"
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import styled from 'styled-components'


const Img = styled.img`
  max-width: 100%;
  height: 100%;
`
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
    console.log("🚀 ~ file: ContentBlock.tsx ~ line 20 ~ node", node)
      return <Img src={`https://${node.data.target.fluid.src}`} />
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