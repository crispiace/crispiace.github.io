menuItem=new Array();

//可調整參數
panelImage='sidePanel.gif';	//收合控制區圖片
menuSideWidth=20;		//收合控制區寬度
menuWidth=140;			//目錄可用寬度(不含收合控制區)
menuTop=50;			//目錄頂部位置


//		<div id="content_menu">
//		<ul>
//		<li class="cmu_index"><a href="character.html>|[主要人物]]</a></li>
//		<li class="cmu_intro"><a href="character2.html>|[凡多姆海伍家]]</a></li>
//		<li class="cmu_character"><a href="character3.html>|[米多福特家]]</a></li>
//		<li class="cmu_story"><a href="character4.html>|[巴奈特家]]</a></li>
//		<li class="cmu_author"><a href="character5.html>|[死神]]</a></li>
//		</ul>
//		</div>

menuItem[0]=['|[主要人物]]','../kuroshitsuji/character/character.html','']
menuItem[1]=['|[凡多姆海伍家]]','../kuroshitsuji/character/character2.html','']
menuItem[2]=['|[米多福特家]]','../kuroshitsuji/character/character3.html','']
menuItem[3]=['|[巴奈特家]]','../kuroshitsuji/character/character4.html','']
menuItem[4]=['|[死神]]','../kuroshitsuji/character/character5.html','']
menuItem[5]=['Blog 文章','http://audi.tw/blog/viamatic.asp','']
menuItem[6]=['與我連絡','javascript:window.open(\'http://audi.tw/Personal/mailme.asp\',\'\',\'width=240,height=240\');window.history.back();','']

//*****************************************************************
var isNS = ((navigator.appName == "Netscape") && (parseInt(navigator.appVersion) >=5)) ? 1 : 0;
var isIE = (document.all) ? 1: 0;
bHeight=(isNS)?window.innerHeight:document.body.clientHeight;
bWidth=(isNS)?window.innerWidth:document.body.clientWidth;

var nWidth=menuWidth;
var nHeight=parseInt(bHeight*0.65);

with(document){
	write('<div id="sidePanel" style="position:absolute;visibility:visible;z-index:250001;width:'+(nWidth+menuSideWidth)+'px;height:400px;top:'+menuTop+'px; left:'+(0-nWidth)+'px;">')
	write('<div id="menuTab" class="shadow" style="float:right;display:inline;"><a href="javascript://" onClick="_slide();this.blur();" onFocus="this.blur();" onMouseover="_slideShow();" onmouseout="_slideBack();"><img src="'+panelImage+'" border="0" class="mainBGColor"></a></div>');
	write('<div id="menuContent" style="width:'+menuWidth+'px;float:left;" onMouseover="_slideShow();" onmouseout="_slideBack();"><ul>');
	for (var i=0;i<menuItem.length;i++){
		write('<li><a href="'+menuItem[i][1]+'" target="'+menuItem[i][2]+'">'+menuItem[i][0]+'</a></li>')
	}
	write('</ul></div></div>');
	write('<div id="mask" style="position: absolute;visibility:hidden;z-index:250000;top:0px;left:0px;width:100%;height:100%;margin:0px;padding:0px;background:#FFF;opacity:0.5;-moz-opacity:0.5;filter:alpha(opacity=50);overflow-x:hidden;"></div>');

}

var _slideHideFlag=true;
var _slideStopLeft=parseInt(0-nWidth);
var _slideStopRight=0;
var _currentLeft=parseInt(0-nWidth);
var _timeoutOBJ;
var _moveOffset=nWidth;

function _slide(){
	_timeoutOBJ= (_slideHideFlag) ? setTimeout('_slideShow()',1) : setTimeout('_slideHide()',1);
}

function _slideHide(){

	if (_currentLeft>_slideStopLeft){
		_moveOffset=Math.max(parseInt(_moveOffset/2.1),1);
		_currentLeft-=_moveOffset;
		document.getElementById('sidePanel').style.left=_currentLeft;
		clearTimeout(_timeoutOBJ);
		_timeoutOBJ= setTimeout('_slideHide()',1);
	}else{
		_slideHideFlag=true;
		clearTimeout(_timeoutOBJ);
		_timeoutOBJ= setTimeout('null',1);
		_currentLeft=_slideStopLeft;
		document.getElementById('sidePanel').style.left=_currentLeft;
		_moveOffset=nWidth;
		document.getElementById('menuTab').innerHTML='<a href="javascript://" onClick="_slide();this.blur();" onMouseover="_slideShow();" onmouseout="_slideBack();"><img src="'+panelImage+'" border="0"></a>';
		return false;
	}
}

function _slideShow(){

	if (_currentLeft<_slideStopRight){
		_moveOffset=Math.max(parseInt(_moveOffset/2.1),1);
		_currentLeft+=_moveOffset;
		document.getElementById('sidePanel').style.left=_currentLeft;
		clearTimeout(_timeoutOBJ);
		_timeoutOBJ= setTimeout('_slideShow()',1);
	}else{
		_slideHideFlag=false;
		clearTimeout(_timeoutOBJ);
		_timeoutOBJ= setTimeout('null',1);
		_currentLeft=_slideStopRight;
		document.getElementById('sidePanel').style.left=_currentLeft;
		_moveOffset=nWidth;
		return false;
	}
}

function _slideBack(){
	clearTimeout(_timeoutOBJ);
	_timeoutOBJ= setTimeout('_slideHide()',1);
}

function showLayer(layerName){
	eval('document.getElementById(\''+layerName+'\').style.visibility=\'visible\'');
}

function hideLayer(layerName){
	eval('document.getElementById(\''+layerName+'\').style.visibility=\'hidden\'');
}

var currentX = currentY = 0;
var whichIt = null;
var lastScrollX = 0; lastScrollY = 0;
var layerWidth,layerHeight;

var scrollSpeed=30		//捲動速度

function init(){
	if (isIE){ // mean ie4,ie5,ie5.5 or above
		layerHeight=document.getElementById('sidePanel').clientHeight;
		layerWidth=document.getElementById('sidePanel').clientWidth;
	}

	if (isNS){
		layerHeight=document.getElementById('sidePanel').offsetHeight;
		layerWidth=document.getElementById('sidePanel').offsetWidth;
	}

	bHeight=(isNS)?window.innerHeight:document.body.clientHeight;
	bWidth=(isNS)?window.innerWidth:document.body.clientWidth;

	//newY=bHeight-layerHeight;
	//newX=bWidth-layerWidth-32;

	//document.getElementById('sidePanel').style.top=newY;
	//document.getElementById('sidePanel').style.left=newX;

	window.setInterval('heartBeat()',1);
}

function heartBeat() {
	if(isIE){
		diffY = window.document.body.scrollTop;
		diffX = 0;
	}

	if(isNS){
		diffY = self.pageYOffset;
		diffX = 0;
	}
	if (document.getElementById('sidePanel').style.visibility!='hidden'){
		if(diffY != lastScrollY){
			percent = 1 * (diffY - lastScrollY) / scrollSpeed;
			if(percent > 0) percent = Math.ceil(percent);
			else percent = Math.floor(percent);
			newY=parseInt(document.getElementById('sidePanel').style.top);
			newY+=percent;
			document.getElementById('sidePanel').style.top = newY;
			lastScrollY += percent;
			//window.status='Y:'+ diffY;
		}
	}
}

onload=init