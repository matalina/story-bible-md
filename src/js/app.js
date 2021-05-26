import Vue from 'vue';
import VueRouter from 'vue-router';
import Markdown from './Markdown';
import Error404 from './Error404';
import Search from './Search';
import axios from 'axios';
import moment from 'moment';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";


Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
    plugins: [createPersistedState()],
    state: {
        last_updated_on: '2021-05-01 00:0:00',
        version: '1.0.0',
        copyright: {
            who: '',
            start: 2021,
            end: 2021
        },
        site_name: 'Story Bible MD',

        pages:[],

    },
    actions: {
        update_pages({ commit }) {
            axios.get('./markdown/pages-meta.json')
                .then(response => {
                    commit('update_pages', response.data);
                })
                .catch(() => { });
        }
    },
    mutations: {
        update_config(state, config) {
            state.last_updated_on = config.last_updated_on;
            state.copyright = config.copyright;
            state.site_name = config.site_name;
            state.version = config.version;
        },
        update_pages(state, pages) {
            state.pages = pages;
        }
    }
});


const router = new VueRouter({
    routes: [
        {
            path: '/404',
            component: Error404,
        },
        {
            path: '*',
            component: Markdown,
        }
    ]
});

var app = new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            warning: null,
        }
    },
    computed: {
        formated_last_update() {
            return moment(this.last_updated_on).format('M/D/YYYY h:mm a')
        },
        last_updated_on() {
            return this.$store.state.last_updated_on;
        },
        copyright() {
            return this.$store.state.copyright;
        },
        version() {
            return this.$store.state.version;
        },
        site_name() {
            return this.$store.state.site_name;
        }
    },
    store,
    router,
    components: { Search },
    mounted() {
        this.loading = true;
        axios.get('./markdown/config.json')
            .then(response => {
                let data = response.data;

                let new_updated_on = moment(data.last_updated_on);
                let old_updated_on = moment(this.last_updated_on);

                this.$store.commit('update_config', data);

                if (new_updated_on.isAfter(old_updated_on)) {
                    this.$store.dispatch('update_pages');
                }

                this.loading = false;
            })
            .catch(error => {
                this.warning = 'The site had an error loading the configuration and may be out of date.';
                this.loading = false;
            })
    }
});