export const getAssetPath = (path) => {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  // console.log("GET ASSET", `${basePath}${path}`);
  return `${basePath}/${path}`;
};
