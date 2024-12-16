import { defineStore } from "pinia";
import { Cart } from "../types/interfaces";
import { ref, computed } from "vue";
import { useDataStore } from "./data";

export const useCartStore = defineStore("cart", () => {
  const state = ref<Cart>({
    phone: "",
    address: {
      street: "",
      building: "",
      flat: "",
      comment: "",
    },
    pizzas: [],
    misc: [],
  });

  const pizzasExtended = computed(() => {
    const dataStore = useDataStore();

    return state.value.pizzas.map((pizza) => {
      const pizzaIngredientsIds = pizza.ingredients.map(
        (item) => item.ingredientId,
      );

      return {
        name: pizza.name,
        quantity: pizza.quantity,
        doughId: dataStore.doughData.map((dough) => dough.id === pizza.doughId),
        size: dataStore.sizes.map((size) => size.id === pizza.sizeId),
        sauce: dataStore.sauces.map((sauce) => sauce.id === pizza.sauceId),
        ingredients: dataStore.ingredients.filter((item) =>
          pizzaIngredientsIds.includes(item.id),
        ),
        price: pizza.price,
      };
    });
  });

  const miscExtended = computed(() => {
    const dataStore = useDataStore();

    return dataStore.misc.map((misc) => {
      return {
        ...misc,
        quantity:
          state.value.misc.find((item) => item.id === misc.id)?.quantity ?? 0,
      };
    });
  });

  const total = computed(() => {
    const pizzaPrices = pizzasExtended.value
      .map((item) => item.quantity * item.price)
      .reduce((acc, item) => acc + item, 0);

    const miscPrices = miscExtended.value
      .map((item) => item.quantity * item.price)
      .reduce((acc, item) => acc + item, 0);

    return pizzaPrices + miscPrices;
  });

  return { state, pizzasExtended, miscExtended, total };
});
