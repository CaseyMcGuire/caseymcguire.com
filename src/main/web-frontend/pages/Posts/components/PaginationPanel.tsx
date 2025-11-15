import {Link} from "react-router";
import * as React from "react";
import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  paginationPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 25,
    width: '100%',

    '@media (max-width: 600px)': {
      width: 300,
    },
  },

  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  hideArrow: {
    visibility: 'hidden',
  },
});

type Props = {
  pageNumber: number,
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export default function PaginationPanel(props: Props) {
  const path = "/posts/page/";
  const disableRight = !props.hasNextPage;
  const disableLeft = !props.hasPreviousPage;
  return (
    <div {...stylex.props(styles.paginationPanel)}>
      <div {...stylex.props(disableLeft && styles.hideArrow)}>
        <Link to={path + (props.pageNumber - 1)}>&lsaquo;</Link>
      </div>
      <div>{props.pageNumber}</div>
      <div {...stylex.props(disableRight && styles.hideArrow)}>
        <Link to={path + (props.pageNumber + 1)}>&rsaquo;</Link>
      </div>
    </div>
  );
}