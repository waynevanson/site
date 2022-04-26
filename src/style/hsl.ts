import { reader } from 'fp-ts'
import { pipe } from 'fp-ts/function'
import * as lens from 'monocle-ts/Lens'

export type CSS = string
export type Hue = number
export type Saturation = number
export type Lightness = number
export type HSL = readonly [Hue, Saturation, Lightness]

export namespace optics {
  export const hsl = lens.id<HSL>()
  export const hue = pipe(hsl, lens.component(0))
  export const saturation = pipe(hsl, lens.component(1))
  export const lightness = pipe(hsl, lens.component(2))
}

export const mk = (
  hue: Hue,
  saturation: Saturation,
  lightness: Lightness,
): HSL => [hue, saturation, lightness]

export const fromHue = (hue: Hue) => mk(hue, 50, 50)

export const lighten = (i: number) =>
  pipe(
    optics.lightness,
    lens.modify((n) => n + i),
  )

export const darken = pipe(
  lighten,
  reader.local((i: number) => -i),
)

export const saturate = (i: number) =>
  pipe(
    optics.saturation,
    lens.modify((n) => n + i),
  )

export const desaturate = pipe(
  saturate,
  reader.local((i: number) => -i),
)

export const rotate = (i: number) =>
  pipe(
    optics.hue,
    lens.modify((n) => n + i),
  )

export const toCss = ([h, s, l]: HSL): CSS => `hsl(${h}, ${s}%, ${l}%)`
