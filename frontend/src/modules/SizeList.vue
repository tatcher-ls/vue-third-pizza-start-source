<template>
  <div class="content__diameter">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите размер</h2>

      <div class="sheet__content diameter">
        <label
            v-for="sizeType in sizesList"
            :key="sizeType.id"
            class="diameter__input"
            :class="`diameter__input--${sizesData[sizeType.id]}`"
        >
          <input
              type="radio"
              name="diameter"
              :value="sizeType.id"
              class="visually-hidden"
              :checked="sizeType.id === modelValue"
              @input="updateSize(sizeType)"
          />
          <span>{{ sizeType.name }}</span>
        </label>
      </div>

    </div>
  </div>


</template>
<script setup lang="ts">
import {Size} from "../types/interfaces";
import sizesData from "../common/data/sizes";

interface Props {
  sizesList: Array<Size>
  modelValue: number
}

interface Emits {
  (event: 'update:modelValue', sise: number): void
}

defineProps<Props>()
const emit = defineEmits<Emits>();

const updateSize = (sise: Size) => {
  emit('update:modelValue', sise.id)
}
</script>


<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.diameter__input {
  margin-right: 8.7%;
  margin-bottom: 20px;
  padding-top: 7px;
  padding-bottom: 6px;
  cursor: pointer;

  span {
    @include r-s16-h19;
    position: relative;
    padding-left: 46px;
    &::before {
      @include p_center_v;
      width: 36px;
      height: 36px;
      content: "";
      transition: 0.3s;
      border-radius: 50%;
      background-color: $green-100;
      background-image: url("@/assets/img/diameter.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &:nth-child(3n) {
    margin-right: 0;
  }

  &--small {
    span::before {
      background-size: 18px;
    }
  }

  &--normal {
    span::before {
      background-size: 29px;
    }
  }

  &--big {
    span::before {
      background-size: 100%;
    }
  }

  &:hover {
    span::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + span::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
