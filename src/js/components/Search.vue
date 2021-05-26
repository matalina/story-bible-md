<template>
    <div>
        <input v-model="search" @keyup="searchPages()" />
        <button @click="clearSearch()">Clear</button>
        <ul>
            <li v-for="result in results">
                <router-link :to="result.item.uri">{{ result.item.title }}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
const Fuse = require('fuse.js').default;

let fuse = null;

let options = [
    'title',
    'tags',
    'category',
    'mentions',
];

export default {
    name: "Search",
    data() {
        return {
            results: [],
            search: '',
        };
    },
    computed: {
        pages() {
            return this.$store.state.pages;
        },
    },
    watch: {
        pages() {
            this.getPages();
        },
    },
    methods: {
        searchPages() {
            this.results = fuse.search(this.search);
        },
        clearSearch() {
            this.results = [];
            this.search = '';
        },
        getPages(){
            axios.get('./js/fuse-index.json')
            .then(response => {
                const fuseIndex = response.data;
                const myIndex = Fuse.parseIndex(fuseIndex);
                fuse = new Fuse(this.pages, options, myIndex);
            })
            .catch(error => {});
        }
    },
    
    mounted() {
        this.getPages();
    }
}
</script>
