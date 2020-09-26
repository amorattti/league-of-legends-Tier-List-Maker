export const fetchImages = async (url) => {
  const fetchApi = await fetch(url);
  return fetchApi.json();
};
