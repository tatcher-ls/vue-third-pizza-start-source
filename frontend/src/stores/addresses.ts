import { defineStore } from "pinia";
import { ref } from "vue";
import { OrderAddress } from "../types/interfaces";
import addressesJSON from "../mocks/addresses.json";

export const useAddressesStore = defineStore("profile", () => {
  const addresses = ref<Array<OrderAddress>>(addressesJSON);
  // state: () => ({}),
  // getters: {},
  // actions: {},

  return addresses;
});
