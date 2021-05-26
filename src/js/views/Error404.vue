<template>
    <section>
        <h1>File Not Found</h1>

        <p><code>{{ uri }}</code> does not exist.</p>
        <div v-if="results.length > 0">
            <p>Maybe one of these pages is what you are looking for?</p>
            <ul>
                <li v-for="result in results">
                    <router-link :to="result.item.uri">{{ result.item.title }}</router-link>
                </li>
            </ul>
        </div>
        <div v-else>
            <p>We are unable to find anything similar to what you requested.</p>
        </div>
    </section>
</template>

<script>
import axios from 'axios';
const Fuse = require('fuse.js').default;

let fuse = null;

export default {
    name: 'Error404',
    data() {
        return {
            prevRoute: null,
            results: [],
            pages: [],
        };
    },
    computed: {
        uri() {
            if(this.prevRoute) {
                return this.prevRoute.path.replace('/','');
            }
            return '';
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            vm.prevRoute = from;
        });
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

                        this.results = fuse.search(this.uri);
                    })
                    .catch(error => {});
            })
            .catch(error => {});
        
    }
};
</script>
