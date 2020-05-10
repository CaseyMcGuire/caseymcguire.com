import * as React from "react";
import {graphql, QueryRenderer} from "react-relay";
import Post from "./Post";
import {RelayConfig} from "../../relay/RelayConfig";
import {IndexPostPageQuery} from "../../__generated__/IndexPostPageQuery.graphql";
import {createUseStyles} from "react-jss";
import Common from "../Page/Common";
import {Link} from "react-router-dom";

const useStyles = createUseStyles({
  paginationPanel: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: '25px',
    width: Common.postWidth + 'px'
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

export default function IndexPostPage() {
    const query = graphql`
      query IndexPostPageQuery($page: Int!) {
        posts(page: $page) {
          id
          title
          content
        }
      }
    `;
  return (
    <QueryRenderer<IndexPostPageQuery>
      environment={RelayConfig.getEnvironment()}
      query={query}
      render={({error, props}) => {
        if (error || props == null) {
          return <div/>;
        }
        return (
          <div>
            {
              props.posts.map((post, index) => {
                return <Post key={index} id={post.id} title={post.title} contents={post.content}/>
              })
            }
            <PaginationPanel pageNumber={1} hasNextPage={true}/>
          </div>
        );
      }}
      variables={{page: 1}}/>
  )

}

function PaginationPanel(props: { pageNumber: number, hasNextPage: boolean }) {
  const path = "/posts/page/";
  const disableRight = !props.hasNextPage;
  const disableLeft = props.pageNumber === 1;
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