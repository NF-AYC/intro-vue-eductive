<template>
  <label for="email">Email</label>
  <input type="email" name="email" id="remail" v-model="email" />
  <br />
  <label for="password">Password</label>
  <input type="password" name="password" id="password" v-model="password" />
  <button type="button" @click="login">Se connecter</button>
</template>
<script setup lang="ts">
import axiosInstance from '@/modules/axios'
import { type Ref, ref } from 'vue'
import { useRouter } from 'vue-router'

const email: Ref<string> = ref('test@example.com')
const password: Ref<string> = ref('password')
const router = useRouter()
function login() {
  axiosInstance
    .get('/sanctum/csrf-cookie')
    .then((response) => {
      console.log('csrf token ok, trying to login')
      axiosInstance
        .post('/login', { email: email.value, password: password.value })
        .then((result) => {
          console.log('Connexion réussie')
          router.push('/todos')
        })
        .catch((err) => {
          console.log('invalid credential')
        })
    })
    .catch((error) => {
      console.log('error while getting csrf token')
    })
}
</script>
