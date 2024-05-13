<template>
  <div @click="toggleTodo" class="todo-item" :class="{ completed: todo.completed }">
    <h3>{{ todo.title }}</h3>
    <p>{{ todo.completed ? 'Terminé' : 'non terminé' }}</p>
  </div>
</template>
<script setup lang="ts">
import type { Todo } from '@/models/Todo'

const props = defineProps<{
  todo: Todo
}>()
const emits = defineEmits<{ (e: 'update:completed', completed: boolean): void }>()

function toggleTodo() {
  console.log(`Le todo ${props.todo.title} a emis 'update:completed' : ${!props.todo.completed}`)

  emits('update:completed', !props.todo.completed)
}
</script>
<style scoped>
.todo-item {
  color: orange;
}

.completed {
  color: green;
}
</style>
