import { reader, readonlyRecord } from 'fp-ts'
import { flow, identity, pipe } from 'fp-ts/function'
import * as traversal from 'monocle-ts/Traversal'
import * as lens from 'monocle-ts/Lens'
import { sequenceS } from 'fp-ts/lib/Apply'
import { globalStyle, style } from '@vanilla-extract/css'

export const className = style({
  backgroundColor: 'red',
  padding: '2rem',
})

export type HSL = readonly [number, number, number]

const hsl = lens.id<HSL>()

const hue = pipe(hsl, lens.component(0))
const saturation = pipe(hsl, lens.component(1))
const lightness = pipe(hsl, lens.component(2))

const lighten = (i: number) =>
  pipe(
    lightness,
    lens.modify((n) => n + i),
  )

const saturate = (i: number) =>
  pipe(
    saturation,
    lens.modify((n) => n + i),
  )

type ColourBase = 'dark' | 'orange' | 'white'

export const colours = pipe(
  {
    dark: [18, 20, 12],
    orange: [18, 50, 50],
    white: [18, 20, 80],
  } as readonlyRecord.ReadonlyRecord<ColourBase, HSL>,
  readonlyRecord.map(
    flow(
      sequenceS(reader.Apply)({
        deep: flow(lighten(-10), saturate(-20)),
        default: identity,
        light: flow(lighten(10), saturate(-10)),
      }),
      readonlyRecord.map(([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`),
    ),
  ),
)

export const layout = style({
  margin: '0 auto',
  padding: '0 2rem',
  maxWidth: '60rem',
  justifySelf: 'center',
})

globalStyle('body', {
  minHeight: '100vh',
  backgroundColor: colours.dark.deep,
  color: colours.white.default,
  fontFamily: 'sans-serif',
})

globalStyle('*:visited', {
  color: colours.orange.deep,
})

export const navbar = style({
  padding: '1rem 0',
  display: 'flex',
  gap: '0.5rem',
})

export const navbarButton = style({
  padding: '0.25rem 0.5rem',
  borderColor: colours.orange.light,
  borderWidth: '0.1rem',
  borderStyle: 'solid',
  borderRadius: '0.5rem',
  textDecoration: 'none',
})
