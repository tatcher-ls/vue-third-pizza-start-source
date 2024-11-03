export const getImage = (image) => {
  // https://vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  //@ts-ignore
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};
