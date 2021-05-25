<template>
    <div>
        <input v-model="search" @keypress="searchPages()" />
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

export default {
    name: "Search",
    data() {
        return {
            results: [],
            search: '',
            pages: [],
        };
    },
    methods: {
        searchPages() {
            this.results = fuse.search(this.search);
        },
        clearSearch() {
            this.results = [];
            this.search = '';
        }
    },
    mounted() {
        axios.get('./markdown/fuse-index.json')
            .then(response => {
                const fuseIndex = response.data;
                axios.get('./markdown/pages-meta.json')
                    .then(response => {
                        let options = [
                            'title',
                            'tags',
                            'category',
                            'mentions',
                        ];
                        
                        this.pages = response.data;
                        const myIndex = Fuse.parseIndex(fuseIndex);
                       
                        fuse = new Fuse(this.pages, options, myIndex);
                    })
                    .catch(error => {});
            })
            .catch(error => {});
        
    }
}
</script>
