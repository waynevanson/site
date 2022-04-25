import React from 'react'
import { graphql } from 'gatsby'

export const query = graphql`
  query BlogPosts {
    allFile(
      filter: { name: { ne: "index" }, relativePath: { regex: "/^blog/" } }
    ) {
      edges {
        node {
          id
          name
          relativePath
          changeTime
          modifiedTime
        }
      }
      totalCount
    }
  }
`

export default ({ data }: any) => {
  return (
    <>
      <h1>Blog</h1>
      <h2>Table of contents</h2>
      <p>Hi! This is a placeholder for a table of contents</p>

      <ul>
        {data.allFile.edges.map(({ node }) => (
          <li key={node.id}>{node.name}</li>
        ))}
      </ul>
    </>
  )
}
