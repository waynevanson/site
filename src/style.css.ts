import { globalStyle, style } from '@vanilla-extract/css'
import { colour as colours } from './style/colour'

export const className = style({
  backgroundColor: 'red',
  padding: '2rem',
})

export type ColourBase = 'dark' | 'orange' | 'white'

export const layout = style({
  margin: '0 auto',
  padding: '0 2rem',
  maxWidth: '60rem',
  justifySelf: 'center',
})

globalStyle('body', {
  minHeight: '100vh',
  backgroundColor: colours.grey.dark,
  color: colours.grey.pale,
  fontFamily: 'sans-serif',
})

globalStyle('*:visited', {
  color: 'unset',
})

export const navbar = style({
  display: 'flex',
  backgroundColor: colours.grey.deep,
})

export const navbarButton = style({
  selectors: { '&:hover': { backgroundColor: colours.grey.light } },
  padding: '0.5rem 1rem',
  textDecoration: 'none',
  width: '100%',
  maxWidth: '4rem',
  textAlign: 'center',
})

export const navbarButtonActive = style([
  navbarButton,
  {
    backgroundColor: colours.grey.default,
  },
])
