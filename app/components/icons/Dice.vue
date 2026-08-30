<script setup lang="ts">


const {mode} = defineProps<{mode?: "error" | "success"}>()
const count = ref(mode === 'error' ? 1 : 20)
</script>

<template>
  <svg xmlns="http://www.w3.org/2000/svg" width="75" height="80" viewBox="0 0 75 80" fill="none">
    <path d="M62.7913 23.9915V55.9143L35.1458 71.8762L7.50031 55.9143V23.9915L35.1458 8.02956L62.7913 23.9915Z" stroke="currentColor"/>
    <path d="M54.7073 52.2034H16.5843L35.6458 18.47L54.7073 52.2034Z" stroke="currentColor"/>
    <path d="M35.6458 17.9534L62.6458 23.9534" stroke="currentColor"/>
    <path d="M55.1458 52.4534L62.6458 23.9534" stroke="currentColor"/>
    <path d="M35.6458 17.9534L7.64581 23.9534" stroke="currentColor"/>
    <path d="M16.1458 52.4534L7.6458 23.9534" stroke="currentColor"/>
    <path d="M16.1458 52.4534L35.1458 71.4534" stroke="currentColor"/>
    <path d="M55.1458 52.4534L34.9902 71.8159" stroke="currentColor"/>
    <path d="M35.6457 17.9534L35.1458 7.95338" stroke="currentColor"/>
    <path d="M7.64576 55.9534L16.6458 51.9534" stroke="currentColor"/>
    <path d="M62.6458 55.4534L54.6459 52.4534" stroke="currentColor"/>
    <text x="35" y="46" :class="mode" fill="#000" text-anchor="middle" font-size="18" font-weight="500">
      {{count || "20"}}
    </text>
    <g filter="url(#filter0_f_4_44)">
      <path :class="mode" d="M65.5 57.0745L64.7432 57.5061L36.2432 73.7561L35.5 74.1799L34.7568 73.7561L6.25684 57.5061L5.5 57.0745V22.8323L6.25684 22.4007L34.7568 6.15065L35.5 5.72682L36.2432 6.15065L64.7432 22.4007L65.5 22.8323V57.0745Z" stroke-opacity="0.6" stroke-width="5"/>
    </g>
    <defs>
      <filter id="filter0_f_4_44" x="0" y="0" width="71" height="79.9068" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_4_44"/>
      </filter>
    </defs>
  </svg>
</template>

<style lang="scss" scoped>
.error {
  stroke: var(--color-error);
}

.success {
  stroke: var(--color-success);
}
</style>
