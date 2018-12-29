function AutoTime() {
    if (1 == TRun) {
        var a = new Date;
        Math.round(Math.round(a.getTime() - LastTime.getTime()) / 1e3) > 60 && Time_on_off()
    }
    setTimeout("AutoTime()", 1e3)
}

function Time_on_off() {
    1 == TRun ? (LastTime = new Date("2999/11/12 01:01:01"), TRun = 0, $("#klPause").show()) : (LastTime = new Date, TRun = 1, $("#klPause").hide())
}

function AutoNextExam() {
    try {
    } catch (b) {
    }
}

function showExamTp(a) {
    return a ? (EmTp = getExamTp(a), '<img src="' + EmTp + '" onclick="MaxEmTp(this.src);" title="点击放大">') : ""
}

function MaxEmTp(a) {
    var b = 510, c = 280;
    try {
        b = MaxEmTpMaskWidth, c = MaxEmTpMaskHeight
    } catch (d) {
    }
    $("#EmTpAreaHtml div p").html("&nbsp;<img src='" + a + "' ondblclick='window.open(this.src);'>&nbsp;"), MaskHtml = $("#EmTpAreaHtml").html(), YXL_Mask_Show(MaskHtml, b, c), MaskHtml = ""
}

function gotoExamPre() {
    gotoExam(orderPre)
}

function gotoExamNext() {
    gotoExam(orderNext)
}

function gotoExam(a) {
    var b, c, d, e, f, g, h, j, k, l, m, n, o, p;
    if (LastTime = new Date, isNaN(a)) return $("#order").attr("value", ""), !1;
    if (a = Math.abs(a), Math.abs(a - orderTmp) > 1 && (1 > a || a > ExamCount)) return ExamTip("题号输入超出范围［1～" + ExamCount + "］!"), $("#order").attr("value", ""), !1;
    if (1 > a) return ExamTip("已经是第一题了"), !1;
    if (a > ExamCount) return ExamTip("已经是最后一题了"), !1;
    if (orderTmp = a, $("#order").attr("title", ""), $("#order").attr("value", a), YXL_Mask_Hide(), b = ExamID[a], c = ExamTx[a], d = ExamTm[a], e = ExamTp[a], f = ExamDa[a], "" == d) try {
        g = $.ajax({
            type: "GET",
            url: "/ExamData/" + b + ".json?v=" + ExamVersion + ".json",
            timeout: 2e3,
            async: !1,
            dataType: "json"
        }).responseText, g || (g = "N404"), g.indexOf("404 Not Found") > 0 && (g = "N404"), g.indexOf("location") > 0 && (g = "N404"), g.indexOf("<body>") > 0 && (g = "N404"), h = jQuery.parseJSON(g), c = h["tx"], ExamTx[a] = c, d = h["tm"], ExamTm[a] = d, e = h["tv"], ExamTp[a] = e, f = h["da"], ExamDa[a] = f
    } catch (i) {
        return $("#ExamArea").html('<h3 id="ExamTit"><br/><br/><br/>试题读取没有成功！<br/><br/><br/><br/><br/><a href="javascript:location.reload();">点击这里重试...</a><br/><br/><br/><br/><br/><br/><br/></h3>'), !1
    }
    $("html,body").animate({scrollTop: 0}, 10), $("#ExamArea h5").hide(), tx = c, j = d.split("<br/>"), k = j[0], k = k || "", l = j[1], m = j[2], n = j[3], o = j[4], l = l || "", m = m || "", n = n || "", o = o || "", $("#ExamTit").html("<b>" + a + ".</b>&nbsp;&nbsp;" + k), $("#ExamOptA").html(l), $("#ExamOptB").html(m), $("#ExamOptC").html(n), $("#ExamOptD").html(o), e ? ($("#ExamArea div p").show(), $("#ExamArea div ul").addClass("tp"), $("#ExamArea div p").addClass("tp"), $("#ExamArea div p").html(showExamTp(e))) : ($("#ExamArea div p").hide(), $("#ExamArea div p").html(""), $("#ExamArea div ul").removeClass("tp"), $("#ExamArea div p").removeClass("tp")), 1 == c ? ($("#ExamOptA").html("正确"), $("#ExamOptB").html("错误"), $("#ExamOptC").hide(), $("#ExamOptD").hide()) : (2 == c || 3 == c) && ($("#ExamOptA").show(), $("#ExamOptB").show(), $("#ExamOptC").show(), $("#ExamOptD").show()), $("#ExamArea h5").hide(), $("#ExamArea h5").html(""), 3 != c || ExamDaSel[orderTmp] || ($("#ExamArea h5").show(), $("#ExamArea h5").html('<b>友情提醒：本题为多选题。</b><p onclick="gotoKey(\'OK\');" class="xk_b">确定 我选好了</p>')), KeyToView(), orderPre = a - 1, orderNext = a + 1, p = a / ExamCount, p = 1e3 * p, p = Math.round(p), 1 > p && (p = 1), p = p / 10 + "%", $("#jd").html(p), EDS = ""
}

function gotoKey(a) {
    var b, c, d;
    if (LastTime = new Date, b = ExamDaSel[orderTmp]) return !1;
    if (a = a.toUpperCase(), c = ExamTx[orderTmp], 3 == c) {
        if ("OK" != a) return "A" == a && (EDS.indexOf("A") >= 0 ? (EDS = EDS.replace(/A/g, ""), $("#ExamOptA").removeClass("kS")) : (EDS += "A", $("#ExamOptA").addClass("kS"))), "B" == a && (EDS.indexOf("B") >= 0 ? (EDS = EDS.replace(/B/g, ""), $("#ExamOptB").removeClass("kS")) : (EDS += "B", $("#ExamOptB").addClass("kS"))), "C" == a && (EDS.indexOf("C") >= 0 ? (EDS = EDS.replace(/C/g, ""), $("#ExamOptC").removeClass("kS")) : (EDS += "C", $("#ExamOptC").addClass("kS"))), "D" == a && (EDS.indexOf("D") >= 0 ? (EDS = EDS.replace(/D/g, ""), $("#ExamOptD").removeClass("kS")) : (EDS += "D", $("#ExamOptD").addClass("kS"))), EDS = formatKey(EDS), !1;
        if (a = EDS, !a) return ExamTip("请给出答案！"), !1;
        $("#ExamArea h5").hide(), $("#ExamArea h5").html("")
    } else 1 == c && (a = a.replace("A", "对"), a = a.replace("B", "错"));
    ExamDaSel[orderTmp] = a, ("" == a || void 0 == a || void 0 == b) && (b = ""), "" == b && (szl_y += 1, ExamDa[orderTmp] == ExamDaSel[orderTmp] && (szl_x += 1), d = Math.round(1e3 * (szl_x / szl_y)), $("#szl").html(d / 10 + "%"), $("#RCount").html(szl_x), $("#ECount").html(szl_y - szl_x)), KeyToView(), ExamDaSel[orderTmp] == ExamDa[orderTmp] ? isAuto = "Y" : (isAuto = "N", lx_AddCTJ());
    try {
        setPreOrder()
    } catch (e) {
    }
    AutoNextExam(isAuto)
}

function formatKey(a) {
    return a ? (a = a.toUpperCase(), svT = "", a.indexOf("A") >= 0 && (svT += "A"), a.indexOf("B") >= 0 && (svT += "B"), a.indexOf("C") >= 0 && (svT += "C"), a.indexOf("D") >= 0 && (svT += "D"), svT) : ""
}

function KeyToView() {
    var b, c, a = ExamDaSel[orderTmp];
    a = a.toUpperCase(), b = ExamDa[orderTmp], c = ExamTx[orderTmp], $("#ExamOpt li").removeClass("kR"), $("#ExamOpt li").removeClass("kE"), $("#ExamOpt li").removeClass("kH"), $("#ExamOpt li").removeClass("kK"), $("#ExamOpt li").removeClass("kS"), $("#ExamOpt li").addClass("kH"), a && (3 == c ? (b.indexOf("A") >= 0 && $("#ExamOptA").addClass("kR"), b.indexOf("B") >= 0 && $("#ExamOptB").addClass("kR"), b.indexOf("C") >= 0 && $("#ExamOptC").addClass("kR"), b.indexOf("D") >= 0 && $("#ExamOptD").addClass("kR"), a.indexOf("A") >= 0 && b.indexOf("A") < 0 && $("#ExamOptA").addClass("kE"), a.indexOf("B") >= 0 && b.indexOf("B") < 0 && $("#ExamOptB").addClass("kE"), a.indexOf("C") >= 0 && b.indexOf("C") < 0 && $("#ExamOptC").addClass("kE"), a.indexOf("D") >= 0 && b.indexOf("D") < 0 && $("#ExamOptD").addClass("kE")) : (a = a.replace("对", "A"), a = a.replace("错", "B"), b = b.replace("对", "A"), b = b.replace("错", "B"), $("#ExamOpt" + b).addClass("kR"), a != b && $("#ExamOpt" + a).addClass("kE")), RightKeyValView = b, 1 == c && (RightKeyValView = RightKeyValView.replace(/A/, "正确"), RightKeyValView = RightKeyValView.replace(/B/, "错误")), strT = a == b ? "<u>&nbsp;恭喜！回答正确:)&nbsp;</u>" : "<em>&nbsp;正确答案是：" + RightKeyValView + "&nbsp;</em>", strT = strT + "<i onclick='lx_TaoLun();' title='点击查看标准答案为什么是 " + RightKeyValView + " ？'>为什么是 " + RightKeyValView + " ?</i>", $("#ExamArea h5").html(strT), strT = "", $("#ExamArea h5").show())
}

function ExamNoteView(a) {
    var c, d, e, g, h, b = "http://tiba.jsyks.com/Post/" + ExamID[orderTmp] + ".htm";
    if ("TL" == a) return window.open(b), !1;
    if ("block" == $("#Tip_Mask").css("display")) return YXL_Mask_Hide(), !1;
    if (c = ExamNote[orderTmp], !c) try {
        d = $.ajax({
            type: "GET",
            url: "/ExamNote/" + ExamID[orderTmp] + ".json?v=" + ExamVersion + ".json",
            timeout: 2e3,
            async: !1,
            dataType: "json"
        }).responseText, d || (d = "N404"), d.indexOf("404 Not Found") > 0 && (d = "N404"), d.indexOf("location") > 0 && (d = "N404"), d.indexOf("<body>") > 0 && (d = "N404"), e = jQuery.parseJSON(d), c = e["Content"], $("#ENC").html(c), ExamNote[orderTmp] = c, d = ""
    } catch (f) {
    }
    c = c.replace("N404", ""), c || (c = "暂无分析"), c += '　<a href="' + b + '" onclick="YXL_Mask_Hide();" target="_blank">查看更详细的精彩分析..</a>', g = 420, h = 180;
    try {
        g = ExamNoteMaskWidth, h = ExamNoteMaskHeight
    } catch (f) {
    }
    $("#EmNoteAreaHtml div dl dt").html("第" + orderTmp + "题试题分析"), $("#EmNoteAreaHtml div p").html(c), MaskHtml = $("#EmNoteAreaHtml").html(), YXL_Mask_Show(MaskHtml, g, h), MaskHtml = "", c = ""
}

function lx_STFX() {
    ExamNoteView()
}

function lx_AddCTJ() {
    return "ctj" == kMk ? !1 : (AddCTJ(kTikuID, ExamID[orderTmp]), ExamTip("加入错题集完成", 700), void 0)
}

function lx_RemoveCTJ() {
    try {
        for (RemoveCTJ(kTikuID, ExamID[orderTmp]), i = orderTmp; ExamCount >= i; i++) ExamID[i] = ExamID[i + 1], ExamTm[i] = "", ExamDaSel[i] = "", ExamNote[i] = "";
        if (ExamCount--, orderTmp > ExamCount && (orderTmp = ExamCount), !(ExamCount > 0)) return $("#ExamArea").html('<h4><br/><br/><br/>当前已经没有错题了<br/><br/><br/><br/><br/><a href="/' + AppTagURL + kCx + "_" + kKm + "_zjlx/" + cssurl + '">点击这里先进行练习...</a><br/><br/><br/><br/></h4>'), $("#ExamTool").hide(), $("#ExamInfo").hide(), !1;
        gotoExam(orderTmp), $("#ViewExamCount").html(ExamCount), ExamTip("移出错题集完成", 700)
    } catch (a) {
    }
}

function lx_RemoveAllCTJ() {
    confirm("确认清空错题集11?") && (RemoveAllCTJ(kTikuID), ExamTip("错题集清空完毕!", 700), cssurl = cssurl.replace(/\\/g, "\\\\"), setTimeout('location="/' + AppTagURL + kCx + "_" + kKm + "_ctj/" + cssurl + '";', 1500))
}

function lx_TaoLun() {
    ExamNoteView("TL")
}

function ExamTip(a, b) {
    a ? (isNaN(b) && (b = 1e3), ft = 500, 1e3 > b && (ft = 300), $("#ExamTipArea").html("<p>" + a + "</p>"), $("#ExamTipArea").show(), setTimeout("ExamTip('');", b)) : $("#ExamTipArea").fadeOut(300, function () {
        $("#ExamTipArea").html("")
    })
}

function setPreOrder() {
    if (!(kModel.indexOf("-sxlx") > 0)) return !1;
    try {
        var a = "AppLX" + kModel + zid;
        setLocalData(a, orderTmp, 2592e3, "/")
    } catch (b) {
    }
}

function ReadPreOrder() {
    if (!(kModel.indexOf("-sxlx") > 0)) return !1;
    var a = "AppLX" + kModel + zid;
    orderTval = getLocalData(a) || "", orderTval && orderTval > 1 && ($("#miniTipT").html("友情提示"), $("#miniTipCc").html("您上次练习到了第 <b>" + orderTval + "</b> 题，<br/>是否从上次位置开始继续练习?"), $("#miniTip").show(), $("#btnTipY").show(), $("#btnTipN").show())
}

function ExamStart() {
    return "404" == ExamStatus ? ($("#ExamTool").hide(), $("#ExamInfo").hide(), $("#ExamArea").html("<h4><br/><br/><br/>" + ExamMsg + '<br/><br/><br/><br/><a href="/' + AppTagURL + kCx + "_" + kKm + "_zjlx/" + cssurl + '">点击这里先进行练习...</a><br/><br/><br/></h4>'), !1) : "200" != ExamStatus ? ($("#ExamTool").hide(), $("#ExamInfo").hide(), $("#ExamArea").html("<h4><br/><br/><br/>" + ExamMsg + '<br/><br/><br/><br/><a href="/' + AppTagURL + kCx + "_" + kKm + "_zjlx/" + cssurl + '">点击这里重试...</a><br/><br/><br/></h4>'), !1) : ExamCount ? ($("#ExamArea").html('<h3 id="ExamTit"></h3><div class="fcc"><ul id="ExamOpt"><li id="ExamOptA"></li><li id="ExamOptB"></li><li id="ExamOptC"></li><li id="ExamOptD"></li></ul><p></p></div><h5></h5><h6 id="ExamTipArea"></h6>'), $("#ExamArea div p").hide(), $("#ExamOptA").click(function () {
        gotoKey("A")
    }), $("#ExamOptB").click(function () {
        gotoKey("B")
    }), $("#ExamOptC").click(function () {
        gotoKey("C")
    }), $("#ExamOptD").click(function () {
        gotoKey("D")
    }), $("#btnTipY").click(function () {
        $("#miniTip").hide();
        try {
            gotoExam(orderTval)
        } catch (a) {
        }
    }), $("#btnTipN").click(function () {
        $("#miniTip").hide(), setPreOrder()
    }), $("#btnTipE").click(function () {
        location = "/" + kModel + "/"
    }), $("#ExamTool").html('<input type="button" id="btnPre" value="上一题"><input type="button" id="btnNext" value="下一题"><input type="button" id="btnFX" value="本题分析"><input type="button" id="btnTL" value="本题讨论"><input type="button" id="btnJRCTJ" value="加入错题集"><input type="button" id="btnYCCTJ" value="移出错题集"><input type="button" id="btnQKCTJ" value="清空错题集"><input type="button" id="btnSJB" value="手机版"><input type="button" id="btnPause" value="暂停">'), $("#ExamInfo").html('共<u id="ViewExamCount">' + ExamCount + '</u>题　转到第<input type="text" id="order" name="order" value="1" onkeyup="if(this.value){gotoExam(this.value);};" onKeypress="if (event.keyCode < 48 || event.keyCode > 57) event.returnValue = false;" maxlength="4">题　　答对：<b id="RCount">0</b> 题　答错：<i id="ECount">0</i> 题　首正率：<em id="szl">0%</em>　进度: <em id="jd">0%</em>'), kModel.indexOf("-ctj") > 0 ? ($("#btnJRCTJ").hide(), $("#btnYCCTJ").show(), $("#btnQKCTJ").show(), $("#btnSJB").hide()) : ($("#btnJRCTJ").show(), $("#btnYCCTJ").hide(), $("#btnQKCTJ").hide(), $("#btnSJB").show()), $("#btnFX").attr("title", "查看本题的详细分析和解释"), $("#btnTL").attr("title", "参与本题讨论"), $("#btnJRCTJ").attr("title", "将本题加入错题集"), $("#btnYCCTJ").attr("title", "将本题移出错题集"), $("#btnQKCTJ").attr("title", "清空错题集里面的所有试题"), "0000" != zid && $("#btnQKCTJ").attr("title", "清空本章错题集"), $("#btnPre").click(function () {
        gotoExamPre()
    }), $("#btnNext").click(function () {
        gotoExamNext()
    }), $("#btnFX").click(function () {
        ExamNoteView()
    }), $("#btnTL").click(function () {
        ExamNoteView("TL")
    }), $("#btnJRCTJ").click(function () {
        lx_AddCTJ()
    }), $("#btnYCCTJ").click(function () {
        lx_RemoveCTJ()
    }), $("#btnQKCTJ").click(function () {
        lx_RemoveAllCTJ()
    }), $("#btnSJB").click(function () {
        window.open("http://m.ybjk.com/down/")
    }), $("#btnPause").click(function () {
        Time_on_off()
    }), gotoExam(1), AutoTime(), LoadSuccess = "Y", void 0) : ($("#ExamArea").html('<h3 id="ExamTit" style="text-align:center;"><br/><br/><br/>试题读取没有成功！<br/><br/><br/><br/><br/><a href="javascript:location.reload();">点击这里重试...</a><br/><br/><br/></h3>'), !1)
}

var orderTmp, orderPre, orderNext, szl_x, szl_y, EDS, orderTval, ExamCount, ExamCodes, ExamStatus, ExamMsg, ExamID,
    ExamTm, ExamTp, ExamTx, ExamDa, ExamDaSel, ExamNote, ExamVersion = ExamVersion || "2017", TRun = 0,
    LastTime = new Date("2999/11/12 01:01:01");
if (TRun = 0, Time_on_off(), orderTmp = 1, orderPre = 0, orderNext = 0, szl_x = 0, szl_y = 0, EDS = "", orderTval = "", kModel.indexOf("-sxlx") > 0 && setTimeout("ReadPreOrder()", 500), ExamCount = 0, ExamCodes = ExamCodes || "", ExamStatus = ExamStatus || "", ExamMsg = ExamMsg || "", "200" == ExamStatus && (ExamCodes && (ExamCodeArray = ExamCodes.split(","), ExamCount = ExamCodeArray.length), ExamCount > 0)) for (ExamID = new Array(ExamCount), ExamTm = new Array(ExamCount), ExamTp = new Array(ExamCount), ExamTx = new Array(ExamCount), ExamDa = new Array(ExamCount), ExamDaSel = new Array(ExamCount), ExamNote = new Array(ExamCount), ExmC = 1; ExamCount >= ExmC; ExmC++) ExamID[ExmC] = ExamCodeArray[ExmC - 1], ExamTm[ExmC] = "", ExamTp[ExmC] = "", ExamTx[ExmC] = "", ExamDa[ExmC] = "", ExamDaSel[ExmC] = "", ExamNote[ExmC] = "";
setTimeout("ExamStart();", 200);