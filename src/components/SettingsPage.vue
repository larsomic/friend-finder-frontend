<template>
    <button @click="changeLightDarkMode">
      Settings Page
    </button>
  </template>

<script>
export default {
  methods: {
    changeLightDarkMode() {
      const style = getComputedStyle(document.documentElement);
      const color1 = style.getPropertyValue('--light-dark-color-1');
      const color2 = style.getPropertyValue('--light-dark-color-2');
      document.documentElement.style.setProperty('--light-dark-color-2', color1);
      document.documentElement.style.setProperty('--light-dark-color-1', color2);
    }
  }
}
</script>