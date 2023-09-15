import { getAllPosts } from './wordpress';

export async function getSearchData() {
  const response = await getAllPosts();
  const postsData = response?.edges;
  const json = generateIndexSearch(postsData);
  return JSON.parse(json);
}

export function generateIndexSearch(posts) {
  const indexJson = JSON.stringify({
    generated: Date.now(),
    posts: posts,
  });

  return indexJson;
}