import { WrapPageElementBrowserArgs, WrapRootElementBrowserArgs } from 'gatsby'
import { Layout } from './src/components'
import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import 'normalize.css'
import './src/style.css'

export const wrapPageElement = ({
  element,
  props,
}: WrapPageElementBrowserArgs) => <Layout {...props}>{element}</Layout>

export const wrapRootElement = ({ element }: WrapRootElementBrowserArgs) => (
  <MDXProvider components={{}}>{element}</MDXProvider>
)
