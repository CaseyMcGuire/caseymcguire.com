import {Link} from "react-router";
import * as React from "react";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  paginationPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: '25px',
    width: '100%'
  },
  '@media only screen and (max-width: 600px)': {
    paginationPanel: {
      width: '300px'
    }
  },
  postsContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  hideArrow: {
    visibility: 'hidden'
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
  const styles = useStyles();
  return (
    <div className={styles.paginationPanel}>
      <div className={disableLeft ? styles.hideArrow : ""}>
        <Link to={path + (props.pageNumber - 1)}>&lsaquo;</Link>
      </div>
      <div>
        {props.pageNumber}
      </div>
      <div className={disableRight ? styles.hideArrow : ""}>
        <Link to={path + (props.pageNumber + 1)}>&rsaquo;</Link>
      </div>
    </div>
  )
}