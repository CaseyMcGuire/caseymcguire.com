import * as stylex from "@stylexjs/stylex";


const TABLE_OF_CONTENTS_BUFFER = 12;
const HEADER_HEIGHT = 50;
export const TABLE_OF_CONTENTS_TOP = HEADER_HEIGHT + TABLE_OF_CONTENTS_BUFFER;

export const WikiStyles = stylex.defineVars({
  sidebarWidth: '256px',
  headerHeight: HEADER_HEIGHT,
  tableOfContentsTop: TABLE_OF_CONTENTS_TOP,
  borderColor: 'rgb(229, 231, 235)'
});