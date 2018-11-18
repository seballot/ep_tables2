exports.eejsBlock_timesliderScripts = function (hook_name, args, cb) {
  args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables2/templates/datatablesScriptsTimeslider.ejs");
}
exports.eejsBlock_scripts = function (hook_name, args, cb) {
  args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables2/templates/datatablesScripts.ejs");
}
exports.eejsBlock_editbarMenuLeft = function (hook_name, args, cb) {
  args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables2/templates/datatablesEditbarButtons.ejs");
}
exports.eejsBlock_styles = function (hook_name, args, cb) {
  args.content = require('ep_etherpad-lite/node/eejs/').require("ep_tables2/templates/styles.ejs") + args.content;
}