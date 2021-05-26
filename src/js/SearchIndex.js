console.log('Search Index');
const moment = require('moment');
const Fuse = require('fuse.js')
const fs = require('fs');
const util = require("util");
const matter = require("gray-matter");


const readFile = util.promisify(fs.readFile);
const path = './www/markdown'
let pages = [];
let tags = [];
let categories = [];

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
                if (page.data.tags !== undefined) {
                    tags.push(...page.data.tags);
                }
                if (page.data.category !== undefined) {
                    categories.push(page.data.category);
                }
            }

            let pageIndex = Fuse.createIndex(options, pages);
            let file_contents = JSON.stringify(pageIndex.toJSON());
            fs.writeFile(`${path}/fuse-index.json`, file_contents, {}, () => { });
            file_contents = JSON.stringify(pages);
            fs.writeFile(`${path}/pages-meta.json`, file_contents, {}, () => { });
            
            readFile('./www/markdown/config.json', 'utf8')
                .then(response => {
                    let config = JSON.parse(response);
                    
                    let updated_on = moment().format('YYYY-MM-DD hh:mm:ss');
                    
                    config.last_updated_on = updated_on;
                    config.copyright.end = moment().format('YYYY');
                    config.tags = [... new Set(tags)];
                    config.categories = [... new Set(categories)];
                    
                    fs.writeFile('./www/markdown/config.json', JSON.stringify(config), {}, (e) => { console.log(); });
                })
                .catch(() => { });

            
        })
        .catch(errors => {
            console.log(errors);
        })
});