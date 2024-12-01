<template>
  <label
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
</template>
<script setup lang="ts">
import saucesData from "../common/data/sauces";
import { Sauce } from "../types/interfaces";
interface Props {
  sauce: Sauce
}

const props=defineProps<Props>()
</script>
