<template>
    <img
      :src="imageComputed"
      :alt="alt"
      class="w-full h-auto rounded-lg aspect-1/1 object-cover"
    />
  
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from 'vue'

const darkMode = ref(localStorage.getItem('dark_mode') === 'true')

const imageComputed = computed(() => {
  if(props.image.toLowerCase().includes('express')) {
    console.log(props.image)
    console.log(props.image + (darkMode.value ? '/fff' : '/000'))
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
});
</script>
