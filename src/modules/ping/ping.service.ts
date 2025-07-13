export const getPingResponse = (): string => {
  const now = new Date().toISOString();
  return `pong 🏓 - ${now}`;
};

export const getPingUserResponse = (): string[] => {
  return ['1', '2', '4', '8', '16', '32', '64']
};
