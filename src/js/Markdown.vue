<template>
    <main v-html="render()"></main>
</template>

<script>
const wikilinks = require('./WikiLinks')();
const axios = require('axios').default;

let md = require('markdown-it')({
        xhtmlOut: true,
        breaks: true, 
        linkify: true,
    })
        .use(wikilinks)
        .use(require('markdown-it-mark'))
        .use(require('markdown-it-ins'))
        .use(require('markdown-it-spoiler'));


export default {
    name: "Markdown",
    data() {
        return {
            markdown: '# Loading...',
        };
    },
    watch: {
        $route(to, from) {
            // get content from markdown file
            this.getPage();
        }
    },
    methods: {
        getPage() {
            let file = 'index.md';
            if(this.$route.params.pathMatch !== '/') {
                file = `${this.$route.params.pathMatch}.md`;
            }
            axios.get(`markdown/${file}`)
                .then(response => {
                    this.markdown = response.data;
                })
                .catch(error => {
                    axios.get(`markdown/404.md`)
                        .then(response => {
                            this.markdown = response.data;
                        })
                        .catch(error => {
                            console.log(error);
                        });
                });
        },
        render(markdown) {
            return md.render(this.markdown);
        }
    },
    mounted() {
        this.getPage();
    }
    

};
</script>
