import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { Pizza } from "../types/interfaces";
import { useDataStore } from "./data";
import { pizzaPrice } from "../common/helpers/pizza-price";
import { ingredientsQuantity } from "../common/helpers/ingredients-quantity";

export const usePizzaStore = defineStore("pizza", () => {
  const state = ref<Pizza>({
    index: null,
    name: "",
    sauceId: 0,
    doughId: 0,
    sizeId: 0,
    ingredients: [],
  });

  const sauce = computed(() => {
    const data = useDataStore();
    return (
      data.sauces.find((item) => item.id === state.value.sauceId) ??
      data.sauces[0]
    );
  });

  const dough = computed(() => {
    const data = useDataStore();
    return (
      data.doughData.find((item) => item.id === state.value.doughId) ??
      data.doughData[0]
    );
  });

  const size = computed(() => {
    const data = useDataStore();
    return (
      data.sizes.find((item) => item.id === state.value.sizeId) ?? data.sizes[0]
    );
  });

  const ingredientsExtended = computed(() => {
    const data = useDataStore();
    const pizzaIngredientsIds = state.value.ingredients.map(
      (item) => item.ingredientId,
    );

    return data.ingredients
      .filter((item) => pizzaIngredientsIds.includes(item.ingredientId))
      .map((item) => {
        return {
          ...item,
          quantity:
            state.value.ingredients.find((i) => i.ingredientId === item.id)
              ?.quantity ?? 0,
        };
      });
  });

  const price = computed(() => pizzaPrice(state.value));

  const ingredientQuantities = computed(() => ingredientsQuantity(state.value));

  return {
    state,
    sauce,
    dough,
    size,
    ingredientsExtended,
    price,
    ingredientQuantities,
  };
});
