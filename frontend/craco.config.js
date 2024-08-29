const { plugin } = require("postcss");
const { postcss } = require("tailwindcss");

module.exports = {
    style: {
        postcss: {
            plugins: [
                require('tailwaindcss'),
                require('autoprefixer'),
            ],
        },
    },
}