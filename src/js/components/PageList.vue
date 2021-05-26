<template>
    <section>
        <ul>
            <li
                v-for="page in pages"
                :key="page.uri"
            >
                <router-link :to="`/${page.uri}`">{{ page.title }}</router-link>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'PageList',
    props: ['pages'],
    data() {
        return {

        };
    }
}
</script>