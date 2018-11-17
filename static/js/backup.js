function initTableProperties() {
        //tbl col horizontal align  
        console.log("initTableProperty");   
        // var colVAligns = 
        //   [{
        //    id: 'tbl_prop_align_left',
        //    text: data-l10n-id="ep_tables2.propLeft")
        //  },
        //  {
        //    id: 'tbl_prop_align_center',
        //    text: data-l10n-id="ep_tables2.propCenter")
        //  }, 
        //  { 
        //    id: 'tbl_prop_align_right',
        //    text: data-l10n-id="ep_tables2.propRight")
        //  },
        //  {
        //    id: 'tbl_prop_align_col_remove',
        //    text: "(" + data-l10n-id="ep_tables2.propBtnRemove") + ")"
        //   }];
        // $.colVAlignsMenu = new YAHOO.widget.ContextMenu("tbl_col_v_align_menu", {
        //   iframe: true,
        //   zindex: 1003,
        //   shadow: false,
        //   position: "dynamic",
        //   keepopen: false,
        //   clicktohide: true
        // });
        // $.colVAlignsMenu.addItems(colVAligns);
        // $.colVAlignsMenu.render(document.body);
        // $.colVAlignsMenu.subscribe("click", function (p_sType, p_aArgs) {
        //   var oEvent = p_aArgs[0],
        //     oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
        //   if (oMenuItem) {
        //     var id = oMenuItem.id;
        //     var text = oMenuItem.cfg.getProperty("text");
        //     var align = "";
        //     switch (id) {
        //     case "tbl_prop_align_left":
        //       align = 'left';
        //       break;
        //     case "tbl_prop_align_center":
        //       align = 'center';
        //       break;
        //     case "tbl_prop_align_right":
        //       align = 'right';
        //       break;
        //     case "tbl_prop_align_col_remove":
        //       align = '';
        //       break;
        //     }
        //     var selParams = {
        //       tblColVAlign: true,
        //       attrName: 'colVAlign',
        //       attrValue: align,
        //       tblPropertyChange: true
        //     };
        //     $("#current-col-v-alignment").html(text);
        //     this.hide();
        //     context.ace.callWithAce(function (ace) {
        //       ace.ace_doDatatableOptions(selParams);
        //     }, 'tblOptions', true);
        //   }
        // });
        // $.colVAlignsMenuButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em id=\"current-col-v-alignment\">" + data-l10n-id="ep_tables2.propLeft") + "</em>",
        //   container: "tbl_col_v_align"
        // });
        // $('#tbl_col_v_align').click(function () {
        //   hidePropsDialogs();
        //   $.alignMenu($.colVAlignsMenu, 'tbl_col_v_align');
        //   $.colVAlignsMenu.show();
        // });
        // //tbl row vertical align     
        // var rowVAligns = 
        //   [{
        //    id: 'tbl_prop_align_top',
        //    text: data-l10n-id="ep_tables2.propTop")
        //  },
        //  {
        //    id: 'tbl_prop_align_middle',
        //    text: data-l10n-id="ep_tables2.propCenter")
        //  },
        //  {
        //    id: 'tbl_prop_align_bottom',
        //    text: data-l10n-id="ep_tables2.propBottom")
        //  },
        //  {
        //    id: 'tbl_prop_align_row_remove',
        //    text: "(" + data-l10n-id="ep_tables2.propBtnRemove") + ")"
        //   }];
        // $.rowVAlignsMenu = new YAHOO.widget.ContextMenu("tbl_row_v_align_menu", {
        //   iframe: true,
        //   zindex: 1003,
        //   shadow: false,
        //   position: "dynamic",
        //   keepopen: false,
        //   clicktohide: true
        // });
        // $.rowVAlignsMenu.addItems(rowVAligns);
        // $.rowVAlignsMenu.render(document.body);
        // $.rowVAlignsMenu.subscribe("click", function (p_sType, p_aArgs) {
        //   var oEvent = p_aArgs[0],
        //     oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
        //   if (oMenuItem) {
        //     var id = oMenuItem.id;
        //     var text = oMenuItem.cfg.getProperty("text");
        //     var align = "";
        //     switch (id) {
        //     case "tbl_prop_align_top":
        //       align = 'top';
        //       break;
        //     case "tbl_prop_align_middle":
        //       align = 'middle';
        //       break;
        //     case "tbl_prop_align_bottom":
        //       align = 'bottom';
        //       break;
        //     case "tbl_prop_align_row_remove":
        //       align = '';
        //       break;
        //     }
        //     var selParams = {
        //       tblRowVAlign: true,
        //       attrName: 'rowVAlign',
        //       attrValue: align,
        //       tblPropertyChange: true
        //     };
        //     $("#current-v-alignment").html(text);
        //     this.hide();
        //     context.ace.callWithAce(function (ace) {
        //       ace.ace_doDatatableOptions(selParams);
        //     }, 'tblOptions', true);
        //   }
        // });
        // $.rowVAlignsMenuButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em id=\"current-v-alignment\">" + data-l10n-id="ep_tables2.propTop") + "</em>",
        //   container: "tbl_row_v_align"
        // });
        // $('#tbl_row_v_align').click(function () {
        //   hidePropsDialogs();
        //   $.alignMenu($.rowVAlignsMenu, 'tbl_row_v_align');
        //   $.rowVAlignsMenu.show();
        // });
        // //tbl border width
        // var borderWidths = ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'];
        // $.borderWidthsMenu = new YAHOO.widget.ContextMenu("tbl_border_width_menu", {
        //   iframe: true,
        //   zindex: 1003,
        //   shadow: false,
        //   position: "dynamic",
        //   keepopen: false,
        //   clicktohide: true
        // });
        // $.borderWidthsMenu.addItems(borderWidths);
        // $.borderWidthsMenu.render(document.body);
        // $.borderWidthsMenu.subscribe("click", function (p_sType, p_aArgs) {
        //   var oEvent = p_aArgs[0],
        //     oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
        //   if (oMenuItem) {
        //     borderReq = oMenuItem.cfg.getProperty("text");
        //     var selParams = {
        //       tblBorderWidth: true,
        //       attrName: 'borderWidth',
        //       attrValue: borderReq.substring(0, borderReq.indexOf("px")),
        //       tblPropertyChange: true
        //     };
        //     $.borderWidthPickerButton.set("value", selParams.attrValue);
        //     $("#current-width").html(borderReq);
        //     context.ace.callWithAce(function (ace) {
        //       ace.ace_doDatatableOptions(selParams);
        //     }, 'tblOptions', true);
        //   }
        // });
        // $.borderWidthPickerButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em id=\"current-width\">1px</em>",
        //   container: "tbl_border_width"
        // });
        // $('#tbl_border_width').click(function () {
        //   hidePropsDialogs();
        //   $.alignMenu($.borderWidthsMenu, 'tbl_border_width');
        //   $.borderWidthsMenu.show();
        //   var widthValue = $.borderWidthPickerButton.get("value");
        //   if (widthValue) {
        //     var selParams = {
        //       tblBorderWidth: true,
        //       attrName: 'borderWidth',
        //       attrValue: widthValue,
        //       tblPropertyChange: true
        //     };
        //     context.ace.callWithAce(function (ace) {
        //       ace.ace_doDatatableOptions(selParams);
        //     }, 'tblOptions', true);
        //   }
        // });
        // $.tblfocusedProperty = "";
        // $.colorPickerAligned = false;
        // $('#tbl_border_color').click(function () {
        //   hidePropsDialogs();
        //   if (!$.colorPickerAligned) {
        //     createColorPicker();
        //   }
        //   $.alignMenu($.oColorPickerDialog, 'tbl_border_color');
        //   $.tblfocusedProperty = "tbl_border_color";
        //   $.oColorPickerDialog.setHeader(data-l10n-id="ep_tables2.propChooseAColorFor") + data-l10n-id="ep_tables2.propTableBorderColor"));
        //   $.oColorPickerDialog.show();
        //   var hexValue = $.borderColorPickerButton.get("value");
        //   if (hexValue) {
        //     var hex2rgb = hexToRgb(hexValue);
        //     $.oColorPicker.setValue([hex2rgb.r, hex2rgb.g, hex2rgb.b]);
        //   }
        // });
        // $.borderColorPickerButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em  class='color-picker-button' id=\"current-color\"></em>",
        //   container: "tbl_border_color"
        // });
        // //tbl cell bg color      
        // $.cellBgColorPickerButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em class='color-picker-button' id=\"current-cell-bg-color\"></em>",
        //   container: "tbl_cell_bg_color"
        // });
        // $('#tbl_cell_bg_color').click(function () {
        //   hidePropsDialogs();
        //   if (!$.colorPickerAligned) {
        //     createColorPicker();
        //   }
        //   $.alignMenu($.oColorPickerDialog, 'tbl_cell_bg_color');
        //   $.tblfocusedProperty = "tbl_cell_bg_color";
        //   $.oColorPickerDialog.setHeader(data-l10n-id="ep_tables2.propChooseAColorFor") + data-l10n-id="ep_tables2.propCellBackgroundColor"));
        //   $.oColorPickerDialog.show();
        //   var hexValue = $.cellBgColorPickerButton.get("value");
        //   if (hexValue) {
        //     var hex2rgb = hexToRgb(hexValue);
        //     $.oColorPicker.setValue([hex2rgb.r, hex2rgb.g, hex2rgb.b]);
        //   }
        // });
        // // Cell horizontal align
        // var cellHAligns = 
        //   [{
        //    id: 'tbl_prop_cell_align_left',
        //    text: data-l10n-id="ep_tables2.propLeft")
        //  },
        //  {
        //    id: 'tbl_prop_cell_align_center',
        //    text: data-l10n-id="ep_tables2.propCenter")
        //  }, 
        //  { 
        //    id: 'tbl_prop_cell_align_right',
        //    text: data-l10n-id="ep_tables2.propRight")
        //  }, 
        //  { 
        //    id: 'tbl_prop_cell_h_align_remove',
        //    text: "(" + data-l10n-id="ep_tables2.propBtnRemove") + ")"
        //   }];
        // $.cellHAlignsMenu = new YAHOO.widget.ContextMenu("tbl_cell_h_align_menu", {
        //   iframe: true,
        //   zindex: 1003,
        //   shadow: false,
        //   position: "dynamic",
        //   keepopen: false,
        //   clicktohide: true
        // });
        // $.cellHAlignsMenu.addItems(cellHAligns);
        // $.cellHAlignsMenu.render(document.body);
        // $.cellHAlignsMenu.subscribe("click", function (p_sType, p_aArgs) {
        //   var oEvent = p_aArgs[0],
        //     oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
        //   if (oMenuItem) {
        //     var id = oMenuItem.id;
        //     var text = oMenuItem.cfg.getProperty("text");
        //     var align = "";
        //     switch (id) {
        //     case "tbl_prop_cell_align_left":
        //       align = 'left';
        //       break;
        //     case "tbl_prop_cell_align_center":
        //       align = 'center';
        //       break;
        //     case "tbl_prop_cell_align_right":
        //       align = 'right';
        //       break;
        //     case "tbl_prop_cell_h_align_remove":
        //       align = '';
        //       break;
        //     }
        //     var selParams = {
        //       tblCellHAlign: true,
        //       attrName: 'hAlign',
        //       attrValue: align,
        //       tblPropertyChange: true
        //     };
        //     $("#current-cell-h-alignment").html(text);
        //     this.hide();
        //     context.ace.callWithAce(function (ace) {
        //       ace.ace_doDatatableOptions(selParams);
        //     }, 'tblOptions', true);
        //   }
        // });
        // $.cellHAlignsMenuButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em id=\"current-cell-h-alignment\">" + data-l10n-id="ep_tables2.propLeft") + "</em>",
        //   container: "tbl_cell_h_align"
        // });
        // $('#tbl_cell_h_align').click(function () {
        //   hidePropsDialogs();
        //   $.alignMenu($.cellHAlignsMenu, 'tbl_cell_h_align');
        //   $.cellHAlignsMenu.show();
        // });
        // // Cell vertical align
        // var cellVAligns = 
        //   [{
        //    id: 'tbl_prop_cell_align_top',
        //    text: data-l10n-id="ep_tables2.propTop")
        //  },
        //  {
        //    id: 'tbl_prop_cell_align_middle',
        //    text: data-l10n-id="ep_tables2.propCenter")
        //  }, 
        //  { 
        //    id: 'tbl_prop_cell_align_bottom',
        //    text: data-l10n-id="ep_tables2.propBottom")
        //  }, 
        //  { 
        //    id: 'tbl_prop_cell_v_align_remove',
        //    text: "(" + data-l10n-id="ep_tables2.propBtnRemove") + ")"
        //   }];
        // $.cellVAlignsMenu = new YAHOO.widget.ContextMenu("tbl_cell_v_align_menu", {
        //   iframe: true,
        //   zindex: 1003,
        //   shadow: false,
        //   position: "dynamic",
        //   keepopen: false,
        //   clicktohide: true
        // });
        // $.cellVAlignsMenu.addItems(cellVAligns);
        // $.cellVAlignsMenu.render(document.body);
        // $.cellVAlignsMenu.subscribe("click", function (p_sType, p_aArgs) {
        //   var oEvent = p_aArgs[0],
        //     oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
        //   if (oMenuItem) {
        //     var id = oMenuItem.id;
        //     var text = oMenuItem.cfg.getProperty("text");
        //     var align = "";
        //     switch (id) {
        //     case "tbl_prop_cell_align_top":
        //       align = 'top';
        //       break;
        //     case "tbl_prop_cell_align_middle":
        //       align = 'middle';
        //       break;
        //     case "tbl_prop_cell_align_bottom":
        //       align = 'bottom';
        //       break;
        //     case "tbl_prop_cell_v_align_remove":
        //       align = '';
        //       break;
        //     }
        //     var selParams = {
        //       tblCellVAlign: true,
        //       attrName: 'vAlign',
        //       attrValue: align,
        //       tblPropertyChange: true
        //     };
        //     $("#current-cell-v-alignment").html(text);
        //     this.hide();
        //     context.ace.callWithAce(function (ace) {
        //       ace.ace_doDatatableOptions(selParams);
        //     }, 'tblOptions', true);
        //   }
        // });
        // $.cellVAlignsMenuButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em id=\"current-cell-v-alignment\">" + data-l10n-id="ep_tables2.propTop") + "</em>",
        //   container: "tbl_cell_v_align"
        // });
        // $('#tbl_cell_v_align').click(function () {
        //   hidePropsDialogs();
        //   $.alignMenu($.cellVAlignsMenu, 'tbl_cell_v_align');
        //   $.cellVAlignsMenu.show();
        // });
        // //tbl even rows bg color     
        // $.evenRowBgColorPickerButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em class='color-picker-button' id=\"even-row-bg-color\"></em>",
        //   container: "tbl_even_row_bg_color"
        // });
        // $('#tbl_even_row_bg_color').click(function () {
        //   hidePropsDialogs();
        //   if (!$.colorPickerAligned) {
        //     createColorPicker();
        //   }
        //   $.alignMenu($.oColorPickerDialog, 'tbl_even_row_bg_color');
        //   $.tblfocusedProperty = "tbl_even_row_bg_color";
        //   $.oColorPickerDialog.setHeader(data-l10n-id="ep_tables2.propChooseAColorFor") + data-l10n-id="ep_tables2.propEvenRowBackgroundColor"));
        //   $.oColorPickerDialog.show();
        //   var hexValue = $.evenRowBgColorPickerButton.get("value");
        //   if (hexValue) {
        //     var hex2rgb = hexToRgb(hexValue);
        //     $.oColorPicker.setValue([hex2rgb.r, hex2rgb.g, hex2rgb.b]);
        //   }
        // });
        // //tbl odd rows bg color      
        // $.oddRowBgColorPickerButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em class='color-picker-button' id=\"odd-row-bg-color\"></em>",
        //   container: "tbl_odd_row_bg_color"
        // });
        // $('#tbl_odd_row_bg_color').click(function () {
        //   hidePropsDialogs();
        //   if (!$.colorPickerAligned) {
        //     createColorPicker();
        //   }
        //   $.alignMenu($.oColorPickerDialog, 'tbl_odd_row_bg_color');
        //   $.tblfocusedProperty = "tbl_odd_row_bg_color";
        //   $.oColorPickerDialog.setHeader(data-l10n-id="ep_tables2.propChooseAColorFor") + data-l10n-id="ep_tables2.propOddRowBackgroundColor"));
        //   $.oColorPickerDialog.show();
        //   var hexValue = $.oddRowBgColorPickerButton.get("value");
        //   if (hexValue) {
        //     var hex2rgb = hexToRgb(hexValue);
        //     $.oColorPicker.setValue([hex2rgb.r, hex2rgb.g, hex2rgb.b]);
        //   }
        // });
        // //tbl single row bg color
        // $.singleRowBgColorPickerButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em class='color-picker-button' id=\"single-row-bg-color\"></em>",
        //   container: "tbl_single_row_bg_color"
        // });
        // $('#tbl_single_row_bg_color').click(function () {
        //   hidePropsDialogs();
        //   if (!$.colorPickerAligned) {
        //     createColorPicker();
        //   }
        //   $.alignMenu($.oColorPickerDialog, 'tbl_single_row_bg_color');
        //   $.tblfocusedProperty = "tbl_single_row_bg_color";
        //   $.oColorPickerDialog.setHeader(data-l10n-id="ep_tables2.propChooseAColorFor") + data-l10n-id="ep_tables2.propSingleRowBackgroundColor"));
        //   $.oColorPickerDialog.show();
        //   var hexValue = $.singleRowBgColorPickerButton.get("value");
        //   if (hexValue) {
        //     var hex2rgb = hexToRgb(hexValue);
        //     $.oColorPicker.setValue([hex2rgb.r, hex2rgb.g, hex2rgb.b]);
        //   }
        // });
        // //tbl single col bg color        
        // $.singleColBgColorPickerButton = new YAHOO.widget.Button({
        //   disabled: false,
        //   type: "split",
        //   label: "<em class='color-picker-button' id=\"single-col-bg-color\"></em>",
        //   container: "tbl_single_col_bg_color"
        // });
        // $('#tbl_single_col_bg_color').click(function () {
        //   hidePropsDialogs();
        //   if (!$.colorPickerAligned) {
        //     createColorPicker();
        //   }
        //   $.alignMenu($.oColorPickerDialog, 'tbl_single_col_bg_color');
        //   $.tblfocusedProperty = "tbl_single_col_bg_color";
        //   $.oColorPickerDialog.setHeader(data-l10n-id="ep_tables2.propChooseAColorFor") + data-l10n-id="ep_tables2.propSingleColumnBackgroundColor"));
        //   $.oColorPickerDialog.show();
        //   var hexValue = $.singleColBgColorPickerButton.get("value");
        //   if (hexValue) {
        //     var hex2rgb = hexToRgb(hexValue);
        //     $.oColorPicker.setValue([hex2rgb.r, hex2rgb.g, hex2rgb.b]);
        //   }
        // });
        // //tbl property text inputs
        // $('.text-input').change(function () {
        //   hidePropsDialogs();
        //   var selParams = {
        //     tblPropertyChange: true
        //   };
        //   selParams.attrValue = this.value;
        //   if (this.id == "tbl_width") {
        //     selParams.tblWidth = true;
        //     selParams.attrName = "width";
        //   } else if (this.id == "tbl_height") {
        //     selParams.tblHeight = true;
        //     selParams.attrName = "height";
        //   } else if (this.id == "tbl_col_width") {
        //     selParams.tblColWidth = true;
        //     selParams.attrName = "width";
        //   } else if (this.id == "tbl_row_height") {
        //     selParams.tblCellHeight = true;
        //     selParams.attrName = "height";
        //   } else if (this.id == "tbl_cell_font") {
        //     selParams.tblCellFont = true;
        //     selParams.attrName = "fontFamily";
        //     selParams.attrValue = this.value=="dummy"?"":this.value;
        //   } else if (this.id == "tbl_cell_font_size") {
        //     selParams.tblCellFontSize = true;
        //     selParams.attrName = "fontSize";
        //   } else if (this.id == "tbl_cell_bold") {
        //     selParams.tblCellBold = true;
        //     selParams.attrName = "fontWeight";
        //     selParams.attrValue = this.checked?"bold":"";
        //   } else if (this.id == "tbl_cell_italic") {
        //     selParams.tblCellItalic = true;
        //     selParams.attrName = "fontStyle";
        //     selParams.attrValue = this.checked?"italic":"";
        //   } else if (this.id == "tbl_cell_decoration") {
        //     selParams.tblCellDecoration = true;
        //     selParams.attrName = "textDecoration";
        //     selParams.attrValue = this.checked?"underline":"";
        //   }
        //   this.value = '';
        //   $('#text_input_message').text("Ok");
        //   $('#text_input_message').removeAttr('style');
        //   $('#text_input_message').fadeOut("slow");
        //   context.ace.callWithAce(function (ace) {
        //     ace.ace_doDatatableOptions(selParams);
        //   }, 'tblOptions', true);
        // });

       function showTblPropPanel() {
            console.log("showTblPropPanel");
            // if (!$.tblPropDialog) {
            //     $.tblPropDialog = new YAHOO.widget.Dialog("yui-tbl-prop-panel", {
            //         width: "540px",
            //         height: "370px",
            //         close: true,
            //         visible: false,
            //         zindex: 1001,
            //         constraintoviewport: true
            //     });
            //     $.tblPropDialog.setBody($.getTblPropertiesHTML());
            //     $.tblPropDialog.render();
            //     $.alignMenu($.tblPropDialog, this.id);
            //     initTableProperties();

            //     $('#tbl_btn_close').click(function (e) {
            //       $.tblPropDialog.hide();
            //     });
            // }
            // $.tblPropDialog.show();
        }

        $.getTblPropertiesHTML = function () {
            return "<table class='left-tbl-props tbl-inline-block'>" +
"<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label' style='padding-top: 0px;'>" + html10n.get("ep_tables2.propTableBorder") + "</span></td></tr>" +
"<tr><td><span class='tbl-inline-block' id='tbl_border_color'>&nbsp;</span><span id='tbl_border_width'class='tbl-inline-block tbl_border_width'></span></td></tr>" +
"<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'><br />" + html10n.get("ep_tables2.propCellBackgroundColor") + "</span></td></tr>" + 
"<tr><td><span id='tbl_cell_bg_color' class='tbl-inline-block'></span><span id='tbl_cell_h_align' class='tbl-inline-block'></span><span id='tbl_cell_v_align' class='tbl-inline-block'></span></td></tr>" +
"<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'><br />" + html10n.get("ep_tables2.propEvenOddRowBackgroundColor") + "</span></td></tr>" +
"<tr><td><span class='tbl-inline-block' id='tbl_even_row_bg_color'>" + html10n.get("ep_tables2.propEven") + "&nbsp;</span><span id='tbl_odd_row_bg_color' class='tbl-inline-block'>" + html10n.get("ep_tables2.propOdd") + "</span></td></tr>" +
"<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'><br />" + html10n.get("ep_tables2.propSingleRowColBackgroundColor") + "</span></td></tr>" +
"<tr><td><span class='tbl-inline-block' id='tbl_single_row_bg_color'>" + html10n.get("ep_tables2.propRow") + "&nbsp;</span><span id='tbl_single_col_bg_color' class='tbl-inline-block'>" + html10n.get("ep_tables2.propCol") + "</span></td></tr>" +
"<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'><br />" + html10n.get("ep_tables2.propRowColAlignment") + "</span></td></tr>" +
"<tr><td><span class='tbl-inline-block' id='tbl_row_v_align'>" + html10n.get("ep_tables2.propRow") + "&nbsp;</span><span id='tbl_col_v_align' class='tbl-inline-block'>" + html10n.get("ep_tables2.propCol") + "</span></td></tr>" +
"</table>" +
"<span class=' tbl-inline-block'>" +
"<table class='tbl-prop-dim'>" + "<tbody>" +
"<tr>" +
  "<td> " + "<span class='tbl-prop-label'>" + html10n.get("ep_tables2.propDimensions") + "</span>&nbsp;&nbsp;<span id='text_input_message'></span>" + "</td>" +
  "<td colspan=2></td> " +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propTableWidth") + " (%)</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_width' type='text' size='4' class='text-input' >" + "</span>" + "</td>" +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propTableHeight") + " (px)</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_height' type='text' size='4' class='text-input' >" + "</span>" + "</td>" +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propColumnWidth") + " (px)</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_col_width' type='text' size='4' class='text-input' >" + "</span>" + "</td>" +
"</tr>" +
"<tr>" +
  "<td> " + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propMinRowHeight") + " (px)</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_row_height' type='text' size='4' class='text-input' >" + "</span>" + "</td>" +
"</tr>" +
"<tr>" +
  "<td> " + "<span class='tbl-prop-label'>" + "<br />" + html10n.get("ep_tables2.propCellStyles") + "</span>" + "</td>" +
  "<td colspan=2></td> " +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propFont") + "</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<select id='tbl_cell_font' class='text-input' style='width:70px;'>" +
        "<option value='dummy' selected=''>" + html10n.get("ep_tables2.propFont") + "</option>" +
        "<option value='Arial'>Arial</option>" +
        "<option value='Times New Roman'>Times New Roman</option>" +
        "<option value='Calibri'>Calibri</option>" +
        "<option value='Helvetica'>Helvetica</option>" +
        "<option value='Courier'>Courier</option>" +
        "<option value='Palatino'>Palatino</option>" +
        "<option value='Garamond'>Garamond</option>" +
        "<option value='Bookman'>Bookman</option>" +
        "<option value='Avant Guard'>Avant Guard</option></select></span>" +
  "</td>" +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propFontSize") + " (px)</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_cell_font_size' type='text' size='4' class='text-input'>" + "</span>" + "</td>" +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propBold") + "</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_cell_bold' type='checkbox' class='text-input'>" + "</span>" + "</td>" +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propItalic") + "</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_cell_italic' type='checkbox' class='text-input'>" + "</span>" + "</td>" +
"</tr>" +
"<tr>" +
  "<td>" + "<span class='tbl-prop-dim-label tbl-inline-block'>" + "<label>" + html10n.get("ep_tables2.propUnderline") + "</label>" + "</span>" + "</td>" +
  "<td class='td-spacer'></td>" +
  "<td>" + "<span class=' tbl-inline-block'>" + "<input id='tbl_cell_decoration' type='checkbox' class='text-input'>" + "</span>" + "</td>" +
"</tr>" +
"</tbody>" + "</table>" +
"</span>" +
"<div id='div_tbl_btn_close'><input type='button' id='tbl_btn_close' value='" + html10n.get("ep_tables2.propBtnClose") + "'></div>";
        }


        function hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }

        function hidePropsDialogs() {
            if (typeof ($.borderWidthsMenu) != 'undefined') $.borderWidthsMenu.hide();
            if (typeof ($.oColorPickerDialog) != 'undefined') $.oColorPickerDialog.hide();
            if (typeof ($.rowVAlignsMenu) != 'undefined') $.rowVAlignsMenu.hide();
            if (typeof ($.colVAlignsMenu) != 'undefined') $.colVAlignsMenu.hide();
        };

        function createColorPicker() {
            handleColorPickerSubmit = function () {
                colorPickerButtonClick($.oColorPicker.get('hex'));
            }
            handleDialogCancel = function () {
                this.cancel();
            }
            handleDialogRemoveColor = function () {
                colorPickerButtonClick("remove");
            }
            console.log("createColorPicker");
            // $.oColorPickerDialog = new YAHOO.widget.Dialog("yui-picker-panel", {
            //     width: "340px",
            //     height: "275px",
            //     close: false,
            //     visible: false,
            //     zindex: 1002,
            //     constraintoviewport: true,
            //     buttons: [
            //       { text: html10n.get("ep_tables2.propBtnRemove"), handler:this.handleDialogRemoveColor },
            //       { text: html10n.get("ep_tables2.propBtnValidate"), handler: this.handleDialogCancel, isDefault:true }
            //     ]
            // });
            // $.oColorPickerDialog.renderEvent.subscribe(function () {
            //     if (!$.oColorPicker) { //make sure that we haven't already created our Color Picker          
            //         createOColorPicker();
            //     }
            // });
            // $.oColorPickerDialog.render();
            // $.oColorPickerDialog.show();

            function createOColorPicker() {
                console.log("createOColorPicker");
                // $.oColorPicker = new YAHOO.widget.ColorPicker('color-picker-menu', {
                //     showhsvcontrols: false,
                //     showrgbcontrols: false,
                //     showwebsafe: false,
                //     showhexsummary: false,
                //     showhexcontrols: true,
                //     images: {
                //         PICKER_THUMB: "/static/plugins/ep_tables2/static/js/yahoo_2.8.0/colorpicker/assets/picker_thumb.png",
                //         HUE_THUMB: "/static/plugins/ep_tables2/static/js/yahoo_2.8.0/colorpicker/assets/hue_thumb.png"
                //     }
                // });
                // $.oColorPicker.on("rgbChange", colorPickerButtonClick);
                // $.colorPickerAligned = true;
            }
        }

        function colorPickerButtonClick(sColor) {
            if (typeof (sColor) == 'string' && sColor == 'remove') {
                sColor = '';
            } else if (typeof (sColor) == 'string' && sColor != null && sColor.indexOf("#") == -1) {
                sColor = "#" + sColor;
            } else if (typeof (sColor) == "object") {
                sColor = this.get("hex") == null ? this.get("value") : "#" + this.get("hex");
            }
            var selParams = {
                borderWidth: null,
                tblPropertyChange: true
            };
            switch ($.tblfocusedProperty) {
            case "tbl_border_color":
                selParams.tblBorderColor = true;
                selParams.attrName = "borderColor";
                $.borderColorPickerButton.set("value", sColor);
                $("#current-color").css("backgroundColor", sColor);
                break;
            case 'tbl_cell_bg_color':
                selParams.tblCellBgColor = true;
                selParams.attrName = "bgColor";
                $.cellBgColorPickerButton.set("value", sColor);
                $("#current-cell-bg-color").css("backgroundColor", sColor);
                break;
            case "tbl_even_row_bg_color":
                selParams.tblEvenRowBgColor = true;
                selParams.attrName = "evenBgColor";
                $.evenRowBgColorPickerButton.set("value", sColor);
                $("#even-row-bg-color").css("backgroundColor", sColor);
                break;
            case "tbl_odd_row_bg_color":
                selParams.tblOddRowBgColor = true;
                selParams.attrName = "oddBgColor";
                $.oddRowBgColorPickerButton.set("value", sColor);
                $("#odd-row-bg-color").css("backgroundColor", sColor);
                break;
            case "tbl_single_row_bg_color":
                selParams.tblSingleRowBgColor = true;
                selParams.attrName = "bgColor";
                $.singleRowBgColorPickerButton.set("value", sColor);
                $("#single-row-bg-color").css("backgroundColor", sColor);
                break;
            case "tbl_single_col_bg_color":
                selParams.tblSingleColBgColor = true;
                selParams.attrName = "bgColor";
                $.singleColBgColorPickerButton.set("value", sColor);
                $("#single-col-bg-color").css("backgroundColor", sColor);
                break;
            }
            selParams.attrValue = sColor;
            context.ace.callWithAce(function (ace) {
                ace.ace_doDatatableOptions(selParams);
            }, 'tblOptions', true);
        }
        $.handleTableBorder = function (selectValue) {
            var selParams = {
                tblBorderWidth: true,
                attrName: 'borderWidth',
                attrValue: selectValue,
                tblPropertyChange: true
            };
            context.ace.callWithAce(function (ace) {
                ace.ace_doDatatableOptions(selParams);
            }, 'tblOptions', true);
        }