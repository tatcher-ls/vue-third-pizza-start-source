<template>
  <sidebar-layout>
    <template #sidebar>
      <router-link
        :to="{ name: 'orders' }"
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'orders' }"
      >
        История заказов
      </router-link>
      <router-link
        :to="{ name: 'profile' }"
        class="layout__link"
        :class="{ 'layout__link--active': routeName === 'profile' }"
      >
        Мои данные
      </router-link>
    </template>
    <router-view />
  </sidebar-layout>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import { computed } from "vue";
import SidebarLayout from "../layouts/SidebarLayout.vue";

const router = useRouter();

console.log(`router`, router);

const routeName = computed(() => router.currentRoute.value.name);
</script>
