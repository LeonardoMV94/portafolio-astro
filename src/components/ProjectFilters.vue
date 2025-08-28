<template>
  <div class="mb-8">
    <h3 class="mb-4 text-lg font-semibold text-neutral-900 dark:text-neutral-200">
      Filter by technology or languega
    </h3>
    
    <div class="flex flex-wrap gap-2">
      <!-- All projects button -->
      <button
        @click="setFilter('all')"
        :class="[
          'px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 border-2',
          activeFilter === 'all' 
            ? 'bg-indigo-600 text-white border-indigo-600' 
            : 'border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        ]"
      >
        Todos
      </button>
      
      <!-- Language filters -->
      <button
        v-for="language in allLanguages"
        :key="`lang-${language}`"
        @click="setFilter('language', language)"
        :class="[
          'px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 border-2',
          activeFilter === 'language' && activeValue === language
            ? 'bg-indigo-600 text-white border-indigo-600' 
            : 'border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        ]"
      >
        {{ language }}
      </button>
      
      <!-- Framework filters -->
      <button
        v-for="framework in allFrameworks"
        :key="`fw-${framework}`"
        @click="setFilter('framework', framework)"
        :class="[
          'px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 border-2',
          activeFilter === 'framework' && activeValue === framework
            ? 'bg-indigo-600 text-white border-indigo-600' 
            : 'border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'
        ]"
      >
        {{ framework }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Props
const props = defineProps({
  allLanguages: {
    type: Array,
    required: true
  },
  allFrameworks: {
    type: Array,
    required: true
  }
})

// Emits
const emit = defineEmits(['filter-change'])

// Reactive state
const activeFilter = ref('all')
const activeValue = ref('')

// Computed
const allLanguages = computed(() => props.allLanguages)
const allFrameworks = computed(() => props.allFrameworks)

// Methods
const setFilter = (filterType, value = '') => {
  activeFilter.value = filterType
  activeValue.value = value
  
  // Emit the filter change
  emit('filter-change', {
    type: filterType,
    value: value
  })
  
  console.log('Filter changed:', filterType, value)
}

// Initialize on mount
onMounted(() => {
  console.log('ProjectFilters Vue component mounted')
  console.log('Languages:', allLanguages.value)
  console.log('Frameworks:', allFrameworks.value)
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
