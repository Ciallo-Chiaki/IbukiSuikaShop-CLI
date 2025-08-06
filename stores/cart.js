import { defineStore } from "pinia";
import { ref } from "vue";

const cartList = ref([]);
export const useCartStore = defineStore("cart", () => {
  const pushGoods = (data) => {
    cartList.value.unshift(data);
  };

  return {
    cartList,
    pushGoods,
  };
});
