import * as React from "react";
import sanitizeHtml from "sanitize-html";
import hljs from 'highlight.js';
import {postStyles} from "./PostStyles";
import {marked} from "marked";
import * as stylex from '@stylexjs/stylex';
import PostHeader from "pages/Posts/components/PostHeader";
import { markedHighlight } from 'marked-highlight';
import './post.css'
import {useMemo} from "react";

type Props = Readonly<{
  id?: number,
  title: string,
  contents: string,
  publishedDate?: string,
  showEditButton?: boolean
}>

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));

export default function Post(props: Props) {
  const {
    id,
    title,
    contents,
    publishedDate,
    showEditButton
  } = props;


  const sanitizedHtml = useMemo(() => {
    const rawHtml = marked.parse(contents) as string;

    return sanitizeHtml(rawHtml, {
      // Ensure you keep 'pre' and 'code' allowed so highlighting works
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['span', 'h1', 'h2', 'img']),
      allowedAttributes: Object.assign({}, sanitizeHtml.defaults.allowedAttributes, {
        'span': ['class'],
        'code': ['class'],
        'img': ['src', 'alt', 'title']
      })
    });
  }, [contents]);

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