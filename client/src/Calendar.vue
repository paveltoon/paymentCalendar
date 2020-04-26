<template>
  <div class="container" v-if="isLoaded">
      <app-month-card class="col" v-for="(month,index) in getCalendar[getCurrentYear]" :key="index"
      :monthColor="getColors[index]"
      :month="month"
      :year="getCurrentYear"
      :num="index">
      </app-month-card>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import monthCard from './MonthCard';
import axios from 'axios';
export default {
    data() {
        return {
        }
    },
    components: {
        "app-month-card" : monthCard
    },
    computed: {
        ...mapGetters(['getCalendar', 'getCurrentYear', 'getColors', 'isLoaded']),
    },
    
    methods: {
        ...mapActions(['loaded', 'loadingCalendar','setTotalBalance']),
    },
    beforeCreate() {
        axios.get('http://localhost:3555/calendar').then((res) => {
            this.$store.dispatch('loadingCalendar', res.data.full);
            this.$store.dispatch('setCurrentYear', res.data.current);
            this.$store.dispatch('setAllYears', res.data.years);
            this.$store.dispatch('setTotalBalance', res.data.total);
            this.$store.dispatch('loaded');
        })
    }
}
</script>

<style>
    .container {
        margin: auto auto;
        padding: auto;
    }
    .col {
        display: flex;
        align-items: center;
    }
</style>