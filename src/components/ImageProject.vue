<template>
    <img
      :src="imageComputed"
      :alt="alt"
      :class="`w-${size} h-${size} rounded-lg aspect-1/1 object-cover`"
    />
  
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const darkMode = ref(localStorage.getItem('dark_mode') === 'true')

const imageComputed = computed(() => {
  if(props.image.toLowerCase().includes('express')) {
    return props.image + (darkMode.value ? '/fff' : '/000')
  }
  return props.image
})


onMounted(() => {
  darkMode.value = document.documentElement.classList.contains('dark')

  const observer = new MutationObserver(() => {
    darkMode.value = document.documentElement.classList.contains('dark')
  })

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

const props = defineProps({
  image: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '6',
  },
})
</script>
