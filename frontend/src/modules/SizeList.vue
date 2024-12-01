<template>
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

</template>
<script setup lang="ts">
import {Size} from "@/types/interfaces";
import sizesData from "../common/data/sizes";

interface Props{
  sizesList: Array<Size>
}

const props = defineProps<Props>()
</script>
