<template>
  <div class="calendar" v-if="isLoaded">
      <app-month-card class="col" v-for="(month,index) in getCalendar[getCurrentYear]" :key="index"
      :monthColor="getColors[index]"
      :month="month"
      :year="getCurrentYear"
      :num="index"
      @fliper="whatFlip"
      >
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
        whatFlip(e) {
            console.log("function whatFlip in Calendar.vue " + e)
        },
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
    .calendar {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }
    .col {
        display: flex;
        align-items: center;
                transition: width 1s ease-in-out;
    }
</style>