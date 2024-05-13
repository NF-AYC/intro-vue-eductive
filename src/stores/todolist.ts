import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Todo } from '@/models/Todo'

import axiosInstance from '@/modules/axios'

export const useTodoListStore = defineStore('todoList', () => {
  const todoList: Ref<Todo[]> = ref([])
  const remainingTodo = computed(filterRemainingTodo)

  function filterRemainingTodo(): Todo[] {
    return todoList.value.filter((item: Todo) => !item.completed)
  }

  function addTodo(todo: Todo): void {
    // if (todo.id === undefined) {
    //   todo.id = lastTodoId() + 1
    // }
    axiosInstance
      .post<Todo>('/todos', todo)
      .then((response) => {
        console.log(import.meta.env.VITE_API_URL)
        console.log(response.data)
        todoList.value.push(response.data)
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  /***
   * Créé un nouveau todo et l'ajoute si son titre n'est pas vide ou seulement composé d'espace
   *
   * @param title: string
   * @return void
   */
  function createTodo(title: string): void {
    if (title.trim().length > 0) {
      const todo = { title: title, completed: false }
      addTodo(todo)
    }
  }

  function lastTodoId(): number {
    return todoList.value.reduce((previous: number, current: Todo) => {
      if (current.id) {
        return previous > current.id ? previous : current.id
      } else {
        return previous
      }
    }, 0)
  }

  function manageToggle(completed: boolean, todo: Todo) {
    console.log('Le composant enfant modifie le todo ' + todo.title)
    const t = todoList.value.find((item: Todo) => item.id === todo.id)
    if (t) {
      t.completed = completed
    }
  }

  return {
    todoList,
    remainingTodo,
    addTodo,
    createTodo,
    manageToggle
  }
})
