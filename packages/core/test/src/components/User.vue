<script setup lang="ts">
import { toRefs } from 'vue'
import type { User } from '../composables/useUser'
const props = defineProps<{
    user: User
}>()
const {user} = toRefs(props)
</script>
<template>
  <div>
    <button>{{ user.username }}</button>
  </div>
</template>
<style>
button {
    border: 2px solid #aaa;
    border-radius: 32px;
    padding: 10px;
}
</style>
