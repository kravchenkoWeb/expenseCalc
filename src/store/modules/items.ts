import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import ExpenseItem from "@/interfaces/ExpenseItemInterface";

@Module({ namespaced: true })
class items extends VuexModule {
  public items: Array<ExpenseItem> = [];

  @Mutation
  public addItem(item: ExpenseItem): void {
    this.items.push(item);
  }

  @Mutation
  public setItemsList(items: Array<ExpenseItem>): void {
    this.items = items;
  }

  @Mutation
  public setSelectedItems(payload: { id: string; val: boolean }): void {
    const itemIndex = this.items.findIndex((item) => item.id === payload.id);
    if (itemIndex >= 0) {
      this.items[itemIndex].selected = payload.val;
    }
  }

  @Action
  public updateItems(item: ExpenseItem): void {
    this.context.commit("addItem", item);
    localStorage.setItem("items", JSON.stringify(this.items));
  }

  @Action
  public setItems(items: Array<ExpenseItem>): void {
    this.context.commit("setItemsList", items);
  }

  @Action
  public updateSelected(payload: { id: string; val: boolean }): void {
    this.context.commit("setSelectedItems", payload);
  }

  get itemsList(): Array<ExpenseItem> {
    return this.items;
  }
}

export default items;
