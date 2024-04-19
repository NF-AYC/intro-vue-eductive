<template>
  <TodoItem
    v-for="myTodo in filteredList"
    :key="myTodo.id"
    :todo="myTodo"
    @update:completed="todoStore.manageToggle($event, myTodo)"
  ></TodoItem>
</template>
<script setup lang="ts">
import TodoItem from '@/components/TodoItem.vue'
import { computed, ref, type Ref } from 'vue'
import { useTodoListStore } from '@/stores/todolist'

const todoStore = useTodoListStore()

const props = withDefaults(defineProps<{ showAll?: boolean }>(), {
  showAll: true
})

const filteredList = computed(() => {
  if (props.showAll) {
    return todoStore.todoList
  } else {
    return todoStore.remainingTodo
  }
})
</script>
