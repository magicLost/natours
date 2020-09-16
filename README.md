Natours project.


https://github.com/zloirock/core-js
ADD BABEL POLIYFILL
// polyfill all `core-js` features:
import "core-js";
// polyfill only stable `core-js` features - ES and web standards:
import "core-js/stable";
// polyfill only stable ES features:
import "core-js/es";

https://stackoverflow.com/questions/49782806/webpack-4-postcss-loader-and-autoprefixer-plugin
https://blog.zverit.com/frontend/2017/09/15/autoprefixer-webpack-config/
ADD POSTCSS WITH AUTOPREFIXER
loader-css,
{
    loader: 'postcss-loader',
    options: {
        plugins: [
            autoprefixer({
                browsers:['ie >= 8', 'last 4 version']
            })
        ],
        sourceMap: true
    }
},
loader-sass

https://medium.com/hackernoon/the-100-correct-way-to-split-your-chunks-with-webpack-f8a9df5b7758
OPTIMIZE CHUNKS
