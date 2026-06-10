const questionStore = new Map<
  string,
  {
    count: number;
    expiresAt: number;
  }
>();

export function checkQuestionLimit(
  stakeholderId: string,
  limit: number
) {
  const existing = questionStore.get(stakeholderId);

  if (!existing) {
    questionStore.set(stakeholderId, {
      count: 1,
      expiresAt: Date.now() + 48 * 60 * 60 * 1000,
    });

    return {
      allowed: true,
      remaining: limit - 1,
    };
  }

  if (Date.now() > existing.expiresAt) {
    questionStore.set(stakeholderId, {
      count: 1,
      expiresAt: Date.now() + 48 * 60 * 60 * 1000,
    });

    return {
      allowed: true,
      remaining: limit - 1,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
    };
  }

  existing.count++;

  return {
    allowed: true,
    remaining: limit - existing.count,
  };
}