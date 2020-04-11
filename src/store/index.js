import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        active_path: ''
    },
    getters: {
        getActivePath(state) {
            return state.active_path
        }
    },
    mutations: {
        saveActivePath(state, activePath) {
            window.sessionStorage.setItem('active_path', activePath)
            state.active_path = activePath
        }
    },
    actions: {},
    modules: {}
});
