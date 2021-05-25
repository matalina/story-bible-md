# Story Bible MD

## Features

- Markdown with front matter file creation. (title and uri required | tags and categories are default displayed)
- Markup for spoilers, insert, delete, and comments
- Mediawiki Link style for internal pages
- Fuzzy Search (index command needs to be run on updated files)
- 404 page suggests possible information requested
- Font Awesome icons in markdown
- File naming convention: kabob case file names with .md extenstion ie: this-page-name.md saved in www/markdown folder
- images saved in www/images folder

### To Do List

- [x] Front Matter meta data
- [x] MediaWiki Links
- [x] Search
- [ ] Last Updated timestamp
- [ ] Pages in Vuex persistant storage on App load (Search Index too)
- [ ] Tags/Category Links
- [ ] All Pages Alphabetical
- [ ] All Tags/Category Pages Alphabetical

### Software Used

- [Fuse.js](https://fusejs.io/getting-started/installation.html) for searching
- axios for fetching in real time
- [markdown-it](https://github.com/markdown-it/markdown-it) for markdown parsing
  - ~~[criticmarkup](https://www.npmjs.com/package/@gerhobbelt/markdown-it-criticmarkup) for editing~~ unavailable
  - [front-matter](https://www.npmjs.com/package/@gerhobbelt/markdown-it-front-matter)
  - [spoilers](https://www.npmjs.com/package/@traptitech/markdown-it-spoiler)
  - [font awesome icons](https://github.com/nunof07/markdown-it-fontawesome/blob/master/index.js) copied to modify
  - [wiki link](https://www.npmjs.com/package/@gerhobbelt/markdown-it-wikilinks) - copied to modify
  - [marked](https://www.npmjs.com/package/markdown-it-mark) for marked tags
  - [ins](https://www.npmjs.com/package/markdown-it-ins) for inserts
