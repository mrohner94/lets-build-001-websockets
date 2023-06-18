<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { RouterView } from "vue-router";
import { v4 as uuidv4 } from "uuid";
import { useAppState } from "@/store/app";

const $state = useAppState();

const generateRandomHexColor = () => {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  while (randomColor.length < 6) {
    randomColor = "0" + randomColor;
  }
  randomColor = "#" + randomColor;

  return randomColor;
};

let id = localStorage.getItem("userId");
let hex = localStorage.getItem("hex");

if (!id) {
  id = uuidv4();
  localStorage.setItem("userId", id);
}
if (!hex) {
  hex = generateRandomHexColor();
  localStorage.setItem("hex", hex);
}

$state.userId = id;
$state.hex = hex;
</script>
