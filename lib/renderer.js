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

        var svgID = getId(contents.length);
        return start + '<div id="'+svgID+'" class="diagrams"></div>' + end;
      });
    if(contents.length){

      var diagrams = this.config.diagrams;
      data.content += contents.map(function(content,index){
         var textAreaId = "text-" + getId(index);
         return '<textarea id="' + textAreaId +'" style="display: none">'+content+'</textarea>';
      }).join('');

      data.content += '<script src="' + diagrams.mermaid + '"></script>';
      data.content += '<script>'+
      'var mermaidAPI = mermaid.mermaidAPI;'+
      'mermaidAPI.initialize({ startOnLoad:false });'+
      'var all = document.querySelectorAll(".diagrams");'+
      'var arr = Array.prototype.slice.call(all);'+
      'arr.map(function (e) {var textAreaId = "text-"+ e.id;var content = document.getElementById(textAreaId).value;mermaidAPI.render(e.id,content,function (svgCode) {e.innerHTML = svgCode;})});'+
      '</script>';

    }
    
  }
};
