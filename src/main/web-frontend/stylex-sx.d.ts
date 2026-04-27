import 'react';
import type { CompiledStyles, InlineStyles, StyleXArray } from '@stylexjs/stylex';

type SxValue = StyleXArray<
  | null
  | undefined
  | CompiledStyles
  | boolean
  | Readonly<[CompiledStyles, InlineStyles]>
>;

declare module 'react' {
  interface DOMAttributes<T> {
    sx?: SxValue;
  }
}
