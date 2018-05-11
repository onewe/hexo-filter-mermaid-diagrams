var reg = /(\s*)(```) *(mermaid) *\n?([\s\S]+?)\s*(\2)(\n+|$)/g;

function ignore(data) {
  var source = data.source;
  var ext = source.substring(source.lastIndexOf('.')).toLowerCase();
  return ['.js', '.css', '.html', '.htm'].indexOf(ext) > -1;
}

function getId(index) {
  return 'svg-' + index;
}

exports.render = function (data) {
  if (!ignore(data)) {

    var mermaids = [];

    data.content = data.content
      .replace(reg, function (raw, start, startQuote, lang, content, endQuote, end) {
        var mermaid = getId(mermaids.length);
        mermaids.push(content);
        return start + '<div id="' + mermaid + '"></div>' + end;
      });

    if (mermaids.length) {
      var config = this.config.diagrams;
      // resources
      data.content += '<script src="' + config.mermaid + '"></script>';
      if (config.css) {
        data.content += '<link href="' + config.css + '" rel="stylesheet" type="text/css" />'
      }
      // exec
      data.content += mermaids.map(function (code, index) {
        return '' +
          '{% raw %}' +
          '<div class="mermaid">' + code + '</div>' +
          '{% endraw %}';
      }).join('');
    }
  }
};
