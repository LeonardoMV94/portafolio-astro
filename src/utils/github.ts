/**
 * Fetches README.md content from a GitHub repository
 * @param username - GitHub username
 * @param repoName - Repository name
 * @returns Promise with README content or null if not found
 */
export async function fetchReadme(username: string, repoName: string): Promise<string | null> {
  try {
    // Try to get README.md from the repository
    const response = await fetch(
      `https://raw.githubusercontent.com/${username}/${repoName}/main/README.md`,{
       
      }
    );
    
    if (response.ok) {
      const result = await response.arrayBuffer()
      return decodeBuffer(result)
    }
    
    // If main branch doesn't have README, try master branch
    const masterResponse = await fetch(
      `https://raw.githubusercontent.com/${username}/${repoName}/master/README.md`
    );
    
    if (masterResponse.ok) {
      const result = await masterResponse.arrayBuffer()
      return decodeBuffer(result)
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching README for ${username}/${repoName}:`, error);
    return null;
  }
}

/**
 * Extracts repository name from GitHub URL
 * @param githubUrl - Full GitHub URL (e.g., "https://github.com/username/repo")
 * @returns Repository name or null if invalid URL
 */
export function extractRepoName(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    if (url.hostname === 'github.com') {
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return pathParts[1]; // Return repository name
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Extracts username from GitHub URL
 * @param githubUrl - Full GitHub URL (e.g., "https://github.com/username/repo")
 * @returns Username or null if invalid URL
 */
export function extractUsername(githubUrl: string): string | null {
  try {
    const url = new URL(githubUrl);
    if (url.hostname === 'github.com') {
      const pathParts = url.pathname.split('/').filter(Boolean);
      if (pathParts.length >= 2) {
        return pathParts[0]; // Return username
      }
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Decodifica un ArrayBuffer en UTF‑8 detectando BOM (UTF‑8, UTF‑16 LE/BE).
 */
function decodeBuffer(buf: ArrayBufferLike): string {
  const bytes = new Uint8Array(buf);

  const isUtf16le = bytes[0] === 0xff && bytes[1] === 0xfe;
  const isUtf16be = bytes[0] === 0xfe && bytes[1] === 0xff;
  const skip =
    isUtf16le || isUtf16be
      ? 2
      : bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf
        ? 3
        : 0;

  const decoder = new TextDecoder(
    isUtf16le ? 'utf-16le' : isUtf16be ? 'utf-16be' : 'utf-8',
  );

  return decoder.decode(bytes.slice(skip));
}

export interface GitHubRepoInfo {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  default_branch: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  archived: boolean;
  disabled: boolean;
  visibility: 'public' | 'private' | 'internal';
  created_at: string; // ISO date
  updated_at: string; // ISO date
  pushed_at: string; // ISO date
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
}

export async function getRepoInfo(username: string, repo: string): Promise<GitHubRepoInfo | null> {
  const res = await fetch(`https://api.github.com/repos/${username}/${repo}`, {
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
    }
  });

  if (!res.ok) {
    console.error(`Error fetching repo info: ${res.status}`);
    return null;
  }

  const data: GitHubRepoInfo = await res.json();

  return data;
}