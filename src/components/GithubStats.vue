<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Props {
  username: string;
  repoName: string;
}

const props = defineProps<Props>();
const repoStats = ref<any>(null);

onMounted(async () => {
  const key = `github-data-${props.username}-${props.repoName}`;
  const cached = localStorage.getItem(key);

  if (cached) {
    repoStats.value = JSON.parse(cached);
    return;
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${props.username}/${props.repoName}`);
    if (res.ok) {
      const data = await res.json();
      repoStats.value = data;
      localStorage.setItem(key, JSON.stringify(data));
    }
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
  }
});
</script>

<template>
  <div v-if="repoStats" class="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 mb-6">
    <h4 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">Repository Stats</h4>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <div class="text-center">
        <div class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{{ repoStats.stargazers_count }}</div>
        <div class="text-xs text-neutral-600 dark:text-neutral-400">Stars</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{{ repoStats.forks_count }}</div>
        <div class="text-xs text-neutral-600 dark:text-neutral-400">Forks</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{{ repoStats.watchers_count }}</div>
        <div class="text-xs text-neutral-600 dark:text-neutral-400">Watchers</div>
      </div>
      <div class="text-center">
        <div class="text-2xl font-bold text-neutral-900 dark:text-neutral-100">{{ repoStats.open_issues_count }}</div>
        <div class="text-xs text-neutral-600 dark:text-neutral-400">Issues</div>
      </div>
    </div>

    <div v-if="repoStats.language" class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      <div class="flex items-center justify-between">
        <span class="text-sm text-neutral-600 dark:text-neutral-400">Primary Language</span>
        <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100">{{ repoStats.language }}</span>
      </div>
    </div>
  </div>
</template>
