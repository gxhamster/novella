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
import { userStore } from '@/stores/store'

const store = userStore()
const loading = ref(true)
const failed = ref(false)

const fetchUsers = async () => {
  const URL = 'http://localhost:3000/get_users'
  let response = {}
  let data = {}
  try {
    response = await fetch(URL)
    data = await response.json()
  } catch {
    console.log("[X] Cannot fetch user data")
    data = localStorage.getItem("users")
    if (data === 'null') {
      console.log('[X] Cannot get local user data')
      failed.value = true
    } else {
      data = JSON.parse(data)
    }
  }   
  return data
}

// If cannot retrieve data


const setFetchData = async () => {
    store.setUsers(await fetchUsers())
    if (store.dues !== 'null') {
      localStorage.setItem("users", JSON.stringify(store.users))
      loading.value = false
      clearInterval(fetchInterval)
      store.setDataFetched(true)
    } else {
      failed.value = true
      store.setDataFetched(false)
    }
}
const fetchInterval = setInterval(setFetchData, 10000)

onMounted(() => {
  setFetchData()
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
