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


    var elements = [];
    data.content = data.content
      .replace(reg, function (raw, start, startQuote, lang, content, endQuote, end) {
        elements.push(content);
        var svgID = getId(elements.length);
        return start + '<div id="'+svgID+'"></div>' + end;
      });
    if(elements.length){
      var config = this.config.diagrams;
      var mermaidAPI = mermaid.mermaidAPI;
      mermaidAPI.initialize({
            startOnLoad:false
      });
      elements.map(function(element,index){
          var elementId = getId(index);
          mermaidAPI.render(elementId,element,function(svgCode){
              var e = document.getElementById(elementId);    
              e.innerHTML = svgCode;  
          });

      });
   
    }
    
  }
};
