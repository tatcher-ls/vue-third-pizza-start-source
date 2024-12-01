<template>
  <li
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
</template>
<script setup lang="ts">
import {getImage} from "@/common/helpers";
import saucesData from "../common/data/sauces";
import {Ingredient} from "@/types/interfaces";

interface Props {
  ingredient: Ingredient
}

const props=defineProps<Props>();


</script>
