<style scoped>
@import "../assets/chat.css";
</style>

<template>
  <ul id="messages">
    <li v-for="message in messages">{{ message }}</li>
  </ul>
  <v-form id="form" @submit.prevent="">
    <v-text-field v-model="inputMessage" />
    <v-btn @click="onClickSend">Send</v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
const messages = ref<string[]>([]);

const inputMessage = ref("");

const onClickSend = () => {
  console.log("send");
};
</script>
