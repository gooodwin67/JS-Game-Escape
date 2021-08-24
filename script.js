var info = document.querySelector('.info');
var informBlock = document.querySelector('.inform');
var startBtn = document.querySelector('.start');
var exitBtn = document.querySelector('.exit');
var nextBtn = document.querySelector('.nextlvl');
var mute = document.querySelector('.mute');
var nameInput = document.querySelector('.name');
var timeField = document.querySelector('.time');
var bestTimesField = document.querySelector('.bestTimes');
//var tableRec1 = document.querySelector('.table-records');
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetWidth;
/////////////////////////ASSETS//////////////////////////////
var music = new Audio();
music.src = 'assets/incoming.mp3'
music.autoplay = false;
music.loop = true;

var imgGround = new Image();
imgGround.src = 'assets/field.jpg';

var fon0 = new Image();
fon0.src = 'assets/fon0.jpg';

var imgBlock = new Image();
imgBlock.src = 'assets/block.jpg';

var speedKey = new Image();
speedKey.src = 'assets/speedkey1.png';
//////////////////////////VAR////////////////////////////////////
var name;
var nameStorage;
var start = 0;
var speed = 4;
var r = 50;
var l = 50;
var t = 50;
var d = 50;
var right1 = false;
var left1 = false;
var top1 = false;
var bottom1 = false;
var addEn = [];
var addPl = [];
var temp1 = 0;
var collid = 0;
var playerdie = 0;
var mas;
var masPosX = [];
var masPosY = [];
var exitX;
var exitY;
var speedX = 2;
var speedY = 2;
var speedKeyX;
var speedKeyY;
var speedKeyW;
var speedKeyH;
var tempSpeed = 0;
var time = 0;
var timeSave;
var timeMasLevel = [];
var storedNames = [];
var timeMas = [];
var nextLev = 0;
var next2 = 3;
nameInput.value = localStorage.getItem('nameStorage');
name = localStorage.getItem('nameStorage');

function is_touch_device() {
  return !!('ontouchstart' in window);
}


if (screen.width < screen.height) {
  canvas.style.minWidth = '98%';
}




////////////////////////RECORDS///////////////////////////////////////////








/////////////////////END VAR///////////////////////////////////////  

function mainPage() {
  
  //ctx.beginPath();
    //ctx.fillStyle = '#ccc';
    //ctx.rect(0,0,canvas.width,canvas.height);
    ctx.drawImage(fon0 ,0,0,canvas.width,canvas.height);
    //ctx.fill();
  //ctx.closePath();

  ctx.beginPath();
  ctx.shadowColor = "#fff";
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;
    ctx.shadowBlur = 2;
    ctx.fillStyle = '#163D4D';
    ctx.font = "300% Georgia";
    ctx.textAlign = "center";
    ctx.fillText("E S C A P E", canvas.width/2, canvas.height/2.5);
  ctx.closePath();

  ctx.beginPath();
  ctx.shadowColor = "#000";
      ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#fff';
    ctx.font = "130% Arial";
    ctx.textAlign = "center";
    ctx.fillText("Enter you Name and press start", canvas.width/2, canvas.height/1.8);
  ctx.closePath();
}
////////////////////////////////////////////////////////////////////

for (var i = 0; i < levelsMas.length; i++) {     //Заполняем массив рекордов
  timeMasLevel[i] = 'Level:' + (i+1)
}
for (var j = 0; j < timeMasLevel.length; j++) {
  if (localStorage.getItem(timeMasLevel[j]) <= 0) {
    localStorage.setItem(timeMasLevel[j], 0);
  }
}
function levels() {
  if (level<=levelsMas.length) mas = levelsMas[level-1]         //Переключение уровней/конец игры
  else {
    endGame();
    setTimeout(function(){
      mainPage();
    },4000)
  }
}
levels();

var drawWall = function() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  for(var i = 0; i < mas.length; i++) {
    for(var j = 0; j < mas[i].length; j++) {
      if (mas[i][j]) {
        ctx.beginPath();
        ctx.shadowColor = "#000";
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.shadowBlur = 1;
        ctx.drawImage(imgGround, j*wRect, i*hRect,wRect+1,hRect+1);
        ctx.closePath();
      }
      if (mas[i][j] == b) {
        masPosX[masPosX.length]= j*wRect;
        masPosY[masPosY.length]= i*hRect;
        ctx.beginPath();
        ctx.shadowColor = "#555";
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = -2;
        ctx.shadowBlur = 10;
        ctx.drawImage(imgBlock, j*wRect, i*hRect,wRect+1,hRect+1);
        ctx.closePath();
      }
      if (mas[i][j] == e) {
        exitX = j*wRect;
        exitY = i*hRect;
        ctx.beginPath();
        ctx.strokeStyle = '#af8';
        ctx.font = wRect/3+"px Arial";
        ctx.strokeText("EXIT",j*wRect + wRect/2,i*hRect + hRect/1.7);
        ctx.closePath();
      }
      if (mas[i][j] == s) {
        ctx.beginPath();
        speedKeyX = j*wRect + wRect*0.4;
        speedKeyY = i*hRect + hRect*0.4;
        speedKeyW = wRect/4;
        speedKeyH = hRect/4;
        tempSpeed = 1;
        ctx.shadowColor = "#555";
        ctx.shadowOffsetX = -2;
        ctx.shadowOffsetY = -2;
        ctx.shadowBlur = 10;
        if (speedX == 2) {
          ctx.drawImage(speedKey, j*wRect + wRect*0.4, i*hRect + hRect*0.4,wRect/4,hRect/4);
        }
        ctx.closePath();
      }
    }
  }
}
///////////////////////////////////////////////////////////////////////////

var player1 = function(xPlayer,yPlayer,wPlayer,hPlayer,speed) {
  this.xPlayer = xPlayer;
  this.yPlayer = yPlayer;
  this.wPlayer = wPlayer;
  this.hPlayer = hPlayer;
  this.speed = speed;
  this.update = function() {
    ctx.shadowColor = "#555";
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#1C4C52';
    ctx.fillRect(this.xPlayer,this.yPlayer,this.wPlayer,this.hPlayer);
  }
}
var addPlayer1 = function() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  for(var i = 0; i < mas.length; i++) {
    for(var j = 0; j < mas[i].length; j++) {
      if (mas[i][j] == p) {
        addPl[addPl.length] = new player1(j*wRect+5,i*hRect+5,wRect*0.6,hRect*0.6,speed); 
      }
    }
  }
}
var move = function(a, speedX, speedY) {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  if (right1 && a.xPlayer < canvas.width-a.wPlayer-wRect-3) a.xPlayer += speedX; 
  if (left1 && a.xPlayer >= wRect+3) a.xPlayer -= speedX;
  if (bottom1 && a.yPlayer < canvas.height-a.hPlayer-hRect-3) a.yPlayer += speedY;
  if (top1 && a.yPlayer >= hRect+3) a.yPlayer-=speedY;
  document.onkeydown = function(e) {
    if (e.which == 68 || e.which == 39) right1 = true;
    if (e.which == 65 || e.which == 37) left1 = true;
    if (e.which == 87 || e.which == 38) top1 = true;
    if (e.which == 83 || e.which == 40) bottom1 = true;
  }
  document.onkeyup = function(e) {
    if (e.which == 68 || e.which == 39) right1 = false;
    if (e.which == 65 || e.which == 37) left1 = false;
    if (e.which == 87 || e.which == 38) top1 = false; 
    if (e.which == 83 || e.which == 40) bottom1 = false;
  }
}
var drawPlayer = function() {
  for (var i = 0; i <= addPl.length-1; i++) {
    addPl[i].update();
    move(addPl[i],speedX, speedY);
  }
}

/*///////////////////////////////////////////////////////////*/
var enemy = function(xEnemy,yEnemy,wEnemy,hEnemy,speed,speedY,dop,dop2,n,m) {
  this.xEnemy = xEnemy;
  this.yEnemy = yEnemy;
  this.wEnemy = wEnemy;
  this.hEnemy = hEnemy;
  this.speed = speed;
  this.speedY = speedY;
  this.dop = dop;
  this.dop2 = dop2;
  this.n = n;
  this.m = m;
  this.update = function() {
  ctx.fillStyle = '#87332D';
  ctx.fillRect(this.xEnemy,this.yEnemy,this.wEnemy,this.hEnemy);
  }
}
var addEnemy = function() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  for(var i = 0; i < mas.length; i++) {
    for(var j = 0; j < mas[i].length; j++) {
      if (mas[i][j] == 6) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,r/10,0);
        temp1++;
      }
      else if (mas[i][j] == 4) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,-l/10,0);
        temp1++;
      }
      else if (mas[i][j] == 8) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,-t/10);
        temp1++;
      }
      else if (mas[i][j] == 2) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/10);
        temp1++;
      }
      if (mas[i][j] == 56) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,r/5,0);
        temp1++;
      }
      else if (mas[i][j] == 54) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,-l/5,0);
        temp1++;
      }
      else if (mas[i][j] == 58) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,-t/5);
        temp1++;
      }
      else if (mas[i][j] == 52) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5);
        temp1++;
      }
      else if (mas[i][j] == g6) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,1,speedY*3,0);
        temp1++;
      }
      else if (mas[i][j] == g4) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,1,-speedY*3,0);
        temp1++;
      }
      else if (mas[i][j] == g2) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,1,0,speedY*3);
        temp1++;
      }
      else if (mas[i][j] == g8) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,1,0,-speedY*3);
        temp1++;
      }
      else if (mas[i][j] == s6) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,-1,speedY*3,0);
        temp1++;
      }
      else if (mas[i][j] == s4) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,-1,-speedY*3,0);
        temp1++;
      }
      else if (mas[i][j] == s2) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,-1,0,speedY*3);
        temp1++;
      }
      else if (mas[i][j] == s8) {
        addEn[temp1] = new enemy(j*wRect+wRect/2-wRect/4,i*hRect+hRect/4,wRect/2,hRect/2,0,d/5,1,-1,0,-speedY*3);
        temp1++;
      }
      
    }
  }
}
var drawEnemy = function() {
  for (var i = 0; i <= temp1-1; i++) {
    addEn[i].update();
    if (!addEn[i].dop) {
      addEn[i].xEnemy += addEn[i].speed;
      addEn[i].yEnemy += addEn[i].speedY;
    }
  }
}
var collideEnemyWallBlock = function() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  for (var i = 0; i <= temp1-1; i++) {
    if (!addEn[i].dop && (addEn[i].xEnemy >= canvas.width - addEn[i].wEnemy - wRect || addEn[i].xEnemy <= wRect || addEn[i].yEnemy+addEn[i].hEnemy >= canvas.height-hRect || addEn[i].yEnemy<=hRect)) {
        addEn[i].speed = -addEn[i].speed;
        addEn[i].speedY = -addEn[i].speedY;
    }
    else if (addEn[i].dop) {
      addEn[i].dop = 2;
      addEn[i].xEnemy += addEn[i].n;
      addEn[i].yEnemy += addEn[i].m;
    }
    if (addEn[i].dop == 2 && addEn[i].xEnemy >= canvas.width - addEn[i].wEnemy - wRect) {
      addEn[i].xEnemy = canvas.width - addEn[i].wEnemy - wRect+1;
      addEn[i].n = 0;
      addEn[i].m = speedY*3 * addEn[i].dop2;
    }
    if (addEn[i].dop == 2 && addEn[i].yEnemy+addEn[i].hEnemy >= canvas.height-hRect) {
      addEn[i].yEnemy = canvas.height-hRect - addEn[i].hEnemy-1;
      addEn[i].n = -speedY*3 * addEn[i].dop2;
      addEn[i].m = 0;
    }
    if (addEn[i].dop == 2 && addEn[i].xEnemy < wRect) {
      addEn[i].xEnemy = wRect+1;
      addEn[i].n = 0;
      addEn[i].m = -speedY*3 * addEn[i].dop2;
    }
    if (addEn[i].dop == 2 && addEn[i].yEnemy <= hRect) {
      addEn[i].yEnemy = hRect+1;
      addEn[i].n = speedY*3 * addEn[i].dop2;
      addEn[i].m = 0;
    }

  }


  for (var i = 0; i <= addEn.length-1; i++) {
    for (var j = 0; j <= masPosX.length-1; j++) {
      if (collides(addEn[i].xEnemy,addEn[i].yEnemy, addEn[i].wEnemy, addEn[i].hEnemy, masPosX, masPosY, wRect, hRect, j)) {
        addEn[i].speed = -addEn[i].speed;
        addEn[i].speedY = -addEn[i].speedY;
      }
    } 
  }
}
var collidePlayerBlock = function() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  collid = 0;
  for (var i = 0; i <= addPl.length-1; i++) {
    for (var j = 0; j <= masPosX.length-1; j++) {
      if (collides(addPl[i].xPlayer,addPl[i].yPlayer, addPl[i].wPlayer, addPl[i].hPlayer, masPosX, masPosY, wRect, hRect, j)) {
        collid = 1;
      }
    } 
  }
  for (var i = 0; i <= addPl.length-1; i++) {
  if (collid && right1) addPl[i].xPlayer -= addPl[i].speed;
  if (collid && left1) addPl[i].xPlayer += addPl[i].speed;
  if (collid && top1) addPl[i].yPlayer += addPl[i].speed;
  if (collid && bottom1) addPl[i].yPlayer -= addPl[i].speed;
  }
}
var collidePlayerEnemy = function() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  for (var i = 0; i <= addPl.length-1; i++) {
    for (var j = 0; j <= addEn.length-1; j++) {
      if (collides1(addPl[i].xPlayer,addPl[i].yPlayer, addPl[i].wPlayer, addPl[i].hPlayer, addEn[j].xEnemy,addEn[j].yEnemy, addEn[j].wEnemy, addEn[j].hEnemy)) {
        tempSpeed = 0;
        init();
      }
    }
  }
}
function collides(xx,yy,ww,hh, x, y,w,h,i) {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  var hit = !(xx + ww < x[i] || x[i] + w < xx ||
  yy + hh < y[i] || y[i]+ h < yy);
  if(hit) {
    return true;
  } else {
    return false;
  }
}
function collides1(xx,yy,ww,hh, x, y,w,h) {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  var hit = !(xx + ww < x || x + w < xx ||
  yy + hh < y || y+ h < yy);
  if(hit) {
    return true;
  } else {
    return false;
  }
}





function playerExit() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  for (var i = 0; i <= addPl.length-1; i++) {
    if (collides1(addPl[i].xPlayer,addPl[i].yPlayer, addPl[i].wPlayer, addPl[i].hPlayer, exitX,exitY, wRect, hRect)) {
      

      
      timeField.textContent = (Math.round(time*1000)/1000);
      tempSpeed = 0;
      timeSave = time;
      timeMas[level-1] = Math.round(time*1000)/1000;
      if (localStorage.getItem(timeMasLevel[level-1]) > Math.round(time*1000)/1000 || localStorage.getItem(timeMasLevel[level-1]) == 0) {
         localStorage.setItem(timeMasLevel[level-1], Math.round(time*1000)/1000);
      }
      //init();
      start = 0;
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.textAlign = 'center';
      ctx.fillStyle = '#525769'
      ctx.strokeStyle = '#fff'
      ctx.fillRect(10,10,canvas.width/2-20,canvas.height-40);
      ctx.strokeText('Once Again',canvas.width/4,canvas.height/2);
      ctx.fillRect(canvas.width - canvas.width/2,10,canvas.width/2-10,canvas.height-40);
      ctx.strokeText('Next Level',canvas.width - canvas.width/4,canvas.height/2);

      setTimeout (function() {
        nextLev = 1;  
      }, 200);
      
    }
  }
}
function nextFoo() {
  start = 0;
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.textAlign = 'center';
      ctx.fillStyle = '#525769'
      ctx.strokeStyle = '#fff'
      ctx.fillRect(10,10,canvas.width/2-20,canvas.height-40);
      ctx.strokeText('Once Again',canvas.width/4,canvas.height/2);
      ctx.fillRect(canvas.width - canvas.width/2,10,canvas.width/2-10,canvas.height-40);
      ctx.strokeText('Next Level',canvas.width - canvas.width/4,canvas.height/2);

      nextLev = 1;
}
function playerSpeedKey() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  for (var i = 0; i <= addPl.length-1; i++) {
      if (collides1(addPl[i].xPlayer,addPl[i].yPlayer, addPl[i].wPlayer, addPl[i].hPlayer, speedKeyX,speedKeyY, speedKeyW, speedKeyH) && tempSpeed == 1) {
        speedX = 4;
        speedY = 4;
      }
  }
}
function endGame() {
  start = 0;
  level = 1;
  ctx.beginPath();
  ctx.fillStyle = '#ccc';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.closePath();
  ctx.beginPath();
  ctx.fillStyle = 'red';
  ctx.font = "50px Arial";
  ctx.fillText("The End",canvas.width/2, canvas.height/2);
  ctx.fillStyle = 'blue';
  ctx.font = "30px Arial";
  ctx.fillText("More levels coming soon",canvas.width/2, canvas.height/2 + 70);
  ctx.closePath();
}
/*function buttonsTouch() {
  var wRect = canvas.width/mas[1].length;
  var hRect = canvas.height/mas.length;
  ctx.fillStyle = '#ccc'
  ctx.fillRect(10, 10, wRect/2, hRect/2);
  ctx.fillRect(10, canvas.height-hRect/2-10, wRect/2, hRect/2);
  ctx.fillRect(canvas.width - wRect/2-10, 10, wRect/2, hRect/2);
  ctx.fillRect(canvas.width - wRect/2-10, canvas.height-hRect/2-10, wRect/2, hRect/2);

}*/





//////////////////////////INIT///////////////////////////////
var init = function() {

  bestTimesField.innerHTML = ''
  for (var j = 0; j < timeMasLevel.length; j++) {
    var storTimes = localStorage.getItem(timeMasLevel[j]);
    bestTimesField.innerHTML += ('<div class = "rec-tab"><div class = "name11">' + timeMasLevel[j] + '</div><div class = "sec11">' + storTimes + ' sec</div></div>');
  }
  /*if (level < levelsMas.length+1) {
    timesRecTitle.textContent = ('Records Level ' + level);
  }*/
  time = 0;
  levels();
  speedX = 2;
  speedY = 2;
  masPosX = [];
  masPosY = [];
  temp1 = 0;
  addPl = [];
  addEn = [];
  addEnemy();
  addPlayer1();
  resultTemp = 0;


}
 init();
 if(start == 0) {
  mainPage();
}
////////////////////////////GAME///////////////////////////////
var game = function() {

  if (playerdie == 0 && start == 1) {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    drawWall();
    time += 1/60;
    timeField.textContent = (Math.round(time*100)/100);
    drawPlayer();
    drawEnemy();
    playerExit();
    playerSpeedKey()
    collideEnemyWallBlock();
    collidePlayerBlock();
    collidePlayerEnemy();
    info.textContent = ('Level: '+ level);
    //localStorage.clear();
  }
  requestAnimationFrame(game);
}
  game();
//////////////////////////////////////////////////////////////
///////////////////////BUTTONS////////////////////////////////
startBtn.onclick = function() {
  nameInput.readOnly = true;
  nameInput.style.backgroundColor = '#404142';
  if (start == 0) {
    mute.value = ('music: on')
    if (mute.value == 'music: on') {
      music.play();

    }
    music.play();
    name = nameInput.value;
    //nameField.textContent = (name);
    localStorage.setItem('nameStorage', name);
    start = 1;
    init();
  }
  if (is_touch_device()) {
    canvas.style['backgroundImage'] = "url('assets/fon.jpg')";
  }
  else canvas.style['backgroundImage'] = "url('assets/fon1.jpg')";

}
mute.onclick = function() {
  if (mute.value == 'music: on') {
    music.pause();
    mute.value = ('music: off')
  }
  else if (mute.value == 'music: off') {
    music.play();
    mute.value = ('music: on')
  }
}
exitBtn.onclick = function() {
  nameInput.readOnly = false;
  nameInput.style.backgroundColor = '#28292A';
  if (mute.value == 'music: on') {
    music.pause();
    mute.value = ('music: off')
  }
  endGame();
  mainPage();
  next2 = 3;
  nextBtn.value = 'Next (' + next2 + ')'

}
canvas.onclick = function(e) {
  if (nextLev == 1) {   
    if (e.pageX < canvas.width/2) {
      level = level;
    }
    else level++;
    start = 1;
    init();
    nextLev = 0
  }
}
nextBtn.onclick = function() {
  if (next2 > 0 && start == 1) {
    next2--;
    nextBtn.value = 'Next (' + next2 + ')'
    nextFoo();
  }
}

var wRect = canvas.width/mas[1].length;
var hRect = canvas.height/mas.length;




draw = {
  start: function(evt) {
    if (evt.touches[0].pageX >= -200 && evt.touches[0].pageX <= canvas.offsetWidth/2 && evt.touches[0].pageY - informBlock.offsetHeight>= -200 && evt.touches[0].pageY - informBlock.offsetHeight <= canvas.offsetHeight/2) {
      top1 = true;
    }
    if (evt.touches[0].pageX >= -200 && evt.touches[0].pageX <= canvas.offsetWidth/2 && evt.touches[0].pageY - informBlock.offsetHeight <= canvas.offsetHeight + 200 && evt.touches[0].pageY - informBlock.offsetHeight > canvas.offsetHeight/2) {
      bottom1 = true;
    }
    if (evt.touches[0].pageX > canvas.offsetWidth/2 && evt.touches[0].pageX <= canvas.offsetWidth+200 && evt.touches[0].pageY - informBlock.offsetHeight >= -200 && evt.touches[0].pageY - informBlock.offsetHeight <= canvas.offsetHeight/2) {
      right1 = true;
    }
    if (evt.touches[0].pageX > canvas.offsetWidth/2 && evt.touches[0].pageX <= canvas.offsetWidth+200 && evt.touches[0].pageY - informBlock.offsetHeight <= canvas.offsetHeight+200 && evt.touches[0].pageY - informBlock.offsetHeight > canvas.offsetHeight/2) {
      left1 = true;
    }
  },
  end: function(e) {
    top1 = false;
    bottom1 = false;
    left1 = false;
    right1 = false;
  }
};

canvas.addEventListener('touchstart', draw.start, false);
canvas.addEventListener('touchend', draw.end, false);



canvas.addEventListener('touchmove',function(evt){
    evt.preventDefault();
  },false);
