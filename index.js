var assign = require('deep-assign');
var renderer = require('./lib/renderer');

hexo.config.diagrams = assign({
  mermaid: 'https://cdn.bootcss.com/mermaid/7.1.2/mermaid.js'
}, hexo.config.diagrams);

hexo.extend.filter.register('before_post_render', renderer.render, 9);

