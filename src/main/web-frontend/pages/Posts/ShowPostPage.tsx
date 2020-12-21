import * as React from "react";
import {graphql, QueryRenderer} from "react-relay";
import {RelayConfig} from "../../relay/RelayConfig";
import {ShowPostPageQuery} from "../../__generated__/ShowPostPageQuery.graphql";
import {RouteComponentProps} from "react-router-dom";
import Post from "./Post";


export default function SinglePostPage(props: RouteComponentProps<{ id: string }>) {

    const query = graphql`
      query ShowPostPageQuery($id: Int!) {
        post(id: $id) {
          title
          contents
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
        if (error || props == null) {
          return;
        }
        const {post} = props;
        if (post == null) {
          return;
        }
        return (<Post id={id} title={post.title} contents={post.contents} showEditButton={true}/>);
      }
      }/>
  );
}