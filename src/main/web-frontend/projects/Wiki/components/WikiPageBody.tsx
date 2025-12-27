import * as stylex from "@stylexjs/stylex";
import {WikiStyles} from "projects/Wiki/components/WikiStyles.stylex";

type Props = {
  title: string,
  html: string
}

const styles = stylex.create({
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    width: '900px',
  }
})

export default function WikiPageBody(props: Props) {
  return (
    <div {...stylex.props(styles.contentContainer)}>
      <div>
        <h1>{props.title}</h1>
      </div>
      <div
        {...stylex.props(styles.content)}
        data-post-contents
        dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  )
}