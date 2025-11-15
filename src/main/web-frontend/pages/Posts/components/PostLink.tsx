import * as React from "react";
import { Link } from "react-router";
import {postStyles} from "./PostStyles";
import * as stylex from '@stylexjs/stylex';

type Props = {
  postId: number,
  title: string,
  date: string
}

const styles = stylex.create({
  postLink: {
    textDecoration: 'none'
  },
  container: {
    marginBottom: '24px'
  }
})

export default function PostLink(props: Props) {

  return (
    <div {...stylex.props(styles.container)}>
      <h2>
        <Link
          {...stylex.props(styles.postLink)}
          to={`/posts/${props.postId}`}
        >
          {props.title}
        </Link>
      </h2>
      <span {...stylex.props(postStyles.date)}>{props.date}</span>
    </div>
  );
}