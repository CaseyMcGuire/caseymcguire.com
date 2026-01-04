import * as React from "react";
import {graphql, QueryRenderer} from "react-relay";
import {IndexPostPageQuery} from "__generated__/relay/IndexPostPageQuery.graphql";
import {redirect, useNavigate, useParams} from "react-router";
import LoadingPost from "apps/MainApp/pages/Posts/components/LoadingPost";
import Page from "apps/MainApp/components/Page";
import PaginationPanel from "apps/MainApp/pages/Posts/components/PaginationPanel";
import PostLink from "apps/MainApp/pages/Posts/components/PostLink";
import {useLazyLoadQuery} from "react-relay/hooks";
import {Suspense} from "react";

export default function IndexPostPage() {
  const params = useParams();
  const navigate = useNavigate();
  const id = params.id ?? '1';

  const page = parseInt(id);
  const isInvalidId = Number.isNaN(page) || page < 0;
  if (isInvalidId) {
    navigate("/")
    return null;
  }
  return (
    <Suspense fallback={
      <Page>
        {
          [1, 2, 3].map((_, index) => {
            return <LoadingPost key={index}/>
          })
        }
      </Page>
    }>
      <IndexPostPageImpl page={page} />
    </Suspense>
  )
}

function IndexPostPageImpl(props: {page: number}) {
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

  const count = 10
  const response = useLazyLoadQuery<IndexPostPageQuery>(
    query,
    {
      count,
      offset: count * (props.page - 1)
    }
  );


  const posts = response.page.posts
  const hasNextPage = response.page.hasNextPage
  const hasPreviousPage = response.page.hasPreviousPage
  if (posts == null) {
    redirect("/500")
    return null;
  }

  return (
    <Page>
      <div>
        {
          posts.map((post, index) =>
            <PostLink key={index} date={post.publishedDate} postId={post.postId} title={post.title} />
          )
        }
        <PaginationPanel
          pageNumber={props.page}
          hasNextPage={hasNextPage}
          hasPreviousPage={hasPreviousPage}/>
      </div>
    </Page>
  )

}
