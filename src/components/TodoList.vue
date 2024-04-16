<template>
  <TodoItem
    v-for="myTodo in filteredList"
    :key="myTodo.id"
    :todo="myTodo"
    @update:completed="manageToogle($event, myTodo)"
  ></TodoItem>
</template>
<script setup lang="ts">
import type { Todo } from '@/models/Todo'
import TodoItem from '@/components/TodoItem.vue'
import { computed, ref, type Ref } from 'vue'
const todoList: Ref<Todo[]> = ref([
  {
    id: 1,
    title: 'todo 1',
    completed: false
  },
  {
    id: 2,
    title: 'todo 2',
    completed: false
  }
])
const props = withDefaults(defineProps<{ showAll?: boolean }>(), {
  showAll: true
})
const filteredList = computed(() => {
  if (props.showAll) {
    return todoList.value
  } else {
    return todoList.value.filter((item: Todo) => !item.completed)
  }
})

function manageToogle(completed: boolean, todo: Todo) {
  console.log('Le composant enfant modifie le todo ' + todo.title)
  const t = todoList.value.find((item: Todo) => item.id === todo.id)
  if (t) {
    t.completed = completed
  }
}
</script>
