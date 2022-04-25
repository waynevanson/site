import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby'
import { Layout } from './src/components'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import * as styles from './src/style.css'
import 'normalize.css'

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs) => <Layout {...props}>{element}</Layout>

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <MDXProvider components={{}}>{element}</MDXProvider>
)
