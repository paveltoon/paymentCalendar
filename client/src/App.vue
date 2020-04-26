<template>
  <div class="container">
    <app-menu></app-menu>
    <app-calendar></app-calendar>
  </div>
</template>

<script>
import Calendar from './Calendar'
import Menu from './Menu'
import axios from 'axios';
export default {
  components: {
    "app-calendar" : Calendar,
    "app-menu" : Menu
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  body {
    background-color: #37363b;
    font-family: 'Open Sans Condensed', sans-serif;
  }
</style>