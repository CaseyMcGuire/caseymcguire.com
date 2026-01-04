import {Link} from "react-router";
import {postStyles} from "apps/MainApp/pages/Posts/components/PostStyles";
import * as React from "react";
import AdminComponentGating from "components/gating/AdminComponentGating";
import * as stylex from '@stylexjs/stylex';

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
  const blogTitleElement = id ? <Link {...stylex.props(postStyles.postTitleLink)} to={"/posts/" + id}>{title}</Link> : title;
  const editButton = id ? <Link to={"/posts/" + id + "/edit"}>Edit</Link> : null;
  return (
    <div>
      <h2>{blogTitleElement}</h2>
      <div {...stylex.props(postStyles.postSubtitle)}>
        {publishedDate != null ? (
          <span {...stylex.props(postStyles.date)}>{publishedDate}</span>
        ) : null}
        {showEditButton === true ? (
          <AdminComponentGating>{editButton}</AdminComponentGating>
        ) : null}
      </div>
    </div>
  )
}