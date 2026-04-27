import * as React from "react";
import PostHeader from "apps/MainApp/pages/Posts/components/PostHeader";
import PostShell from "apps/MainApp/pages/Posts/components/PostShell";
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
    <PostShell>
      <PostShell.Title>
        <PostHeader
          id={id}
          title={title}
          publishedDate={publishedDate}
          showEditButton={showEditButton}
        />
      </PostShell.Title>
      <PostShell.Contents
        data-post-contents
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />
    </PostShell>
  );
}
