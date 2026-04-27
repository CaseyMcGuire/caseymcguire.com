import * as React from "react";
import {postStyles} from "apps/MainApp/pages/Posts/components/PostStyles";
import * as stylex from '@stylexjs/stylex';
void stylex;
import PostHeader from "apps/MainApp/pages/Posts/components/PostHeader";
import 'assets/stylesheets/markdown.css'
import {useMemo} from "react";
import {convertMarkdownToHtml} from "utils/MarkdownUtils";

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


  const sanitizedHtml = useMemo(() => {
    return convertMarkdownToHtml(contents).html;
  }, [contents]);

  return (
    <div sx={postStyles.postContainer}>
      <div sx={postStyles.postTitleContainer}>
        <PostHeader
          id={id}
          title={title}
          publishedDate={publishedDate}
          showEditButton={showEditButton}
        />
      </div>
      <div
        sx={postStyles.postContentsContainer}
        data-post-contents
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </div>
  );
}