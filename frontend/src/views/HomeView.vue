<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <dough-selector v-model="pizza.dough" :dough-list="doughList" />

        <size-list v-model="pizza.size" :sizes-list="sizesList" />

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <sauce-list v-model="pizza.sauces" :sauces-list="saucesList" />

              <ingredient-list
                :values="pizza.ingredients"
                :ingredients-list="ingredientItems"
                @update="updateIngredients"
              />
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <pizza-constructor
            :dough="pizza.dough"
            :sauces="pizza.sauces"
            :ingredients="pizza.ingredients"
            @drop="addIngredient"
          />

          <div class="content__result">
            <p>Итого: {{price}} ₽</p>
            <button type="button" class="button" :disabled="isDisabled"
                    @click="
                      $router.push({
                      name: 'cart'
                      })
                    "
            >Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import {
  normalizeIngredients,
} from "../common/helpers/normalize";
import dough from "../mocks/dough.json";
import sizes from "../mocks/sizes.json";
import sauces from "../mocks/sauces.json";
import ingredientsJSON from "../mocks/ingredients.json";
import {computed, reactive, ref} from "vue";
import { DoughItem, Ingredient, Size, Sauce } from "../types/interfaces";
import SizeList from "../modules/SizeList.vue";
import SauceList from "../modules/SauceList.vue";
import IngredientList from "../modules/IngredientList.vue";
import DoughSelector from "../modules/DoughSelector.vue";
import PizzaConstructor from "../modules/PizzaConstructor.vue";

console.log(ingredientsJSON);

const doughList = ref<Array<DoughItem>>(dough);
const sizesList = ref<Array<Size>>(sizes);
const saucesList = ref<Array<Sauce>>(sauces);

const ingredientItems = ingredientsJSON.map(normalizeIngredients);

const pizza = reactive({
  dough: doughList.value[0],
  size: sizesList.value[0],
  sauces: saucesList.value[0],
  ingredients: ingredientItems.reduce((acc, item: Ingredient) => {
    acc[item.value] = 0;
    return acc;
  }, {}),
});

const updateIngredients = (ingredient: Ingredient, countIngredient: number) => {
  pizza.ingredients[ingredient.value] = countIngredient
}

const addIngredient = (value: string) => {
  pizza.ingredients[value] ++
}

const price = computed(() => {
  const {dough, size, sauces, ingredients} = pizza;
  const sizeMultiplier = size.multiplier;

  const priceDough = dough.price;
  const priceSauces = sauces.price;

  const priceIngredients = ingredientItems.map(item => ingredients[item.value] * item.price).reduce((acc: number, item) => {
    return acc + item
  }, 0)

  return (priceDough + priceSauces + priceIngredients) * sizeMultiplier;
})

const isDisabled = computed(() => {
   return price.value === 0
})

</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>
