import * as React from "react";
import {graphql, QueryRenderer} from "react-relay";
import {RelayConfig} from "relay/RelayConfig";
import {IndexPostPageQuery} from "__generated__/IndexPostPageQuery.graphql";
import {RouteComponentProps, Redirect} from "react-router-dom";
import LoadingPost from "./components/LoadingPost";
import Page from "../Page/Page";
import PaginationPanel from "./components/PaginationPanel";
import PostLink from "./components/PostLink";

export default function IndexPostPage(props: RouteComponentProps<{ id?: string }>) {
    // we must alias id to postID. See https://github.com/facebook/relay/issues/1682#issuecomment-296393416
    const query = graphql`
      query IndexPostPageQuery($count: Int!, $offset: Int!) {
        page: posts(count: $count, offset: $offset) {
          posts {
            postId: id
            title
            contents
            publishedDate: published_date
          }
          hasPreviousPage
          hasNextPage
        }
      }
    `;

  const id = props.match.params.id ?? '1';

  const page = parseInt(id);
  const isInvalidId = Number.isNaN(page) || page < 0;
  if (isInvalidId) {
    return <Redirect to={"/"}/>
  }
  const count = 10
  return (
    <Page>
      <QueryRenderer<IndexPostPageQuery>
        environment={RelayConfig.getEnvironment()}
        query={query}
        render={({error, props}) => {
          if (error) {
            return <Redirect to={"/500"}/>;
          }
          if (props == null) {
            return [1, 2, 3].map((_, index) => {
              return <LoadingPost key={index}/>
            });
          }
          const posts = props.page.posts
          const hasNextPage = props.page.hasNextPage
          const hasPreviousPage = props.page.hasPreviousPage

          return (
            <div>
              {
                posts.map((post, index) => {
                  return <PostLink date={post.publishedDate} postId={post.postId} title={post.title} />
                })
              }
              <PaginationPanel
                pageNumber={page}
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}/>
            </div>
          );
        }}
        variables={{
          count,
          offset: count * (page - 1)
        }}
      />
    </Page>
  )

}
