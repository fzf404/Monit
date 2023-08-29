<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import '@/themes/dark.scss'

const { locale } = useI18n()

const show = ref(false)

const closePlugin = () => {
  window.api.invoke('plugin-close')
}

const minimizePlugin = () => {
  window.api.invoke('plugin-minimize')
}

const stickyPlugin = async () => {
  const state = !(await window.api.invoke('plugin-top'))
  window.api.invoke('plugin-sticky', state)
}

const toggleLanguage = () => {
  locale.value = locale.value.startsWith('zh') ? 'en' : 'zh'
}

const toggleTheme = () => {
  document.documentElement.dataset.theme =
    document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'
}

const toggleSetting = () => {}

onMounted(() => {
  document.documentElement.dataset.theme = 'dark'

  document.addEventListener('mousemove', function (event) {
    show.value = event.clientY < 32 ? true : false
    console.log(event.clientY)
  })
})
</script>

<template>
  <nav class="flex-row-between absolute z-50 gap-x-2 px-2 py-1.5">
    <Transition name="fade">
      <ul v-show="show" class="flex-row-center gap-x-0.5">
        <svg
          class="i-ic-twotone-cancel text-red hover:text-red-500"
          @click="closePlugin"
        ></svg>
        <svg
          class="i-ic-twotone-remove-circle text-yellow hover:text-yellow-500"
          @click="minimizePlugin"
        ></svg>
        <svg
          class="i-ic-twotone-expand-circle-down text-green hover:text-green-500"
          @click="stickyPlugin"
        ></svg>
      </ul>
    </Transition>
    <Transition v-show="show" name="fade">
      <ul class="flex-auto rounded bg-white opacity-10"></ul>
    </Transition>
    <Transition v-show="show" name="fade">
      <ul class="flex-row-center gap-x-0.5">
        <svg
          class="i-ic-twotone-swap-horizontal-circle text-teal hover:text-teal-500"
          @click="toggleLanguage"
        ></svg>
        <svg
          class="i-ic-twotone-dark-mode text-violet hover:text-violet-500"
          @click="toggleTheme"
        ></svg>
        <svg
          class="i-ic-twotone-settings text-blue hover:text-blue-500"
          @click="toggleSetting"
        ></svg>
      </ul>
    </Transition>
  </nav>
</template>

<style lang="scss">
nav {
  ul {
    -webkit-app-region: no-drag;
  }

  ul:nth-child(2) {
    -webkit-app-region: drag;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
</style>
