<template>
  <div class="menu" v-if="isLoaded">
      <h2 class="menu-logo">My Fucking Calendar</h2>

        <div class="menu-list">
            <h2 class="menu-list-main" @click="showMenu = !showMenu" :style="{backgroundColor: checkMenu}">- {{getCurrentYear}} -</h2>
            <ul v-show="showMenu" class="menu-list-ul">
                <li v-for="(year, index) in getAllYears" :key="index" class="menu-list-item"
                :id="year"
                :value="year"
                name="getAllYears" 
                @click="selectedYear">
                    {{year}}
                </li>
            </ul>
        </div>
        <div class="menu-total-balance">
            <h2>Итог: {{getTotalBalance}}</h2>
        </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            showMenu: false,
            total: 0
        }
    },
    computed: {
        ...mapGetters(['getCalendar', 'getTotalBalance','getAllYears','getCurrentYear' ,'isLoaded']),
        checkMenu() {
            return this.showMenu == true ? "rgba(255, 255, 255, 0.200)" : ""
        }
    },
    methods: {
        ...mapActions(['setCurrentYear']),
        selectedYear(event) {
            this.$store.dispatch('setCurrentYear', event.target.value);
            this.showMenu = !this.showMenu
        },
    }
}
</script>

<style>
.menu {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    color: white;
    background-color: #232325;
    height: 50px;
}
.menu-logo {
    position: absolute;
    left: 20px;
}
.menu-list {
    position: relative;
    cursor: pointer;
}
.menu-list-main {
    text-align: center;
    width: 100px;
}
.menu-list-ul {
    background-color: rgba(255, 255, 255, 0.200);
    position: absolute;
    width: 100px;
}
.menu-list-item {
    cursor: pointer;
    padding: 10px; 
    list-style-type: none;
    text-align: center;
}
.menu-list-item:hover {
    list-style-type: none;
    text-align: center;
    background-color: rgba(255, 255, 255, 0.200);
}
.menu-total-balance {
        position: absolute;
    right: 20px;
}
</style>