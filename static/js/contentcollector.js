exports.collectContentLineBreak = function (hook, context) {
    var tvalue = context.tvalue;
    var breakLine = true;
    if (tvalue && tvalue == 'tblBreak') {
       breakLine = false;
    }
    return breakLine;
};
exports.collectContentLineText= function (hook, context) {
    var n = context.node;
    var txt = context.text;
    if (txt) {
        while (n) {
            if (n.tagName == 'TD') {
                var elementName = n.getAttribute("name");
                if (elementName == 'tData') {
                    txt = txt.replace(/\\/g, "|");
                    txt = txt.replace(/"/g, "'");
                    break;
                } else if (elementName == 'delimCell') {
                    txt = '","';
                    break;
                } else if (elementName == 'payload') {
                    txt = "{\"payload\":[[\"";
                    break;
                } else if (elementName == 'bracketAndcomma') {
                    txt = "\"]],\"tblId\":\"1\",\"tblClass\":\"data-tables\"}";
                    break;
                }
            }
            n = n.parentNode;
        }
    }
    return txt;
};
