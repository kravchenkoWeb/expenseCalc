<template>
  <table class="table">
    <tr>
      <th><input type="checkbox" @change="selectAllHandler" /></th>
      <th class="table__name">Product name</th>
      <th>Price</th>
      <th>Qta</th>
      <th>Sum</th>
    </tr>
    <ExpenseTableItem
      v-for="(item, index) in items"
      :key="index"
      :data="item"
      @onSelect="selectHandler"
    />
  </table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import ExpenseItem from "../../interfaces/ExpenseItemInterface";
import ExpenseTableItem from "./components/ExpenseTableItem.vue";
import { namespace } from "vuex-class";

const items = namespace("items");

@Component({
  components: {
    ExpenseTableItem,
  },
})
export default class ExpenseTable extends Vue {
  @Prop({ required: true })
  readonly items!: Array<ExpenseItem>;

  @items.Action
  public updateSelected!: (payload: { id: string; val: boolean }) => void;

  public selectHandler(payload: { id: string; val: boolean }) {
    this.updateSelected(payload);
  }

  selectAllHandler(event: any): void {
    this.items.forEach((item) => {
      this.updateSelected({ id: item.id, val: event.target.checked });
    });
  }
}
</script>

<style lang="scss">
.table {
  margin-top: 30px;
  width: 100%;
  text-align: left;
  padding: 0 15px;
  border-collapse: collapse;
  th,
  td {
    padding: 5px;
    border: 1px solid #000;
    border-collapse: collapse;
  }
}
</style>
