<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                v-for="doughType in doughList"
                :key="doughType.id"
                class="dough__input"
                :class="`dough__input--${doughSizes[doughType.id]}`"
              >
                <input
                  type="radio"
                  name="dought"
                  :value="doughSizes[doughType.id]"
                  class="visually-hidden"
                  checked
                />
                <img :src="getImage(doughType.image)" :alt="doughType.name" />
                <b>{{ doughType.name }}</b>
                <span>{{ doughType.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in sizesList"
                :key="size.id"
                class="diameter__input"
                :class="`diameter__input--${sizesData[size.id]}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="sizesData[size.id]"
                  class="visually-hidden"
                  checked
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in saucesList"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="saucesData[sauce.id]"
                    checked
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in ingredientsList"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <div
                      class="filling"
                      :class="`filling--${saucesData[ingredient.id]}`"
                    >
                      <img
                        :src="getImage(ingredient.image)"
                        :alt="ingredient.name"
                      />
                      {{ ingredient.name }}
                    </div>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
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

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script lang="ts" setup>
import dough from "../mocks/dough.json";
import ingredients from "../mocks/ingredients.json";
import sizes from "../mocks/sizes.json";
import sauces from "../mocks/sauces.json";
import { ref } from "vue";
import { DoughItem, Ingredient, Size, Sauce } from "../types/interfaces";
import { getImage } from "../common/helpers";
import doughSizes from "../common/data/doughSizes";
import sizesData from "../common/data/sizes";
import saucesData from "../common/data/sauces";

const doughList = ref<Array<DoughItem>>(dough);
const ingredientsList = ref<Array<Ingredient>>(ingredients);
const sizesList = ref<Array<Size>>(sizes);
const saucesList = ref<Array<Sauce>>(sauces);
</script>
