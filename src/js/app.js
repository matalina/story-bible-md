import Vue from 'vue';
import VueRouter from 'vue-router';
import Markdown from './Markdown';
import Error404 from './Error404';
import Search from './Search';
import axios from 'axios';

Vue.use(VueRouter);

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
            warming: null,

            last_updated_on: null,
            version: null,
            copyright: {},
            site_name: null,
        }
    },
    router,
    components: { Search },
    mounted() {
        this.loading = true;
        axios.get('./markdown/config.json')
            .then(response => {
                let data = response.data;

                this.copyright = data.copyright;
                this.site_name = data.site_name;

                this.last_updated_on = data.last_updated_on;
                this.version = data.version;

                // get stored values and update if necessary

                // stop loading screen
                this.loading = false;
            })
            .catch(error => {
                this.warning = 'The site had an error loading the configuration and may be out of date.';
                this.loading = false;
            })
    }
});