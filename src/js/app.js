import Vue from 'vue';
import VueRouter from 'vue-router';
import Markdown from './Markdown';
import Error404 from './Error404';
import Search from './Search';

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
    router,
    components: { Search }
});