<template>
  <div id="app">
    <Container>
      <FormHeader />
      <ExpenseTable :items="itemsList" />
      <Actions :total="totalPrice" @delete="deleteHandler" />
    </Container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FormHeader from "./components/FormHeader.vue";
import Container from "./components/ui/Container.vue";
import ExpenseTable from "./components/ExpenseTable/ExpenseTable.vue";
import { namespace } from "vuex-class";
import ExpenseItem from "./interfaces/ExpenseItemInterface";
import Actions from "./components/Actions.vue";

const items = namespace("items");

@Component({
  components: {
    FormHeader,
    Container,
    ExpenseTable,
    Actions,
  },
})
export default class App extends Vue {
  @items.Getter
  public itemsList!: Array<ExpenseItem>;

  public deleteHandler() {
    const newItems = this.itemsList.filter((item) => !item.selected);

    this.setItems(newItems);
    localStorage.setItem("items", JSON.stringify(newItems));
  }

  @items.Action
  public setItems!: (items: Array<ExpenseItem>) => void;

  get totalPrice(): number {
    return this.itemsList.reduce(
      (prevVal, curItem) => prevVal + curItem.sum,
      0
    );
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
