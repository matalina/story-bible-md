// webpack.mix.js

let mix = require('laravel-mix');

mix.js('src/js/app.js', 'js')
    .version()
    .vue()
    .extract()
    .sass('src/sass/app.scss', 'css')
    .options({
        processCssUrls: false
    })
    .setPublicPath('www');