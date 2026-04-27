import {Link} from "react-router";
import * as React from "react";
import AdminComponentGating from "components/gating/AdminComponentGating";
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  titleLink: {
    textDecorationLine: 'none',
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0px',
  },
  date: {
    color: 'grey',
  },
});

type Props = {
  id?: number,
  title: string,
  publishedDate?: string,
  showEditButton?: boolean
}

export default function PostHeader(props: Props) {
  const {
    id,
    title,
    showEditButton,
    publishedDate
  } = props;
  const blogTitleElement = id ? <Link {...stylex.props(styles.titleLink)} to={"/posts/" + id}>{title}</Link> : title;
  const editButton = id ? <Link to={"/posts/" + id + "/edit"}>Edit</Link> : null;
  return (
    <div>
      <h2>{blogTitleElement}</h2>
      <div sx={styles.subtitle}>
        {publishedDate != null ? (
          <span sx={styles.date}>{publishedDate}</span>
        ) : null}
        {showEditButton === true ? (
          <AdminComponentGating>{editButton}</AdminComponentGating>
        ) : null}
      </div>
    </div>
  )
}
