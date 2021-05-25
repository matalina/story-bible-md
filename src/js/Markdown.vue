<template>
  <main>
    <section v-html="render()"></section>
    <footer>
      <div v-if="meta.category">
        <i class="fal fa-folder fa-fw"></i> {{ meta.category }}
      </div>
      <div v-if="meta.tags">
        <span v-for="tag in meta.tags">
          <i class="fal fa-tag fa-fw"></i> {{ tag }}
        </span>
      </div>
    </footer>
  </main>
</template>

<script>
const wikilinks = require("./WikiLinks")();
const axios = require("axios").default;
const matter = require("gray-matter");
const fa = require("./FontAwesome");

let md = require("markdown-it")({
  xhtmlOut: true,
  breaks: true,
  linkify: true,
})
  .use(wikilinks)
  .use(fa)
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
          this.$router.push('/404');
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
