if (typeof (DatatablesRenderer) == 'undefined') var DatatablesRenderer = function () {
        var dRenderer = {
            render: function (params, element, attributes) {
                var renderer = new DatatablesRenderer.Renderer();
                if (element.innerText) code = element.innerText;
                else code = element.textContent;
                element.innerHTML = renderer.getHtml(code, attributes);
            }
        }; // end of dRenderer
        dRenderer.Renderer = function () {
            //	
        };
        dRenderer.Renderer.prototype = {
            createDefaultTblProperties: function (authors) {
                return {
                    borderWidth: "1",
                    cellAttrs: [],
                    width: "6",
                    rowAttrs: {},
                    colAttrs: [],
                    authors: {}
                };
            },
            buildTabularData: function (tblJSONObj, tblPropsJSString) {
                var htmlTbl = "";
                var tblId = tblJSONObj.tblId;
                var tblClass = tblJSONObj.tblClass;
                var tdClass = tblJSONObj.tdClass;
                var trClass = tblJSONObj.trClass;
                var payload = tblJSONObj.payload;
                var tblProperties = {};
                try {
                    tblProperties = JSON.parse(tblPropsJSString);
                } catch (error) {
                    tblProperties = this.createDefaultTblProperties();
                }
                var rowAttrs = tblProperties.rowAttrs;
                var singleRowAttrs = rowAttrs.singleRowAttrs;
                var cellAttrs = tblProperties.cellAttrs;
                var colAttrs = tblProperties.colAttrs;
                var tblWidth = typeof (tblProperties) == 'undefined' || tblProperties == null ? "1" : tblProperties.width || "1";
                tblWidth = this.getAttrInInch(tblWidth);
                var tblHeight = typeof (tblProperties) == 'undefined' || tblProperties == null ? ".1" : tblProperties.height || ".1";
                tblHeight = this.getAttrInInch(tblHeight);
                var tblBorderWidth = typeof (tblProperties) == 'undefined' || tblProperties == null ? 0 : tblProperties.borderWidth || 0;
                var tblBorderColor = typeof (tblProperties) == 'undefined' || tblProperties == null ? "#000000" : tblProperties.borderColor || "#000000";
                var currRow = tblProperties.currRowAuthorIdx;
                var currCell = tblProperties.currCellAuthorIdx;
                var authors = tblProperties.authors;
                var printViewTBlStyles = "table-layout:fixed !important;border-collapse:collapse!important;font-family:Trebuchet MS!important;";
                var printViewTblTDStyles = "font-size: 1em!important;line-height: 1em!important;padding: 3px 7px 2px!important;word-wrap: break-word!important;"
                var htmlTbl = "<table class='" + tblClass + "' style='" + printViewTBlStyles + "background-color:white;width:" + tblWidth + "px!important;height:" + tblHeight + "px!important; border-top: " + tblBorderWidth + "px solid " + tblBorderColor + "!important;" + "'><tbody>";
                var borders = "border-bottom:" + tblBorderWidth + "px solid " + tblBorderColor;
                var rowVAlign = typeof (rowAttrs) == 'undefined' || rowAttrs == null ? "left" : rowAttrs.rowVAlign || "left";
                var rows = tblJSONObj.payload;
                var evenRowBgColor = typeof (rowAttrs) == 'undefined' || rowAttrs == null ? "#FFFFFF" : rowAttrs.evenBgColor || "#FFFFFF";
                var oddRowBgColor = typeof (rowAttrs) == 'undefined' || rowAttrs == null ? null : rowAttrs.oddBgColor || null;
                for (var j = 0, rl = rows.length; j < rl; j++) {
                    var tds = rows[j];
                    var rowBgColor = oddRowBgColor;
                    if (!rowBgColor) {
                        rowBgColor = evenRowBgColor;
                    }
                    htmlTbl += "<tr style='vertical-align:" + rowVAlign + ";background-color:" + rowBgColor + "; " + borders + "!important;' class='" + trClass + "'>";
                    var preHeader = "";
                    if (j == 0) {
                        preHeader = "{\"payload\":[[\"";
                    }
                    htmlTbl += "<td  name='payload' class='hide-el overhead'>" + preHeader + "</td>";
                    var singleRowAttr = typeof (singleRowAttrs) == 'undefined' || singleRowAttrs == null ? null : singleRowAttrs[j];
                    for (var i = 0, tl = tds.length; i < tl; i++) {
                        var cellAttr = typeof (cellAttrs[j]) == 'undefined' || cellAttrs[j] == null ? null : cellAttrs[j][i];
                        var cellStyles = this.getCellAttrs(singleRowAttr, cellAttr, colAttrs[i], authors, i, j);
                        
                        var authorBorderColor = this.getCellAuthorColors(authors, i, j, tblBorderWidth) + "!important;";
                        var borderTop = "";
                        if (tblBorderWidth == 0) {
                            borderTop = " border-top: 0px solid white !important;";
                        }
                        //col vAlign
                        var colVAlign = typeof (colAttrs[i]) == 'undefined' || colAttrs[i] == null ? "" : "align='" + colAttrs[i].colVAlign + "'" || "";
                        var quoteAndComma = "\",\"";
                        var cellDel = "";
                        var delimCell = "<td name='delimCell' id='" + "' class='hide-el overhead'>" + quoteAndComma + "</td>";
                        var lastCellBorder = "";
                        if (i == tl - 1) {
                            delimCell = "";
                            lastCellBorder = "border-right:" + tblBorderWidth + "px solid " + tblBorderColor + "!important;";
                            quoteAndComma = "";
                        }
                        if (tds[i].indexOf('/r/n') != -1) {
                            cellsWithBr = "";
                            var tdText = tds[i].split('/r/n');
                            for (var k = 0; k < tdText.length; k++) {
                                if (k < tdText.length - 1) {
                                    cellsWithBr += tdText[k] + "<label value='tblBreak' class='hide-el'>/r/n</label><label class='tblBreak'></label>";
                                } else cellsWithBr += tdText[k];
                            }
                            htmlTbl += "<td  name='tData' " + colVAlign + " style='" + printViewTblTDStyles + cellStyles + " border-left:" + 
                            tblBorderWidth + "px solid " + tblBorderColor + authorBorderColor + borderTop + lastCellBorder + "' >" + cellsWithBr + 
                            "<br value='tblBreak'></td>" + delimCell;
                        } else {
                            htmlTbl += "<td name='tData' " + colVAlign + " style='" + printViewTblTDStyles + cellStyles + lastCellBorder + " border-left:" + tblBorderWidth + "px solid " + tblBorderColor + authorBorderColor + borderTop + "' >" + tds[i] + "" + "<br value='tblBreak'></td>" + delimCell
                        }
                    }
                    var bracketAndcomma = "\"]],\"tblId\":\"1\",\"tblClass\":\"data-tables\"}";
                    htmlTbl += "<td name='bracketAndcomma' class='  hide-el overhead'>" + bracketAndcomma + "</td>";
                    htmlTbl += "</tr>";
                }
                htmlTbl += "</tbody></table>";
                return htmlTbl;
            },
            getCellAuthorColors: function (authors, cell, row, tblBorderWidth) {
                var cellBorderColor = null;
                if (typeof (authors) != 'undefined' && authors != null) {
                    for (var authorId in authors) {
                        author = authors[authorId];
                        if (typeof (author) != 'undefined' && author != null && author.cell == cell && author.row == row) {
                            cellBorderColor = author.colorId;
                        }
                    }
                }
                var borderWidth = tblBorderWidth != 0 ? tblBorderWidth : 1;           
                cellBorderColor = cellBorderColor == null ? "" : ";border:" + borderWidth + "px solid " + cellBorderColor;
                return cellBorderColor;
            },
            getCellAttrs: function (singleRowAttr, cellAttr, colAttr, authors, cell, row) {
                var attrsJSO = {};
                var colWidth = typeof (colAttr) == 'undefined' || colAttr == null ? "1" : colAttr.width || "1";
                attrsJSO['width'] = this.getAttrInInch(colWidth) + 'px';
                var cellBgColor = "";
                //row highlight
                if (typeof (singleRowAttr) != 'undefined' && singleRowAttr != null) {
                    var bgColor = singleRowAttr.bgColor;
                    if (typeof (bgColor) != 'undefined' && bgColor != null && bgColor != '#FFFFFF') {
                        cellBgColor = bgColor;
                    }
                }
                //col highlight
                if (typeof (colAttr) != 'undefined' && colAttr != null) {
                    var bgColor = colAttr.bgColor;
                    if (typeof (bgColor) != 'undefined' && bgColor != null && bgColor != '#FFFFFF') {
                        cellBgColor = bgColor;
                    }
                }
                cellBgColor = typeof (cellAttr) == 'undefined' || cellAttr == null ? cellBgColor : cellAttr.bgColor || cellBgColor;
                attrsJSO['background-color'] = cellBgColor;
                var cellHeight = typeof (cellAttr) == 'undefined' || cellAttr == null ? "" : cellAttr.height || "";
                attrsJSO['height'] = this.getAttrInInch(cellHeight) + 'px';
                var cellPadding = typeof (cellAttr) == 'undefined' || cellAttr == null ? "" : cellAttr.padding || "";
                attrsJSO['padding-top'] = attrsJSO['padding-bottom'] = attrsJSO['padding-left'] = attrsJSO['padding-right'] = this.getAttrInInch(cellPadding) + 'px';
                var cellVAlign = typeof (cellAttr) == 'undefined' || cellAttr == null ? "" : cellAttr.vAlign || "";
                attrsJSO['vertical-align'] = cellVAlign;
                var cellFontSize = typeof (cellAttr) == 'undefined' || cellAttr == null ? "" : cellAttr.fontSize || "";
                attrsJSO['font-size'] = cellFontSize + 'px';
                var cellFontWeight = typeof (cellAttr) == 'undefined' || cellAttr == null ? "" : cellAttr.fontWeight || "";
                attrsJSO['font-weight'] = cellFontWeight;
                var cellFontStyle = typeof (cellAttr) == 'undefined' || cellAttr == null ? "" : cellAttr.fontStyle || "";
                attrsJSO['font-style'] = cellFontStyle;
                var cellTextDecoration = typeof (cellAttr) == 'undefined' || cellAttr == null ? "" : cellAttr.textDecoration || "";
                attrsJSO['text-decoration'] = cellTextDecoration;
                var attrsString = "";
                for (var attrName in attrsJSO) {
                    if (attrName && attrsJSO[attrName] != "" && attrsJSO[attrName] != "NaNpx" && attrsJSO[attrName] != "px") attrsString += attrName + ":" + attrsJSO[attrName] + " !important;";
                }
                return attrsString;
            },
            getAttrInInch: function (attrValue) {
                var intAttrValue = 0;
                intAttrValue = parseFloat(attrValue);
                attrValue = isNaN(intAttrValue) ? parseFloat(attrValue) : intAttrValue;
                return 96 * attrValue - 1;
            },
            getHtml: function (code, attributes) {
                var JSONCode = "";
                var html = "";
                try {
                    JSONCode = JSON.parse(code);
                    html = this.buildTabularData(JSONCode, attributes);
                } catch (error) {}
                return html;
            },
        };
        return dRenderer;
    }(); // end of anonymous function
// CommonJS
typeof (exports) != 'undefined' ? exports.DatatablesRenderer = DatatablesRenderer : null;
