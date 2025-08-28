<template>
  <div>
    <!-- Filters Component -->
    <ProjectFilters 
      :all-languages="allLanguages"
      :all-frameworks="allFrameworks"
      @filter-change="handleFilterChange"
    />

    <!-- Projects Grid -->
    <div class="z-50 grid items-stretch w-full grid-cols-1 my-8 gap-7 sm:gap-5 sm:grid-cols-2">
      <TransitionGroup 
        name="project-fade" 
        tag="div" 
        class="contents"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.name"
          class="relative flex flex-col items-stretch duration-300 ease-out px-7 py-4 sm:p-3 group h-100 rounded-2xl"
        >
          <!-- Project Card Content -->
          <a :href="`/projects/${generateSlug(project.name)}`" class="relative z-30 block duration-300 ease-out group-hover:-translate-x-1 group-hover:-translate-y-1">
            <!-- Project Image -->
            <div class="contents">
              <ImageProject 
                :image="getProjectImage(project)" 
                :alt="project.name" 
                size="45" 
              />
            </div>

            <!-- Project Info -->
            <div class="block w-full px-1 mb-1 sm:mt-3">
              <h3 class="flex items-center text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-1">
                <span>{{ project.name }}</span>
                <svg
                  class="group-hover:translate-x-0 group-hover:translate-y-0 -rotate-45 translate-y-1 -translate-x-1 w-2.5 h-2.5 stroke-current ml-1 transition-all ease-in-out duration-200 transform"
                  viewBox="0 0 13 15"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    stroke="none"
                    stroke-width="1"
                    fill="none"
                    fill-rule="evenodd"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <g
                      transform="translate(0.666667, 2.333333)"
                      stroke="currentColor"
                      stroke-width="2.4"
                    >
                      <polyline
                        class="transition-all duration-200 ease-out opacity-0 delay-0 group-hover:opacity-100"
                        points="5.33333333 0 10.8333333 5.5 5.33333333 11"
                      />
                      <line
                        class="transition-all duration-200 ease-out transform -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                        x1="10.8333333"
                        y1="5.5"
                        x2="0.833333333"
                        y2="5.16666667"
                      />
                    </g>
                  </g>
                </svg>
              </h3>
              
              <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-3 truncate">
                {{ project.description }}
              </p>

              <!-- Tech lists -->
              <div class="text-xs space-y-1 mb-1">
                <p v-if="project.languages.length > 0">
                  <strong>Languages:</strong> {{ project.languages.join(", ") }}
                </p>
                <p v-if="project.frameworks.length > 0">
                  <strong>Frameworks:</strong> {{ project.frameworks.join(", ") }}
                </p>
                <p v-if="project.technologies.length > 0">
                  <strong>Tech:</strong> {{ project.technologies.join(", ") }}
                </p>
              </div>

              <!-- View Details Link -->
              <!-- <div class="flex flex-col items-stretch px-7">
                <a
                  :href="`/projects/${generateSlug(project.name)}`"
                  class="px-3 py-2 font-semibold bg-black text-white hover:bg-gray-700 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-xl hover:underline text-center"
                >
                  more
                </a>
              </div> -->
            </div>
          </a>

          <!-- Borders and background layers -->
          <span class="absolute inset-0 z-20 block w-full h-full duration-300 ease-out bg-transparent border border-transparent border-dashed group-hover:-translate-x-1 group-hover:-translate-y-1 group-hover:border group-hover:border-neutral-300 dark:group-hover:border-neutral-600 group-hover:bg-white dark:group-hover:bg-neutral-950 rounded-2xl"></span>
          <span class="absolute inset-0 z-10 block w-full h-full duration-300 ease-out border border-dashed rounded-2xl border-neutral-300 dark:border-neutral-600 group-hover:translate-x-1 group-hover:translate-y-1"></span>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProjectFilters from './ProjectFilters.vue'
import ImageProject from './ImageProject.vue'

// Props
const props = defineProps({
  projects: {
    type: Array,
    required: true
  }
})

// Reactive state
const currentFilter = ref({ type: 'all', value: '' })

// Computed properties
const allLanguages = computed(() => {
  return [...new Set(props.projects.flatMap(project => project.languages))].sort()
})

const allFrameworks = computed(() => {
  return [...new Set(props.projects.flatMap(project => project.frameworks))].sort()
})

const filteredProjects = computed(() => {
  if (currentFilter.value.type === 'all') {
    return props.projects
  }
  
  return props.projects.filter(project => {
    if (currentFilter.value.type === 'language') {
      return project.languages.includes(currentFilter.value.value)
    }
    if (currentFilter.value.type === 'framework') {
      return project.frameworks.includes(currentFilter.value.value)
    }
    return true
  })
})

// Methods
const handleFilterChange = (filter) => {
  currentFilter.value = filter
  console.log('Projects filtered:', filteredProjects.value.length)
}

const generateSlug = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

const getProjectImage = (project) => {
  return `https://cdn.simpleicons.org/${project.frameworks[0] ?? project.languages[0]}`
}

// Initialize
onMounted(() => {
  console.log('ProjectsList Vue component mounted')
  console.log('Total projects:', props.projects.length)
})
</script>

<style scoped>
.project-fade-enter-active,
.project-fade-leave-active {
  transition: all 0.3s ease;
}

.project-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.project-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.project-fade-move {
  transition: transform 0.3s ease;
}
</style>
