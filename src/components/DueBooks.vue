<template>
  <div>
    <div v-for="due in dues" :key="due.name">
      <due-book-item :title="due.title" :grade="due.grade" :name="due.name" :days="due.days"/> 
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DueBookItem from './DueBookItem.vue'

const dues = ref([
  {
    title: "Harry Potter and the Half Blood Prince",
    grade: "9 A",
    name: "Sharafudeen Jamaal",
    days: 3
  },
  {
    title: "Islamic Studies 9A",
    grade: "9 A",
    name: "Yamaan Ahmed Naseem",
    days: 5
  },
  {
    title: "How to think like a criminal",
    grade: "9 A",
    name: "Abdul Masyh",
    days: 2
  },
  {
    title: "How to talk in discord",
    grade: "9 A",
    name: "Sadhin Shareef",
    days: 1
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
  {
    title: "How to be a 10x developer",
    grade: "9 A",
    name: "Iyaan Azeez",
    days: 0
  },
])

</script>