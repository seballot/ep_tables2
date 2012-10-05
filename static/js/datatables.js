var _ = require('ep_etherpad-lite/static/js/underscore');
// CommonJS
if (typeof (require) != 'undefined') {
    if (typeof (Ace2Common) == 'undefined') {
        Ace2Common = require('ep_etherpad-lite/static/js/ace2_common');
    }
    if (typeof (Changeset) == 'undefined') {
        Changeset = require('ep_etherpad-lite/static/js/Changeset');
    }
}
exports.aceInitInnerdocbodyHead = function (hook_name, args, cb) {
    args.iframeHTML.push('<link rel="stylesheet" type="text/css" href="/static/plugins/ep_tables/static/css/dataTables.css"/>');
}
// Bind the event handler to the toolbar buttons
exports.postAceInit = function (hook, context) {
    $.createTableMenu = function (init) {
        if (typeof (top.templatesMenu) != 'undefined') {
            top.templatesMenu.hide();
        }
        if ($.tblContextMenu) {
            $.alignMenu($.tblContextMenu, 'tbl-menu');
            $.tblContextMenu.show();
            return;
        }

        function showTblPropPanel() {
            if (!$.tblPropDialog) {
                $.tblPropDialog = new YAHOO.widget.Dialog("yui-tbl-prop-panel", {
                    width: "600px",
                    height: "450px",
                    close: true,
                    visible: false,
                    zindex: 1001,
                    constraintoviewport: true
                });
                $.tblPropDialog.setBody($.getTblPropertiesHTML());
                $.tblPropDialog.render();
                $.alignMenu($.tblPropDialog, this.id);
                initTableProperties();
            }
            $.tblPropDialog.show();
        }

        function createColorPicker() {
            handleColorPickerSubmit = function () {
                colorPickerButtonClick($.oColorPicker.get('hex'));
            }
            handleDialogCancel = function () {
                this.cancel();
            }
            $.oColorPickerDialog = new YAHOO.widget.Dialog("yui-picker-panel", {
                width: "500px",
                close: true,
                visible: false,
                zindex: 1002,
                constraintoviewport: true,
                buttons: [{
                    text: "Exit",
                    handler: this.handleDialogCancel
                }]
            });
            $.oColorPickerDialog.renderEvent.subscribe(function () {
                if (!$.oColorPicker) { //make sure that we haven't already created our Color Picker					
                    createOColorPicker();
                }
            });
            $.oColorPickerDialog.render();
            $.oColorPickerDialog.show();

            function createOColorPicker() {
                $.oColorPicker = new YAHOO.widget.ColorPicker('color-picker-menu', {
                    showhsvcontrols: false,
                    showrgbcontrols: false,
                    showwebsafe: false,
                    showhexsummary: false,
                    showhexcontrols: true,
                    images: {
                        PICKER_THUMB: "http://yui.yahooapis.com/2.9.0/build/colorpicker/assets/picker_thumb.png",
                        HUE_THUMB: "http://yui.yahooapis.com/2.9.0/build/colorpicker/assets/hue_thumb.png"
                    }
                });
                $.oColorPicker.on("rgbChange", colorPickerButtonClick);
                $.colorPickerAligned = true;
            }
        }

        function colorPickerButtonClick(sColor) {
            if (typeof (sColor) == 'string' && sColor != null && sColor.indexOf("#") == -1) {
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
                $("#current-color").innerHTML = "Current color is " + sColor;
                break;
            case 'tbl_cell_bg_color':
                selParams.tblCellBgColor = true;
                selParams.attrName = "bgColor";
                $.cellBgColorPickerButton.set("value", sColor);
                $("#current-cell-bg-color").css("backgroundColor", sColor);
                $("#current-cell-bg-color").innerHTML = "Current color is " + sColor;
                break;
            case "tbl_even_row_bg_color":
                selParams.tblEvenRowBgColor = true;
                selParams.attrName = "evenBgColor";
                $.evenRowBgColorPickerButton.set("value", sColor);
                $("#even-row-bg-color").css("backgroundColor", sColor);
                $("#even-row-bg-color").innerHTML = "Current color is " + sColor;
                break;
            case "tbl_odd_row_bg_color":
                selParams.tblOddRowBgColor = true;
                selParams.attrName = "oddBgColor";
                $.oddRowBgColorPickerButton.set("value", sColor);
                $("#odd-row-bg-color").css("backgroundColor", sColor);
                $("#odd-row-bg-color").innerHTML = "Current color is " + sColor;
                break;
            case "tbl_single_row_bg_color":
                selParams.tblSingleRowBgColor = true;
                selParams.attrName = "bgColor";
                $.singleRowBgColorPickerButton.set("value", sColor);
                $("#single-row-bg-color").css("backgroundColor", sColor);
                $("#single-row-bg-color").innerHTML = "Current color is " + sColor;
                break;
            case "tbl_single_col_bg_color":
                selParams.tblSingleColBgColor = true;
                selParams.attrName = "bgColor";
                $.singleColBgColorPickerButton.set("value", sColor);
                $("#single-col-bg-color").css("backgroundColor", sColor);
                $("#single-col-bg-color").innerHTML = "Current color is " + sColor;
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
        $.getTblPropertiesHTML = function () {
            return "<span id='table_properties'><span class='tbl-prop-menu-header'></span><br><span id='tbl-prop-menu'class='tbl-prop-menu'>" + "<table class='left-tbl-props tbl-inline-block'>" + "<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label' style='padding-top: 8px;'>Table border</span></td></tr>" + "<tr><td><span class='tbl-inline-block' id='tbl_border_color'>&nbsp;</span><span id='tbl_border_width'class='tbl-inline-block tbl_border_width'></span></td></tr>" + "<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'>Cell background color</span></td></tr><tr><td><span id='tbl_cell_bg_color'></td></tr><tr><td></span></td></tr>" + "<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'>Even/Odd Row background color</span></td></tr>" + "	<tr><td><span class='tbl-inline-block' id='tbl_even_row_bg_color'>Even  &nbsp;</span><span id='tbl_odd_row_bg_color' class='tbl-inline-block'>Odd</span></td></tr>" + "<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'>Single Row/Col background color</span></td></tr>" + "	<tr><td><span class='tbl-inline-block' id='tbl_single_row_bg_color'>Single Row  &nbsp;</span><span id='tbl_single_col_bg_color' class='tbl-inline-block'>Single Col</span></td></tr>" + "<tr><td class='tbl-prop-label-td'><span class='tbl-prop-label'>Row/Col alignment</span></td></tr>" + "	<tr><td><span class='tbl-inline-block' id='tbl_row_v_align'>Row align&nbsp;</span><span id='tbl_col_v_align' class='tbl-inline-block'>Col align</span></td></tr>" + "</table>" + "	<span class=' tbl-inline-block'>" + "		<span class='tbl-prop-label' style='padding-top: 8px;'>" + "Dimensions(Inches) " + "		</span>&nbsp;&nbsp;<span id='text_input_message'></span>" + "		<table class='tbl-prop-dim'>" + "			<tbody>" + "				<tr>" + "					<td>							" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label  >Table width</label>" + "						</span>" + "					</td>" + "					<td class='td-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='tbl_width' type='text' size='4' class='text-input' >" + "						</span>" + "					</td>" + "				</tr>" + "				<tr>" + "					<td>							" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label  >Table height</label>" + "						</span>" + "					</td>" + "					<td class='td-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='tbl_height' type='text' size='4' class='text-input' >" + "						</span>" + "					</td>" + "				</tr>" + "				<tr>" + "					<td>							" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label  >Column width</label>" + "						</span>" + "					</td>" + "					<td class='td-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='tbl_col_width' type='text' size='4' class='text-input' >" + "						</span>" + "					</td>" + "				</tr>" + "				<tr>" + "					<td>	" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label  >Minimum row height</label>" + "						</span>" + "					</td>" + "					<td class='td-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='tbl_row_height' type='text' size='4' class='text-input' >" + "						</span>" + "					</td>" + "				</tr>" + "				<tr>" + "					<td>" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label >Cell padding</label>" + "						</span>" + "					</td>" + "					<td class='td-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='tbl_cell_padding' type='text' size='4' class='text-input'>" + "						</span>" + "					</td>" + "				</tr>" + "			</tbody>" + "		</table>" + "		<br> " + "		<span class='tbl-prop-label' style='padding-top: 8px;'>" + "			Fonts " + "		</span>" + "		<table class='tbl-prop-dim'>" + "				<tr>" + "					<td>" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label >Cell font size</label>" + "						</span>" + "					</td>" + "					<td class='select-font-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='tbl_cell_font_size' type='text' size='4' class='text-input'>" + "						</span>" + "					</td>" + "				</tr>" + "			</tbody>" + "		</table>" + "	</span>" + "</span>" + "</span>" + "<span id='img_properties'>" + "<span class='tbl-prop-menu-header'></span><span id='img-prop-menu'class='tbl-prop-menu'>" + "<table class='left-tbl-props tbl-inline-block'>" + "		<caption><span class='tbl-prop-label' style='padding-top: 8px;'>" + "			Dimensions(Intches) " + "		</span></caption>" + "			<tbody>" + "				<tr>" + "					<td>							" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label  >Image width</label>" + "						</span>" + "					</td>" + "					<td class='td-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='img_width' type='text' size='4' class='text-input' >" + "						</span>" + "					</td>" + "				</tr>" + "				<tr>" + "					<td>							" + "						<span class='tbl-prop-dim-label tbl-inline-block'>" + "							<label  >Image height</label>" + "						</span>" + "					</td>" + "					<td class='td-spacer'></td>" + "					<td>" + "						<span class=' tbl-inline-block'>" + "							<input id='img_height' type='text' size='4' class='text-input' >" + "						</span>" + "					</td>" + "				</tr>" + "</table>" + "</span>" + "</span>";
        }
        //initilizer
        if (typeof ($.tblContextMenu) == 'undefined') {
            var matrixTable = "<table id='matrix_table'class='matrix-table'><caption></caption>    <tr value=1><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=2 ><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=3 ><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=4><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=5 ><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=6><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=7><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=8><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=9><td value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr>    <tr value=10><td height=10 value=1> </td><td value=2> </td><td value=3> </td><td value=4> </td><td value=5> </td><td value=6> </td><td value=7> </td><td value=8> </td><td value=9> </td><td value=10> </td><td value=11> </td><td value=12> </td><td value=13> </td><td value=14> </td><td value=15> </td><td value=16> </td><td value=17> </td><td value=18> </td><td value=19> </td><td value=20> </td></tr></table>";
            $.tblContextMenu = new YAHOO.widget.ContextMenu("tbl_context_menu", {
                iframe: true,
                zindex: 500,
                shadow: false,
                position: "dynamic",
                keepopen: true,
                clicktohide: true
            });
            $.tblContextMenu.addItems([
                [{
                    text: "Insert Table",
                    submenu: {
                        id: 'tbl_insert',
                        itemData: ["<div id='select_matrix'>0 X 0</div>"]
                    }
                }],
                ["Insert Row Above", "Insert Row Below", "Insert Column Right", "Insert Column Left"],
                ["Delete Row", "Delete Column", "Delete Table"],
                [{
                    id: 'tbl_prop_menu_item',
                    text: "Table Properties",
                    onclick: {
                        fn: showTblPropPanel
                    }
                }]
            ]);
            var subMenus = $.tblContextMenu.getSubmenus();
            subMenus[0].setFooter(matrixTable);
            $.tblContextMenu.render(document.body);
            $.alignMenu = function (menu, id, addX, addY, scrollY) {
                var region = YAHOO.util.Dom.getRegion(id);
                if (typeof (id) == 'string' && (id == 'tbl-menu' || id == 'upload_image_cont')) {
                    menu.cfg.setProperty("xy", [region.left, region.bottom]);
                } else if (typeof (id) == 'string') {
                    menu.cfg.setProperty("xy", [region.right, region.top]);
                } else {
                    menu.cfg.setProperty("xy", [30 + addX, 36 + addY - scrollY]);
                }
            }
            $('table td').hover(function () {
                for (var x = 0; x <= $(this).index(); x++) {
                    for (var y = 0; y <= $(this).parent().index(); y++) {
                        $(this).parent().parent().children().eq(y).children().eq(x).addClass('selected');
                    }
                }
            }, function () {
                $('table td').removeClass('selected');
            });
            $('table td').hover(function () {
                xVal = this.getAttribute('value')
                yVal = $(this).closest("tr")[0].getAttribute("value");
                $("#select_matrix").html(xVal + " X " + yVal);
            });
            $("td", "#matrix_table").click(function (e) {
                context.ace.callWithAce(function (ace) {
                    ace.ace_doDatatableOptions('addTbl', 'addTblX' + $("#select_matrix").text());
                }, 'tblOptions', true);
                return false;
            });
            $.tblContextMenu.subscribe("click", function (p_sType, p_aArgs) {
                var oEvent = p_aArgs[0],
                    oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
                if (oMenuItem) {
                    tblReq = oMenuItem.cfg.getProperty("text");
                    disabled = oMenuItem.cfg.getProperty("disabled");
                    if (disabled) return;
                    var id = "";
                    switch (tblReq) {
                    case "Insert Table":
                        id = 'addTbl';
                        break;
                    case "Insert Row Above":
                        id = 'addTblRowA';
                        break;
                    case "Insert Row Below":
                        id = 'addTblRowB';
                        break;
                    case "Insert Column Left":
                        id = 'addTblColL';
                        break;
                    case "Insert Column Right":
                        id = 'addTblColR';
                        break;
                    case "Delete Table":
                        id = 'delTbl';
                        break;
                    case "Delete Image":
                        id = 'delImg';
                        break;
                    case "Delete Row":
                        id = 'delTblRow';
                        break;
                    case "Delete Column":
                        id = 'delTblCol';
                        break;
                    }
                    context.ace.callWithAce(function (ace) {
                        ace.ace_doDatatableOptions(id);
                    }, 'tblOptions', true);
                    return false;
                }
            });

            function initTableProperties() {
                //tbl col horizontal align		
                var colVAligns = ['Left', 'Center', 'Right'];
                $.colVAlignsMenu = new YAHOO.widget.ContextMenu("tbl_col_v_align_menu", {
                    iframe: true,
                    zindex: 1003,
                    shadow: false,
                    position: "dynamic",
                    keepopen: true,
                    clicktohide: true
                });
                $.colVAlignsMenu.addItems(colVAligns);
                $.colVAlignsMenu.render(document.body);
                $.colVAlignsMenu.subscribe("click", function (p_sType, p_aArgs) {
                    var oEvent = p_aArgs[0],
                        oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
                    if (oMenuItem) {
                        align = oMenuItem.cfg.getProperty("text");
                        var selParams = {
                            tblColVAlign: true,
                            attrName: 'colVAlign',
                            attrValue: align,
                            tblPropertyChange: true
                        };
                        $.colVAlignsMenuButton.set("value", selParams.attrValue);
                        $("#current-col-v-alignment").html(align);
                        context.ace.callWithAce(function (ace) {
                            ace.ace_doDatatableOptions(selParams);
                        }, 'tblOptions', true);
                    }
                });
                $.colVAlignsMenuButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em id=\"current-col-v-alignment\">Left</em>",
                    container: "tbl_col_v_align"
                });
                $('#tbl_col_v_align').click(function () {
                    var aligned = false;
                    if (!aligned) {
                        $.alignMenu($.colVAlignsMenu, 'tbl_col_v_align');
                    }
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    if ($.oColorPickerDialog) $.oColorPickerDialog.hide();
                    $.colVAlignsMenu.show();
                    var vAlignValue = $.colVAlignsMenuButton.get("value");
                    if (vAlignValue) {
                        var selParams = {
                            tblColVAlign: true,
                            attrName: 'colVAlign',
                            attrValue: vAlignValue,
                            tblPropertyChange: true
                        };
                        context.ace.callWithAce(function (ace) {
                            ace.ace_doDatatableOptions(selParams);
                        }, 'tblOptions', true);
                    }
                });
                //tbl row vertical align		
                var rowVAligns = ['Top', 'Center', 'Bottom'];
                $.rowVAlignsMenu = new YAHOO.widget.ContextMenu("tbl_row_v_align_menu", {
                    iframe: true,
                    zindex: 1003,
                    shadow: false,
                    position: "dynamic",
                    keepopen: true,
                    clicktohide: true
                });
                $.rowVAlignsMenu.addItems(rowVAligns);
                $.rowVAlignsMenu.render(document.body);
                $.rowVAlignsMenu.subscribe("click", function (p_sType, p_aArgs) {
                    var oEvent = p_aArgs[0],
                        oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
                    if (oMenuItem) {
                        align = oMenuItem.cfg.getProperty("text");
                        var selParams = {
                            tblRowVAlign: true,
                            attrName: 'rowVAlign',
                            attrValue: align,
                            tblPropertyChange: true
                        };
                        $.rowVAlignsMenuButton.set("value", selParams.attrValue);
                        $("#current-v-alignment").html(align);
                        context.ace.callWithAce(function (ace) {
                            ace.ace_doDatatableOptions(selParams);
                        }, 'tblOptions', true);
                    }
                });
                $.rowVAlignsMenuButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em id=\"current-v-alignment\">Top</em>",
                    container: "tbl_row_v_align"
                });
                $('#tbl_row_v_align').click(function () {
                    var aligned = false;
                    if (!aligned) {
                        $.alignMenu($.rowVAlignsMenu, 'tbl_row_v_align');
                    }
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    if ($.oColorPickerDialog) $.oColorPickerDialog.hide();
                    $.rowVAlignsMenu.show();
                    var vAlignValue = $.rowVAlignsMenuButton.get("value");
                    if (vAlignValue) {
                        var selParams = {
                            tblRowVAlign: true,
                            attrName: 'rowVAlign',
                            attrValue: vAlignValue,
                            tblPropertyChange: true
                        };
                        context.ace.callWithAce(function (ace) {
                            ace.ace_doDatatableOptions(selParams);
                        }, 'tblOptions', true);
                    }
                });
                //tbl border width
                var borderWidths = ['0px', '1px', '2px', '3px', '4px', '5px', '6px', '7px', '8px'];
                $.borderWidthsMenu = new YAHOO.widget.ContextMenu("tbl_border_width_menu", {
                    iframe: true,
                    zindex: 1003,
                    shadow: false,
                    position: "dynamic",
                    keepopen: true,
                    clicktohide: true
                });
                $.borderWidthsMenu.addItems(borderWidths);
                $.borderWidthsMenu.render(document.body);
                $.borderWidthsMenu.subscribe("click", function (p_sType, p_aArgs) {
                    var oEvent = p_aArgs[0],
                        oMenuItem = p_aArgs[1]; // YAHOO.widget.MenuItem instance
                    if (oMenuItem) {
                        borderReq = oMenuItem.cfg.getProperty("text");
                        var selParams = {
                            tblBorderWidth: true,
                            attrName: 'borderWidth',
                            attrValue: borderReq.substring(0, borderReq.indexOf("px")),
                            tblPropertyChange: true
                        };
                        $.borderWidthPickerButton.set("value", selParams.attrValue);
                        $("#current-width").html(borderReq);
                        context.ace.callWithAce(function (ace) {
                            ace.ace_doDatatableOptions(selParams);
                        }, 'tblOptions', true);
                    }
                });
                $.borderWidthPickerButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em id=\"current-width\">1px</em>",
                    container: "tbl_border_width"
                });
                $('#tbl_border_width').click(function () {
                    var aligned = false;
                    if (!aligned) {
                        $.alignMenu($.borderWidthsMenu, 'tbl_border_width');
                    }
                    if ($.oColorPickerDialog) $.oColorPickerDialog.hide();
                    if ($.rowVAlignsMenu) $.rowVAlignsMenu.hide();
                    $.borderWidthsMenu.show();
                    var widthValue = $.borderWidthPickerButton.get("value");
                    if (widthValue) {
                        var selParams = {
                            tblBorderWidth: true,
                            attrName: 'borderWidth',
                            attrValue: widthValue,
                            tblPropertyChange: true
                        };
                        context.ace.callWithAce(function (ace) {
                            ace.ace_doDatatableOptions(selParams);
                        }, 'tblOptions', true);
                    }
                });
                $.tblfocusedProperty = "";
                $('#tbl_properties').click(function () {
                    if (typeof ($.borderWidthsMenu) != 'undefined') $.borderWidthsMenu.hide();
                    if (typeof ($.oColorPickerDialog) != 'undefined') $.oColorPickerDialog.hide();
                    if (typeof ($.rowVAlignsMenu) != 'undefined') $.rowVAlignsMenu.hide();
                });
                $.colorPickerAligned = false;
                $('#tbl_border_color').click(function () {
                    if (!$.colorPickerAligned) {
                        createColorPicker();
                    }
                    $.alignMenu($.oColorPickerDialog, 'tbl_border_color');
                    $.tblfocusedProperty = "tbl_border_color";
                    if ($.rowVAlignsMenu) $.rowVAlignsMenu.hide();
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    $.oColorPickerDialog.setHeader("Please choose a color for: Table Border color");
                    $.oColorPickerDialog.show();
                    var hexValue = $.borderColorPickerButton.get("value");
                    if (hexValue) {
                        colorPickerButtonClick(hexValue);
                    }
                });
                $.borderColorPickerButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em  class='color-picker-button' id=\"current-color\">Current color is #FFFFFF.</em>",
                    container: "tbl_border_color"
                });
                //tbl cell bg color		
                $.cellBgColorPickerButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em class='color-picker-button' id=\"current-cell-bg-color\">Current color is #FFFFFF.</em>",
                    container: "tbl_cell_bg_color"
                });
                $('#tbl_cell_bg_color').click(function () {
                    if (!$.colorPickerAligned) {
                        createColorPicker();
                    }
                    $.alignMenu($.oColorPickerDialog, 'tbl_cell_bg_color');
                    $.tblfocusedProperty = "tbl_cell_bg_color";
                    if ($.rowVAlignsMenu) $.rowVAlignsMenu.hide();
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    $.oColorPickerDialog.setHeader("Please choose a color for: Cell Background color");
                    $.oColorPickerDialog.show();
                    var hexValue = $.cellBgColorPickerButton.get("value");
                    if (hexValue) {
                        colorPickerButtonClick(hexValue);
                    }
                });
                //tbl even rows bg color		
                $.evenRowBgColorPickerButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em class='color-picker-button' id=\"even-row-bg-color\">Current color is #FFFFFF.</em>",
                    container: "tbl_even_row_bg_color"
                });
                $('#tbl_even_row_bg_color').click(function () {
                    if (!$.colorPickerAligned) {
                        createColorPicker();
                    }
                    $.alignMenu($.oColorPickerDialog, 'tbl_even_row_bg_color');
                    $.tblfocusedProperty = "tbl_even_row_bg_color";
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    if ($.rowVAlignsMenu) $.rowVAlignsMenu.hide();
                    $.oColorPickerDialog.setHeader("Please choose a color for: Even Row Background color");
                    $.oColorPickerDialog.show();
                    var hexValue = $.evenRowBgColorPickerButton.get("value");
                    if (hexValue) {
                        colorPickerButtonClick(hexValue);
                    }
                });
                //tbl odd rows bg color		
                $.oddRowBgColorPickerButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em class='color-picker-button' id=\"odd-row-bg-color\">Current color is #FFFFFF.</em>",
                    container: "tbl_odd_row_bg_color"
                });
                $('#tbl_odd_row_bg_color').click(function () {
                    if (!$.colorPickerAligned) {
                        createColorPicker();
                    }
                    $.alignMenu($.oColorPickerDialog, 'tbl_odd_row_bg_color');
                    $.tblfocusedProperty = "tbl_odd_row_bg_color";
                    if ($.rowVAlignsMenu) $.rowVAlignsMenu.hide();
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    $.oColorPickerDialog.setHeader("Please choose a color for: Odd Row Background color");
                    $.oColorPickerDialog.show();
                    var hexValue = $.oddRowBgColorPickerButton.get("value");
                    if (hexValue) {
                        colorPickerButtonClick(hexValue);
                    }
                });
                //tbl single row bg color		
                $.singleRowBgColorPickerButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em class='color-picker-button' id=\"single-row-bg-color\">Current color is #FFFFFF.</em>",
                    container: "tbl_single_row_bg_color"
                });
                $('#tbl_single_row_bg_color').click(function () {
                    if (!$.colorPickerAligned) {
                        createColorPicker();
                    }
                    $.alignMenu($.oColorPickerDialog, 'tbl_single_row_bg_color');
                    $.tblfocusedProperty = "tbl_single_row_bg_color";
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    if ($.rowVAlignsMenu) $.rowVAlignsMenu.hide();
                    $.oColorPickerDialog.setHeader("Please choose a color for: Single Row Background color");
                    $.oColorPickerDialog.show();
                    var hexValue = $.singleRowBgColorPickerButton.get("value");
                    if (hexValue) {
                        colorPickerButtonClick(hexValue);
                    }
                });
                //tbl single col bg color		
                $.singleColBgColorPickerButton = new YAHOO.widget.Button({
                    disabled: false,
                    type: "split",
                    label: "<em class='color-picker-button' id=\"single-col-bg-color\">Current color is #FFFFFF.</em>",
                    container: "tbl_single_col_bg_color"
                });
                $('#tbl_single_col_bg_color').click(function () {
                    if (!$.colorPickerAligned) {
                        createColorPicker();
                    }
                    $.alignMenu($.oColorPickerDialog, 'tbl_single_col_bg_color');
                    $.tblfocusedProperty = "tbl_single_col_bg_color";
                    if ($.rowVAlignsMenu) $.rowVAlignsMenu.hide();
                    if ($.borderWidthsMenu) $.borderWidthsMenu.hide();
                    $.oColorPickerDialog.setHeader("Please choose a color for: Single Column Background color");
                    $.oColorPickerDialog.show();
                    var hexValue = $.singleColBgColorPickerButton.get("value");
                    if (hexValue) {
                        colorPickerButtonClick(hexValue);
                    }
                });
                //tbl property text inputs
                $('.text-input').change(function () {
                    var selParams = {
                        tblPropertyChange: true
                    };
                    if (this.id == "tbl_width") {
                        selParams.tblWidth = true;
                        selParams.attrName = "width";
                    } else if (this.id == "tbl_height") {
                        selParams.tblHeight = true;
                        selParams.attrName = "height";
                    } else if (this.id == "tbl_col_width") {
                        selParams.tblColWidth = true;
                        selParams.attrName = "width";
                    } else if (this.id == "tbl_row_height") {
                        selParams.tblCellHeight = true;
                        selParams.attrName = "height";
                    } else if (this.id == "tbl_cell_padding") {
                        selParams.tblCellPadding = true;
                        selParams.attrName = "padding";
                    } else if (this.id == "tbl_cell_font_size") {
                        selParams.tblCellFontSize = true;
                        selParams.attrName = "fontSize";
                    } //image attrs
                    else if (this.id == "img_width") {
                        selParams.imgWidth = true;
                        selParams.attrName = "width";
                    } else if (this.id == "img_height") {
                        selParams.imgHeight = true;
                        selParams.attrName = "height";
                    }
                    selParams.attrValue = this.value;
                    this.value = '';
                    $('#text_input_message').text("Ok");
                    $('#text_input_message').removeAttr('style');
                    $('#text_input_message').fadeOut("slow");
                    context.ace.callWithAce(function (ace) {
                        ace.ace_doDatatableOptions(selParams);
                    }, 'tblOptions', true);
                });
            }
        }
        if (!init) {
            $.alignMenu($.tblContextMenu, 'tbl-menu');
            $.tblContextMenu.show();
        }
    };
    $('#tbl-menu').click($.createTableMenu);
    YAHOO.util.Dom.addClass(document.body, 'yui-skin-sam');
    $("body").append($('<div id="yui-picker-panel" class="yui-picker-panel">' + '<div class="hd">Please choose a color:</div>' + '<div class="bd">' + '	<div class="yui-picker" id="color-picker-menu"></div>' + '</div>' + '<div class="ft"></div>' + '</div>'));
    $("body").append($('<div id="yui-tbl-prop-panel" class="yui-picker-panel">' + '<div class="hd">Table/Image Properties</div>' + '<div class="bd">' + '	<div class="yui-picker" id="tbl-props"></div>' + '</div>' + '<div class="ft"></div>' + '</div>'));
    $.createTableMenu(true);
};
// Once ace is initialized, we set ace_doDatatableOptions and bind it to the context
exports.aceInitialized = function (hook, context) {
    var editorInfo = context.editorInfo;
    editorInfo.ace_doDatatableOptions = _(Datatables.doDatatableOptions).bind(context);
};
exports.acePostWriteDomLineHTML = function (hook_name, args, cb) {
    // Iterate through the child nodes (spans) and point SyntaxHighlighter at them
    var children = args.node.children;
    for (var i = 0; i < children.length; i++) {
        if (args.node.children[i].className.indexOf("list") != -1 || args.node.children[i].className.indexOf("tag") != -1 || args.node.children[i].className.indexOf("url") != -1) continue;
        var lineText = "";
        if (args.node.children[i].innerText) lineText = args.node.children[i].innerText;
        else lineText = args.node.children[i].textContent;
        if (lineText && lineText.indexOf("data-tables") != -1) {
            var dtAttrs = typeof (exports.Datatables) != 'undefined' ? exports.Datatables.attributes : null;
            dtAttrs = dtAttrs || "";
            DatatablesRenderer.render({}, args.node.children[i], dtAttrs);
            exports.Datatables.attributes = null;
        }
    }
}
exports.eejsBlock_scripts = function (hook_name, args, cb) {
    args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables/templates/datatablesScripts.ejs");
}
exports.eejsBlock_editbarMenuLeft = function (hook_name, args, cb) {
    args.content = args.content + require('ep_etherpad-lite/node/eejs/').require("ep_tables/templates/datatablesEditbarButtons.ejs");
}
exports.eejsBlock_styles = function (hook_name, args, cb) {
    args.content = require('ep_etherpad-lite/node/eejs/').require("ep_tables/templates/styles.ejs") + args.content;
}
// Our heading attribute will result in a heaading:h1... :h6 class
exports.aceAttribsToClasses = function (hook, context) {
    Datatables.attributes = null;
    if (context.key == 'tblProp') {
        Datatables.attributes = context.value;
        return ['tblProp:' + context.value];
    }
}
exports.aceStartLineAndCharForPoint = function (hook, context) {
	var selStart = null;
    try {
        Datatables.context = context;
        if (Datatables.isFocused()) {
			selStart = Datatables.getLineAndCharForPoint();
        }
    } catch (error) {
        top.console.log('error ' + error);
        top.console.log('context rep' + Datatables.context.rep);
    }
    return selStart;
};

exports.aceEndLineAndCharForPoint = function (hook, context) {
	var selEndLine = null;
    try {
        Datatables.context = context;
        if (Datatables.isFocused()) {
          selEndLine =   Datatables.getLineAndCharForPoint();
        }
    } catch (error) {
        top.console.log('error ' + error);
        top.console.log('context rep' + Datatables.context.rep);
    }
    return selEndLine;
};
exports.aceKeyEvent = function (hook, context) {

	var specialHandled = false;
    try {
        Datatables.context = context;
        if (Datatables.isFocused()) {
            var evt = context.evt;
            var type = evt.type;
            var keyCode = evt.keyCode;
            var isTypeForSpecialKey = ((Ace2Common.browser.msie || Ace2Common.browser.safari) ? (type == "keydown") : (type == "keypress"));
            var isTypeForCmdKey = ((Ace2Common.browser.msie || Ace2Common.browser.safari) ? (type == "keydown") : (type == "keypress"));
            var which = evt.which;
            if ((!specialHandled) && isTypeForSpecialKey && keyCode == 9 && !(evt.metaKey || evt.ctrlKey)) {
                context.editorInfo.ace_fastIncorp(5);
                evt.preventDefault();
                Datatables.performDocumentTableTabKey();
                specialHandled = true;
            }
            if ((!specialHandled) && isTypeForSpecialKey && keyCode == 13) {
                // return key, handle specially;
                context.editorInfo.ace_fastIncorp(5);
                evt.preventDefault();
                Datatables.doReturnKey();
                specialHandled = true;
            }
            if ((!specialHandled) && isTypeForSpecialKey && (keyCode == Datatables.vars.JS_KEY_CODE_DEL || keyCode == Datatables.vars.JS_KEY_CODE_BS || (String.fromCharCode(which).toLowerCase() == "h" && (evt.ctrlKey)))) {
                context.editorInfo.ace_fastIncorp(20);
                evt.preventDefault();
                specialHandled = true;
                if (Datatables.isCellDeleteOk(keyCode)) {
                    Datatables.doDeleteKey();
                }
            }
        }
    } catch (error) {}
    //console.log(' ace key evt specialHandled ',specialHandled);
    return specialHandled;
};
if (typeof (Datatables) == 'undefined') var Datatables = function () {
        // Get the text within an element
        // Doesn't do any normalising, returns a string
        // of text as found.
        function nodeText(n) {
            var text = [];
            var self = arguments.callee;
            var el, els = n.childNodes;
            var excluded = {
                'noscript': 'noscript',
                'script': 'script',
            };
            for (var i = 0, iLen = els.length; i < iLen; i++) {
                el = els[i];
                // May need to add other node types here
                if (el.nodeType == 1 && !(el.tagName.toLowerCase() in excluded)) {
                    text.push(self(el));
                    // If working with XML, add nodeType 4 to get text from CDATA nodes
                } else if (el.nodeType == 3) {
                    // Deal with extra whitespace and returns in text here.
                    text.push(el.data);
                }
            }
            return text.join('');
        }
        var dt = {
            defaults: {
                tblProps: {
                    borderWidth: "1",
                    cellAttrs: [],
                    width: "6",
                    rowAttrs: {},
                    colAttrs: [],
                    authors: {}
                }
            },
            config: {},
            /** Internal 'global' variables. */
            vars: {
                OVERHEAD_LEN_PRE: '{"payload":[["'.length,
                OVERHEAD_LEN_MID: '","'.length,
                OVERHEAD_LEN_ROW_START: '["'.length,
                OVERHEAD_LEN_ROW_END: '"],'.length,
                JS_KEY_CODE_BS: 8,
                JS_KEY_CODE_DEL: 46,
                TBL_OPTIONS: ['addTbl', 'addTblRowA', 'addTblRowB', 'addTblColL', 'addTblColR', 'delTbl', 'delTblRow', 'delTblCol', 'delImg']
            },
            /* passed parameters */
            context: null
        }; // end of dt
        dt.isFocused = function () {
            if (!this.context.rep.selStart || !this.context.rep.selEnd) return false;
            var line = this.context.rep.lines.atIndex(this.context.rep.selStart[0]);
            if (!line) return false;
            var currLineText = line.text || '';
            if (currLineText.indexOf("data-tables") == -1) {
                return false;
            }
            return true;
        };
        /* Helper function. not meant to be used as a standalone function

			   requires rowStartOffset

			 */
        dt._getRowEndOffset = function (rowStartOffset, tds) {
            var rowEndOffset = rowStartOffset + this.vars.OVERHEAD_LEN_ROW_START;
            for (var i = 0, len = tds.length; i < len; i++) {
                var overHeadLen = this.vars.OVERHEAD_LEN_MID;
                if (i == len - 1) {
                    overHeadLen = this.vars.OVERHEAD_LEN_ROW_END;
                }
                rowEndOffset += tds[i].length + overHeadLen;
            }
            return rowEndOffset;
        }
        /**

			current row index, 

			td index ,

			the length of leftover text of the current cell,

			current row start offset,

			current row end offset,

			current td start offset,

			current td end offset,

			and cellCaretPos

		*/
        dt.getFocusedTdInfo = function (payload, colStart) {
            var payloadOffset = colStart - this.vars.OVERHEAD_LEN_PRE;
            var rowStartOffset = 0;
            var payloadSum = 0;
            for (var rIndex = 0, rLen = payload.length; rIndex < rLen; rIndex++) {
                var tds = payload[rIndex];
                for (var tIndex = 0, tLen = tds.length; tIndex < tLen; tIndex++) {
                    var overHeadLen = this.vars.OVERHEAD_LEN_MID;
                    if (tIndex == tLen - 1) {
                        overHeadLen = this.vars.OVERHEAD_LEN_ROW_END;
                    }
                    payloadSum += tds[tIndex].length + overHeadLen;
                    if (payloadSum >= payloadOffset) {
                        if (payloadSum == payloadOffset) {
                            tIndex++;
                        }
                        var leftOverTdTxtLen = payloadSum - payloadOffset == 0 ? payload[rIndex][tIndex].length + this.vars.OVERHEAD_LEN_MID : payloadSum - payloadOffset;
                        var cellCaretPos = tds[tIndex].length - (leftOverTdTxtLen - overHeadLen);
                        var rowEndOffset = this._getRowEndOffset(rowStartOffset, tds);
                        return {
                            row: rIndex,
                            td: tIndex,
                            leftOverTdTxtLen: leftOverTdTxtLen,
                            rowStartOffset: rowStartOffset,
                            rowEndOffset: rowEndOffset,
                            cellStartOffset: payloadSum - tds[tIndex].length - overHeadLen,
                            cellEndOffset: payloadSum,
                            cellCaretPos: cellCaretPos
                        };
                    }
                }
                rowStartOffset = payloadSum;
                payloadSum += this.vars.OVERHEAD_LEN_ROW_START;
            }
        };
        dt.printCaretPos = function (start, end) {
            top.console.log(JSON.stringify(start));
            top.console.log(JSON.stringify(end));
        };
        dt.doDatatableOptions = function (cmd, xByY) {
            Datatables.context = this; // the scope is still ep lite and not DataTables because of the binding we have to do in  exports.aceInitialized
            if ((typeof (cmd) == 'object' && cmd.tblPropertyChange)) {
                Datatables.updateTableProperties(cmd);
            } else {
                switch (cmd) {
                case Datatables.vars.TBL_OPTIONS[0]:
                    Datatables.addTable(xByY);
                    break;
                case Datatables.vars.TBL_OPTIONS[1]:
                    Datatables.insertTblRow("addA");
                    break;
                case Datatables.vars.TBL_OPTIONS[2]:
                    Datatables.insertTblRow("addB");
                    break;
                case Datatables.vars.TBL_OPTIONS[3]:
                    Datatables.insertTblColumn("addL");
                    break;
                case Datatables.vars.TBL_OPTIONS[4]:
                    Datatables.insertTblColumn("addR");
                    break;
                case Datatables.vars.TBL_OPTIONS[5]:
                    Datatables.deleteTable();
                    break;
                case Datatables.vars.TBL_OPTIONS[6]:
                    Datatables.deleteTblRow();
                    break;
                case Datatables.vars.TBL_OPTIONS[7]:
                    Datatables.deleteTblColumn();
                    break;
                }
            }
        };
        dt.addTable = function (tableObj) {
            var rep = this.context.rep;
            var start = rep.selStart;
            var end = rep.selEnd;
            var line = rep.lines.atIndex(rep.selStart[0]);
            var hasMoreRows = null;
            var isRowAddition = null;
            if (tableObj) {
                hasMoreRows = tableObj.hasMoreRows;
                isRowAddition = tableObj.isRowAddition;
            }
            if (isRowAddition) {
                var table = JSON.parse(tableObj.tblString);
                insertTblRowBelow(0, table);
                performDocApplyTblAttrToRow(rep.selStart, JSON.stringify(table.tblProperties));
                return;
            }
            //if the carret is within a table, add the new table at the bottom
            if (line) {
                var currLineText = line.text;
                if (currLineText.indexOf("data-tables") != -1) {
                    do {
                        rep.selStart[0] = rep.selStart[0] + 1
                        currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                    } while (currLineText.indexOf("data-tables") != -1);
                    rep.selEnd[1] = rep.selStart[1] = currLineText.length;
                    this.context.editorInfo.ace_doReturnKey();
                    this.context.editorInfo.ace_doReturnKey();
                } else {
                    rep.selEnd[1] = rep.selStart[1] = currLineText.length;
                    this.context.editorInfo.ace_doReturnKey();
                    //				this.context.editorInfo.ace_inCallStackIfNecessary ('newline',this.context.editorInfo.ace_doReturnKey);	
                }
            }
            //if no col/row specified, create a default 3X3  empty table
            if (tableObj == null) {
                var authors = {};
                this.insertTblRowBelow(3);
                this.performDocApplyTblAttrToRow(rep.selStart, this.createDefaultTblProperties());
                this.insertTblRowBelow(3);
                this.performDocApplyTblAttrToRow(rep.selStart, this.createDefaultTblProperties(authors));
                this.insertTblRowBelow(3);
                this.performDocApplyTblAttrToRow(rep.selStart, this.createDefaultTblProperties(authors));
                this.context.editorInfo.ace_doReturnKey();
                //this.context.editorInfo.ace_inCallStackIfNecessary ('newline',this.context.editorInfo.ace_doReturnKey);	
                this.updateAuthorAndCaretPos(rep.selStart[0] - 3);
                return;
            }
            //xbyy cols and rows have been specified or an actual payload object is present, for the former, create x rows of magicdom lines that contain a row
            //per table.
            xByYSelect = typeof (tableObj) == "object" ? null : tableObj.split("X");
            if (xByYSelect != null && xByYSelect.length == 3) {
                var cols = parseInt(xByYSelect[1]);
                var rows = parseInt(xByYSelect[2]);
                var jsoStrTblProp = JSON.stringify(this.createDefaultTblProperties());
                var authors = {};
                for (var i = 0; i < rows; i++) {
                    this.insertTblRowBelow(cols);
                    if (i == 0) {
                        this.performDocApplyTblAttrToRow(rep.selStart, this.createDefaultTblProperties());
                    } else {
                        this.performDocApplyTblAttrToRow(rep.selStart, this.createDefaultTblProperties(authors));
                    }
                }
                this.updateAuthorAndCaretPos(rep.selStart[0] - rows + 1);
                return;
            }
            return newText;
        };
        //insert a row
        dt.insertTblRow = function (aboveOrBelow) {
            var func = 'insertTblRow()';
            var rep = this.context.rep;
            try {
                var newText = "";
                var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                var payload = JSON.parse(currLineText).payload;
                var currTdInfo = this.getFocusedTdInfo(payload, rep.selStart[1]);
                var currRow = currTdInfo.row;
                var lastRowOffSet = 0;
                var start = [],
                    end = [];
                start[0] = rep.selStart[0], start[1] = rep.selStart[1];
                end[0] = rep.selStart[0], end[1] = rep.selStart[1];
                if (aboveOrBelow == 'addA') {
                    rep.selStart[0] = rep.selEnd[0] = rep.selStart[0] - 1;
                    this.insertTblRowBelow(payload[0].length);
                } else { //below curr row ( aboveOrBelow = 'addB')
                    this.insertTblRowBelow(payload[0].length);
                }
                this.context.editorInfo.ace_performDocApplyTblAttrToRow(rep.selStart, this.createDefaultTblProperties());
                this.updateAuthorAndCaretPos(rep.selStart[0]);
                var updateEvenOddBgColor = true;
                this.sanitizeTblProperties(rep.selStart, updateEvenOddBgColor);
            } catch (error) {
                //domline.createErrorState(start,end,'insertTblRow',rep.lines.atIndex(rep.selStart[0]).text,rep.selStart,rep.selEnd,newText,error);		
            }
        };
        //delete a table, also removes table overhead
        dt.deleteTable = function () {
            var rep = this.context.rep;
            var func = 'deleteTable()';
            var start = rep.seStart;
            var end = rep.seEnd;
            try {
                var line = rep.selStart[0] - 1;
                var numOfLinesAbove = 0;
                var numOfLinesBelow = 0;
                while (rep.lines.atIndex(line).text.indexOf('data-tables') != -1) { //count num of rows above current pos
                    numOfLinesAbove++;
                    line--;
                }
                line = rep.selEnd[0] + 1;
                while (rep.lines.atIndex(line).text.indexOf('data-tables') != -1) { //count num of rows below current pos		
                    numOfLinesBelow++;
                    line++;
                }
                rep.selStart[1] = 0;
                rep.selStart[0] = rep.selStart[0] - numOfLinesAbove;
                rep.selEnd[0] = rep.selEnd[0] + numOfLinesBelow;
                rep.selEnd[1] = rep.lines.atIndex(rep.selEnd[0]).text.length;
                this.context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, "");
            } catch (error) {
                //domline.createErrorState(start,end,func,rep.lines.atIndex(rep.selStart[0]).text,rep.selStart,rep.selEnd,"",error);		
            }
        };
        //delete a row
        dt.deleteTblRow = function () {
            var func = 'deleteTblRow()';
            var rep = this.context.rep;
            try {
                var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                if (currLineText.indexOf('data-tables') == -1) return;
                rep.selEnd[0] = rep.selStart[0] + 1;
                rep.selStart[1] = 0;
                rep.selEnd[1] = 0;
                this.context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, "");
                currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                if (currLineText.indexOf('data-tables') == -1) return;
                this.updateAuthorAndCaretPos(rep.selStart[0], 0, 0);
                updateEvenOddBgColor = true;
                this.sanitizeTblProperties(rep.selStart, updateEvenOddBgColor);
            } catch (error) {
                //domline.createErrorState(start,end,'deleteTblRow',rep.lines.atIndex(rep.selStart[0]).text,rep.selStart,rep.selEnd,"",error);		
            }
        };
        dt.updateTableProperties = function (props) {
            var rep = this.context.rep;
            var currTd = null;
            if (props.tblColWidth || props.tblSingleColBgColor || props.tblColVAlign) {
                var currLine = rep.lines.atIndex(rep.selStart[0]);
                var currLineText = currLine.text;
                var tblJSONObj = JSON.parse(currLineText);
                var payload = tblJSONObj.payload;
                var currTdInfo = this.getFocusedTdInfo(payload, rep.selStart[1]);
                currTd = currTdInfo.td;
            }
            if (props.tblWidth || props.tblHeight || props.tblBorderWidth || props.tblBorderColor || props.tblColWidth || props.tblSingleColBgColor || props.tblEvenRowBgColor || props.tblOddRowBgColor || props.tblColVAlign) {
                var start = [];
                start[0] = rep.selStart[0], start[1] = rep.selStart[1];
                var numOfLinesAbove = this.getTblAboveRowsFromCurFocus(start);
                var tempStart = [];
                tempStart[0] = start[0] - numOfLinesAbove;
                tempStart[1] = start[1];
                while (tempStart[0] < rep.lines.length() && rep.lines.atIndex(tempStart[0]).text.indexOf('data-tables') != -1) { //start from top of a table			
                    if (props.tblEvenRowBgColor && tempStart[0] % 2 != 0) {
                        tempStart[0] = tempStart[0] + 1;
                        continue;
                    } else if (props.tblOddRowBgColor && tempStart[0] % 2 == 0) {
                        tempStart[0] = tempStart[0] + 1;
                        continue;
                    }
                    this.updateTablePropertiesHelper(props, tempStart, currTd);
                    tempStart[0] = tempStart[0] + 1;
                }
            } else {
                var start = [];
                start[0] = rep.selStart[0];
                start[1] = rep.selStart[1];
                this.updateTablePropertiesHelper(props, start, currTd);
            }
        };
        dt.addCellAttr = function (start, tblJSONObj, tblProperties, attrName, attrValue) {
            var rep = this.context.rep;
            var payload = tblJSONObj.payload;
            var currTdInfo = this.getFocusedTdInfo(payload, start[1]);
            var currRow = currTdInfo.row;
            var currTd = currTdInfo.td;
            var cellAttrs = tblProperties.cellAttrs;
            var row = cellAttrs[currRow];
            if (row == null || typeof (row) == 'undefined') {
                row = [];
            }
            cell = row[currTd];
            if (cell == null || typeof (cell) == 'undefined') {
                cell = {};
            }
            //toggle these attributes
            if (attrName == 'fontWeight' || attrName == 'fontStyle' || attrName == 'textDecoration') {
                if (cell[attrName] == attrValue) {
                    attrValue = '';
                }
            } else if (cell[attrName] == attrValue) return false; //other wise no need to update
            cell[attrName] = attrValue;
            row[currTd] = cell;
            cellAttrs[currRow] = row;
            tblProperties.cellAttrs = cellAttrs;
            return tblProperties;
        };
        //returns false if no chanage to tblProperties
        dt.addRowAttr = function (tblJSONObj, tblProperties, attrName, attrValue) {
            var rep = this.context.rep;
            var rowAttrs = tblProperties.rowAttrs;
            if (attrName == 'bgColor') { //specific single row property
                var payload = tblJSONObj.payload;
                var currTdInfo = this.getFocusedTdInfo(payload, rep.selStart[1]);
                var currRow = currTdInfo.row;
                var singleRowAttrs = rowAttrs.singleRowAttrs;
                if (singleRowAttrs == null || typeof (singleRowAttrs) == 'undefined') {
                    singleRowAttrs = [];
                }
                if (singleRowAttrs[currRow] == null || typeof (singleRowAttrs[currRow]) == 'undefined') {
                    singleRowAttrs[currRow] = {};
                } else if (singleRowAttrs[currRow][attrName] == attrValue) {
                    return false;
                }
                singleRowAttrs[currRow][attrName] = attrValue;
                rowAttrs.singleRowAttrs = singleRowAttrs;
            } else { //even-odd rows properties,rowAlign			
                if (rowAttrs[attrName] == attrValue) return false;
                rowAttrs[attrName] = attrValue;
            }
            tblProperties.rowAttrs = rowAttrs;
            return tblProperties;
        };
        //returns false if no chanage to tblProperties
        dt.addColumnAttr = function (start, tblJSONObj, tblProperties, attrName, attrValue, currTd) {
            var payload = tblJSONObj.payload;
            var currTdInfo = this.getFocusedTdInfo(payload, start[1]);
            var colAttrs = tblProperties.colAttrs;
            if (colAttrs == null || typeof (colAttrs) == 'undefined') {
                colAttrs = [];
            }
            if (colAttrs[currTd] == null || typeof (colAttrs[currTd]) == 'undefined') {
                colAttrs[currTd] = {};
            } else if (colAttrs[currTd][attrName] == attrValue) {
                return false;
            }
            colAttrs[currTd][attrName] = attrValue;
            tblProperties.colAttrs = colAttrs;
            return tblProperties;
        };
        dt.updateTablePropertiesHelper = function (props, start, currTd) {
            var rep = this.context.rep;
            lastTblPropertyUsed = 'updateTableProperties';
            start = start || rep.selStart;
            if (!(start)) return;
            var currLine = rep.lines.atIndex(start[0]);
            var currLineText = currLine.text;
            if (currLineText.indexOf('data-tables') == -1) return true;
            try {
                var tblJSONObj = JSON.parse(currLineText);
                var tblProperties = this.getLineTableProperty(start[0]);
                var update = false;
                //table width , height , border width and tbl  color	
                if (props.tblWidth || props.tblHeight || props.tblBorderWidth || props.tblBorderColor) {
                    var currAttrValue = tblProperties[props.attrName];
                    if (props.attrValue != null && (typeof (currAttrValue) == 'undefined' || currAttrValue != props.attrValue)) {
                        tblProperties[props.attrName] = props.attrValue;
                        update = true;
                    }
                }
                /*

			set or unset table cells attrs

			bold , italic , line-through/underline;

			*/
                if (props.tblCellFontWeight || props.tblCellFontStyle || props.tblCellTextDecoration) {
                    var tblProps = this.addCellAttr(start, tblJSONObj, tblProperties, props.attrName, props.attrValue);
                    if (tblProps) {
                        tblProperties = tblProps;
                        update = true;
                    }
                }
                //cell background color, height, and padding, cell font size		
                if (props.tblCellFontSize || props.tblCellBgColor || props.tblCellHeight || props.tblCellPadding || props.tblcellVAlign) {
                    var tblProps = this.addCellAttr(start, tblJSONObj, tblProperties, props.attrName, props.attrValue);
                    if (tblProps) {
                        tblProperties = tblProps;
                        update = true;
                    }
                }
                //even/odd row background color		
                if (props.tblEvenRowBgColor || props.tblOddRowBgColor) {
                    var tblProps = this.addRowAttr(tblJSONObj, tblProperties, props.attrName, props.attrValue);
                    if (tblProps) {
                        tblProperties = tblProps;
                        update = true;
                    }
                }
                //single row background color, rowVAlign		
                if (props.tblSingleRowBgColor || props.tblRowVAlign) {
                    var tblProps = this.addRowAttr(tblJSONObj, tblProperties, props.attrName, props.attrValue);
                    if (tblProps) {
                        tblProperties = tblProps;
                        update = true;
                    }
                }
                // col width, col bgColor, colVAlign
                if (props.tblColWidth || props.tblSingleColBgColor || props.tblColVAlign) {
                    var tblProps = this.addColumnAttr(start, tblJSONObj, tblProperties, props.attrName, props.attrValue, currTd);
                    if (tblProps) {
                        tblProperties = tblProps;
                        update = true;
                    }
                }
                //only update if there is a change
                if (update) {
                    this.updateTblPropInAPool(-1, -1, tblProperties, start);
                }
            } catch (error) {
                // domline.createErrorState(start,end,'updateTableProperties',rep.lines.atIndex(rep.selStart[0]).text,rep.selStart,rep.selEnd,"",error);	
            }
        };
        dt.updateAuthorAndCaretPos = function (magicDomLineNum, tblRowNum, tblColNum) {
            var rep = this.context.rep;
            rep.selStart[1] = rep.selEnd[1] = this.vars.OVERHEAD_LEN_PRE;
            rep.selStart[0] = rep.selEnd[0] = magicDomLineNum;
            var row = typeof (tblRowNum) == 'undefined' || tblRowNum == null ? 0 : tblRowNum;
            var col = typeof (tblColNum) == 'undefined' || tblRowNum == null ? 0 : tblColNum;
            this.updateTblPropInAPool(row, col, null, rep.selStart);
            rep.selStart[1] = rep.selEnd[1] = this.vars.OVERHEAD_LEN_PRE;
            this.context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, '');
        }
        dt.insertTblRowBelow = function (numOfRows, table) {
            var rep = this.rep;
            var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
            var payload = [
                []
            ];
            if (!numOfRows && numOfRows != 0) {
                var tblPayload = JSON.parse(currLineText).payload;
                numOfRows = tblPayload[0].length;
            }
            var tblRows = new Array(numOfRows);
            if (numOfRows != 0) {
                for (var i = 0; i < tblRows.length; i++) {
                    tblRows[i] = " ";
                }
            }
            payload = [tblRows];
            if (table) {
                payload = table.payload;
            }
            tableObj = {
                "payload": payload,
                "tblId": 1,
                "tblClass": "data-tables",
                "trClass": "alst",
                "tdClass": "hide-el"
            }
            rep.selEnd[1] = rep.selStart[1] = currLineText.length;
            this.context.editorInfo.ace_doReturnKey();
            this.context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, JSON.stringify(tableObj));
        };
        dt.createDefaultTblProperties = function (authors) {
            var rep = this.context.rep;
            var defTblProp = {
                borderWidth: "1",
                cellAttrs: [],
                width: "6",
                rowAttrs: {},
                colAttrs: [],
                authors: {}
            };
            if (authors) {
                defTblProp['authors'] = authors;
            }
            //from existing Table tableborder,tbl_border_width,table_width and table_height		
            var prevLine = rep.lines.atIndex(rep.selEnd[0] - 1);
            var jsoTblProp = null;
            if (prevLine) {
                var prevLineText = prevLine.text;
                if (prevLineText.indexOf("data-tables") != -1) {
                    jsoTblProp = this.getLineTableProperty(rep.selStart[0] - 1);
                }
            }
            if (!jsoTblProp) {
                var nextLine = rep.lines.atIndex(rep.selEnd[0] - 1);
                if (nextLine) {
                    var nextLineText = nextLine.text;
                    if (nextLineText.indexOf("data-tables") != -1) {
                        jsoTblProp = this.getLineTableProperty(rep.selStart[0] + 1);
                    }
                }
            }
            if (jsoTblProp) {
                defTblProp.borderWidth = jsoTblProp.borderWidth;
                defTblProp.borderColor = jsoTblProp.borderColor;
                defTblProp.width = jsoTblProp.width;
                defTblProp.height = jsoTblProp.height;
                defTblProp.colAttrs = jsoTblProp.colAttrs;
            }
            var jsoStrTblProp = JSON.stringify(defTblProp);
            return jsoStrTblProp;
        }
        dt.performDocApplyTblAttrToRow = function (start, jsoStrTblProp) {
            var tempStart = [],
                tempEnd = [];
            tempStart[0] = start[0], tempEnd[0] = start[0];
            tempStart[1] = 0, tempEnd[1] = this.context.rep.lines.atIndex(start[0]).text.length;
            this.context.editorInfo.ace_performDocumentApplyAttributesToRange(tempStart, tempEnd, [
                ["tblProp", jsoStrTblProp]
            ]);
        }
        /* handles tab key within a table */
        dt.performDocumentTableTabKey = function () {
            try {
                var context = this.context;
                var rep = context.rep;
                var currLine = rep.lines.atIndex(rep.selStart[0]);
                var currLineText = currLine.text;
                var tblJSONObj = JSON.parse(currLineText);
                var payload = tblJSONObj.payload;
                var currTdInfo = this.getFocusedTdInfo(payload, rep.selStart[1]);
                var leftOverTdTxtLen = currTdInfo.leftOverTdTxtLen;
                var currRow = currTdInfo.row;
                var currTd = currTdInfo.td;
                if (typeof (payload[currRow][currTd + 1]) == "undefined") { //next row
                    currRow += 1;
                    var nextLine = rep.lines.atIndex(rep.selStart[0] + 1);
                    var nextLineText = nextLine.text;
                    var updateEvenOddBgColor = false;
                    if (nextLineText == null || nextLineText == '' || nextLineText.indexOf('data-tables') == -1) { //create new row and move caret to this new row			
                        this.insertTblRowBelow(null, null);
                        this.performDocApplyTblAttrToRow(rep.selStart, this.createDefaultTblProperties());
                        rep.selEnd[1] = rep.selStart[1] = this.vars.OVERHEAD_LEN_PRE;
                        updateEvenOddBgColor = true;
                    } else { //just move caret to existing next row
                        currTd = -1;
                        rep.selStart[0] = rep.selEnd[0] = rep.selStart[0] + 1;
                        var tblJSONObj = JSON.parse(nextLineText);
                        var payload = tblJSONObj.payload;
                        leftOverTdTxtLen = payload[0][0].length;
                        rep.selEnd[1] = rep.selStart[1] = this.vars.OVERHEAD_LEN_PRE + leftOverTdTxtLen;
                    }
                    context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, "");
                    var start = [];
                    start[0] = rep.selStart[0];
                    start[1] = rep.selStart[1];
                    dt.updateTblCellAuthor(0, 0, null, start, updateEvenOddBgColor); //this requires removing potential user color in a differnt row(although it should only check the previous row)					   
                } else { //tab to the next col and update cell user color
                    var nextTdTxtLen = typeof (payload[currRow]) == 'undefined' ? -leftOverTdTxtLen : payload[currRow][currTd + 1].length;
                    payload = tblJSONObj.payload;
                    rep.selStart[1] = rep.selEnd[1] = rep.selEnd[1] + nextTdTxtLen + leftOverTdTxtLen;
                    context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, "");
                    // debugger;
                    dt.updateTblPropInAPool(currRow, currTd + 1, null, rep.selStart); //this need not to update entire table of color setting		
                }
            } catch (error) {}
        };
        dt.getTdInfo = function (payload, tdIndex) {
            var rep = this.context.rep;
            var startOffset = this.vars.OVERHEAD_LEN_PRE;
            var rowStartOffset = startOffset;
            var payloadSum = startOffset;
            var tds = payload[0];
            for (var tIndex = 0, tLen = tds.length; tIndex < tLen; tIndex++) {
                var overHeadLen = this.vars.OVERHEAD_LEN_MID;
                if (tIndex == tLen - 1) {
                    overHeadLen = this.vars.OVERHEAD_LEN_ROW_END;
                }
                payloadSum += tds[tIndex].length + overHeadLen;
                if (tIndex >= tdIndex) {
                    return {
                        cellStartOffset: payloadSum - tds[tIndex].length - overHeadLen,
                        cellEndOffset: payloadSum
                    }
                }
            }
        };
        dt.getNextTdInfo = function (payload, currTdInfo) {
            var rep = this.context.rep;
            var startOffset = currTdInfo.rowEndOffset;
            var rowStartOffset = startOffset;
            var payloadSum = startOffset;
            var tds = payload[currTdInfo.row];
            for (var tIndex = 0, tLen = tds.length; tIndex < tLen; tIndex++) {
                var overHeadLen = this.vars.OVERHEAD_LEN_MID;
                if (tIndex == tLen - 1) {
                    overHeadLen = this.vars.OVERHEAD_LEN_ROW_END;
                }
                payloadSum += tds[tIndex].length + overHeadLen;
                if (tIndex >= currTdInfo.td) {
                    var leftOverTdTxtLen = payloadSum - startOffset == 0 ? payload[currTdInfo.row + 1][tIndex].length + this.vars.OVERHEAD_LEN_MID : payloadSum - startOffset;
                    var rowEndOffset = this._getRowEndOffset(rowStartOffset, tds);
                    var tdInfo = {
                        row: currTdInfo.row + 1,
                        td: tIndex,
                        leftOverTdTxtLen: leftOverTdTxtLen,
                        rowStartOffset: rowStartOffset,
                        rowEndOffset: rowEndOffset,
                        cellStartOffset: payloadSum - tds[tIndex].length - overHeadLen,
                        cellEndOffset: payloadSum
                    };
                    return tdInfo;
                }
            }
        };
        //insert a column.
        dt.insertTblColumn = function (leftOrRight, start, end) {
            var rep = this.context.rep;
            var func = 'insertTblColumn()';
            try {
                var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                var tblJSONObj = JSON.parse(currLineText);
                var payload = tblJSONObj.payload;
                var currTdInfo = this.getFocusedTdInfo(payload, rep.selStart[1]);
                var currTd = currTdInfo.td;
                start = [], end = [];
                start[0] = rep.selStart[0];
                start[1] = rep.selStart[1];
                end[0] = rep.selEnd[0];
                end[1] = rep.selEnd[1];
                if (leftOrRight == "addL") {
                    currTd -= 1;
                }
                var numOfLinesAbove = this.getTblAboveRowsFromCurFocus(start);
                rep.selEnd[0] = rep.selStart[0] = rep.selStart[0] - numOfLinesAbove;
                while (rep.selStart[0] < rep.lines.length() && rep.lines.atIndex(rep.selStart[0]).text.indexOf('data-tables') != -1) { //count num of rows above current pos
                    var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                    var tblJSONObj = JSON.parse(currLineText);
                    var payload = tblJSONObj.payload;
                    var cellPos = this.getTdInfo(payload, currTd).cellEndOffset;
                    var newText = '" ",';
                    if (currTd == payload[0].length - 1) { //add to the most right
                        rep.selStart[1] = rep.selEnd[1] = cellPos - this.vars.OVERHEAD_LEN_ROW_END + 1;
                        newText = '," "';
                    } else if (currTd == -1) { //add to most left
                        rep.selStart[1] = rep.selEnd[1] = this.vars.OVERHEAD_LEN_PRE - 1;
                    } else {
                        rep.selStart[1] = rep.selEnd[1] = cellPos - 1;
                    }
                    this.context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, newText);
                    rep.selEnd[0] = rep.selStart[0] = rep.selStart[0] + 1;
                }
                rep.selStart = start;
                rep.selEnd = end;
                if (leftOrRight == "addL") {
                    rep.selStart[1] = rep.selEnd[1] = this.vars.OVERHEAD_LEN_PRE;
                    rep.selStart[0] = rep.selEnd[0] = rep.selStart[0];
                    this.updateTblPropInAPool(0, 0, null, rep.selStart);
                    rep.selStart[1] = rep.selEnd[1] = this.vars.OVERHEAD_LEN_PRE;
                }
                currTd++;
                var updateEvenOddBgColor = false;
                var updateColAttrs = true;
                this.sanitizeTblProperties(start, updateEvenOddBgColor, updateColAttrs, currTd, "add")
                this.context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, "");
            } catch (error) {
                //domline.createErrorState(start,end,'insertTblColumn',rep.lines.atIndex(rep.selStart[0]).text,rep.selStart,rep.selEnd,"",error);
            }
        };
        dt.deleteTblColumn = function () {
            var func = 'deleteTblColumn()';
            var rep = this.context.rep;
            try {
                var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                var tblJSONObj = JSON.parse(currLineText);
                var payload = tblJSONObj.payload;
                if (payload[0].length == 1) {
                    deleteTable();
                }
                var currTdInfo = this.getFocusedTdInfo(payload, rep.selStart[1]);
                var currTd = currTdInfo.td;
                var start = [],
                    end = [];
                start[0] = rep.selStart[0];
                start[1] = rep.selStart[1];
                end[0] = rep.selEnd[0];
                end[1] = rep.selEnd[1];
                var numOfLinesAbove = this.getTblAboveRowsFromCurFocus(start);
                rep.selEnd[0] = rep.selStart[0] = rep.selStart[0] - numOfLinesAbove;
                while (rep.selStart[0] < rep.lines.length() && rep.lines.atIndex(rep.selStart[0]).text.indexOf('data-tables') != -1) { //count num of rows above current pos
                    var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
                    var tblJSONObj = JSON.parse(currLineText);
                    var payload = tblJSONObj.payload;
                    var cellTdInfo = this.getTdInfo(payload, currTd);
                    var newText = '" ",';
                    if (currTd == payload[0].length - 1) { //remove most right col				
                        rep.selStart[1] = cellTdInfo.cellStartOffset - 2;
                        rep.selEnd[1] = cellTdInfo.cellEndOffset - 2;
                    } else if (currTd == 0) { //remove most left col
                        rep.selStart[1] = this.vars.OVERHEAD_LEN_PRE - 1;
                        rep.selEnd[1] = cellTdInfo.cellEndOffset - 1;
                    } else {
                        rep.selStart[1] = cellTdInfo.cellStartOffset - 1
                        rep.selEnd[1] = cellTdInfo.cellEndOffset - 1;
                    }
                    this.context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, "");
                    rep.selEnd[0] = rep.selStart[0] = rep.selStart[0] + 1;
                }
                rep.selStart = start;
                rep.selEnd = end;
                var updateEvenOddBgColor = false;
                var updateColAttrs = true;
                this.sanitizeTblProperties(start, updateEvenOddBgColor, updateColAttrs, currTd, "del")
                this.updateAuthorAndCaretPos(rep.selStart[0], 0, 0);
            } catch (error) {
                //domline.createErrorState(start,end,'deleteTblColumn',rep.lines.atIndex(rep.selStart[0]).text,rep.selStart,rep.selEnd,"",error);
            }
        }
        dt.insertTblRowBelow = function (numOfRows, table) {
            var context = this.context;
            var rep = context.rep;
            var currLineText = rep.lines.atIndex(rep.selStart[0]).text;
            var payload = [
                []
            ];
            if (!numOfRows && numOfRows != 0) {
                var tblPayload = JSON.parse(currLineText).payload;
                numOfRows = tblPayload[0].length;
            }
            var tblRows = new Array(numOfRows);
            if (numOfRows != 0) {
                for (var i = 0; i < tblRows.length; i++) {
                    tblRows[i] = " ";
                }
            }
            payload = [tblRows];
            if (table) {
                payload = table.payload;
            }
            tableObj = {
                "payload": payload,
                "tblId": 1,
                "tblClass": "data-tables",
                "trClass": "alst",
                "tdClass": "hide-el"
            }
            rep.selEnd[1] = rep.selStart[1] = currLineText.length;
            this.context.editorInfo.ace_inCallStackIfNecessary('newline', this.context.editorInfo.ace_doReturnKey);
            context.editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, JSON.stringify(tableObj));
        };
        dt.doReturnKey = function () {
            var context = this.context;
            var rep = context.rep;
            var start = rep.seStart;
            var end = rep.selEnd;
            lastTblPropertyUsed = 'doTableReturnKey';
            var currLine = rep.lines.atIndex(rep.selStart[0]);
            var currLineText = currLine.text;
            if (currLineText.indexOf('data-tables') == -1) return false;
            else {
                var func = 'doTableReturnKey()';
                try {
                    var currCarretPos = rep.selStart[1];
                    if (currLineText.substring(currCarretPos - 1, currCarretPos + 2) == '","') return true;
                    else if (currLineText.substring(currCarretPos - 2, currCarretPos + 1) == '","') return true;
                    else if (currCarretPos < this.vars.OVERHEAD_LEN_PRE) return true;
                    else if (currCarretPos > currLineText.length) return true;
                    var start = rep.selStart,
                        end = rep.selEnd;
                    newText = " /r/n ";
                    start[1] = currCarretPos;
                    end[1] = currCarretPos;
                    try {
                        var jsonObj = JSON.parse(currLineText.substring(0, start[1]) + newText + currLineText.substring(start[1]));
                        payloadStr = JSON.stringify(jsonObj.payload);
                        if (currCarretPos > payloadStr.length + this.vars.OVERHEAD_LEN_PRE - 2) {
                            return true;
                        }
                    } catch (error) {
                        return true;
                    }
                    context.editorInfo.ace_performDocumentReplaceRange(start, end, newText);
                } catch (error) {}
                return true;
            }
        };
        dt.isCellDeleteOk = function (keyCode) {
            var context = this.context;
            var rep = context.rep;
            var start = rep.selStart;
            var end = rep.selEnd;
            var currLine = rep.lines.atIndex(rep.selStart[0]);
            var currLineText = currLine.text;
            if (currLineText.indexOf('data-tables') == -1) return true;
            var isDeleteAccepted = false;
            try {
                var tblJSONObj = JSON.parse(currLineText);
                var table = tblJSONObj.payload;
                var currTdInfo = this.getFocusedTdInfo(table, rep.selStart[1]);
                cellEntryLen = table[currTdInfo.row][currTdInfo.td].length;
                var currCarretPos = rep.selStart[1];
                if (currLineText.substring(currCarretPos - 1, currCarretPos + 2) == '","') return false;
                else if (currLineText.substring(currCarretPos - 2, currCarretPos + 1) == '","') return false;
                switch (keyCode) {
                case this.vars.JS_KEY_CODE_BS:
                    if (cellEntryLen != 0 && cellEntryLen > (currTdInfo.leftOverTdTxtLen - this.vars.OVERHEAD_LEN_MID)) {
                        isDeleteAccepted = true;
                    }
                    break;
                case this.vars.JS_KEY_CODE_DEL:
                    return false; //disabled for the moment				
                    if (cellEntryLen != 0 && currTdInfo.leftOverTdTxtLen - this.vars.OVERHEAD_LEN_MID > 0) {
                        isDeleteAccepted = true;
                    }
                    break;
                default:
                    // cntrl H		 
                    if (cellEntryLen != 0 && cellEntryLen > (currTdInfo.leftOverTdTxtLen - this.vars.OVERHEAD_LEN_MID)) {
                        isDeleteAccepted = true;
                    }
                    break;
                }
            } catch (error) {
                isDeleteAccepted = false;
            }
            return isDeleteAccepted;
        };
        dt.nodeTextPlain = function (n) {
            return n.innerText || n.textContent || n.nodeValue || '';
        }
        // Get the text within an element
        // Doesn't do any normalising, returns a string
        // of text as found.
        dt.toString = function () {
            return "ep_tables";
        };
        dt.getLineAndCharForPoint = function () {
            var context = this.context;
            var point = context.point;
            var root = context.root;
            // Turn DOM node selection into [line,char] selection.
            // This method has to work when the DOM is not pristine,
            // assuming the point is not in a dirty node.
            if (point.node == root) {
                if (point.index == 0) {
                    return [0, 0];                    
                } else {
                    var N = this.context.rep.lines.length();
                    var ln = this.context.rep.lines.atIndex(N - 1);                    
                    return [N - 1, ln.text.length];
                }
            } else {
                var n = point.node;
                var col = 0;
                // if this part fails, it probably means the selection node
                // was dirty, and we didn't see it when collecting dirty nodes.
                if (nodeText(n) || point.index > 0) {
                    col = point.index;
                }
                var parNode, prevSib;
                while ((parNode = n.parentNode) != root) {
                    if ((prevSib = n.previousSibling)) {
                        n = prevSib;
                        var textLen = nodeText(n).length == 0 ? this.nodeTextPlain(n).length : nodeText(n).length;
                        col += textLen;
                    } else {
                        n = parNode;
                    }
                }
                if (n.id == "") console.debug("BAD");
                if (n.firstChild && context.editorInfo.ace_isBlockElement(n.firstChild)) {
                    col += 1; // lineMarker
                }
                var lineEntry = this.context.rep.lines.atKey(n.id);
                var lineNum = this.context.rep.lines.indexOfEntry(lineEntry);
                return [lineNum, col];
            }
        };
        dt.doDeleteKey = function () {
            var context = this.context;
            var evt = context.evt || {};
            var handled = false;
            var rep = this.context.rep;
            var editorInfo = context.editorInfo;
            if (rep.selStart) {
                //end tbl-mod-by-wlos
                if (editorInfo.ace_isCaret()) {
                    var lineNum = editorInfo.ace_caretLine();
                    var col = editorInfo.ace_caretColumn();
                    var lineEntry = rep.lines.atIndex(lineNum);
                    var lineText = lineEntry.text;
                    var lineMarker = lineEntry.lineMarker;
                    if (/^ +$/.exec(lineText.substring(lineMarker, col))) {
                        var col2 = col - lineMarker;
                        var tabSize = ''.length; // zero for now, tabs are not supported within tables
                        var toDelete = ((col2 - 1) % tabSize) + 1;
                        editorInfo.ace_performDocumentReplaceRange([lineNum, col - toDelete], [lineNum, col], '');
                        //scrollSelectionIntoView();
                        handled = true;
                    }
                }
                if (!handled) {
                    if (editorInfo.ace_isCaret()) {
                        var theLine = editorInfo.ace_caretLine();
                        var lineEntry = rep.lines.atIndex(theLine);
                        if (editorInfo.ace_caretColumn() <= lineEntry.lineMarker) {
                            // delete at beginning of line
                            var action = 'delete_newline';
                            var prevLineListType = (theLine > 0 ? editorInfo.ace_getLineListType(theLine - 1) : '');
                            var thisLineListType = editorInfo.ace_getLineListType(theLine);
                            var prevLineEntry = (theLine > 0 && rep.lines.atIndex(theLine - 1));
                            var prevLineBlank = (prevLineEntry && prevLineEntry.text.length == prevLineEntry.lineMarker);
                            if (thisLineListType) {
                                // this line is a list
                                if (prevLineBlank && !prevLineListType) {
                                    // previous line is blank, remove it
                                    editorInfo.ace_performDocumentReplaceRange([theLine - 1, prevLineEntry.text.length], [theLine, 0], '');
                                } else {
                                    // delistify
                                    editorInfo.ace_performDocumentReplaceRange([theLine, 0], [theLine, lineEntry.lineMarker], '');
                                }
                            } else if (theLine > 0) {
                                // remove newline
                                editorInfo.ace_performDocumentReplaceRange([theLine - 1, prevLineEntry.text.length], [theLine, 0], '');
                            }
                        } else {
                            var docChar = editorInfo.ace_caretDocChar();
                            if (docChar > 0) {
                                if (evt.metaKey || evt.ctrlKey || evt.altKey) {
                                    // delete as many unicode "letters or digits" in a row as possible;
                                    // always delete one char, delete further even if that first char
                                    // isn't actually a word char.
                                    var deleteBackTo = docChar - 1;
                                    while (deleteBackTo > lineEntry.lineMarker && editorInfo.ace_isWordChar(rep.alltext.charAt(deleteBackTo - 1))) {
                                        deleteBackTo--;
                                    }
                                    editorInfo.ace_performDocumentReplaceCharRange(deleteBackTo, docChar, '');
                                } else {
                                    var returnKeyWitinTblOffset = 0;
                                    if (lineText.substring(col - 5, col) == '/r/n ') {
                                        returnKeyWitinTblOffset = 4;
                                    }
                                    // normal or table return key delete
                                    editorInfo.ace_performDocumentReplaceCharRange(docChar - 1 - returnKeyWitinTblOffset, docChar, '');
                                }
                            }
                        }
                    } else {
                        editorInfo.ace_performDocumentReplaceRange(rep.selStart, rep.selEnd, "");
                    }
                }
            }
            //if the list has been removed, it is necessary to renumber
            //starting from the *next* line because the list may have been
            //separated. If it returns null, it means that the list was not cut, try
            //from the current one.
            var line = editorInfo.ace_caretLine();
            if (line != -1 && editorInfo.ace_renumberList(line + 1) === null) {
                editorInfo.ace_renumberList(line);
            }
        };
        dt.getLineTableProperty = function (lineNum) {
            var rep = this.context.rep;
            // get "tblProp" attribute of first char of line
            var aline = rep.alines[lineNum];
            if (aline) {
                var opIter = Changeset.opIterator(aline);
                if (opIter.hasNext()) {
                    var tblJSString = Changeset.opAttributeValue(opIter.next(), 'tblProp', rep.apool);
                    try {
                        return JSON.parse(tblJSString);
                    } catch (error) {
                        return this.defaults.tblProps;
                    }
                }
            }
            return this.defaults.tblProps;
        };
        dt.updateTblPropInAPool = function (row, td, jsoTblProp, start) {
            try {
                var rep = this.context.rep;
                var tblProps;
                var editorInfo = this.context.editorInfo;
                var thisAuthor = editorInfo.ace_getAuthor();
                var authorInfos = editorInfo.ace_getAuthorInfos();
                if (typeof (jsoTblProp) == 'undefined' || jsoTblProp == null) {
                    jsoTblProp = this.getLineTableProperty(start[0]);
                }
                if (row != -1 && td != -1) {
                    jsoTblProp['authors'][thisAuthor] = {
                        row: row,
                        cell: td,
                        colorId: authorInfos[thisAuthor].bgcolor
                    };
                }
                var jsoStrTblProp = JSON.stringify(jsoTblProp);
                var attrStart = [],
                    attrEnd = [];
                attrStart[0] = start[0], attrStart[1] = 0;
                attrEnd[0] = start[0], attrEnd[1] = rep.lines.atIndex(start[0]).text.length;
                editorInfo.ace_performDocumentApplyAttributesToRange(attrStart, attrEnd, [
                    ["tblProp", jsoStrTblProp]
                ]);
            } catch (error) {
                //createErrorState(start, start, 'updateTblPropInAPool', rep.lines.atIndex(start[0]).text, [row,td], [row,td], "", error);
            }
        };
        dt.getCurrTblOddEvenRowBgColor = function (startRowNum, currRowNum) {
            var rowBgColors = {
                oddBgColor: null,
                evenBgColor: null
            };
            if (startRowNum != currRowNum) {
                var jsoTblProp1 = this.getLineTableProperty(startRowNum);
                var jsoTblProp2 = this.getLineTableProperty(startRowNum + 1);
                rowBgColors.evenBgColor = jsoTblProp1['rowAttrs']['evenBgColor'] || jsoTblProp2['rowAttrs']['evenBgColor'];
                rowBgColors.oddBgColor = jsoTblProp1['rowAttrs']['oddBgColor'] || jsoTblProp2['rowAttrs']['oddBgColor'];
            }
            return rowBgColors;
        };
        dt.getTblAboveRowsFromCurFocus = function (start) {
            var rep = this.context.rep;
            var numOfLinesAbove = 0;
            var line = start[0] - 1;
            while (rep.lines.atIndex(line).text.indexOf('data-tables') != -1) { //count num of rows above current pos
                numOfLinesAbove++;
                line--;
            }
            return numOfLinesAbove;
        }
        dt.updateTableIndices = function (tblProperties, currTd, addOrDel) {
            cellAttrs = tblProperties.cellAttrs;
            for (var rIndex = 0, rLen = cellAttrs.length; rIndex < rLen; rIndex++) {
                var cellAttr = cellAttrs[rIndex];
                if (addOrDel == 'add') { //insert column            
                    if (cellAttr) {
                        cellAttr.splice(currTd, 0, null);
                    }
                } else { //remove column            
                    if (cellAttr) {
                        cellAttr.splice(currTd, 1);
                    }
                }
            }
            //col attrs 
            colAttrs = tblProperties.colAttrs;
            if (addOrDel == 'add') { //insert column
                if (colAttrs) {
                    colAttrs.splice(currTd, 0, null);
                }
            } else { //remove column
                if (colAttrs) {
                    colAttrs.splice(currTd, 1);
                }
            }
            return tblProperties;
        };
        dt.sanitizeTblProperties = function (start, updateEvenOddBgColor, updateColAttrs, currTd, addOrDel) {
            var rep = this.context.rep;
            var editorInfo = this.context.editorInfo;
            var thisAuthor = editorInfo.ace_getAuthor();
            var numOfLinesAbove = this.getTblAboveRowsFromCurFocus(start);
            var tempStart = [];
            tempStart[0] = start[0] - numOfLinesAbove;
            var evenOddRowBgColors = {};
            if (updateEvenOddBgColor) {
                //evenOddRowBgColors=getCurrTblOddEvenRowBgColor(tempStart[0],start[0]);
            }
            while (tempStart[0] < rep.lines.length() && rep.lines.atIndex(tempStart[0]).text.indexOf('data-tables') != -1) { //start from top of a table						
                var jsoTblProp = this.getLineTableProperty(tempStart[0]);
                var update = false;
                if (tempStart[0] != start[0] && jsoTblProp['authors'] && jsoTblProp['authors'][thisAuthor]) {
                    delete jsoTblProp['authors'][thisAuthor];
                    update = true;
                }
                if (updateColAttrs) {
                    jsoTblProp = this.updateTableIndices(jsoTblProp, currTd, addOrDel);
                    update = true;
                }
                if (tempStart[0] != start[0] && updateEvenOddBgColor) {
                    delete jsoTblProp['rowAttrs']['oddBgColor'];
                    delete jsoTblProp['rowAttrs']['evenBgColor'];
                    update = true;
                }
                if (update) {
                    this.updateTblPropInAPool(-1, -1, jsoTblProp, tempStart);
                }
                tempStart[0] = tempStart[0] + 1;
            }
        };
        dt.updateTblPropInAPool = function (row, td, jsoTblProp, start) {
            try {
                var rep = this.context.rep;
                var editorInfo = this.context.editorInfo;
                var thisAuthor = editorInfo.ace_getAuthor();
                var authorInfos = editorInfo.ace_getAuthorInfos();
                var tblProps;
                if (typeof (jsoTblProp) == 'undefined' || jsoTblProp == null) {
                    jsoTblProp = this.getLineTableProperty(start[0]);
                }
                if (row != -1 && td != -1) {
                    jsoTblProp['authors'][thisAuthor] = {
                        row: row,
                        cell: td,
                        colorId: authorInfos[thisAuthor].bgcolor
                    };
                }
                var jsoStrTblProp = JSON.stringify(jsoTblProp);
                var attrStart = [],
                    attrEnd = [];
                attrStart[0] = start[0], attrStart[1] = 0;
                attrEnd[0] = start[0], attrEnd[1] = rep.lines.atIndex(start[0]).text.length;
                editorInfo.ace_performDocumentApplyAttributesToRange(attrStart, attrEnd, [
                    ["tblProp", jsoStrTblProp]
                ]);
            } catch (error) {
                //createErrorState(start, start, 'updateTblPropInAPool', rep.lines.atIndex(start[0]).text, [row,td], [row,td], "", error);
            }
        };
        dt.updateTblCellAuthor = function (row, td, tblProperties, start, updateEvenOddBgColor) {
            try {
                this.updateTblPropInAPool(row, td, tblProperties, start);
                var tempStart = [];
                tempStart[0] = start[0];
                tempStart[1] = start[1];
                this.sanitizeTblProperties(tempStart, updateEvenOddBgColor);
            } catch (error) {
                //createErrorState(start, end, 'updateTblCellAuthor', rep.lines.atIndex(start).text, rep.selStart, rep.selEnd, "", error);
            }
        }
        return dt;
    }(); // end of anonymous function
typeof (exports) != 'undefined' ? exports.Datatables = Datatables : null;
