export const wait = async (ms: any) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
