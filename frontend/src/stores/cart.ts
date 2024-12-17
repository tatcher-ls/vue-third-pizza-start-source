import { defineStore } from "pinia";
import {Address, Cart, OrderMisc} from "../types/interfaces";
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

  const savePizza = (pizza) => {
    const { index, ...pizzaData } = pizza;

    if (index !== null) {
      state.value.pizzas[index] = {
        quantity: state.value.pizzas[index].quantity,
        ...pizzaData,
      };
    } else {
      state.value.pizzas.push({
        quantity: 1,
        ...pizzaData,
      });
    }
  };

  const setPizzaQuantity = (index: number, count: number) => {
    if (state.value.pizzas[index]) {
      state.value.pizzas[index].quantity = count;
    }
  };

  const setMiscQuantity = (miscId: number, count: number) => {
    const miscIdx = state.value.misc.findIndex(item => item.id === miscId)

    if (miscIdx !== -1 && count > 0) {
      state.value.misc.push({
        quantity: 1,
        miscId
      })
    } else if (miscIdx !== -1) {
      return
    }

    if (count === 0) {
      state.value.misc.splice(miscIdx, 1)
    }

    state.value.misc[miscIdx].quantity = count
  }


  const setPhone = (phone: string) => {
    state.value.phone = phone;
  }

  const  setAddress = (address: Address) => {
    const { street, building, flat, comment } = address;
    state.value.address = { street, building, flat, comment };
  }

  const setStreet = (street: string) => {
    state.value.address.street = street;
  }

  const setBuilding = (building: string) => {
    state.value.address.building = building;
  }

  const setFlat = (flat: string) => {
    state.value.address.flat = flat;
  }

  const setComment = (comment: string) => {
    state.value.address.street = comment;
  }

  return {
    state,
    pizzasExtended,
    miscExtended,
    total,
    savePizza,
    setPizzaQuantity,
    setMiscQuantity,
    setPhone,
    setAddress,
    setStreet,
    setBuilding,
    setFlat,
    setComment
  };
});
