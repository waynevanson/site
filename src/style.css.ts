import * as vanilla from '@vanilla-extract/css'
import { reader, readonlyRecord } from 'fp-ts'
import { flow, identity, pipe } from 'fp-ts/function'
import * as traversal from 'monocle-ts/Traversal'
import * as lens from 'monocle-ts/Lens'
import { sequenceS } from 'fp-ts/lib/Apply'

export const className = vanilla.style({
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
    sequenceS(reader.Apply)({
      deep: flow(lighten(-10), saturate(-10)),
      default: identity,
      light: flow(lighten(10), saturate(-10)),
    }),
  ),
  readonlyRecord.map(
    readonlyRecord.map(([h, s, l]) => `hsl(${h}, ${s}%, ${l}%)`),
  ),
)

export const layout = vanilla.style({
  margin: '0 auto',
  padding: '0 2rem',
  maxWidth: '80rem',
  justifySelf: 'center',
})

vanilla.globalStyle('body', {
  minHeight: '100vh',
  backgroundColor: colours.dark.deep,
  color: colours.white.default,
  fontFamily: 'sans-serif',
})
