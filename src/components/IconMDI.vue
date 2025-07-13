<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '24',
  }
})

const darkMode = ref(false)

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
</script>

<template>
  <Icon :icon="name" :class="'w-' + size + ' h-' + size + ' ' + (darkMode ? 'fill-white' : 'fill-black')" />
<!-- <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      :fill="isDark ? '#fff' : '#000'"
      ><path
        d="M160-80q-33 0-56.5-23.5T80-160v-440q0-33 23.5-56.5T160-680h200v-120q0-33 23.5-56.5T440-880h80q33 0 56.5 23.5T600-800v120h200q33 0 56.5 23.5T880-600v440q0 33-23.5 56.5T800-80H160Zm0-80h640v-440H600q0 33-23.5 56.5T520-520h-80q-33 0-56.5-23.5T360-600H160v440Zm80-80h240v-18q0-17-9.5-31.5T444-312q-20-9-40.5-13.5T360-330q-23 0-43.5 4.5T276-312q-17 8-26.5 22.5T240-258v18Zm320-60h160v-60H560v60Zm-200-60q25 0 42.5-17.5T420-420q0-25-17.5-42.5T360-480q-25 0-42.5 17.5T300-420q0 25 17.5 42.5T360-360Zm200-60h160v-60H560v60ZM440-600h80v-200h-80v200Zm40 220Z"
      ></path></svg
    > -->
</template>