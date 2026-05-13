import AiChatPage from "apps/AiChat/components/AiChatPage";
import {useParams} from "react-router";

export default function AiViewChatPage() {
  const { conversationId } = useParams<{conversationId?: string}>()
  console.log(conversationId)
  return (
    <AiChatPage conversationId={conversationId} />
  )
}
