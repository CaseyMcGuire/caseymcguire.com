import * as React from "react";
import * as sanitizeHtml from "sanitize-html";
import * as hljs from 'highlight.js';
import AdminComponentGating from "../../../components/gating/AdminComponentGating";
import {Link} from "react-router-dom";
import {usePostStyles} from "./PostHooks";
import {marked} from "marked";

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
  const styles = usePostStyles();

  const unsanitized_html_DO_NOT_USE = marked(contents, {
    highlight: (code, lang) => {
      return hljs.highlight(lang, code).value;
    }
  });

  const sanitizedHtml = sanitizeHtml(unsanitized_html_DO_NOT_USE, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span']),
    allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
      'span': ['class'],
      'code': ['class']
    })
  });

  const blogTitleElement = id ? <Link to={"/posts/" + id}>{title}</Link> : title;
  const editButton = id ? <Link to={"/posts/" + id + "/edit"}>Edit</Link> : null;
  return (
    <div className={styles.postContainer}>
      <div className={styles.postTitleContainer}>
        <h2 className={styles.postTitle}>{blogTitleElement}</h2>
        {
          props.publishedDate != null ? (
            <span className={styles.date}>{props.publishedDate}</span>
          ) : null
        }
        {
          showEditButton == true ? (
            <AdminComponentGating>
              {editButton}
            </AdminComponentGating>
          ) : null
        }
      </div>
      <div className={styles.postContentsContainer}
           dangerouslySetInnerHTML={{__html: sanitizedHtml}}/>
    </div>
  );
}