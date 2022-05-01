<template>
  <header class="header">
    <h1>Vue invoice calc</h1>
    <span class="invalid" v-if="!isValid">Typed values are invalid</span>
    <form class="form" @submit.prevent="submitHandler">
      <input
        v-model="item.itemName"
        class="form__input form__input--wide"
        type="text"
        placeholder="Product name"
      />
      <input
        v-model="item.itemPrice"
        class="form__input"
        type="number"
        placeholder="Price"
      />
      <input
        v-model="item.itemQty"
        class="form__input"
        type="number"
        placeholder="Qty"
      />
      <button type="submit" class="form__button">Add</button>
    </form>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import ExpenseItem from "../interfaces/ExpenseItemInterface";
import { namespace } from "vuex-class";

const items = namespace("items");

@Component
export default class FormHeader extends Vue {
  private item: ExpenseItem = {
    itemName: "",
    itemPrice: "",
    itemQty: "",
    id: "",
    sum: 0,
    selected: false,
  };

  @items.Action
  public updateItems!: (newItem: ExpenseItem) => void;

  @items.Action
  public setItems!: (items: Array<ExpenseItem>) => void;

  @items.Getter
  public itemsList!: Array<ExpenseItem>;

  mounted() {
    const unParsedItems = localStorage.getItem("items");
    if (unParsedItems) {
      const items: Array<ExpenseItem> = JSON.parse(unParsedItems);
      this.setItems(items);
    }
  }

  private isValid = true;

  public submitHandler(): void {
    const { itemName, itemPrice, itemQty }: ExpenseItem = this.item;
    this.isValid = true;

    if (!itemName || !itemPrice || !itemQty || !this.isQtyAndPriceValid) {
      this.isValid = false;
      return;
    }

    this.updateItems({
      ...this.item,
      id: `${Math.random()}`,
      sum: +itemPrice * +itemQty,
    });

    this.item = {
      itemName: "",
      itemPrice: "",
      itemQty: "",
      id: "",
      sum: 0,
      selected: false,
    };
  }

  get isQtyAndPriceValid(): boolean {
    return +this.item.itemQty > 0 && +this.item.itemPrice > 0;
  }
}
</script>

<style lang="scss" scoped>
.header {
  text-align: left;

  .form {
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    gap: 10px;
    &__input {
      text-indent: 7px;
      border-radius: 5px;
      padding: 5px 0;

      &--wide {
        width: 70%;
      }
    }
    &__button {
      border-radius: 5px;
      color: #fff;
      background-color: #333;
      border: none;
      width: 10%;
      cursor: pointer;
    }
  }
}

.invalid {
  color: red;
  display: block;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 20px;
  padding: 0 15px;
}
</style>
