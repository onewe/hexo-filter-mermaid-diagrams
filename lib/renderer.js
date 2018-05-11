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
        console.log(content);
        return start + '<div id="' + mermaid + '"></div>' + end;
      });

    // if (mermaids.length) {
    //   var config = this.config.mermaid;
    //   // resources
    //   data.content += '<script src="' + config.js + '"></script>';
    //   if (config.css) {
    //     data.content += '<link href="' + config.css + '" rel="stylesheet" type="text/css" />'
    //   }
    //   // exec
    //   data.content += mermaids.map(function (code, index) {
    //     var mermaid = getId(index);
    //     var codeId = mermaid + '-code';
    //     var optionsId = mermaid + '-options';
    //     return '' +
    //       '{% raw %}' +
    //       '<textarea id="' + codeId + '" style="display: none">' + code + '</textarea>' +
    //       '<textarea id="' + optionsId + '" style="display: none">' + JSON.stringify(config.options) + '</textarea>' +
    //       '<script>' +
    //       '  var code = document.getElementById("' + codeId + '").value;' +
    //       '  var options = JSON.parse(decodeURIComponent(document.getElementById("' + optionsId + '").value));' +
    //       '  var diagram = Diagram.parse(code);' +
    //       '  diagram.drawSVG("' + mermaid + '", options);' +
    //       '</script>' +
    //       '{% endraw %}';
    //   }).join('');
    // }
  }
};
