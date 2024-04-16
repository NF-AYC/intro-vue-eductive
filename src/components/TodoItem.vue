<template>
  <div @click="toogleTodo">
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

function toogleTodo() {
  console.log(`Le todo ${props.todo.title} a emis 'update:completed' : ${!props.todo.completed}`)

  emits('update:completed', !props.todo.completed)
}
</script>
<stle scoped>

</stle>
