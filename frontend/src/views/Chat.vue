<style scoped>
@import "../assets/chat.css";
</style>

<template>
  <ul id="messages">
    <li v-for="message in messages">{{ message }}</li>
  </ul>
  <v-form
    id="form"
    @submit.prevent=""
    class="d-flex align-center justify-space-between"
  >
    <input
      v-model="inputMessage"
      type="text"
      class="bg-white rounded w-100 h-100 mr-4"
      @keydown.enter="onClickSend"
    />
    <v-btn @click="onClickSend">Send</v-btn>
  </v-form>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { io } from "socket.io-client";
import { onBeforeUnmount } from "vue";

const socket = io("http://localhost:3000");
const messages = ref<string[]>([]);
const inputMessage = ref("");

const onClickSend = () => {
  if (inputMessage.value) {
    socket.emit("chat message", inputMessage.value);
    inputMessage.value = "";
  }
};

socket.on("chat message", function (msg) {
  messages.value.push(msg);
  window.scrollTo(0, document.body.scrollHeight);
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>
