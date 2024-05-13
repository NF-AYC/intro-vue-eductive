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
    <button type="button" @click="save">Sauver</button>
    <br />
    <button type="button" @click="load">Charger</button>
  </div>
</template>
<script setup lang="ts">
import TodoList from '@/components/TodoList.vue'
import { useTodoListStore } from '@/stores/todolist'
import axiosInstance from '@/modules/axios'
import { ref, type Ref } from 'vue'
import type { Todo } from '@/models/Todo'
const show = ref<boolean>(true)
const todoStore = useTodoListStore()
const todoTitle: Ref<string> = ref('')

function addTodo() {
  todoStore.createTodo(todoTitle.value)
  todoTitle.value = ''
}

const storageKey = '_todoApp'

function save() {
  window.localStorage.setItem(storageKey, JSON.stringify(todoStore.todoList))
}

// TODO : comment code
function load() {
  // const list = window.localStorage.getItem(storageKey)
  // if (list !== null) {
  //   todoStore.todoList = JSON.parse(list)
  // }
  console.log('Début de la requête')
  axiosInstance
    .get<Todo[]>('/todos')
    .then((response) => {
      console.log('résolution de la promesse')
      console.log(response.data)
      todoStore.todoList = response.data
    })
    .catch((err) => {
      console.log(err.data)
    })
    .finally(() => {
      console.log('Bout de code toujours executé')
    })
  console.log('après la requête')
}
</script>
