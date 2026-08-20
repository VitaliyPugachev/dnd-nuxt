<script setup lang="ts">

</script>

<template>
  <!-- Ranger Placeholder (fantasy, transparent bg) -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="256" height="256" fill="currentColor" role="img" aria-labelledby="title desc">
    <title id="title">Ranger avatar placeholder</title>
    <desc id="desc">Minimal silhouette of a hooded ranger in a cloak with a bow on the back</desc>

    <!-- Bow on the back -->
    <path d="M200 40c-24 18-40 44-46 74l-8-3c6-33 24-61 50-80 2-1 5 0 6 2s0 5-2 7z"/>
    <!-- Bowstring -->
    <path d="M202 36c6 32 6 64 0 96" opacity=".7"/>

    <!-- Hood & head -->
    <path d="M120 72c-3-17 10-32 28-32 10 0 19 5 24 13l14 22c-10 6-20 12-31 16-12 4-23 6-35 4l0 0c-1-9 0-17 0-23z"/>

    <!-- Cloak main silhouette -->
    <path d="M44 216c14-34 27-60 41-78 8-10 17-18 26-24 7-5 16-9 25-12 16-5 33-7 50-8
           9 0 14 6 14 14 0 7-4 13-10 16l-26 12c15 5 28 15 36 30 6 12 10 28 12 48H44z"/>

    <!-- Arm & chest (subtle bump so it doesn't look too flat) -->
    <path d="M122 132c-10 7-18 16-24 28 13 1 26-1 37-6 11-6 20-14 28-24-20 1-31 2-41 2z"/>

    <!-- Quiver hint -->
    <path d="M176 74l18 30-10 6-18-30z"/>

    <!-- Arrow fletchings sticking from quiver -->
    <path d="M200 96l10 12-8 4-10-12zM192 104l8 12-6 4-8-12z"/>

    <!-- Ground shadow (optional, subtle) -->
    <ellipse cx="128" cy="228" rx="72" ry="10" opacity=".08"/>
  </svg>
</template>

<style lang="scss" scoped>

</style>
