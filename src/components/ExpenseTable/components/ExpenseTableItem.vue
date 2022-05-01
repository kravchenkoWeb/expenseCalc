<template>
  <tr>
    <td>
      <input
        type="checkbox"
        :checked="data.selected"
        @change="$emit('onSelect', { id: data.id, val: $event.target.checked })"
      />
    </td>
    <td>{{ data.itemName }}</td>
    <td>${{ data.itemPrice }}</td>
    <td>{{ data.itemQty }}</td>
    <td>${{ data.sum }}</td>
  </tr>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ExpenseItem from "../../../interfaces/ExpenseItemInterface";

@Component
export default class ExpenseTableItem extends Vue {
  @Prop({ required: true })
  readonly data!: ExpenseItem;
}
</script>
