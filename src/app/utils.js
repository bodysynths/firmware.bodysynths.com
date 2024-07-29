export const getAssetPath = (path) => {
  const basePath = process.env.NEXT_PUBLIC_ASSET_PATH || "";
  // console.log("GET ASSET", `${basePath}${path}`);
  return `${basePath}/${path}`;
};
