<template>
    <main>
        <h1>Tags</h1>
        <ul>
            <li
                v-for="tag in tags"
                :key="tag"
            >
                <router-link :to="`/tag/${tag}`" >{{ tag }}</router-link>
            </li>
        </ul>
    </main>
</template>

<script>
export default {
    name: 'AllTags',
    data() {
        return {

        };
    },
    computed: {
        tags() {
            return this.$store.state.tags.sort();
        }
    }
}
</script>