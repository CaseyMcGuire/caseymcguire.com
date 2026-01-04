import * as stylex from "@stylexjs/stylex";
import AdminComponentGating from "components/gating/AdminComponentGating";
import Button from "components/buttons/Button";
import {Link, useNavigate} from "react-router";

type Props = {
  title: string,
  html: string,
  pageId: string,
  wikiName: string,
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
  contentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
    width: '850px',
  }
})

export default function WikiPageBody(props: Props) {
  return (
    <div {...stylex.props(styles.contentContainer)}>
      <div {...stylex.props(styles.titleContainer)}>
        <h1>{props.title}</h1>
        <AdminComponentGating>
          {props.showEditButton && <Link to={`/wiki/${props.wikiName}/${props.pageId}/edit`}>Edit</Link>}
        </AdminComponentGating>
      </div>
      <div
        {...stylex.props(styles.content)}
        data-post-contents
        dangerouslySetInnerHTML={{ __html: props.html }} />
    </div>
  )
}