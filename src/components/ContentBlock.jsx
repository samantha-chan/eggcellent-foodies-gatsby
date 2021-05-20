import React from 'react'

export function BlogPost({title, post, ...restofProps}) {
  return (
    <div>
      <h1>{title}</h1>
      <div>{post}</div>
    </div>
  )
}