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

//If you want to have separate tabs open as "different users"
//Then you can't reference localStorage
// let id = localStorage.getItem("userId");
let id = undefined;

// Same here
// let hex = localStorage.getItem("hex");
let hex = undefined;

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
