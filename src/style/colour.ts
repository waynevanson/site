import { reader, readonlyRecord } from 'fp-ts'
import { pipe } from 'fp-ts/function'

import * as hsl from './hsl'

export type Colour = 'primary' | 'grey'
export type Tones = 'dark' | 'deep' | 'default' | 'light' | 'pale'
export type ToneMap = readonlyRecord.ReadonlyRecord<Tones, hsl.HSL>

export const monochromatic = pipe(
  reader.Do,
  reader.apS(
    'primary',
    pipe(
      reader.Do,
      reader.apS('dark', hsl.darken(45)),
      reader.apS('deep', hsl.darken(30)),
      reader.apS('default', hsl.darken(10)),
      reader.apS('light', hsl.lighten(10)),
      reader.apS('pale', hsl.lighten(40)),
    ),
  ),
  reader.bindW('grey', ({ primary }) =>
    pipe(primary, readonlyRecord.map(hsl.desaturate(45)), reader.of),
  ),
  reader.map(readonlyRecord.map(readonlyRecord.map(hsl.toCss))),
  reader.local(hsl.fromHue),
)

export const colour = monochromatic(25)
