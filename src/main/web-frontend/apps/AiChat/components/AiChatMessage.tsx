import {graphql, useFragment} from "react-relay";
import {AiChatMessage_message$key} from "__generated__/relay/AiChatMessage_message.graphql";
import AiChatMessageBubble from "apps/AiChat/components/AiChatMessageBubble";

type Props = {
  message: AiChatMessage_message$key,
};

export default function AiChatMessage(props: Props) {
  const data = useFragment(
    graphql`
      fragment AiChatMessage_message on AiMessage {
        role
        content
      }
    `,
    props.message
  )

  return <AiChatMessageBubble role={data.role} content={data.content} />
}
