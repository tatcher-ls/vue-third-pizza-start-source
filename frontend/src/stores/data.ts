import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { DoughItem, Ingredient, Sauce, Size, Misc } from "../types/interfaces";
import doughJSON from "../mocks/dough.json";
import sizesJSON from "../mocks/sizes.json";
import saucesJSON from "../mocks/sauces.json";
import ingredientsJSON from "../mocks/ingredients.json";
import miscJSON from "../mocks/misc.json";
import {
  normalizeDough,
  normalizeIngredients,
  normalizeSauces,
  normalizeSize,
} from "../common/helpers/normalize";
import { ingredientsQuantity } from "../common/helpers/ingredients-quantity";

export const useDataStore = defineStore("data", () => {
  const doughData = doughJSON.map(normalizeDough);
  const ingredients = ingredientsJSON.map(normalizeIngredients);
  const sauces = saucesJSON.map(normalizeSauces);
  const sizes = sizesJSON.map(normalizeSize);
  const misc = miscJSON;

  console.log(`11`, sauces);

  return {
    doughData,
    ingredients,
    sauces,
    sizes,
    misc,
  };

  // state: () => ({}),
  // getters: {},
  // actions: {},
});
