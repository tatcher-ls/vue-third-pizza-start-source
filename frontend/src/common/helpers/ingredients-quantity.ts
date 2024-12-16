import { useDataStore } from "../../stores/data";
import {DoughItem, Ingredient, Misc, OrderPizza, Pizza, Sauce, Size} from "../../types/interfaces";

export const ingredientsQuantity = (pizza: Pizza) => {
  const dataStore = useDataStore();

  return dataStore.ingredients.reduce((acc, item ) => {
    acc[item.id]=pizza.ingredients.find(itemPizza => {
      if (itemPizza.ingredientId === item.id) {
        return itemPizza.quantity ?? 0
      }
    })
    return acc
  }, {})
};
