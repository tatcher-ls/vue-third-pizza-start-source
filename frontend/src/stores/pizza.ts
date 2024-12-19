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

  const setIndex = (index) => {
    state.value.index = index;
  };

  const setName = (name: string) => {
    state.value.name = name
  }

  const setSauce = (sauceId: number) => {
    state.value.sizeId = sauceId
  }

  const setDough = (doughId: number) => {
    state.value.doughId = doughId
  }

  const setSize = (sizeId: number) => {
    state.value.sizeId = sizeId
  }

  const setIngredients = (ingredients) => {
    state.value.ingredients = ingredients
  }

  const addIngredient = (ingredientId: number) => {
    console.log(`!!!!`, ingredientId)
    state.value.ingredients.push({
      ingredientId,
      quantity: 1
    })

    console.log(`!!!`, state.value)
  }

  const incrementIngredientQuantity = (ingredientId: number) => {
    const ingredientIdx = state.value.ingredients.findIndex(item => item.ingredientId === ingredientId);

    if (ingredientIdx === -1) {
      addIngredient(ingredientId)
      return;
    }

    state.value.ingredients[ingredientIdx].quantity ++;
  }

  const setIngredientQuantity = (ingredientId: number, count: number) => {
    console.log(`im here`, ingredientId, count)
    const ingredientIdx = state.value.ingredients.findIndex(item => item.ingredientId === ingredientId);

    if (ingredientIdx === -1 && count > 0) {
      console.log(`++`)
      addIngredient(ingredientId)
      return;
    } else if (ingredientIdx === -1) {
      return;
    }

    /* Удаляем ингредиент, если количество 0 */
    if (count === 0) {
      state.value.ingredients.splice(ingredientIdx, 1)
    }

    console.log(`state.value.ingredients[ingredientIdx]`, state.value.ingredients[ingredientIdx])
    state.value.ingredients[ingredientIdx].quantity = count;

    console.log(`state`, state.value)
  }

  const loadPizza = (pizza: Pizza) => {
    state.value.index = pizza.index;
    state.value.name = pizza.name;
    state.value.sauceId = pizza.sauceId;
    state.value.doughId = pizza.doughId;
    state.value.sizeId = pizza.sizeId;
    state.value.ingredients = pizza.ingredients;
  }

  return {
    state,
    sauce,
    dough,
    size,
    ingredientsExtended,
    price,
    ingredientQuantities,
    setIndex,
    setName,
    setSauce,
    setDough,
    setSize,
    setIngredients,
    addIngredient,
    incrementIngredientQuantity,
    setIngredientQuantity,
    loadPizza
  };
});
