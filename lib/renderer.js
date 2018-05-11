var reg = /(\s*)(```) *(mermaid) *\n?([\s\S]+?)\s*(\2)(\n+|$)/g;

function ignore(data) {
  var source = data.source;
  var ext = source.substring(source.lastIndexOf('.')).toLowerCase();
  return ['.js', '.css', '.html', '.htm'].indexOf(ext) > -1;
}

exports.render = function (data) {
  if (!ignore(data)) {
    var flag = false;
    data.content = data.content
      .replace(reg, function (raw, start, startQuote, lang, content, endQuote, end) {
        if(!flag){
          flag = true;
        }
        return start + '<pre class="mermaid">'+content+'</pre>' + end;
      });
    if(flag){
      var diagrams = this.config.diagrams;
      data.content += '<script src="' + diagrams.mermaid + '"></script>';
    }
    
  }
};
