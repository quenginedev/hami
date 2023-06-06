<script setup lang="ts">
import { useApp } from "./composables/useApp";
import User from "./components/User.vue";
const {
  state: { users, selectedUserId, loading },
  computed: { selectedUser },
} = useApp();
</script>

<template>
  <div class="container">
    <div class="users-container">
      <h3>Users</h3>
      <User
        @click="selectedUserId = user._id"
        v-for="user in users"
        :user="user"
        :key="user._id"
        :active="user._id === selectedUserId"
      />
    </div>
    <div class="user-details">
      <div v-if="loading">Loading User</div>
      <div v-else-if="!selectedUserId">Select a user to display</div>
      <div v-else>
        <h1>{{ selectedUser?.name }}</h1>
        <p>@ {{ selectedUser?.email }}</p>
        <p># {{ selectedUser?.phone }}</p>
        <hr />
        <div class="">
          <h3>Addresses</h3>
          <ul>
            <li v-for="addressLine in selectedUser?.address">
              {{ addressLine }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 10px;
  padding: 20px;
  height: calc(100vh - 40px);
}
.users-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: center;
}

.user-details {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed;
  width: 100%;
  text-align: center;
}
</style>
