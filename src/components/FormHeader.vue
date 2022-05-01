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

@Component
export default class FormHeader extends Vue {
  private item: ExpenseItem = {
    itemName: "",
    itemPrice: "",
    itemQty: "",
  };

  private isValid = true;

  public submitHandler(): void {
    const { itemName, itemPrice, itemQty }: ExpenseItem = this.item;
    this.isValid = true;

    if (!itemName || !itemPrice || !itemQty || !this.isQtyAndPriceValid) {
      this.isValid = false;
      return;
    }
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
