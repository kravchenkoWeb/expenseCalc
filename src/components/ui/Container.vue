<template>
  <div class="container">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Container extends Vue {}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  max-width: 1080px;
  margin: 0 auto;
}
</style>
