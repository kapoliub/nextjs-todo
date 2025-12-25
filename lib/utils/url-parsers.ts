export const getPath = (path: string) => {
  const parts = path.split("/").filter(Boolean);

  return `/${parts[0]}`;
};
