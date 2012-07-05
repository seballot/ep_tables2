exports.collectContentBreak = function (hook, context) {
    var tvalue = context.tvalue;
    if (tvalue && tvalue == 'tblBreak') {
        context.cc.breakLine = false;
    }
};
exports.collectContentTblTd = function (hook, context) {
    var n = context.node;
    var txt = context.text;
    if (txt) {
        while (n) {
            if (n.tagName == 'TD') {
                var tagName = n.getAttribute("name");
                if (tagName == 'tData') {
                    txt = txt.replace(/\\/g, "|");
                    txt = txt.replace(/"/g, "'");
                    break;
                } else if (tagName == 'delimCell') {
                    txt = '","';
                    break;
                } else if (tagName == 'payload') {
                    txt = "{\"payload\":[[\"";
                    break;
                } else if (tagName == 'bracketAndcomma') {
                    txt = "\"]],\"tblId\":\"1\",\"tblClass\":\"data-tables\"}";
                    break;
                }
            }
            n = n.parentNode;
        }
    }
    context.cc.text = txt;
};
