<template>
  <app-header-default />
  <slot />
</template>

<script lang="ts" setup>
import AppHeaderDefault from "./AppHeaderDefault.vue";
</script>

<style lang="scss" scoped>
.default-layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
}
</style>
