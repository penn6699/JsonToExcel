
if (!Blob) {
    /* Blob.js
     * A Blob implementation.
     * 2018-01-12
     *
     * By Eli Grey, http://eligrey.com
     * By Devin Samarin, https://github.com/dsamarin
     * License: MIT
     *   See https://github.com/eligrey/Blob.js/blob/master/LICENSE.md
     */

    /*global self, unescape */
    /*jslint bitwise: true, regexp: true, confusion: true, es5: true, vars: true, white: true,
      plusplus: true */

    /*! @source http://purl.eligrey.com/github/Blob.js/blob/master/Blob.js */
    (function (d) { d.URL = d.URL || d.webkitURL; if (d.Blob && d.URL) try { new Blob; return } catch (b) { } var p = d.BlobBuilder || d.WebKitBlobBuilder || d.MozBlobBuilder || function (b) { var d = function (a) { return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1] }, e = function () { this.data = [] }, g = function (a, c, b) { this.data = a; this.size = a.length; this.type = c; this.encoding = b }, f = e.prototype, h = g.prototype, q = b.FileReaderSync, r = function (a) { this.code = this[this.name = a] }, t = "NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "), l = t.length, k = b.URL || b.webkitURL || b, u = k.createObjectURL, v = k.revokeObjectURL, m = k, w = b.btoa, x = b.atob, p = b.ArrayBuffer, n = b.Uint8Array, y = /^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/; for (g.fake = h.fake = !0; l--;) r.prototype[t[l]] = l + 1; k.createObjectURL || (m = b.URL = function (a) { var c = document.createElementNS("http://www.w3.org/1999/xhtml", "a"); c.href = a; "origin" in c || ("data:" === c.protocol.toLowerCase() ? c.origin = null : (a = a.match(y), c.origin = a && a[1])); return c }); m.createObjectURL = function (a) { var c = a.type; null === c && (c = "application/octet-stream"); if (a instanceof g) return c = "data:" + c, "base64" === a.encoding ? c + ";base64," + a.data : "URI" === a.encoding ? c + "," + decodeURIComponent(a.data) : w ? c + ";base64," + w(a.data) : c + "," + encodeURIComponent(a.data); if (u) return u.call(k, a) }; m.revokeObjectURL = function (a) { "data:" !== a.substring(0, 5) && v && v.call(k, a) }; f.append = function (a) { var c = this.data; if (n && (a instanceof p || a instanceof n)) { var b = ""; a = new n(a); for (var e = 0, f = a.length; e < f; e++) b += String.fromCharCode(a[e]); c.push(b) } else if ("Blob" === d(a) || "File" === d(a)) if (q) b = new q, c.push(b.readAsBinaryString(a)); else throw new r("NOT_READABLE_ERR"); else a instanceof g ? "base64" === a.encoding && x ? c.push(x(a.data)) : "URI" === a.encoding ? c.push(decodeURIComponent(a.data)) : "raw" === a.encoding && c.push(a.data) : ("string" !== typeof a && (a += ""), c.push(unescape(encodeURIComponent(a)))) }; f.getBlob = function (a) { arguments.length || (a = null); return new g(this.data.join(""), a, "raw") }; f.toString = function () { return "[object BlobBuilder]" }; h.slice = function (a, c, b) { var d = arguments.length; 3 > d && (b = null); return new g(this.data.slice(a, 1 < d ? c : this.data.length), b, this.encoding) }; h.toString = function () { return "[object Blob]" }; h.close = function () { this.size = 0; delete this.data }; return e }(d); d.Blob = function (b, d) { var e = d ? d.type || "" : "", g = new p; if (b) for (var f = 0, h = b.length; f < h; f++) Uint8Array && b[f] instanceof Uint8Array ? g.append(b[f].buffer) : g.append(b[f]); e = g.getBlob(e); !e.slice && e.webkitSlice && (e.slice = e.webkitSlice); return e }; d.Blob.prototype = (Object.getPrototypeOf || function (b) { return b.__proto__ })(new d.Blob) })("undefined" !== typeof self && self || "undefined" !== typeof window && window || this);
}


if (!saveAs) {
    /* FileSaver.js
     * A saveAs() FileSaver implementation.
     * 1.3.8
     * 2018-03-22 14:03:47
     *
     * By Eli Grey, https://eligrey.com
     * License: MIT
     *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
     */

    /*global self */
    /*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

    /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/src/FileSaver.js */
    var saveAs = saveAs || function (b) { if (!("undefined" === typeof b || "undefined" !== typeof navigator && /MSIE [1-9]\./.test(navigator.userAgent))) { var f = b.document.createElementNS("http://www.w3.org/1999/xhtml", "a"), q = "download" in f, r = /constructor/i.test(b.HTMLElement) || b.safari, h = /CriOS\/[\d]+/.test(navigator.userAgent), k = b.setImmediate || b.setTimeout, t = function (a) { k(function () { throw a; }, 0) }, l = function (a) { setTimeout(function () { "string" === typeof a ? (b.URL || b.webkitURL || b).revokeObjectURL(a) : a.remove() }, 4E4) }, m = function (a) { return /^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type) ? new Blob([String.fromCharCode(65279), a], { type: a.type }) : a }, p = function (a, c, u) { u || (a = m(a)); var d = this, n = "application/octet-stream" === a.type, e, g = function () { for (var a = ["writestart", "progress", "write", "writeend"], a = [].concat(a), b = a.length; b--;) { var c = d["on" + a[b]]; if ("function" === typeof c) try { c.call(d, d) } catch (v) { t(v) } } }; d.readyState = d.INIT; q ? (e = (b.URL || b.webkitURL || b).createObjectURL(a), k(function () { f.href = e; f.download = c; var a = new MouseEvent("click"); f.dispatchEvent(a); g(); l(e); d.readyState = d.DONE }, 0)) : function () { if ((h || n && r) && b.FileReader) { var c = new FileReader; c.onloadend = function () { var a = h ? c.result : c.result.replace(/^data:[^;]*;/, "data:attachment/file;"); b.open(a, "_blank") || (b.location.href = a); d.readyState = d.DONE; g() }; c.readAsDataURL(a); d.readyState = d.INIT } else e || (e = (b.URL || b.webkitURL || b).createObjectURL(a)), n ? b.location.href = e : b.open(e, "_blank") || (b.location.href = e), d.readyState = d.DONE, g(), l(e) }() }, c = p.prototype; if ("undefined" !== typeof navigator && navigator.msSaveOrOpenBlob) return function (a, b, c) { b = b || a.name || "download"; c || (a = m(a)); return navigator.msSaveOrOpenBlob(a, b) }; c.abort = function () { }; c.readyState = c.INIT = 0; c.WRITING = 1; c.DONE = 2; c.error = c.onwritestart = c.onprogress = c.onwrite = c.onabort = c.onerror = c.onwriteend = null; return function (a, b, c) { return new p(a, b || a.name || "download", c) } } }("undefined" !== typeof self && self || "undefined" !== typeof window && window || this);
}

 
//将Json数据导出Excel
function JsonToExcel(filename , dataList, SheetName, Author) {
    dataList = Array.isArray(dataList) ? dataList : [dataList];
    var charSet = document.characterSet;
    var template = function (s, c) {
        return s.replace(/{(\w+)}/g, function (m, p) {
            return c[p];
        });
    };
    //获取文件扩展名
    var getFileExtension = function(fileName) {        
        var _fileName = (fileName + "").toLowerCase();
        var m = _fileName.match(/([.]{1}\w+)$/g);
        return m ? m[0] : "";
    }

    //模版
    {
        var tmpl = [];
        tmpl.push('<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">');
        tmpl.push('<head>');
        tmpl.push('<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>');
        tmpl.push('<meta name="ProgId" content="Excel.Sheet"/><meta name="Generator" content="WPS Office ET"/>');
        //文件信息
        tmpl.push('<!--[if gte mso 9]><xml>');
        tmpl.push('<o:DocumentProperties>');
        tmpl.push('<o:Author>{Author}</o:Author>');
        tmpl.push('<o:Created>{CreatedTime}</o:Created>');
        //tmpl.push('<o:LastAuthor>迭名</o:LastAuthor>');
        //tmpl.push('<o:LastSaved>2018-06-24T22:04:35</o:LastSaved>');
        tmpl.push('</o:DocumentProperties>');
        tmpl.push('<o:CustomDocumentProperties><o:KSOProductBuildVer dt:dt="string">2052-10.1.0.7400</o:KSOProductBuildVer></o:CustomDocumentProperties>');
        tmpl.push('</xml><![endif]-->');

        //样式
        tmpl.push('<style  type="text/css" >');
        tmpl.push('table,th,td{ font-family:"宋体";}');
        tmpl.push('</style>');

        //
        tmpl.push('<!--[if gte mso 9]> <xml>');
        tmpl.push('<x:ExcelWorkbook>');
        tmpl.push('<x:ExcelWorksheets>');
        tmpl.push('<x:ExcelWorksheet>');
        tmpl.push('<x:Name>{SheetName}</x:Name>');
        tmpl.push('<x:WorksheetOptions>');
        tmpl.push('<x:DefaultRowHeight>270</x:DefaultRowHeight>');
        tmpl.push('<x:Selected/>');
        tmpl.push('<x:Panes>');
        tmpl.push('<x:Pane>');
        tmpl.push('<x:Number>3</x:Number>');
        tmpl.push('<x:ActiveCol>0</x:ActiveCol>');
        tmpl.push('<x:ActiveRow>0</x:ActiveRow>');
        tmpl.push('</x:Pane>');
        tmpl.push('</x:Panes>');
        tmpl.push('<x:ProtectContents>False</x:ProtectContents>');
        tmpl.push('<x:ProtectObjects>False</x:ProtectObjects>');
        tmpl.push('<x:ProtectScenarios>False</x:ProtectScenarios>');
        tmpl.push('<x:PageBreakZoom>100</x:PageBreakZoom>');
        tmpl.push('<x:Print><x:PaperSizeIndex>9</x:PaperSizeIndex></x:Print>');
        tmpl.push('</x:WorksheetOptions>');
        tmpl.push('</x:ExcelWorksheet>');
        tmpl.push('</x:ExcelWorksheets>');
        tmpl.push('<x:ProtectStructure>False</x:ProtectStructure>');
        tmpl.push('<x:ProtectWindows>False</x:ProtectWindows>');
        tmpl.push('<x:SelectedSheets>0</x:SelectedSheets>');
        tmpl.push('<x:WindowHeight>12630</x:WindowHeight>');
        tmpl.push('<x:WindowWidth>28695</x:WindowWidth>');
        tmpl.push('</x:ExcelWorkbook>');
        tmpl.push('</xml><![endif]-->');
        tmpl.push('</head>');
        tmpl.push('<body link="blue" vlink="purple" ><table border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse;table-layout:fixed;" >{table}</table></body></html>');

    }

    var tHead = [], tBody = [];
    for (var ind = 0; ind < dataList.length; ind++) {
        if (tHead.length == 0) {
            tHead.push('<tr>');
            for (var name in dataList[ind]) {
                tHead.push('<td>' + name + '</td>');
            }
            tHead.push('</tr>');
        }

        tBody.push('<tr>');
        for (var name in dataList[ind]) {
            var value = dataList[ind][name];
            if (value === undefined || value === "" || value === null) {
                value = "";
            }
            tBody.push('<td>' + value + '</td>');
        }
        tBody.push('</tr>');
    }
    var data = template(tmpl.join(""), {
        Author: Author || "kingsoft",
        CreatedTime: new Date().toISOString(),
        SheetName: SheetName || 'Sheet1',
        table: tHead.join("") + tBody.join("")
    });

    filename = filename + "";
    var extReg = /\.xlsx?$/;
    var m = filename.match(extReg);
    var ext = m ? m[0] : "";

    if (ext != ".xls" && ext != ".xlsx") {
        ext = ".xlsx";
        filename += ext;
    }

    var accept = { ".xls": "application/vnd.ms-excel", ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" };
    saveAs(new Blob([data], { type: accept[ext] }), filename);

}


























