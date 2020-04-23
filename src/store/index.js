import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        activePath: '',
    },
    getters: {
        getActivePath(state) {
            return state.activePath
        }
    },
    mutations: {
        saveActivePath(state, path) {
            window.sessionStorage.setItem('active_path', path)
            state.activePath = path
        },        
    },
    actions: {},
    modules: {}
});
