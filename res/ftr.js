// Config

$("#users").remove()
var getUsers = $.get(`https://raw.githubusercontent.com/thezou/bla/master/zouExt.users.json?nocache=${Math.random()}`);
var users
setTimeout(function(){users = getUsers.responseJSON}, 3000)


// Hats
var sickCrown = [{"x":"-2","y":"-2","url": "https://i.imgur.com/5jYUav5.png" },{"x":"0","y":"-2","url": "https://i.imgur.com/b6uYi62.png" }];
var crown = "http://alis.io/assets/img/crownhat.png";
var dildo = "https://nosx.cf/dildo.png";
var tRex = "https://cdn.discordapp.com/attachments/283249356415696896/464991723345674260/nrz_hat.png";
var imNoob = "https://i.imgur.com/KnJUiXJ.png";
var noob = "http://gaver.io/hats/noob.png";
var cat = "http://gaver.io/hats/cat.png";
var suckcat = "http://alis.io/assets/img/cathat.png";
var santa = "http://gaver.io/hats/santa.png";
var fancy = "http://gaver.io/hats/fancy.png";
var trolCrown = "http://gaver.io/hats/troll.png";
var xaz = "http://gaver.io/hats/xaz.png";

// Run
function upgradeBta() {
  Object.values(users).forEach(user=>{
    Object.values(playerDetails).forEach(player=>{

if(user.showSkinForEveryone){
  if(player.uid == user.uid)player.isAdmin=true;
}

if(user.customImages){
  if(player.uid == user.uid)player.customImages=user.customImages;
}

if(user.customImg){
  if(player.uid == user.uid)player.customImages=[{"x":-2,"y":-2,"url":user.customImg[0]},{"x":0,"y":-2,"url":user.customImg[1]},{"x":-2,"y":0,"url":user.customImg[2]},{"x":0,"y":0,"url":user.customImg[3]}];
}


if(user.hat){
  if(player.uid == userid){
    if(btaHat.checked){
player.hat = btaHatVal.value
    } else {
      if(player.uid == user.uid)player.hat=user.hat;
    }
  } else {
  if(player.uid == user.uid)player.hat=user.hat;
}
}

if(user.forceSkin){
  if(player.uid == user.uid)player.skinUrl=user.forceSkin;
}

if(player.uid==userid && btaHideOwnSkin.checked)player.skinUrl=""

if(user.ejectMass){

if(user.ejectMass.color){
  if(player.uid == user.uid){var ejectPid=player.pid-player.pid-player.pid; window.playerDetails[ejectPid].color=user.ejectMass.color}
}

if(user.ejectMass.numSides){
  if(player.uid == user.uid){var ejectPid=player.pid-player.pid-player.pid; window.playerDetails[ejectPid].numSides=user.ejectMass.numSides}
}

if(user.ejectMass.skin){
  if(player.uid == user.uid){var ejectPid=player.pid-player.pid-player.pid; window.playerDetails[ejectPid].skinUrl=user.ejectMass.skin}
}
}

if(btaPskin.checked && btaHideOwnSkin.checked == false){
  if(player.uid == userid)player.skinUrl=btaPrivSkin.value;
} else {
//  if(player.uid == userid && btaHideOwnSkin.checked == false)player.skinUrl=$("#skinurl").val();
}

if(user.cellColor){
  if(player.uid==userid){
    if(btaCCcell.checked){
if(btacc==="nan")ccRGB(btaCellColor.value);
      player.color=btacc;
    } else {
      if(player.uid == user.uid)player.color=user.cellColor;
    }
  } else {
  if(player.uid == user.uid)player.color=user.cellColor;
}
}


  });
  });
}

//Running
setInterval(function() {
$(document).ready(function(){
if(isJoinedGame || spectateMode){upgradeBta()}
})
}, 5000);


//Animated skin by Zimek
/*
var userUID = 165218
var speed = 80
var frames = 5
var url1 = "https://zimek.tk/askin2/"
var url2 = ".gif"
var count = 1


//run
setInterval(function(){
    if(count > frames){count=1}
    var url = `${url1}${count}${url2}`
Object.values(playerDetails).forEach(player=>{
if(player.uid==userUID)player.skinUrl=url
});
count = count + 1;
}, speed)
*/
