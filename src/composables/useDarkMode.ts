import { ref, watchEffect } from 'vue'

const DARK_KEY = 'task-manager-dark'

function loadDark(): boolean {
  try {
    const val = localStorage.getItem(DARK_KEY)
    if (val !== null) return val === 'true'
  } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const isDark = ref(loadDark())

watchEffect(() => {
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem(DARK_KEY, String(isDark.value))
})

export function useDarkMode() {
  function toggle() {
    isDark.value = !isDark.value
  }

  return { isDark, toggle }
}