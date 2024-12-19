<template>
  <div class="ingredients__sauce">
    <p>Основной соус:</p>

    <label
        v-for="sauceType in saucesList"
        :key="sauceType.id"
        class="radio ingredients__input"
    >
      <input
          type="radio"
          name="sauce"
          :value="sauceType.value"
          :checked="sauceType.id === modelValue"
          @input="updateSauce(sauceType)"
      />
      <span>{{ sauceType.name }}</span>
    </label>
  </div>
</template>
<script setup lang="ts">
import saucesData from "../common/data/sauces";
import { Sauce } from "../types/interfaces";
interface Props {
  saucesList: Array<Sauce>
  modelValue: number
}

interface Emites {
  (event: 'update:modelValue', sauce: number): void
}

defineProps<Props>();
const emit = defineEmits<Emites>();

const updateSauce = (sauceType: Sauce) => {
  emit('update:modelValue', sauceType.id)
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";

.ingredients__sauce {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 14px;

  p {
    @include r-s16-h19;
    margin-top: 0;
    margin-right: 16px;
    margin-bottom: 10px;
  }
}

.ingredients__input {
  margin-right: 24px;
  margin-bottom: 10px;
}
</style>
