<script setup lang="ts">
import { computed, toRefs } from "vue";
const props = defineProps<{
  user: User;
  active: boolean;
}>();
const { user, active } = toRefs(props);
const btnColor = computed(() => (active.value ? "#5bc" : "#333"));
</script>
<template>
  <div>
    <button>{{ user.name }}</button>
  </div>
</template>
<style>
button {
  width: 100%;
  border: 2px solid v-bind(btnColor);
  color: v-bind(btnColor);
  border-radius: 32px;
  padding: 10px;
  cursor: pointer;
}
</style>
