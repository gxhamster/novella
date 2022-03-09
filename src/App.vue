<template>
  <div id="app" class="bg-transparent fixed flex h-screen min-h-screen w-screen">
    <SideBar class=""/>
    <MainView class="" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import SideBar from './components/SideBar.vue'
import MainView from './components/MainView'
import { userStore, bookStore } from '@/stores/store'
import { setFetchData } from '@/utils/fetch'

const userstore = userStore()
const bookstore = bookStore()
const refresh_interval = 10000

const fetchInterval = setInterval(() => {
  setFetchData('http://localhost:3000/get_users', 'users', userstore, 'setUsers')
  setFetchData('http://localhost:3000/get_books', 'books', bookstore, 'setBooks')
}, refresh_interval)

onMounted(async () => {
  setFetchData('http://localhost:3000/get_users', 'users', userstore, 'setUsers')
  setFetchData('http://localhost:3000/get_books', 'books', bookstore, 'setBooks')
})

onUnmounted(() => {
  clearInterval(fetchInterval)
})

</script>

<style scoped>
#app {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}

</style>
