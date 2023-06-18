<style scoped>
.chat-window {
  height: calc(100vh - 48px);
}

#form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}
#input:focus {
  outline: none;
}
#form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}
</style>

<template>
  <v-list id="chat-window" :lines="false" class="pa-0 ma-0 chat-window">
    <v-list-item
      v-for="message in messages"
      :key="uuidv4()"
      :style="`background: ${message.hex}`"
      prepend-avatar="https://placekitten.com/64/64"
    >
      <template v-slot:title>
        <div
          :class="
            isColorDark(message.hex)
              ? 'text-white font-weight-bold'
              : 'text-medium-emphasis font-weight-bold'
          "
        >
          {{ message.userId }}
        </div>
        <div :class="isColorDark(message.hex) ? 'text-white' : ''">
          {{ message.msg }}
        </div>
      </template>
    </v-list-item>
  </v-list>
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
import { useAppState } from "@/store/app";
import { type AllMessage } from "@/types";
import { v4 as uuidv4 } from "uuid";

const $state = useAppState();
const socket = io("http://localhost:3000");
const messages = ref<AllMessage[]>([]);
const inputMessage = ref("");

const scrollToBottom = (elementId: string) => {
  var element = document.getElementById(elementId);
  if (element) {
    element.scrollTop = element.scrollHeight;
  }
};

const isColorDark = (hexColor: string) => {
  if (hexColor.startsWith("#")) {
    hexColor = hexColor.slice(1);
  }
  const red = parseInt(hexColor.slice(0, 2), 16);
  const green = parseInt(hexColor.slice(2, 4), 16);
  const blue = parseInt(hexColor.slice(4, 6), 16);
  const relativeLuminance = 0.2126 * red + 0.7152 * green + 0.0722 * blue;
  const threshold = 128;

  return relativeLuminance < threshold;
};

const onClickSend = () => {
  if (inputMessage.value) {
    const payload: AllMessage = {
      userId: $state.userId,
      hex: $state.hex,
      msg: inputMessage.value,
    };
    socket.emit("message all", payload);
    inputMessage.value = "";
  }
};

socket.on("message all", async (payload: AllMessage) => {
  await messages.value.push(payload);
  scrollToBottom("chat-window");
});

onBeforeUnmount(() => {
  socket.disconnect();
});
</script>
