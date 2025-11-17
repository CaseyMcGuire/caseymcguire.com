import * as React from "react";
import sanitizeHtml from "sanitize-html";
import hljs from 'highlight.js';
import {postStyles} from "./PostStyles";
import {marked} from "marked";
import * as stylex from '@stylexjs/stylex';
import PostHeader from "pages/Posts/components/PostHeader";
import './post.css'

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
    publishedDate,
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

  return (
    <div {...stylex.props(postStyles.postContainer)}>
      <div {...stylex.props(postStyles.postTitleContainer)}>
        <PostHeader
          id={id}
          title={title}
          publishedDate={publishedDate}
          showEditButton={showEditButton}
        />
      </div>
      <div
        {...stylex.props(postStyles.postContentsContainer)}
        data-post-contents
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
}