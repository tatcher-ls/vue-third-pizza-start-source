<template>
      <div class="ingredients__filling">
        <p>Начинка:</p>

        <ul class="ingredients__list">
          <li
              v-for="ingredientType in ingredientsList"
              :key="ingredientType.id"
              class="ingredients__item"
          >
            <app-drag
                :transfer-data="ingredientType"
                :draggable="getValue(ingredientType) < MAX_INGREDIENT_COUNT"
            >
              <div class="filling">
                <img
                    :src="getImage(ingredientType.image)"
                    :alt="ingredientType.name"
                />
                {{ ingredientType.name }}
              </div>
            </app-drag>

            <app-counter
                class="ingredients__counter"
                :count="getValue(ingredientType)"
                :min=0
                :max="MAX_INGREDIENT_COUNT"
                @update="(count) => updateCount(count, ingredientType)"
            />
          </li>

        </ul>
      </div>
</template>
<script setup lang="ts">
import {getImage} from "../common/helpers";
import {Ingredient} from "../types/interfaces";
import AppDrag from "../common/components/AppDrag.vue";
import {MAX_INGREDIENT_COUNT} from "../common/constants/constants";
import AppCounter from "./AppCounter.vue";

interface Props {
  ingredientsList: Array<Ingredient>
  values: { [key: string]: number }
}

interface Emites {
  (event: 'update', ingredient: Ingredient,  value: number): void
}

const props = defineProps<Props>();
const emit = defineEmits<Emites>();


const getValue = (ingredient: Ingredient) => {
  return props.values[ingredient.value] ?? 0;
}

const updateCount = (countIngredient: number, ingredient: Ingredient) => {
  console.log(`countIngredient`, countIngredient)
  setValue(ingredient,  Math.min(countIngredient, MAX_INGREDIENT_COUNT))
}


const setValue = (ingredient: Ingredient, countIngredient: number) => {
  emit('update', ingredient, countIngredient)
}

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.ingredients__filling {
  width: 100%;

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
  }
}

.ingredients__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
}

.ingredients__item {
  width: 100px;
  min-height: 40px;
  margin-right: 17px;
  margin-bottom: 35px;
}

.ingredients__counter {
  width: 54px;
  margin-top: 10px;
  margin-left: 36px;
}

.filling {
  @include r-s14-h16;

  position: relative;

  display: block;

  padding-left: 36px;

  img {
    @include p_center-v;

    display: block;

    width: 32px;
    height: 32px;

    box-sizing: border-box;
    padding: 4px;

    border-radius: 50%;
  }
}
</style>
