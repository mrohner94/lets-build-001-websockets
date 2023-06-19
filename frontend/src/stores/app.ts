import { defineStore } from "pinia";

interface State {
  userId: string;
  hex: string;
}
export const useAppState = defineStore("app", {
  state: (): State => ({
    userId: "",
    hex: "",
  }),
});
