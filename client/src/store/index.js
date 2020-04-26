import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        calendar: null,
        colors: [
            '119,185,217',
            '56,181,185',
            '4,158,122',
            '100,178,68',
            '174,203,1',
            '238,180,37',
            '244,130,31',
            '241,80,70',
            '202,74,97',
            '130,115,189',
            '90,125,181',
            '3,161,208'
        ],
        totalBalance : null,
        currentYear: null,
        allYears: null,
        isLoaded: false
    },
    getters: {
        getCalendar(state) {
            return state.calendar
        },
        getColors(state) {
            return state.colors;
        },
        getCurrentYear(state) {
            return state.currentYear;
        },
        getTotalBalance(state) {
            return state.totalBalance;
        },
        getAllYears(state) {
            return state.allYears;
        },
        isLoaded(state) {
            return state.isLoaded;
        }
    },
    mutations: {
        loaded(state) {
            state.isLoaded = true;
        },
        loadingCalendar(state, payload) {
            state.calendar = payload;
        },
        setCurrentYear(state, payload) {
            state.currentYear = payload;
        },
        setTotalBalance(state, payload) {
            state.totalBalance = payload;
        },
        setAllYears(state, payload) {
            state.allYears = payload
        }
    },
    actions: {
        loaded(store){
            store.commit('loaded')
        },
        loadingCalendar(store, payload) {
            store.commit('loadingCalendar', payload)
        },
        setCurrentYear(store, payload) {
            store.commit('setCurrentYear', payload)
        },
        setTotalBalance(store, payload) {
            store.commit('setTotalBalance', payload)
        },
        setAllYears(store, payload) {
            store.commit('setAllYears', payload)
        }
    }
})