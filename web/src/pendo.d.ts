// The Pendo agent is loaded at runtime by the Pendo install snippet, so it may be absent.
interface PendoAgent {
  trackAgent: (
    eventType: "prompt" | "agent_response" | "user_reaction",
    metadata: {
      agentId: string;
      conversationId: string;
      messageId: string;
      content: string;
      modelUsed?: string;
      suggestedPrompt?: boolean;
      toolsUsed?: string[];
      fileUploaded?: boolean;
    },
  ) => void;
}

interface Window {
  pendo?: PendoAgent;
}
