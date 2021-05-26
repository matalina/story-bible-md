<template>
    <main>
        <h1>Tag: {{ tag }}</h1>
        <div 
            v-for="letter in alphabet"
            :key="letter"
        >
        <h3>{{ letter.toUpperCase() }}</h3>
            <PageList
                :pages="getPages(letter)"
            ></PageList>
        </div>
    </main>
</template>

<script>
export default {
    name: 'TagPage',
    data() {
        return {
            alphabet: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','y','z']
        }
    },
    computed: {
        pages() {
            return this.$store.state.pages;
        },
        tag() {
            return this.$route.params.tag;
        }
    },
    methods: {
        getPages(letter) {
            let pages = this.pages.filter(page => {
                if(page.tags === undefined) return false;
                return page.tags.includes(this.tag) && page.title.toLowerCase().startsWith(letter);
            });

            return pages.sort((a,b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        }
    }
}
</script>
