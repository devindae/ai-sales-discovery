type Message = {
  role: "user" | "assistant";
  content: string;
};

const memoryStore = new Map<string, Message[]>();

function getKey(
  teamId: string,
  stakeholderId: string
) {
  return `${teamId}_${stakeholderId}`;
}

export function getConversation(
  teamId: string,
  stakeholderId: string
): Message[] {
  return (
    memoryStore.get(
      getKey(teamId, stakeholderId)
    ) || []
  );
}

export function addMessage(
  teamId: string,
  stakeholderId: string,
  role: "user" | "assistant",
  content: string
) {
  const key = getKey(
    teamId,
    stakeholderId
  );

  const history =
    memoryStore.get(key) || [];

  history.push({
    role,
    content,
  });

  if (history.length > 30) {
    history.shift();
  }

  memoryStore.set(key, history);
}

export function clearConversation(
  teamId: string,
  stakeholderId: string
) {
  memoryStore.delete(
    getKey(teamId, stakeholderId)
  );
}