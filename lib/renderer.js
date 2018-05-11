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


    var contents = [];
    data.content = data.content
      .replace(reg, function (raw, start, startQuote, lang, content, endQuote, end) {
        contents.push(content);
        return start + '<pre class="mermaid">'+content+'</pre>' + end;
      });
    if(contents.length){

      var diagrams = this.config.diagrams;
      data.content += '<script src="' + diagrams.mermaid + '"></script>';
      

    }
    
  }
};
