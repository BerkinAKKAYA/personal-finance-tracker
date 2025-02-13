import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 };
  },
  actions: {
    increment(value = 1) {
      this.count += value;
    },
  },
  getters: {
    doubleCount: (state): number => {
      return state.count * 2;
    },
    doublePlusOne(): number {
      return this.doubleCount + 1
    },
  },
});