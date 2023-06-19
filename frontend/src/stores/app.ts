import type { AppState } from "@/types";
import { defineStore } from "pinia";

export const useAppState = defineStore("app", {
  state: (): AppState => ({
    userId: "",
    hex: "",
  }),
});
