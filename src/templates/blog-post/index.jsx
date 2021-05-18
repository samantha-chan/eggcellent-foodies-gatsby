import React from 'react'

export function BlogPost({title, ...restofProps}) {
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}