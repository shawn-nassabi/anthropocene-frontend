const WP_BASE = import.meta.env.VITE_WP_BASE; // Set this in your .env file

/** Get a page by slug (e.g. 'time') */
export async function getTopicPage(slug) {
  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/pages?slug=${slug}&_embed`);
  const data = await res.json();
  return data[0]; // WordPress always returns an array
}

/** Get media attached to a given page ID (your subtopic images) */
export async function getPageImages(pageId) {
  const res = await fetch(
    `${WP_BASE}/wp-json/wp/v2/media?parent=${pageId}&per_page=20&orderby=menu_order&order=asc`
  );
  return res.json(); // returns array of image objects
}
