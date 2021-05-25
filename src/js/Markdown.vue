<template>
  <main>
    <header>{{ meta.title }}</header>
    <main v-html="render()"></main>
  </main>
</template>

<script>
const wikilinks = require("./WikiLinks")();
const axios = require("axios").default;
const matter = require("gray-matter");

let md = require("markdown-it")({
  xhtmlOut: true,
  breaks: true,
  linkify: true,
})
  .use(wikilinks)
  .use(require("markdown-it-mark"))
  .use(require("markdown-it-ins"))
  .use(require("markdown-it-spoiler"));

export default {
  name: "Markdown",
  data() {
    return {
      markdown: "# Loading...",
      meta: {},
    };
  },
  watch: {
    $route(to, from) {
      // get content from markdown file
      this.getPage();
    },
  },
  methods: {
    getPage() {
      let file = "index.md";
      if (this.$route.params.pathMatch !== "/") {
        file = `${this.$route.params.pathMatch}.md`;
      }
      axios
        .get(`markdown/${file}`)
        .then((response) => {
          let data = matter(response.data);
          this.markdown = data.content;
          this.meta = data.data;
        })
        .catch((error) => {
          axios
            .get(`markdown/404.md`)
            .then((response) => {
              this.markdown = response.data;
            })
            .catch((error) => {
              console.log(error);
            });
        });
    },
    render(markdown) {
      return md.render(this.markdown);
    },
  },
  mounted() {
    this.getPage();
  },
};
</script>
