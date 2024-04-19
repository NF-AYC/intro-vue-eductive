<template>
  <div class="container">
    <h2>C'est la page des todos :)</h2>
    <label for="showAllTodos">Voir tous les todos</label>
    <input type="checkbox" id="showAllTodos" v-model="show" />
    <br />
    <label for="newTodo"></label><input type="text" id="newTodo" v-model="todoTitle" />
    <button type="button" @click="addTodo">Ajouter</button>
    <br />
    <TodoList :showAll="show"></TodoList>
  </div>
</template>
<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import { useTodoListStore } from '@/stores/todolist'
import { ref, type Ref } from 'vue'
const show = ref<boolean>(true)
const todoStore = useTodoListStore()
const todoTitle: Ref<string> = ref('')

function addTodo() {
  todoStore.createTodo(todoTitle.value)
  todoTitle.value = ''
}
</script>
