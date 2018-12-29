var isMobile=/android/i.test(navigator.userAgent)||/iphone/i.test(navigator.userAgent)||/mobile/i.test(navigator.userAgent);
var isPad=/ipad/i.test(navigator.userAgent)||/pad/i.test(navigator.userAgent);
if(isPad){isMobile=false;}
var isRB=/RBBrowser\//i.test(navigator.userAgent);
var isWeixin=/MicroMessenger\//i.test(navigator.userAgent);
var isQQ=/QQ\//i.test(navigator.userAgent);
var isQQBrowser=/QQBrowser\//i.test(navigator.userAgent);
var isUCMobile=/UCBrowser\//i.test(navigator.userAgent);
var isUCBrowser=/UBrowser\//i.test(navigator.userAgent);

function str_html_replace(obj,str1,str2)
{
	try
	{
		str2=str2||"";
		var s=$(obj).html();	if(s){s=s.replace(eval("/"+str1+"/g"),str2);	$(obj).html(s);}		
	}catch(e){}
}

function tolk(cx,km,mk,ysm,iw,ih,css)
{
	$(".ks_Area_").hide();
	var cx=cx||'xc';
	var km=km||'kmy';
	var mk=mk||'zjlx';
	var iw=iw||'100%';
	var ih=ih||'510';
	var css=css||'https://www.jkydt.com/css/app_ks.css?t=2017.css';
	var utv='&cx='+cx+'&km='+km+'&mk='+mk+'&css='+css;
	if(mk=='xcx'||mk=='xkm'){utv='';}
	var ut='https://app.ybjk.com/?AppTag=kk'+utv;
	$(".ks_Area_").html('<iframe frameborder="0" allowTransparency="true" name="appWinFrame" scrolling="no" width="'+iw+'" height="'+ih+'" src="'+ut+'" class="app-win app-win-iframe"></iframe>');
	if(ysm)
	{
		setTimeout('$(".ks_Area_").slideDown();',ysm);
	}
	else
	{
		$(".ks_Area_").slideDown();
	}
	return false;
}

function starImg(star)
{
	var starA=new Array();
	var sh='https://sucimg.itc.cn/sblog/';
	starA['s00']=sh+'o0e552241f59cd5fe0326b1341f992898';	/*空白图片*/

	starA['s0']=sh+'j5f11018ac8821d6fd4b752488d6c3841';
	starA['s1']=sh+'jc5fb69a0f49da9cea51f5adf36592f9b';
	starA['s2']=sh+'jb90a2add4e9e7d02e00ff4f0b0cddcbd';
	starA['s3']=sh+'ja52592b72e08f571c3643f5c9bef8cb0';
	starA['s4']=sh+'j038cb1cbfbb88bc60bb8a6e32f25d7f4';
	starA['s5']=sh+'jc1cb65f48c01ceb485d4c2825c80b7aa';

	starA['s_0']=sh+'o44bf931d296e03cf2f6b4af2551de709';
	starA['s_1']=sh+'o34012dd3f968881371ac874c48b88aac';
	starA['s_2']=sh+'oa1ced6ab88c65a8ef99fc5f55970e30d';
	starA['s_3']=sh+'oad3a417d05f45cac248edcfe15f95ee4';
	starA['s_4']=sh+'o39702c76a612db4b08dd0b624d7e9f67';
	starA['s_5']=sh+'o50f7cd4cb11622cc6909549ebb586f91';

	starA['sx0']=sh+'o57044ea726700749a4638ff26d816e37';
	starA['sx1']=sh+'o5cb74d7d33d2d0c11fc6124ef7fd0e9d';
	starA['sx2']=sh+'o6f73427a00e1a311b31df61e7767ac4f';
	starA['sx3']=sh+'o59bad556a1b8f7e46fa610854570f44b';
	starA['sx4']=sh+'oaab9f700e3e10421e6445bcb3071e68a';
	starA['sx5']=sh+'o03669cec34ff1e8ba923c32c0275df81';
	starA['sx6']=sh+'o134e10e510e719e02e90c0c05ba6efc6';
	starA['sx7']=sh+'o326244e4e30c751df51534b42b924c0c';
	starA['sx8']=sh+'ob4b9e544d0ebb5b1101152dba3dfa2f8';
	starA['sx9']=sh+'oe45027598e36296b01e6450a5f1d9743';
	starA['sx10']=sh+'o5448cb30a0b1f2af12c094e8d88058a8';

	if(star!='s'){return starA[star];}else{return starA;}
}

function setHOVER()
{
	try
	{	
		var HOVERpos = $("#HOVERck").offset().top||0;
		HOVERpos=parseFloat(Math.abs(HOVERpos));
		if(HOVERpos>0)
		{
			$("#HOVER").addClass("h");
			var scrollTopV=parseFloat($(window).scrollTop());	
			if(scrollTopV>HOVERpos)
			{
				$("#HOVER").css("top","0px");
			}
			else
			{
				$("#HOVER").css("top",parseFloat(HOVERpos-scrollTopV)+"px");
			}
		}
	}
	catch (e)
	{
	}
}



var btImg_='https://sucimg.itc.cn/sblog/j5eb722fcce90b9d4576948288315a53e';
var btRight_='2%';
var btBottom_='3%';
var btOpacity_='0.3';
var btOpacityHover_='0.5';
var isMobile=isMobile||'';
if(isMobile)
{
var btImg_='https://sucimg.itc.cn/sblog/jf1d6d8aa727f69577229b575246b0ac4';
var btRight_='20px';
var btBottom_='20px';
var btOpacity_='0.9';
var btOpacityHover_='0.9';
}
var btImg=btImg||btImg_;
var btRight=btRight||btRight_;
var btBottom=btBottom||btBottom_;
var btOpacity=btOpacity||btOpacity_;
var btOpacityHover=btOpacityHover||btOpacityHover_;
function backTop()
{
	var backTopObj=$('.backTop');
	if(backTopObj.length==0)
	{
		backTopObj='';
		backTopObj+='<style>';
		backTopObj+='.backTop {display:block;display:none;width:50px;height:50px;position:fixed;right:'+btRight+';bottom:'+btBottom+';cursor:pointer;opacity: '+btOpacity+';background:url("'+btImg+'") no-repeat left center;background-size:50px 50px;z-index:999999999;}';
		backTopObj+='.backTop:hover {opacity: '+btOpacityHover+';}';			/*http://rs.mnks.cn/jsyks/img/ico/backtop.png*/
		backTopObj+='</style>';
		backTopObj+='<div class="backTop" onclick=\'$("html,body").animate({"scrollTop":0}, "slow");\'></div>';	
		backTopObj=$(backTopObj); 
		$('body').append(backTopObj);
	}
}
var scrollTopVal=scrollTopVal||500;
function backTopFun()
{	
	try
	{
		if(scrollTopVal==0){return false;}
		backTop();
		if(parseFloat($(window).scrollTop())<scrollTopVal){$('.backTop').fadeOut();}else{$('.backTop').fadeIn();}
	}
	catch (e)
	{
	}
}

$(window).bind('scroll', function(){backTopFun();setHOVER();});

