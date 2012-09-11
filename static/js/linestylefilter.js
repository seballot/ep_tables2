exports.disableAuthorColorsForThisLine = function (hook, context) {
    var lineText = context.text;
    var disableLineColors = false;
    if (lineText && lineText.indexOf('data-tables')!=-1) {
       disableLineColors = true;
    }
    return disableLineColors;
};
