<template>
  <div @click="toggleTodo" class="todo-item">
    <h3>{{ todo.title }}</h3>
    <p>{{ todo.completed ? 'Terminé' : 'non terminé' }}</p>
  </div>
</template>
<script setup lang="ts">
import type { Todo } from '@/models/Todo'
import { computed } from 'vue'

const props = defineProps<{
  todo: Todo
}>()
const emits = defineEmits<{ (e: 'update:completed', completed: boolean): void }>()

function toggleTodo() {
  console.log(`Le todo ${props.todo.title} a emis 'update:completed' : ${!props.todo.completed}`)

  emits('update:completed', !props.todo.completed)
}

const cssColor = computed((): string => {
  return props.todo.completed ? 'green' : 'orange'
})
</script>
<style scoped>
.todo-item {
  color: v-bind(cssColor);
}

.completed {
  color: green;
}
</style>
