import * as vanilla from '@vanilla-extract/css'

export const className = vanilla.style({
  backgroundColor: 'red',
  padding: '2rem',
})

export const layout = vanilla.style({
  margin: '0 auto',
  padding: '0 2rem',
  maxWidth: '80rem',
  justifySelf: 'center',
})
