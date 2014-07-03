
var DatatablesRendererExport = require('ep_tables2/static/js/datatables-renderer.js');

exports.getLineHTMLForExport = function (hook, context) {
  if (context.text.indexOf("data-tables") != -1) {
    var attribIndex = retrieveIndex(context.attribLine);
    var dtAttrs = context.apool.numToAttrib[attribIndex][1];
    return DatatablesRendererExport.DatatablesRenderer.render("export", context, dtAttrs);
  }
};

retrieveIndex = function (attribLine) {
  var arr_indices = {0 : 0, 1 : 1, 2 : 2, 3 : 3, 4 : 4, 5 : 5, 6 : 6, 7 : 7, 8 : 8, 9 : 9, 'a' : 10, 'b' : 11, 'c' : 12, 'd' : 13, 'e' : 14, 'f' : 15, 'g' : 16, 'h' : 17, 'i' : 18, 'j' : 19, 'k' : 20, 'l' : 21, 'm' : 22, 'n' : 23, 'o' : 24, 'p' : 25, 'q' : 26, 'r' : 27, 's' : 28, 't' : 29, 'u' : 30, 'v' : 31, 'w' : 32, 'x' : 33, 'y' : 34, 'z' : 35};
  var attribIndex = 0;

  attribLine = attribLine.split("*");
  attribLine = attribLine[2].split('+');
  attribLine = attribLine[0] + "";

  for (var i = 0; i < attribLine.length; i++) {
    if (i == attribLine.length - 1) {
      attribIndex += arr_indices[attribLine[i]];
    } else {
      attribIndex += 36 * arr_indices[attribLine[i]];
    }
  }

  return attribIndex;
}
