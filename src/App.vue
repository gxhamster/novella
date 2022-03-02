<template>
  <div id="app" class="bg-transparent fixed flex h-screen min-h-screen w-screen">
    <SideBar class=""/>
    <MainView class="" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SideBar from './components/SideBar.vue'
import MainView from './components/MainView'
import { userStore, bookStore } from '@/stores/store'

const store = userStore()
const bookstore = bookStore()
const loading = ref(true)
const failed = ref(false)

// url: which endpoint to fetch from
// local_store_key: localStorage key
const fetchData = async (url, local_store_key) => {
  const URL = url
  let response = {}
  let data = {}
  try {
    response = await fetch(URL)
    data = await response.json()
  } catch {
    console.log("[X] Cannot fetch user data")
    data = localStorage.getItem(local_store_key)
    if (data === 'null') {
      console.log('[X] Cannot get local user data')
      failed.value = true
    } else {
      data = JSON.parse(data)
    }
  }
  return data
}

const setFetchBookData = async () => {
    const url = 'http://localhost:3000/get_books'
    const local_store_key = "books"
    bookstore.setBooks(await fetchData(url, local_store_key))
    if (bookstore.books !== 'null') {
      localStorage.setItem(local_store_key, JSON.stringify(bookstore.books))
      loading.value = false
      clearInterval(fetchInterval)
      bookstore.setDataFetched(true)
    } else {
      failed.value = true
      bookstore.setDataFetched(false)
    }
}

const setFetchUserData = async () => {
    const url = 'http://localhost:3000/get_users'
    const local_store_key = "users"
    store.setUsers(await fetchData(url, local_store_key))
    if (store.users !== 'null') {
      localStorage.setItem(local_store_key, JSON.stringify(store.users))
      loading.value = false
      clearInterval(fetchInterval)
      store.setDataFetched(true)
    } else {
      failed.value = true
      store.setDataFetched(false)
    }
}
const fetchInterval = setInterval(() => {
  setFetchBookData()
  setFetchUserData()
}, 10000)

onMounted(() => {
  setFetchUserData()
  setFetchBookData()
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
