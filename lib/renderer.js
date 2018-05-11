var reg = /(\s*)(```) *(mermaid) *\n?([\s\S]+?)\s*(\2)(\n+|$)/g;

function ignore(data) {
  var source = data.source;
  var ext = source.substring(source.lastIndexOf('.')).toLowerCase();
  return ['.js', '.css', '.html', '.htm'].indexOf(ext) > -1;
}


exports.render = function (data) {
  if (!ignore(data)) {

    var arr = [];    
    data.content = data.content
      .replace(reg, function (raw, start, startQuote, lang, content, endQuote, end) {
        arr.push(content);
        return start + '<div class=mermaid">'+content+'</div>' + end;
      });
    if(arr.length){
      data.content += '{% raw %}' +
                        '<script>'+
                         'mermaid.initialize({})'+   
                        '</script>' +
                    '{% endraw %}',join('');
   
    }
    
  }
};
