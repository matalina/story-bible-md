import Vue from 'vue';
import VueRouter from 'vue-router';
import Markdown from './Markdown';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '*',
            component: Markdown,
        }
    ]
});

var app = new Vue({
    el: '#app',
    router,
});