import * as React from "react";
import {graphql, QueryRenderer} from "react-relay";
import Post from "./components/Post";
import {RelayConfig} from "relay/RelayConfig";
import {IndexPostPageQuery} from "__generated__/IndexPostPageQuery.graphql";
import {createUseStyles} from "react-jss";
import Common from "../Page/Common";
import {Link} from "react-router-dom";
import {RouteComponentProps, Redirect} from "react-router-dom";
import LoadingPost from "./components/LoadingPost";
import Page from "../Page/Page";

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

export default function IndexPostPage(props: RouteComponentProps<{ id?: string }>) {
  // we must alias id to postID. See https://github.com/facebook/relay/issues/1682#issuecomment-296393416
    const query = graphql`
      query IndexPostPageQuery($page: Int!) {
        posts(page: $page) {
          postId: id
          title
          contents
          publishedDate: published_date
        }
      }
    `;

  const id = props.match.params.id ?? '1';

  const page = parseInt(id);
  const isInvalidId = Number.isNaN(page);
  if (isInvalidId) {
    return <Redirect to={"/"}/>
  }

  return (
    <Page>
    <QueryRenderer<IndexPostPageQuery>
      environment={RelayConfig.getEnvironment()}
      query={query}
      render={({error, props}) => {

        if (error) {
          return <Redirect to={"/500"} />;
        }
        if (props == null) {
          return [1,2,3].map((_, index) => {
            return <LoadingPost key={index} />
          });
        }
        return (
          <div>
            {
              props.posts.map((post, index) => {
                return <Post key={index}
                             id={post.postId}
                             title={post.title}
                             contents={post.contents}
                             publishedDate={post.publishedDate}
                             showEditButton={true} />
              })
            }
            <PaginationPanel pageNumber={page} hasNextPage={true}/>
          </div>
        );
      }}
      variables={{page}}
    />
    </Page>
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