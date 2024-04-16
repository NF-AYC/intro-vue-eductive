<template>
  <h2>C'est la page des todos :)</h2>
  <label for="showAllTodos">Voir tous les todos</label>
  <input type="checkbox" id="showAllTodos" v-model="show" />
  <TodoList :showAll="show"></TodoList>
</template>
<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import { ref } from 'vue'
const show = ref<boolean>(true)
</script>
