// THIS FILE IS GENERATED. DO NOT EDIT BY HAND.
// Run './gradlew generateClientRoutes' to regenerate.

function routeWithoutParams(path: string) {
  return Object.assign(() => path, { path });
}

type RouteParamValue = string | number;

function encodeRouteParam(value: RouteParamValue): string {
  return encodeURIComponent(String(value));
}

function route<TParams extends object>(path: string, buildPath: (params: TParams) => string) {
  return Object.assign(buildPath, { path });
}

export const AIChatRoutes = {
  AiChatIndex: routeWithoutParams("/ai_chat"),
  ViewChat: route(
    "/ai_chat/chat/:conversationId",
    (params: { conversationId: string }) => `/ai_chat/chat/${encodeRouteParam(params.conversationId)}`
  ),
} as const;

export type AIChatRoute = keyof typeof AIChatRoutes;
