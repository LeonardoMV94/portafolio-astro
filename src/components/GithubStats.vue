<script setup lang="ts">
import { ref, onMounted } from 'vue';

interface Props {
  username: string;
  repoName: string;
}

export interface GithubResponse {
    id:                          number;
    node_id:                     string;
    name:                        string;
    full_name:                   string;
    private:                     boolean;
    owner:                       Owner;
    html_url:                    string;
    description:                 string;
    fork:                        boolean;
    url:                         string;
    forks_url:                   string;
    keys_url:                    string;
    collaborators_url:           string;
    teams_url:                   string;
    hooks_url:                   string;
    issue_events_url:            string;
    events_url:                  string;
    assignees_url:               string;
    branches_url:                string;
    tags_url:                    string;
    blobs_url:                   string;
    git_tags_url:                string;
    git_refs_url:                string;
    trees_url:                   string;
    statuses_url:                string;
    languages_url:               string;
    stargazers_url:              string;
    contributors_url:            string;
    subscribers_url:             string;
    subscription_url:            string;
    commits_url:                 string;
    git_commits_url:             string;
    comments_url:                string;
    issue_comment_url:           string;
    contents_url:                string;
    compare_url:                 string;
    merges_url:                  string;
    archive_url:                 string;
    downloads_url:               string;
    issues_url:                  string;
    pulls_url:                   string;
    milestones_url:              string;
    notifications_url:           string;
    labels_url:                  string;
    releases_url:                string;
    deployments_url:             string;
    created_at:                  Date;
    updated_at:                  Date;
    pushed_at:                   Date;
    git_url:                     string;
    ssh_url:                     string;
    clone_url:                   string;
    svn_url:                     string;
    homepage:                    string;
    size:                        number;
    stargazers_count:            number;
    watchers_count:              number;
    language:                    string;
    has_issues:                  boolean;
    has_projects:                boolean;
    has_downloads:               boolean;
    has_wiki:                    boolean;
    has_pages:                   boolean;
    has_discussions:             boolean;
    forks_count:                 number;
    mirror_url:                  null;
    archived:                    boolean;
    disabled:                    boolean;
    open_issues_count:           number;
    license:                     null;
    allow_forking:               boolean;
    is_template:                 boolean;
    web_commit_signoff_required: boolean;
    topics:                      string[];
    visibility:                  string;
    forks:                       number;
    open_issues:                 number;
    watchers:                    number;
    default_branch:              string;
    temp_clone_token:            null;
    network_count:               number;
    subscribers_count:           number;
}

export interface Owner {
    login:               string;
    id:                  number;
    node_id:             string;
    avatar_url:          string;
    gravatar_id:         string;
    url:                 string;
    html_url:            string;
    followers_url:       string;
    following_url:       string;
    gists_url:           string;
    starred_url:         string;
    subscriptions_url:   string;
    organizations_url:   string;
    repos_url:           string;
    events_url:          string;
    received_events_url: string;
    type:                string;
    user_view_type:      string;
    site_admin:          boolean;
}

const props = defineProps<Props>();
const repoStats = ref<GithubResponse | null>(null);

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
  <div v-if="repoStats" class="bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-6 border border-neutral-200 dark:border-neutral-800 mt-6">
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

    <div v-if="repoStats.created_at" class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      <div class="flex items-center justify-between">
        <span class="text-sm text-neutral-600 dark:text-neutral-400">Created at</span>
        <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100 " >{{ new Date(repoStats.created_at).toLocaleDateString() }}</span>
      </div>
    </div>

    <div v-if="repoStats.updated_at" class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
      <div class="flex items-center justify-between">
        <span class="text-sm text-neutral-600 dark:text-neutral-400">Updated at</span>
        <span class="text-sm font-medium text-neutral-900 dark:text-neutral-100 " >{{ new Date(repoStats.updated_at).toLocaleDateString() }}</span>
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
