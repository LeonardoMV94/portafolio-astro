<template>
  <div class="flex gap-4 justify-center flex-col sm:flex-row sm:items-center flex-wrap my-8">
    <div class="flex items-center gap-2 px-4 py-1 rounded-md bg-neutral-800 text-white">
      <IconMDI name="mdi:calendar" size="4" />
      Since 2018 on Github
    </div>
    <a href="https://github.com/LeonardoMV94?tab=repositories" target="_blank"
      class="flex items-center gap-2 px-4 py-1 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 transition">
      <IconMDI name="mdi:source-repository" size="4" />
      55 Public Repos
    </a>
    <a href="https://github.com/LeonardoMV94?tab=followers" target="_blank"
      class="flex items-center gap-2 px-4 py-1 rounded-md bg-neutral-800 text-white hover:bg-neutral-700 transition">
      <IconMDI name="mdi:account-group" size="4" />
      40 Followers
    </a>
  </div>
</template>

<script setup lang="ts">
import IconMDI from './IconMDI.vue';
import { ref, onMounted } from 'vue';

interface GithubResponse {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  name: string;
  company: null;
  blog: string;
  location: string;
  email: null;
  hireable: null;
  bio: null;
  twitter_username: null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: Date;
  updated_at: Date;
}

const githubUserData = ref<GithubResponse | null>(null);

const getGithubUserData = async () => {

  if (localStorage.getItem('githubUserData')) {
    githubUserData.value = JSON.parse(localStorage.getItem('githubUserData'));
    return;
  } else {
    try {
      const githubUserDataResponse = await fetch("https://api.github.com/users/LeonardoMV94");
      const githubUserDataJson = await githubUserDataResponse.json();

      localStorage.setItem('githubUserData', JSON.stringify(githubUserDataJson));
      githubUserData.value = { ...githubUserDataJson };
    } catch (error) {
      console.error(error);
      return;
    }
  }


}

onMounted(() => {
  getGithubUserData();
});
</script>