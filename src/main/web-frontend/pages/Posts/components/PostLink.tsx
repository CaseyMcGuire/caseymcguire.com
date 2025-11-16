import * as React from "react";
import * as stylex from '@stylexjs/stylex';
import PostHeader from "pages/Posts/components/PostHeader";

type Props = {
  postId: number,
  title: string,
  date: string
}

const styles = stylex.create({
  container: {
    marginBottom: '24px'
  }
})

export default function PostLink(props: Props) {

  return (
    <div {...stylex.props(styles.container)}>
      <PostHeader
        id={props.postId}
        title={props.title}
        publishedDate={props.date}
        showEditButton={true}
      />
    </div>
  );
}