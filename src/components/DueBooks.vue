<template>
  <div>
    <due-book-item title="Harry Potter and the Half Blood Prince" grade="9 A" name="Sharafudeen Jamaal" :days="3"/>
    <due-book-item title="Islamic Studies 9A" grade="9 A" name="Yamaan Ahmed Naseem" :days="5"/>
  </div>
</template>

<script setup>
import DueBookItem from './DueBookItem.vue'
</script>