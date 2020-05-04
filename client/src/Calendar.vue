<template>
  <div class="calendar" v-if="isLoaded" :key="reloading">
      
      <app-month-card v-if="showModal" @close-modal="closeModal"
      :monthColor="getColors[activatedMonthNumber]"
      :month="getCalendar[getCurrentYear][activatedMonthNumber]"
      :year="getCurrentYear"
      :num="activatedMonthNumber">
      </app-month-card>

      <app-year-card class="col" v-for="(month,index) in getCalendar[getCurrentYear]" :key="index"
      :monthColor="getColors[index]"
      :month="month"
      :year="getCurrentYear"
      :num="index"
      @fliper="whatFlip"
      >
      </app-year-card>

  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import yearCard from './YearCard';
import monthCard from './MonthCard';
import axios from 'axios';
export default {
    data() {
        return {
            showModal: false,
            activatedMonthNumber: null,
            reloading: 0
        }
    },
    components: {
        "app-year-card" : yearCard,
        "app-month-card" : monthCard
    },
    computed: {
        ...mapGetters(['getCalendar', 'getCurrentYear', 'getColors', 'isLoaded']),
    },
    
    methods: {
        ...mapActions(['loaded', 'loadingCalendar','setTotalBalance']),
        whatFlip(e) {
            console.log("function whatFlip in Calendar.vue " + e)
            this.activatedMonthNumber = e
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
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