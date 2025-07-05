import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // obtener por query params
  const { username, repo } = Astro.request.query;
  const res = await fetch(`https://raw.githubusercontent.com/${username}/${repo}/main/README.md`);
  const markdown = await res.text();
  return new Response(markdown, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
};