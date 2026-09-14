import { useState, useEffect } from 'react';

const API_BASE = 'https://portfolio.khoavo.vndns.net/wp-json/wp/v2';

export function usePortfolioPosts({ perPage = 6, category = null } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchPosts = async (pageNum = 1) => {
    try {
      setLoading(true);
      setError(null);

      let url = `${API_BASE}/posts?per_page=${perPage}&page=${pageNum}&_embed`;
      if (category) {
        url += `&categories=${category}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();
      const totalPages = parseInt(response.headers.get('X-WP-TotalPages') || '1');

      const formattedPosts = data.map(post => ({
        id: post.id,
        title: post.title.rendered,
        excerpt: stripHtml(post.excerpt.rendered),
        date: post.date,
        dateFormatted: formatDate(post.date),
        link: post.link,
        slug: post.slug,
        featuredImage: getFeaturedImage(post),
        categories: post._embedded?.['wp:term']?.[0]?.map(cat => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          link: cat.link
        })) || [],
        tags: post._embedded?.['wp:term']?.[1]?.map(tag => ({
          id: tag.id,
          name: tag.name,
          slug: tag.slug
        })) || []
      }));

      if (pageNum === 1) {
        setPosts(formattedPosts);
      } else {
        setPosts(prev => [...prev, ...formattedPosts]);
      }

      setHasMore(pageNum < totalPages);
      setPage(pageNum);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch portfolio posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, [perPage, category]);

  const loadMore = () => {
    if (!loading && hasMore) {
      fetchPosts(page + 1);
    }
  };

  const refresh = () => {
    fetchPosts(1);
  };

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    refresh
  };
}

export function transformToProject(post) {
  const year = new Date(post.date).getFullYear();
  const category = post.categories.length > 0 ? post.categories[0].name : 'Creative Work';
  
  return {
    id: post.id,
    title: post.title,
    category: category,
    image: post.featuredImage?.medium || post.featuredImage?.large || '',
    description: post.excerpt,
    link: post.link,
    year: String(year)
  };
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

function getFeaturedImage(post) {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media) return null;

  const sizes = media.media_details?.sizes;
  return {
    full: media.source_url,
    large: sizes?.large?.source_url || media.source_url,
    medium: sizes?.medium?.source_url || media.source_url,
    thumbnail: sizes?.thumbnail?.source_url || media.source_url
  };
}

export default usePortfolioPosts;
