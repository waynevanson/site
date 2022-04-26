import React from 'react'
import { graphql, Link } from 'gatsby'

export const query = graphql`
  query BlogPosts {
    allFile(
      filter: { name: { ne: "index" }, relativePath: { regex: "/^blog/" } }
    ) {
      edges {
        node {
          id
          name
          childrenMdx {
            headings(depth: h1) {
              value
            }
          }
        }
      }
    }
  }
`

export default ({ data }: any) => {
  return (
    <>
      <h1>Blogs</h1>
      <ul>
        {data.allFile.edges.map(({ node }) => (
          <li key={node.id}>
            <Link to={node.name}>{node.childrenMdx[0].headings[0].value}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
