<template>
    <main>
        <h1>Categories</h1>
        <ul>
            <li
                v-for="category in categories"
                :key="category"
            >
                <router-link :to="`/category/${category}`" >{{ category }}</router-link>
            </li>
        </ul>
    </main>
</template>

<script>
export default {
    name: 'AllCategories',
    data() {
        return {

        };
    },
    computed: {
        categories() {
            return this.$store.state.categories.sort();
        }
    }
}
</script>