var myExamID=[],myExamOrder=[];
for(var i=0;i<allcount;i++){
   myExamOrder.push(i+1);
}
window.sectionList.forEach(function(item){
    for(var i=item[0];i<=item[1];i++){
        if(item.length==3&&item[2]!=0){
            myExamID.push(item[2].toString()+i)
        }else if(item.length==3&&item[2]==0){
            myExamID.push(i.toString());
        }
    }
})

var _tiebadomain = "http://tieba.jxedt.com/",_tiebaurl="";
// 检测用户输入是否正确
function userblur() {
    if (removeSpace($$("tbtestindex").value) == "" || isNaN($$("tbtestindex").value)) {
        var index = jsgetCookie(cookiename);
        $$("tbtestindex").value = index == "" ? "1" : index;
    }
}

function my_jsSetCookie(name, value, second,path)//三个参数  cookie名， cookie值， cookie过期时间（秒）,目录
{
    var exp = new Date();
    exp.setTime(exp.getTime() + second * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() +";path="+path;
}

function jsSetCookie(name, value, second)
{
    my_jsSetCookie(name, value, second,"/")
}


function my_alert(str){
    mjx.dialog.dialog("提示", str, {
        text: "确定", callback: function() {
        }
    })
}

// 判断是否输入完毕
var isfinsh = true;
function userkeyup() {
    isfinsh = true;
    // 延时500检测是否输入完毕
    setTimeout("userkeyupdo()", 500);
}
function userkeydown() {
    isfinsh = false;
}
function userkeyupdo() {
    if (isfinsh) {
        isfinsh = false;
        go(2);
    }
}
// 最佳解释状态
var _bestanswerstatus = 0;
onkeyupdothing();
function onkeyupdothing() {

    document.onkeyup = function(e) {
        if (!e)
            var e = window.event;
        var keycode = e.keyCode || e.which;
        if (keycode) {
            if (keycode == 37) {
                //上一题
                go('-1')
            } else if (keycode == 39) {
                //下一题
                go('0')
            } else if (keycode == 66) {
                //最佳解释
                closebsesanswer(_bestanswerstatus==0?false:true);
            }
        }
    }
}
function closebsesanswer(isclose){
    if(isclose){
        hideshowlogindiv('append_parent')
        _bestanswerstatus = 0
    }
    else{
        $$("btn_jieshi").click();
        _bestanswerstatus = 1
    }
}
function killerrors() {
    //return true;
}
window.onerror = killerrors;
// get题目

// 已经加载过的题
var list =[];
// 当前显示的题目下标
var i = 0;
//1 2 3 4 5 i = 4
//0 1 2 3 4
function gost(t,testType) {
    if (removeSpace($$("tbtestindex").value) != "" && !isNaN($$("tbtestindex").value)) {
        var qindex = parseInt($$("tbtestindex").value);
        var ids =parseInt($$("index").innerHTML);
        var ids1 = ids-1;
        var ids2 = ids+1;
        var testTypes = testType;
        if (t == "-1") {
            if (qindex > 1){
                alert(JSON.stringify(list[i-1]));
                var shang = list[i-1];
                $.ajax({
                    type: "POST",
                    url: "/test/shang",
                    data: {},
                    success: function(data){
                        $$("frm_main").innerHTML="<h1 class=\"title\"><span id=\"index\">"+ids1+"</span>/<span id=\"totalcount\"></span> &nbsp;<span id=\"t\">"+shang.question+"</span></h1>" +
                            "  <input type=\"hidden\" name=\"TrueRe\" id=\"TrueRe\">" +
                            "  <input type=\"hidden\" name=\"web_note_id\" id=\"web_note_id\">" +
                            "  <div class=\"lx_item\">" +
                            "  <ul id=\"ul_answers\">" +
                            "  <li><input type=\"radio\" id='r1' onclick=\"tjanswer(1,"+shang.answer+","+shang.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">A："+shang.item1+"</label></li>" +
                            "  <input type=\"hidden\" id=\"cans1\" value='"+shang.item1+"'>" +
                            "  <li><input type=\"radio\" id='r2' onclick=\"tjanswer(2,"+shang.answer+","+shang.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">B："+shang.item2+"</label></li>" +
                            "  <input type=\"hidden\" id=\"cans2\" value='"+shang.item2+"'>" +
                            "  <li><input type=\"radio\" id='r3' onclick=\"tjanswer(3,"+shang.answer+","+shang.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">C："+shang.item3+"</label></li>" +
                            "  <input type=\"hidden\" id=\"cans3\" value='"+shang.item3+"'>" +
                            "  <li><input type=\"radio\" id='r4' onclick=\"tjanswer(4,"+shang.answer+","+shang.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">D："+shang.item4+"</label></li>" +
                            "  <input type=\"hidden\" id=\"cans4\" value='"+shang.item4+"'>" +
                            "  </ul>" +
                            "  <div class=\"right\" id=\"qustionpic\" style=\" verflow:hidden;\"><input type=\"hidden\" id=\"urls\" value='"+shang.url+"'><img src='"+shang.url+"' id='urls' ></div>" +
                            "  </div>" +
                            "  <div class=\"clear\"></div>" +
                            "  <div class=\"chk_an\"><span id=\"rightanswer\" style=\"display: none\"></span></div>" +
                            "  <div class=\"clear\"></div>" +
                            "  <div class=\"btns\">" +
                            "  <a href=\"javascript:void(0)\" class=\"inp sp\" id=\"sp_lxindex\" style=\"display:none\">1/1330</a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"gost('0','"+testTypes+"')\"><input type=\"button\" class=\"btn green\" value=\"下一题\" /></a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"gost('-1','"+testTypes+"')\"><input type=\"button\" class=\"btn green\" value=\"上一题\" /></a>" +
                            "  <input type=\"hidden\" id=\"explanis\" value='"+shang.explains+"'>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"jieshi('"+shang.explains+"')\"><input type=\"button\" class=\"btn grey\" value=\"本题解释\" /></a>" +
                            "  </div>" +
                            "  ";
                            $$("tbtestindex").value = qindex-1;
                            $("#totalcount").html($("#quallcount").html());
                    },
                    dataType: "json"
                });
                if(shang.daan!=undefined){
                    if(shang.daan==1){
                        alert(111);
                        $$("r1").checked=true;
                    }else if(shang.daan==2){
                        alert(2222);
                        $$("r2").checked=true;
                    }else if(shang.daan==3){
                        alert(3333);
                        $$("r3").checked=true;
                    }else if(shang.daan==4){
                        alert(4444);
                        $$("r4").checked=true;
                    }
                    for (var o = 0; o < $$("ul_answers").getElementsByTagName("input").length; o++) {
                        $$("ul_answers").getElementsByTagName("input")[o].disabled = "disabled";
                    }
                    if(shang.daan!=shang.daans){
                        alert(66666);
                        var tans;
                        if(shang.daans=="1"){
                            tans="A";
                        }
                        if(shang.daans=="2"){
                            tans="B";
                        }
                        if(shang.daans=="3"){
                            tans="C";
                        }
                        if(shang.daans=="4"){
                            tans="D";
                        }
                        $$("rightanswer").innerHTML = "<span class='an_result an_wrong'>您答错了！标准答案是：" + tans + "</span> <font class='an_why'' onclick='gototieba()'>为什么"+whyselecttxt+" "+tans+"？</font>"
                    }else{
                        alert(7777);
                        $$("rightanswer").innerHTML = "<span class='an_result an_right'>恭喜你，答对了！</span>"
                    }
                }
                i=i-1;
            }
            else {
                my_alert("已经是第一题");
            }
        }
        else if (t == "0") {
            if (qindex < parseInt($$("quallcount").innerHTML)){
                if($.inArray(list[i+1],list)==-1){
                    $.ajax({
                        type: "POST",
                        url: "/test/xia",
                        data: {index:qindex,subject:"1",model:"c1",testType:testTypes},
                        success: function(data){
                            list.push(data);
                            i=list.length-1;
                            alert(i);
                            alert(list);
                            $$("frm_main").innerHTML="<h1 class=\"title\"><span id=\"index\">"+ids2+"</span>/<span id=\"totalcount\"></span> &nbsp;<span id=\"t\">"+data.question+"</span></h1>" +
                                "  <input type=\"hidden\" name=\"TrueRe\" id=\"TrueRe\">" +
                                "  <input type=\"hidden\" name=\"web_note_id\" id=\"web_note_id\">" +
                                "  <div class=\"lx_item\">" +
                                "  <ul id=\"ul_answers\">" +
                                "  <li><input type=\"radio\" onclick=\"tjanswer(1,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">A："+data.item1+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans1\" value='"+data.item1+"'>" +
                                "  <li><input type=\"radio\" onclick=\"tjanswer(2,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">B："+data.item2+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans2\" value='"+data.item2+"'>" +
                                "  <li><input type=\"radio\" onclick=\"tjanswer(3,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">C："+data.item3+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans3\" value='"+data.item3+"'>" +
                                "  <li><input type=\"radio\" onclick=\"tjanswer(4,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">D："+data.item4+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans4\" value='"+data.item4+"'>" +
                                "  </ul>" +
                                "  <div class=\"right\" id=\"qustionpic\" style=\" verflow:hidden;\"><input type=\"hidden\" id=\"urls\" value='"+data.url+"'><img src='"+data.url+"' id='urls'></div>" +
                                "  </div>" +
                                "  <div class=\"clear\"></div>" +
                                "  <div class=\"chk_an\"><span id=\"rightanswer\" style=\"display: none\"></span></div>" +
                                "  <div class=\"clear\"></div>" +
                                "  <div class=\"btns\">" +
                                "  <a href=\"javascript:void(0)\" class=\"inp sp\" id=\"sp_lxindex\" style=\"display:none\">1/1330</a>" +
                                "  <a href=\"javascript:void(0)\" onclick=\"gost('0','"+testTypes+"')\"><input type=\"button\" class=\"btn green\" value=\"下一题\" /></a>" +
                                "  <a href=\"javascript:void(0)\" onclick=\"gost('-1','"+testTypes+"')\"><input type=\"button\" class=\"btn green\" value=\"上一题\" /></a>" +
                                "  <input type=\"hidden\" id=\"explanis\" value='"+data.explains+"'>" +
                                "  <a href=\"javascript:void(0)\" onclick=\"jieshi('"+data.explains+"')\"><input type=\"button\" class=\"btn grey\" value=\"本题解释\" /></a>" +
                                "  </div>" +
                                "  ";
                            $$("tbtestindex").value = qindex+1;
                            $("#totalcount").html($("#quallcount").html());
                        },
                        dataType: "json"
                    });
                }else{
                    alert(JSON.stringify(list[i+1]));
                    var xia = list[i+1];
                    $.ajax({
                        type: "POST",
                        url: "/test/xias",
                        data: {},
                        success: function(data){
                            $$("frm_main").innerHTML="<h1 class=\"title\"><span id=\"index\">"+ids2+"</span>/<span id=\"totalcount\"></span> &nbsp;<span id=\"t\">"+xia.question+"</span></h1>" +
                                "  <input type=\"hidden\" name=\"TrueRe\" id=\"TrueRe\">" +
                                "  <input type=\"hidden\" name=\"web_note_id\" id=\"web_note_id\">" +
                                "  <div class=\"lx_item\">" +
                                "  <ul id=\"ul_answers\">" +
                                "  <li><input type=\"radio\" id='r1' onclick=\"tjanswer(1,"+xia.answer+","+xia.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">A："+xia.item1+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans1\" value='"+xia.item1+"'>" +
                                "  <li><input type=\"radio\" id='r2' onclick=\"tjanswer(2,"+xia.answer+","+xia.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">B："+xia.item2+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans2\" value='"+xia.item2+"'>" +
                                "  <li><input type=\"radio\" id='r3' onclick=\"tjanswer(3,"+xia.answer+","+xia.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">C："+xia.item3+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans3\" value='"+xia.item3+"'>" +
                                "  <li><input type=\"radio\" id='r4' onclick=\"tjanswer(4,"+xia.answer+","+xia.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">D："+xia.item4+"</label></li>" +
                                "  <input type=\"hidden\" id=\"cans4\" value='"+xia.item4+"'>" +
                                "  </ul>" +
                                "  <div class=\"right\" id=\"qustionpic\" style=\" verflow:hidden;\"><input type=\"hidden\" id=\"urls\" value='"+xia.url+"'><img src='"+xia.url+"' id='urls' ></div>" +
                                "  </div>" +
                                "  <div class=\"clear\"></div>" +
                                "  <div class=\"chk_an\"><span id=\"rightanswer\" style=\"display: none\"></span></div>" +
                                "  <div class=\"clear\"></div>" +
                                "  <div class=\"btns\">" +
                                "  <a href=\"javascript:void(0)\" class=\"inp sp\" id=\"sp_lxindex\" style=\"display:none\">1/1330</a>" +
                                "  <a href=\"javascript:void(0)\" onclick=\"gost('0','"+testTypes+"')\"><input type=\"button\" class=\"btn green\" value=\"下一题\" /></a>" +
                                "  <a href=\"javascript:void(0)\" onclick=\"gost('-1','"+testTypes+"')\"><input type=\"button\" class=\"btn green\" value=\"上一题\" /></a>" +
                                "  <input type=\"hidden\" id=\"explanis\" value='"+xia.explains+"'>" +
                                "  <a href=\"javascript:void(0)\" onclick=\"jieshi('"+xia.explains+"')\"><input type=\"button\" class=\"btn grey\" value=\"本题解释\" /></a>" +
                                "  </div>" +
                                "  ";
                            $$("tbtestindex").value = qindex+1;
                            $("#totalcount").html($("#quallcount").html());
                        },
                        dataType: "json"
                    });
                    if(xia.daan!=undefined){
                        if(xia.daan==1){
                            alert(111);
                            $$("r1").checked=true;
                        }else if(xia.daan==2){
                            alert(2222);
                            $$("r2").checked=true;
                        }else if(xia.daan==3){
                            alert(3333);
                            $$("r3").checked=true;
                        }else if(xia.daan==4){
                            alert(4444);
                            $$("r4").checked=true;
                        }
                        for (var o = 0; o < $$("ul_answers").getElementsByTagName("input").length; o++) {
                            $$("ul_answers").getElementsByTagName("input")[o].disabled = "disabled";
                        }
                        if(xia.daan!=xia.daans){
                            alert(66666);
                            var tans;
                            if(xia.daans=="1"){
                                tans="A";
                            }
                            if(xia.daans=="2"){
                                tans="B";
                            }
                            if(xia.daans=="3"){
                                tans="C";
                            }
                            if(xia.daans=="4"){
                                tans="D";
                            }
                            $$("rightanswer").innerHTML = "<span class='an_result an_wrong'>您答错了！标准答案是：" + tans + "</span> <font class='an_why'' onclick='gototieba()'>为什么"+whyselecttxt+" "+tans+"？</font>"
                        }else{
                            alert(7777);
                            //$$("rightanswer").innerHTML = "<span class='an_result an_right'>恭喜你，答对了！</span>"
                        }
                    }
                    i=i+1;
                }
            }
            else {
                my_alert("已经是最后一题");
            }
        } else {
            if (qindex < 1) {
                my_alert("请输入大于0的数字");
                $$("tbtestindex").value = 1;
            }
            else if (qindex > parseInt($$("quallcount").innerHTML)) {
                my_alert("题号必须小于总题数");
                $$("tbtestindex").value = $$("quallcount").innerHTML;
            } else {
                getModel(qindex);
            }
        }
    }
}

function gosts(t) {
    if (removeSpace($$("tbtestindex").value) != "" && !isNaN($$("tbtestindex").value)) {
        var qindex = parseInt($$("tbtestindex").value);
        var ids =parseInt($$("index").innerHTML);
        var ids1 = ids-1;
        var ids2 = ids+1;
        if (t == "-1") {
            if (qindex > 1){
                $.ajax({
                    type: "POST",
                    url: "/test/cshang",
                    data: {index:qindex},
                    success: function(data){
                        $$("frm_main").innerHTML="<h1 class=\"title\"><span id=\"index\">"+ids1+"</span>/<span id=\"totalcount\"></span> &nbsp;<span id=\"t\">"+data.question+"</span></h1>" +
                            "  <input type=\"hidden\" name=\"TrueRe\" id=\"TrueRe\">" +
                            "  <input type=\"hidden\" name=\"web_note_id\" id=\"web_note_id\">" +
                            "  <div class=\"lx_item\">" +
                            "  <ul id=\"ul_answers\">" +
                            "  <input type='hidden' id='cids' value='"+data.id+"'>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(1,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">A："+data.item1+"</label></li>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(2,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">B："+data.item2+"</label></li>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(3,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">C："+data.item3+"</label></li>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(4,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">D："+data.item4+"</label></li>" +
                            "  </ul>" +
                            "  <div class=\"right\" id=\"qustionpic\" style=\" verflow:hidden;\"><img src='"+data.url+"' id='urls'></div>" +
                            "  </div>" +
                            "  <div class=\"clear\"></div>" +
                            "  <div class=\"chk_an\"><span id=\"rightanswer\" style=\"display: none\"></span></div>" +
                            "  <div class=\"clear\"></div>" +
                            "  <div class=\"btns\">" +
                            "  <a href=\"javascript:void(0)\" class=\"inp sp\" id=\"sp_lxindex\" style=\"display:none\">1/1330</a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"gosts(0)\"><input type=\"button\" class=\"btn green\" value=\"下一题\" /></a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"gosts(-1)\"><input type=\"button\" class=\"btn green\" value=\"上一题\" /></a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"jieshi('"+data.explains+"')\"><input type=\"button\" class=\"btn grey\" value=\"本题解释\" /></a>" +
                            "  </div>" +
                            "  ";
                        $$("tbtestindex").value = qindex-1;
                        $("#totalcount").html($("#quallcount").html());
                    },
                    dataType: "json"
                });
            }
            else {
                my_alert("已经是第一题");
            }
        }
        else if (t == "0") {
            if (qindex < parseInt($$("quallcount").innerHTML)){
                $.ajax({
                    type: "POST",
                    url: "/test/cxia",
                    data: {index:qindex},
                    success: function(data){
                       $$("frm_main").innerHTML="<h1 class=\"title\"><span id=\"index\">"+ids2+"</span>/<span id=\"totalcount\"></span> &nbsp;<span id=\"t\">"+data.question+"</span></h1>" +
                            "  <input type=\"hidden\" name=\"TrueRe\" id=\"TrueRe\">" +
                            "  <input type=\"hidden\" name=\"web_note_id\" id=\"web_note_id\">" +
                            "  <div class=\"lx_item\">" +
                            "  <ul id=\"ul_answers\">" +
                            "  <input type='hidden' id='cids' value='"+data.id+"'>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(1,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">A："+data.item1+"</label></li>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(2,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">B："+data.item2+"</label></li>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(3,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">C："+data.item3+"</label></li>" +
                            "  <li><input type=\"radio\" onclick=\"tjanswers(4,"+data.answer+","+data.id+")\" value=\"A\" name=\"answer\" id=\"answer1\"><label for=\"answer1\">D："+data.item4+"</label></li>" +
                            "  </ul>" +
                            "  <div class=\"right\" id=\"qustionpic\" style=\" verflow:hidden;\"><img src='"+data.url+"' id='urls'></div>" +
                            "  </div>" +
                            "  <div class=\"clear\"></div>" +
                            "  <div class=\"chk_an\"><span id=\"rightanswer\" style=\"display: none\"></span></div>" +
                            "  <div class=\"clear\"></div>" +
                            "  <div class=\"btns\">" +
                            "  <a href=\"javascript:void(0)\" class=\"inp sp\" id=\"sp_lxindex\" style=\"display:none\">1/1330</a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"gosts(0)\"><input type=\"button\" class=\"btn green\" value=\"下一题\" /></a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"gosts(-1)\"><input type=\"button\" class=\"btn green\" value=\"上一题\" /></a>" +
                            "  <a href=\"javascript:void(0)\" onclick=\"jieshi('"+data.explains+"')\"><input type=\"button\" class=\"btn grey\" value=\"本题解释\" /></a>" +
                            "  </div>" +
                            "  ";
                        $$("tbtestindex").value = qindex+1;
                        $("#totalcount").html($("#quallcount").html());
                    },
                    dataType: "json"
                });
            }
            else {
                my_alert("已经是最后一题");
            }
        } else {
            if (qindex < 1) {
                my_alert("请输入大于0的数字");
                $$("tbtestindex").value = 1;
            }
            else if (qindex > parseInt($$("quallcount").innerHTML)) {
                my_alert("题号必须小于总题数");
                $$("tbtestindex").value = $$("quallcount").innerHTML;
            } else {
                getModel(qindex);
            }
        }
    }
}

var isUserCal = new Array(100000);
for (cali = 1; cali < 100000; cali++) { isUserCal[cali] = 0 }

function jieshi(wenti){
    mjx.dialog.dialog("本题解释",  wenti ,{
        text: ""
    })
}


function tjanswer(man, tan, id) {
    list[list.length-1].daan=man;
    list[list.length-1].daans=tan;
    // 此处触发
    set_all_hascount(id);
    var ctan = tan;
    $$("rightanswer").style.display = "block";
    for (var o = 0; o < $$("ul_answers").getElementsByTagName("input").length; o++) {
        $$("ul_answers").getElementsByTagName("input")[o].disabled = "disabled";
    }
    var flag = false;
    if ($$("TrueNum") != null) {
        flag = true;
    }
    if (flag == true) {
        var alltrue = parseInt($$("TrueNum").innerHTML);
        var allfalse = parseInt($$("FalseNum").innerHTML);
    }

    var whyselecttxt='选';
    if(tan=='正确'||tan=='错误'){
        whyselecttxt='是';
    }

    if (man == tan) {

        $$("rightanswer").style.textAlign='left';
        $$("rightanswer").style.width='100%';

        if(tan=="1"){
            tan="A";
        }
        if(tan=="2"){
            tan="B";
        }
        if(tan=="3"){
            tan="C";
        }
        if(tan=="4"){
            tan="D";
        }

        $$("rightanswer").innerHTML = "<span class='an_result an_right'>恭喜你，答对了！</span> <font class='an_why' onclick='gototieba()'>为什么"+whyselecttxt+" "+tan+"？</font>";

        if (isUserCal[id] == 0) {

            if (flag == true) {
                alltrue += 1;
                $$("TrueNum").innerHTML = alltrue;
            }
        }

    } else {

        $$("rightanswer").style.textAlign='left';
        $$("rightanswer").style.width='100%';

        if(tan=="1"){
            tan="A";
        }
        if(tan=="2"){
            tan="B";
        }
        if(tan=="3"){
            tan="C";
        }
        if(tan=="4"){
            tan="D";
        }

        $$("rightanswer").innerHTML = "<span class='an_result an_wrong'>您答错了！标准答案是：" + tan + "</span> <font class='an_why'' onclick='gototieba()'>为什么"+whyselecttxt+" "+tan+"？</font>";
        $.ajax({
            type: "POST",
            url: "/test/cuo",
            data: {cid:id,
                   cquestion:$$("t").innerHTML,
                   canswer:ctan,
                   citem1:$$("cans1").value,
                   citem2:$$("cans2").value,
                   citem3:$$("cans3").value,
                   citem4:$$("cans4").value,
                   cexplanis:$$("explanis").value,
                   curl:$$("urls").value},
            success: function(data){
               if(data>0){
                   alert("已加入错题集");
               }
            },
            dataType: "json"
        });
        if(typeof(errorcountforscan)=='undefined'){
            var errorcookies = jsgetCookie(errorcookiename);
            var errorcookiearr = errorcookies.split("e");
            errorcountforscan = errorcookiearr.length;
        }
        errorcountforscan++;
        if(errorcountforscan%4==0){
           // document.getElementById('synchro').style.display="block";
        }

        if (isUserCal[id] == 0) {
            if (flag == true) {
                allfalse += 1;
                $$("FalseNum").innerHTML = allfalse;
                remberError(id);
            }
        }
    }
    if (flag == true) {

        if (isUserCal[id] == 0) {
            $$("TruePre").innerHTML = String(((alltrue / parseFloat(alltrue + allfalse)) * 100).toFixed(2)) + "%";
        }
    }

    isUserCal[id] = 1;
}

function tjanswers(man, tan, id) {
    // 此处触发
    set_all_hascount(id);
    var ctan = tan;
    $$("rightanswer").style.display = "block";
    for (var o = 0; o < $$("ul_answers").getElementsByTagName("input").length; o++) {
        $$("ul_answers").getElementsByTagName("input")[o].disabled = "disabled";
    }
    var flag = false;
    if ($$("TrueNum") != null) {
        flag = true;
    }
    if (flag == true) {
        var alltrue = parseInt($$("TrueNum").innerHTML);
        var allfalse = parseInt($$("FalseNum").innerHTML);
    }

    var whyselecttxt='选';
    if(tan=='正确'||tan=='错误'){
        whyselecttxt='是';
    }

    if (man == tan) {

        $$("rightanswer").style.textAlign='left';
        $$("rightanswer").style.width='100%';

        if(tan=="1"){
            tan="A";
        }
        if(tan=="2"){
            tan="B";
        }
        if(tan=="3"){
            tan="C";
        }
        if(tan=="4"){
            tan="D";
        }

        $$("rightanswer").innerHTML = "<span class='an_result an_right'>恭喜你，答对了！</span> <font class='an_why' onclick='gototieba()'>为什么"+whyselecttxt+" "+tan+"？</font>";
        $.ajax({
            type: "POST",
            url: "/test/cdel",
            data: {cids:$$("cids").value},
            success: function(data){
                if(data>0){
                    alert("已移除错题集");
                    window.location.href="questionQuery";
                }
            },
            dataType: "json"
        });
        if (isUserCal[id] == 0) {

            if (flag == true) {
                alltrue += 1;
                $$("TrueNum").innerHTML = alltrue;
            }
        }

    } else {

        $$("rightanswer").style.textAlign='left';
        $$("rightanswer").style.width='100%';

        if(tan=="1"){
            tan="A";
        }
        if(tan=="2"){
            tan="B";
        }
        if(tan=="3"){
            tan="C";
        }
        if(tan=="4"){
            tan="D";
        }

        $$("rightanswer").innerHTML = "<span class='an_result an_wrong'>您答错了！标准答案是：" + tan + "</span> <font class='an_why'' onclick='gototieba()'>为什么"+whyselecttxt+" "+tan+"？</font>";
        if(typeof(errorcountforscan)=='undefined'){
            var errorcookies = jsgetCookie(errorcookiename);
            var errorcookiearr = errorcookies.split("e");
            errorcountforscan = errorcookiearr.length;
        }
        errorcountforscan++;
        if(errorcountforscan%4==0){
            // document.getElementById('synchro').style.display="block";
        }

        if (isUserCal[id] == 0) {
            if (flag == true) {
                allfalse += 1;
                $$("FalseNum").innerHTML = allfalse;
                remberError(id);
            }
        }
    }
    if (flag == true) {

        if (isUserCal[id] == 0) {
            $$("TruePre").innerHTML = String(((alltrue / parseFloat(alltrue + allfalse)) * 100).toFixed(2)) + "%";
        }
    }

    isUserCal[id] = 1;
}

//多选提交
function tjanswer2(ta, id) {
    // 此处触发
    set_all_hascount(id);

    var myloanase = "";
    for (i = 1; i < 5; i++) {

        if ( $$("answer" + i) !=null && $$("answer" + i).checked) {
            myloanase += $$("answer" + i).value;
        }
    }
    if (myloanase == "") { my_alert("请选择答案！"); return; }
    if (myloanase.length < 2) { my_alert("多选题，请选择多项！"); return; }
    tjanswer(myloanase, ta, id)

}


//按钮不可按钮

function BtnCantdo() {
    $$("wartingdiv").style.display = "";
    $(".lx_type").hide();
    $$("frm_main").style.display = "none";
    $$("tbtestindex").onkeyup = function() { return false; }
    document.onkeyup = function(e) { return false }
    var abtn = document.getElementsByTagName("a");
    for (ai = 0; ai < abtn.length; ai++) {
        if (abtn.item(ai).innerHTML == "上一题" || abtn.item(ai).innerHTML == "下一题") {
            abtn.item(ai).onclick = function() { return false }
        }
    }
}

//按钮可按钮
function BtnCando() {
    $$("wartingdiv").style.display = "none";
    $$("frm_main").style.display = "block";
    onkeyupdothing();
    $$("tbtestindex").onkeyup = function() { userkeyup() }
    var abtn = document.getElementsByTagName("a");
    for (ai = 0; ai < abtn.length; ai++) {
        if (abtn.item(ai).innerHTML == "上一题") {
            abtn.item(ai).onclick = function() { go(-1) }
        }
        if (abtn.item(ai).innerHTML == "下一题") {
            abtn.item(ai).onclick = function() { go(0) }
        }
    }

}


function chushihua() {
    BtnCantdo();
    $$("rightanswer").style.display = "none";
}




//选项显示

function itemsshow(json, index) {

    closebsesanswer(true);
    $("#index").html(String(index));
    $$("t").innerHTML =   json.question;
    var htmlcode = "";
    $(".lx_type").show();
    if (json.Type == "2") {
        $(".lx_type").html("单选题")
        var ta = json.ta;
        switch (ta) {
            case "1": ta = "A"; break;
            case "2": ta = "B"; break;
            case "3": ta = "C"; break;
            case "4": ta = "D"; break;
            default: break;
        }
        htmlcode += "<li><input onclick=\"tjanswer('A','" + ta + "','" + json.id + "');\" type=\"radio\" value=\"A\" name=\"answer\" id='answer1' /><label for='answer1'>A：" + json.a + "</label></li>";
        htmlcode += "<li><input onclick=\"tjanswer('B','" + ta + "','" + json.id + "');\" type=\"radio\" value=\"B\" name=\"answer\" id='answer2' /><label for='answer2'>B：" + json.b + "</label></li>";
        htmlcode += "<li><input onclick=\"tjanswer('C','" + ta + "','" + json.id + "');\" type=\"radio\" value=\"C\" name=\"answer\"  id='answer3'/><label for='answer3'>C：" + json.c + "</label></li>";
        if(json.d!=""){
            htmlcode += "<li><input onclick=\"tjanswer('D','" + ta + "','" + json.id + "');\" type=\"radio\" value=\"D\" name=\"answer\"  id='answer4'/><label for='answer4'>D：" + json.d + "</label></li>";
        }
    }
    else if (json.Type == "1") {
        $(".lx_type").html("判断题")
        var ta = json.ta;
        switch (ta) {
            case "1": ta = "正确"; break;
            case "2": ta = "错误"; break;
            default: break;
        }
        htmlcode += "<li><input onclick=\"tjanswer('正确','" + ta + "','" + json.id + "');\" type=\"radio\" value=\"A\" name=\"answer\" id='answer1' /><label for='answer1'>正确</label></li>";
        htmlcode += "<li><input onclick=\"tjanswer('错误','" + ta + "','" + json.id + "');\" type=\"radio\" value=\"B\" name=\"answer\" id='answer2' /><label for='answer2'>错误</label></li>";
    }

    else if (json.Type == "3") {

        $(".lx_type").html("多选题")
        var ta = json.ta;
        switch (ta) {
            case "12": ta = "AB"; break;
            case "13": ta = "AC"; break;
            case "14": ta = "AD"; break;
            case "23": ta = "BC"; break;
            case "24": ta = "BD"; break;
            case "34": ta = "CD"; break;
            case "123": ta = "ABC"; break;
            case "124": ta = "ABD"; break;
            case "134": ta = "ACD"; break;
            case "234": ta = "BCD"; break;
            case "1234": ta = "ABCD"; break;
            default: break;
        }

        htmlcode += "<li><input  type=\"checkbox\" value=\"A\" name=\"answer\" id='answer1' /><label for='answer1'>A：" + json.a + "</label></li>";
        htmlcode += "<li><input  type=\"checkbox\" value=\"B\" name=\"answer\" id='answer2' /><label for='answer2'>B：" + json.b + "</label></li>";
        htmlcode += "<li><input  type=\"checkbox\" value=\"C\" name=\"answer\" id='answer3' /><label for='answer3'>C：" + json.c + "</label></li>";
        if(json.d!=""){
            htmlcode += "<li><input  type=\"checkbox\" value=\"D\" name=\"answer\" id='answer4' /><label for='answer4'>D：" + json.d + "</label></li>";
        }
        htmlcode += "<li><a class='btn green' href='javascript:void(0)' onclick=\"tjanswer2('" + ta + "','" + json.id + "')\">提交</a></li>";

    }



    $$("ul_answers").innerHTML = htmlcode;

    if (json.imageurl && json.imageurl != "") {

        if (json.imageurl.indexOf(".swf") > -1) {
            var  _wid = 350, _hei = 155;
            var _zzc = "position:absolute;top:0;right:0px;width:" + _wid + "px;height:" + _hei + "px;z-index:990;background:#000000;";
            if (window.ActiveXObject)
                _zzc += "filter:alpha(opacity=20);";
            else
                _zzc += "opacity:0.2;";
            htmlstrswf = "<div id=\"d_flashplayer\" class=\"playflash\" style=\"position: absolute;z-index:10;right:0px;top: 0;width:" + _wid + "px; height:" + _hei + "px; overflow:hidden\"><img style=\"width: " + _wid + "px;max-width: " + _wid + "px;_width: " + _wid + "px;\" src=\"" + json.imageurl + ".jpg\"/></div><div id=\"remove_flashplayer\" style=\"" + _zzc + "\"></div><a title=\"点击播放视频\" style=\"width: 58px;height: 56px;background: url("+picPath+"/ico_goplay.png);display: block;position: absolute;top: 47px;right: 135px;z-index:999;\" onclick=\"showbflash('"+json.imageurl+"',500,222)\" href=\"javascript:void(0)\"></a><input id=\"hidden_flashplayer\" value=\"" + json.imageurl + "\" type=\"hidden\"/>";
            $$("qustionpic").style.overflow = "visible";
            $$("qustionpic").innerHTML = htmlstrswf

        } else {
            $$("qustionpic").style.overflow = "hidden";
            var weibofex = Math.floor(Math.random()*3)+1;
            var _bigpic = "http://ww"+weibofex+".sinaimg.cn/mw600/"+json.sinaimg;
            var _smallpic = "http://ww"+weibofex+".sinaimg.cn/mw600/"+json.sinaimg;
            if(json.sinaimg == ''){
                if(json.imageurl.indexOf(".mp4")>-1){
                   _bigpic="http://img.58cdn.com.cn/jxedt/img/video/"+json.imageurl.substr(0,6)+".gif"
                   _smallpic="http://img.58cdn.com.cn/jxedt/img/video/"+json.imageurl.substr(0,6)+".gif"
                }else{
                  _bigpic = json.imageurl;
                  _smallpic = json.imageurl;
                }
                
            }
            $$("qustionpic").innerHTML = "<img src='" + _smallpic + "' alt='点击查看大图'  onclick=\"showbpic('" + _bigpic + "')\" /><div style='color:#999;cursor:pointer; text-align:left; font-size:14px; height:18px; text-align:center; line-height:18px; margin-top:5px '  onclick=\"showbpic('" + _bigpic + "')\">查看大图</div>";
        }
    }
    else
        $$("qustionpic").innerHTML = "";
    _tiebaurl = "posts_" + json.bestanswerid + ".html#BestAnswer";
    $$("btn_jieshi").onclick = function() {
        mjx.dialog.dialog("本题解释",  json.bestanswer + "&nbsp;&nbsp;<a href=\""+_tiebadomain+_tiebaurl+"\"  style=\"color:#369\" target=\"_blank\">>>本题讨论..</a>", {
            text: ""
        },false,"420","温馨提示：" + getrandomAD() + "")

    }
    $$("btn_teiba").onclick = function() {
        window.open(_tiebadomain+_tiebaurl);
    }

    BtnCando();

}





var errorcookiename = "lx_wdct_" + carType+"km"+kemuType+"_"+chapterid;
// 记录错题
function remberError(id) {
    var olderror = jsgetCookie(errorcookiename);
    if (olderror == "") {
        olderror = "e" + id + "e";
        jsSetCookie(errorcookiename, olderror, 3600 * 24 * 30);
    }
    else {
        if (olderror.indexOf(escape("e" + id + "e")) < 0) {
            olderror += id + "e";
            jsSetCookie(errorcookiename, olderror, 3600 * 24 * 30);
        }
    }
}
function geterrors() {
    var olderror = jsgetCookie(errorcookiename);
    if (olderror == "") {
        return null;
    } else {
        var es = olderror.split("e");
        var res = Array(es.length - 2);
        for (var i = 0; i < es.length - 2; i++) {
            res[i] = es[i + 1];
        }
        return res;
    }
}
function clearerror() {
    jsSetCookie(errorcookiename, "", 0);
    window.location.href= window.location.href;
}
function removeerror(id) {
    var olderror = jsgetCookie(errorcookiename);
    if (olderror != "") {
        olderror = olderror.replace("e" + String(id) + "e", "e");
        if (olderror == "e")
            olderror = "";
        if (olderror == "") {
            jsSetCookie(errorcookiename, "", 0);
            if ($$("div_js_btns"))
                $$("div_js_btns").style.display = "none";
            $$("frm_main").style.display = "none"
            $$("msgshowbox").style.display = "block";
        }
        else {
            jsSetCookie(errorcookiename, olderror, 3600 * 24 * 30);
            //更新数据
            if (questionindex) {
                var newquestionindex = Array(questionindex.length - 1);
                var j = 0;
                var nowindex = 1;
                for (var i = 0; i < questionindex.length; i++) {
                    if (id != questionindex[i]) {
                        newquestionindex[j] = questionindex[i];
                        j++;
                    } else {
                        nowindex = i + 1;
                    }
                }
                questionindex = newquestionindex;
                go(nowindex);
            }
        }
    }
}

function showbpic(src) {
    showbigimgks(src);
}

// 查看试题大图片 开始
//
function showbigimgks(_src) {
    preJsGetImageSize();
    JsGetImageSize(_src, imgcallbakc);
}
function JsGetImageSize(sUrl, fCallback) {
    var img = new Image();
    if (! -[1, ]) {
        sUrl = sUrl + '?t=' + Math.random(); //IE下，ajax会缓存，导致onreadystatechange函数没有被触发，所以需要加一个随机数
        img.src = sUrl;
        img.onreadystatechange = function() {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                fCallback({ width: img.width, height: img.height, url: sUrl });
            }
        };
    }
    else {
        img.src = sUrl;
        img.onload = function() {
            fCallback({ width: img.width, height: img.height, url: sUrl });
        };
    }
}
function imgcallbakc(j) {
    successJsGetImageSize();


    mjx.dialog.dialog("查看大图", "<div style='text-align: center;'><img src='" + j.url + "'/></div>", {
        text: ""
    },false,"630","温馨提示：" + getrandomAD() + "")

    document.onclick = function(evt) {
        var evt = window.event ? window.event : evt, target = evt.srcElement || evt.target;
        var _ishidden = true;
        while (target.nodeName.toLowerCase() != "html") {
            target = target.parentNode;
            if (typeof (target.id!='undefined') && target.id == "append_parent") {
                _ishidden = false;
                break;
            }
        }
        if (_ishidden) {
            successJsGetImageSize();
            document.onclick = function() { };
        }
    }
}
function preJsGetImageSize() {
    successJsGetImageSize();
   // ShowDialogo.show('加载中...', '40px', '100px', '<div style="width:100px;height:40px;text-align:center;line-height:40px;">loading...</div>', true);

    mjx.dialog.dialog("加载中...", "加载中...", {
        text: ""
    },false,"100")
}
function successJsGetImageSize() {
    hideshowlogindiv('append_parent');
}
// 查看试题大图片 结束

function showbflash(flashurl,w,h) {
    //flashurl = flashurl+"?w=500";
//h = h + 40;
//flashurl = returniqiyi(flashurl);
    var __ = "<object wmode='transparent' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0' width='"+w+"' height='"+h+"'><param name='allowScriptAccess' value='sameDomain'><param name='movie' value='"+flashurl+"'><param name='quality' value='high'><param name='wmode' value='transparent'><param name='bgcolor' value='#ffffff'><embed src='"+flashurl+"' quality='high' bgcolor='#ffffff' width='"+w+"' height='"+h+"' allowScriptAccess='sameDomain' type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/go/getflashplayer' /></object>";
     mjx.dialog.dialog("查看动画", "<div style=\"background:url("+picPath+"/templates/Reception/examination_files/loading.gif) no-repeat center;height:"+h+"px\">"+__+"</div>", {
        text: ""
    },false,"530","温馨提示：" + getrandomAD() + "")

}

var kemu1ormeku4 = "";
//模拟 Request.QueryString[]
function GetQueryString(name) {
    var url = location.search.toLowerCase();
    name = name.toLowerCase();
    var res = "";
    if (url.indexOf("?") != -1) {
        var str = url.substr(1) //去掉?号
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            if (strs[i].split("=")[0] == name) {
                res = strs[i].split("=")[1];
                break;
            }
        }
    }
    return res;
}

function getrandomAD() {
    var arr = new Array();
    var vipitemcount = 4;
    if (kemu1ormeku4 == "") {
        kemu1ormeku4 = "1";
        var __ = GetQueryString("type");
        if (__ == "s") {
            kemu1ormeku4 = "4";
        }
    }
    if (kemu1ormeku4 == "1") {
        arr[0] = "科目一考不过，愁死了，咋办呢？快来用：<a target='_blank' href='http://vip.jxedt.com/show/index.html'><font color='#FF6600'> + Vip仿真版</font></a>";
        arr[1] = "仿真界面、专家课程、无广告干扰，推荐使用：<a target='_blank' href='http://vip.jxedt.com/show/index.html'><font color='#FF6600'>+ Vip仿真版</font></a>";
        arr[2] = "图片小看不清，查看清晰大图，推荐使用：<a target='_blank' href='http://vip.jxedt.com/show/index.html'><font color='#FF6600'>+ Vip仿真版</font></a>";
        arr[3] = "嗨，我正在学车，发现一款很好的应用做题！<a target='_blank' href='http://m.jxedt.com/about/'><font color='#FF6600'> + 推荐手机版</font></a>";

    } else {
        arr[0] = "科目四考不过，愁死了，咋办呢？快来用：<a target='_blank' href='http://vip.jxedt.com/show/index.html'><font color='#FF6600'> + 仿真试题</font></a>";
        arr[1] = "仿真界面、专家课程、无广告干扰，推荐使用：<a target='_blank' href='http://vip.jxedt.com/show/index.html'><font color='#FF6600'> + Vip仿真版</font></a>";
        arr[2] = "想快速通过科目四考试，推荐您使用：<a target='_blank' href='http://vip.jxedt.com/show/index.html'><font color='#FF6600'> + Vip仿真版</font></a>";
        arr[3] = "嗨，我正在学车，发现一款很好的应用做题！<a target='_blank' href='http://m.jxedt.com/about/'><font color='#FF6600'> + 推荐手机版</font></a>";
    }
    var suijishu = parseInt(Math.random() * vipitemcount);
    return arr[suijishu];
}
function gototieba(){
    window.open(_tiebadomain+_tiebaurl);
}

//for ad
// 2013-04-18 ZYY
var _do_test_index = 0;
function get_random_num(min,max){
    min = parseInt(min,10);
    max = parseInt(max,10);
    return Math.floor(min+Math.random()*(max-min));
}
var test_ads = new Array();
var test_adarrays = new Array();
var test_alertadnum = new Array();

function _test_alert_ad(){
    var ___ = get_all_hascount()
    if(___==test_alertadnum[_do_test_index%test_alertadnum.length]){
        openbackwindow(test_ads[_do_test_index%test_ads.length]);
        _do_test_index++;
        if(_do_test_index == test_alertadnum.length){
            var _test_alert_ad = function(){}
        }
    }
}

function openbackwindow(url){
    // var adPopup = window.open(url);
    // if(adPopup){
    //     try{
    //         //背投广告焦点
    //         adPopup.blur();
    //         adPopup.opener.focus();
    //         //广告页面内容
    //     }
    //     catch(ex){}
    //     finally{}
    // }
}
//
//
// 区分考试跟练习的初始化配置
//临时保存练习数量
var _myanswer = new Array();

function initconfig(){
    test_adarrays[0] = [20,30];
    var _g_ = new Array();
    _g_[0] = "http://code.yqw88.com/inlink.jsp?wid=10802";
    _g_[1] = "http://plump.201071.com/?uid=1540";
    _g_[2] = "http://m.jxedt.com/about/wap-ad.html";
    _g_[3] = "http://u923032.778669.com/fshowurl.php?id=176115";
    test_ads[0] = _g_[parseInt(Math.floor(Math.random()*_g_.length),10)%_g_.length];
    //初始化ID
    for(var i=0;i<test_adarrays.length;i++){
        test_alertadnum[i] = get_random_num(test_adarrays[i][0],test_adarrays[i][1]);
    }
}
initconfig();

function get_all_hascount(){
    return _myanswer.length;
}
function set_all_hascount(id){
    //此处注入
    _test_alert_ad();
    var _len = get_all_hascount();
    for(var i=0,l=_len;i<l;i++){
        if(_myanswer[i]==id){
            return;
            break;
        }
    }
    _myanswer.push(id);
}

function getModel(index) {
    chushihua();
    var allcount=myExamID.length;
    if (index > myExamID.length)
        index = index % myExamID.length;
    if (index < 1)
        index = 1;
    $$("sp_lxindex").innerHTML = String(index) + "/" + String(allcount);
    if(typeof(cookiename)!='undefined') jsSetCookie(cookiename, index, 3600 * 24 * 30);
    $$("tbtestindex").value = String(index);
    var x = new ajax();
    //x.pURI = "/test/xia?subject=1&model=c1&testType=order";
    x.pMethod = "post";
    x.pAsyn = true;
    x.pDate = "r="+Math.random()+"&index=" + myExamID[index - 1];
    x.Request(function (xmlhttp) {
        var json = eval("(" + xmlhttp.responseText + ")");
        if (json != null) {
            itemsshow(json,index);
        }
    });
}

//