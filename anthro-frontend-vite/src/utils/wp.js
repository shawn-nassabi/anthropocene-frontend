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
    `${WP_BASE}/wp-json/wp/v2/media?parent=${pageId}&per_page=20&orderby=title&order=asc`
  );
  return res.json(); // returns array of image objects
}

/** Get a single post (subtopic article) by its slug */
export async function getSubtopicPost(slug) {
  const res = await fetch(
    `${import.meta.env.VITE_WP_BASE}/wp-json/wp/v2/posts?slug=${slug}&_embed`
  );
  const data = await res.json();
  return data[0]; // always returns an array
}

/** Get ANY category (topic or sub-topic) by slug */
export async function getCategory(slug) {
  const res = await fetch(`${WP_BASE}/wp-json/wp/v2/categories?slug=${slug}`);
  const data = await res.json();
  return data[0];
}

/** Get direct child categories of a parent category */
export async function getChildCategories(parentId) {
  return fetch(
    `${WP_BASE}/wp-json/wp/v2/categories?parent=${parentId}&per_page=100`
  ).then((r) => r.json());
}

/** Get posts that belong to a category id */
export async function getPostsInCategory(catId) {
  return fetch(
    `${WP_BASE}/wp-json/wp/v2/posts?categories=${catId}&per_page=20&_embed`
  ).then((r) => r.json());
}

// Get posts that belong to a subcategory by slug
export async function getPostsInSubcategory(slug) {
  const category = await getCategory(slug);
  if (!category || !category.id) throw new Error("Category not found");
  return getPostsInCategory(category.id);
}

/** Get team members by category slug */
export async function getTeamMembers() {
  // First get the team-members category
  const category = await getCategory("team-members");
  if (!category) return [];

  // Then get all posts in that category
  return getPostsInCategory(category.id);
}
