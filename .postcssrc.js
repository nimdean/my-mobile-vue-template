const path = require('path');

module.exports = ({ file }) => {
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750;
  const designHeight = file.dirname.includes(path.join('node_modules', 'vant')) ? 667 : 1334;

  return {
    "plugins": {
      "postcss-import": {},
      "postcss-url": {},
      "postcss-aspect-ratio-mini": {},
      "postcss-write-svg": {
        "utf8": false
      },
      "postcss-cssnext": {},
      "postcss-px-to-viewport": {
        "viewportWidth": designWidth,
        "viewportHeight": designHeight,
        "unitPrecision": 3,
        "viewportUnit": "vw",
        "selectorBlackList": [
          ".ignore",
          ".hairlines"
        ],
        "exclude": [],
        "minPixelValue": 2,
        "mediaQuery": false
      },
      "postcss-viewport-units": {},
      "cssnano": {
        "cssnano-preset-advanceds": {
          "zindex": false,
          "autoprefixer": false
        }
      }
    }
  }

}