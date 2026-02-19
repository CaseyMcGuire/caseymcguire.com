import * as stylex from "@stylexjs/stylex";
import AdminComponentGating from "components/gating/AdminComponentGating";
import Button from "components/buttons/Button";
import {Link, useNavigate} from "react-router";

type Props = {
  title: string,
  html: string,
  pageId: string,
  wikiId: string,
  showEditButton: boolean
}

const styles = stylex.create({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'rgb(229, 231, 235)',
    paddingBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    lineHeight: 1.2,
    margin: 0,
  },
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    width: '100%',
    maxWidth: '850px',
    minWidth: 0,
  },
  content: {
    width: '100%',
    minWidth: 0,
  }
})

export default function WikiPageBody(props: Props) {
  return (
    <div {...stylex.props(styles.contentContainer)}>
      <div {...stylex.props(styles.titleContainer)}>
        <h1 {...stylex.props(styles.title)}>{props.title}</h1>
        <AdminComponentGating>
          {props.showEditButton && <Link to={`/wiki/${props.wikiId}/${props.pageId}/edit`}>Edit</Link>}
        </AdminComponentGating>
      </div>
      <div
        {...stylex.props(styles.content)}
        data-post-contents
        dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  )
}
