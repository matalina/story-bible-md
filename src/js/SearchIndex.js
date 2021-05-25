console.log('Search Index');

const Fuse = require('fuse.js')
const fs = require('fs');
const util = require("util");
const matter = require("gray-matter");

const readFile = util.promisify(fs.readFile);
const path = './www/markdown'
let pages = [];
let options = [
    'title',
    'tags',
    'category',
    'mentions',
];

fs.readdir(path, (err, items) => {
    let re = /\.md$/;
    let skip = ['404.md'];
    let all = [];

    for (let index in items) {
        let item = items[index];

        if (item.match(re)) {
            if (!skip.includes(item)) {
                let call = readFile(`${path}/${item}`,'utf8');

                all.push(call);
            }
        }
    }

    Promise.all(all)
        .then(responses => {
            for (let index in responses) {
                let data = responses[index];
                let page = matter(data);
                pages.push(page.data);
            }

            let pageIndex = Fuse.createIndex(options, pages);
            let file_contents = JSON.stringify(pageIndex.toJSON());
            fs.writeFile(`${path}/fuse-index.json`, file_contents, {}, () => { });
            file_contents = JSON.stringify(pages);
            fs.writeFile(`${path}/pages-meta.json`, file_contents, {}, () => {});
        })
        .catch(errors => {
            console.log(errors);
        })
});