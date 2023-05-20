<script setup lang="ts">
import { useApp } from "./composables/useApp";
import User from './components/User.vue'
const {
  state: {
    users,
    selectedUserId
  },
} = useApp();
</script>

<template>
  <div class="users-container">
    <User v-for="user in users" :user="user" :key="user._id"/>
  </div>
  <div class="user-details">
    <div v-if="!selectedUserId">
      Select a user to display
    </div>
  </div>
</template>

<style scoped>
.users-container {
  display: flex;
  flex-direction: row;
  gap: 10px;
  overflow-x: scroll;
  height: 62px
}

.user-details{
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed;
  height: calc(100vh - 82px);
}
</style>
