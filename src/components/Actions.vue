<template>
  <div class="actions">
    <button @click="$emit('delete')" class="actions__button">Delete</button>
    <span v-if="total > 0"
      >Total: <span class="actions__price">${{ total }}</span></span
    >
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Actions extends Vue {
  @Prop({ default: 0 })
  readonly total!: number;
}
</script>

<style lang="scss" scoped>
.actions {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  &__button {
    background-color: #8b001a;
    padding: 10px 15px;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  &__price {
    font-weight: 700;
  }
}
</style>
