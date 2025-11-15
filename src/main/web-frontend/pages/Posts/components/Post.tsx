import * as React from "react";
import sanitizeHtml from "sanitize-html";
import hljs from 'highlight.js';
import AdminComponentGating from "../../../components/gating/AdminComponentGating";
import {Link} from "react-router";
import {postStyles} from "./PostStyles";
import {marked} from "marked";
import * as stylex from '@stylexjs/stylex';

type Props = Readonly<{
  id?: number,
  title: string,
  contents: string,
  publishedDate?: string,
  showEditButton?: boolean
}>

export default function Post(props: Props) {
  const {
    id,
    title,
    contents,
    showEditButton
  } = props;

  const unsanitized_html_DO_NOT_USE = marked(contents, {
    highlight: (code, lang) => {
      return hljs.highlight(lang, code).value;
    }
  });

  const sanitizedHtml = sanitizeHtml(unsanitized_html_DO_NOT_USE, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span', 'h1', 'h2']),
    allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
      'span': ['class'],
      'code': ['class']
    })
  });

  const blogTitleElement = id ? <Link {...stylex.props(postStyles.postTitleLink)} to={"/posts/" + id}>{title}</Link> : title;
  const editButton = id ? <Link to={"/posts/" + id + "/edit"}>Edit</Link> : null;
  return (
    <div {...stylex.props(postStyles.postContainer)}>
      <div {...stylex.props(postStyles.postTitleContainer)}>
        <h2>{blogTitleElement}</h2>
        <div {...stylex.props(postStyles.postSubtitle)}>
          {props.publishedDate != null ? (
            <span {...stylex.props(postStyles.date)}>{props.publishedDate}</span>
          ) : null}
          {showEditButton === true ? (
            <AdminComponentGating>{editButton}</AdminComponentGating>
          ) : null}
        </div>
      </div>
      <div
        {...stylex.props(postStyles.postContentsContainer)}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
}