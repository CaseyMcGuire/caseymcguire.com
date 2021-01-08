import * as React from "react";
import {graphql, QueryRenderer} from "react-relay";
import {RelayConfig} from "../../relay/RelayConfig";
import {ShowPostPageQuery} from "../../__generated__/ShowPostPageQuery.graphql";
import {RouteComponentProps, Redirect} from "react-router-dom";
import Post from "./components/Post";
import LoadingPost from "./components/LoadingPost";


export default function SinglePostPage(props: RouteComponentProps<{ id: string }>) {

    const query = graphql`
      query ShowPostPageQuery($id: Int!) {
        post(id: $id) {
          title
          contents
          published_date
        }
      }
    `;
  const id = parseInt(props.match.params.id);

  return (
    <QueryRenderer<ShowPostPageQuery>
      environment={RelayConfig.getEnvironment()}
      query={query}
      variables={{id}}
      render={({error, props}) => {
        if (error != null) {
          return <Redirect to={"/500"} />;
        }
        if (props == null) {
          return <LoadingPost />;
        }
        const {post} = props;
        if (post == null) {
          return;
        }
        return (<Post id={id} title={post.title} contents={post.contents} publishedDate={post.published_date} showEditButton={true}/>);
      }
      }/>
  );
}