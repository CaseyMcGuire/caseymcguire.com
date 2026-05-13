import * as React from "react";
import * as stylex from "@stylexjs/stylex";
import AiChatConversation from "apps/AiChat/components/AiChatConversation";
import AiChatSidebar from "apps/AiChat/components/AiChatSidebar";
import {graphql} from "react-relay";
import {useLazyLoadQuery} from "react-relay/hooks";
import {AiChatPageQuery} from "__generated__/relay/AiChatPageQuery.graphql";

const styles = stylex.create({
  container: {
    height: '100%',
    width: '100%',
    fontFamily: 'Inter, sans-serif',
  },
  sidebar: {
    height: '100%',
    width: '240px',
    position: 'fixed',
    borderRightWidth: '1px',
    borderRightColor: '#E5E5E5',
    borderRightStyle: 'solid',
  },
  content: {
    height: '100%',
    marginLeft: '240px',
  }
});

// Placeholder ID used when no conversation is selected — the messages fragment
// is skipped via @include in that case, so this value is never actually queried.
const PLACEHOLDER_CONVERSATION_ID = "00000000-0000-0000-0000-000000000000"

const query = graphql`
  query AiChatPageQuery($conversationId: ID!, $hasConversation: Boolean!) {
    ...AiChatSidebar_query
    ...AiChatMessageList_query
      @arguments(conversationId: $conversationId)
      @include(if: $hasConversation)
  }
`;

type Props = {
  conversationId?: string,
}

export default function AiChatPage(props: Props) {
  const hasConversation = props.conversationId != null
  const data = useLazyLoadQuery<AiChatPageQuery>(query, {
    conversationId: props.conversationId ?? PLACEHOLDER_CONVERSATION_ID,
    hasConversation,
  });
  return (
    <div sx={styles.container}>
      <div sx={styles.sidebar}>
        <AiChatSidebar query={data} />
      </div>
      <div sx={styles.content}>
        <AiChatConversation
          conversationId={props.conversationId}
          query={hasConversation ? data : null}
        />
      </div>
    </div>
  )
}