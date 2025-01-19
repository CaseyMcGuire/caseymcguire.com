import * as React from "react";
import { Link } from "react-router";
import {createUseStyles} from "react-jss";
import {usePostStyles} from "./PostHooks";

type Props = {
  postId: number,
  title: string,
  date: string
}

const useStyles = createUseStyles({
  postLink: {
    textDecoration: 'none'
  },
  container: {
    marginBottom: '24px'
  }
})

export default function PostLink(props: Props) {
  const styles = useStyles()
  const postStyles = usePostStyles();

  return (
    <div className={styles.container}>
      <h2>
        <Link className={styles.postLink} to={"/posts/" + props.postId}>
          {props.title}
        </Link>
      </h2>
      <span className={postStyles.date}>{props.date}</span>

    </div>
  )
}