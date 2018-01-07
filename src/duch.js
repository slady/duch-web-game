var run = false, key_up = false, key_left = false, key_right = false, jumping = false, falling = false;
var px = 8, py = 12, jump_x = 0, jump_y = 0, jump_min = -1, jump_floor = -1;
var leftmark, rightmark, endmark;
function up() {
  key_up = true;
}
function no_up() {
  key_up = false;
}
function left() {
  key_left = true;
}
function no_left() {
  key_left = false;
}
function right() {
  key_right = true;
}
function no_right() {
  key_right = false;
}
function loop() {
  if (!run) {
    return;
  }
  if (!jumping && !falling) {
    if (key_up) {
      jumping = true;
      if (key_right && !key_left) {
        jump_x = 1;
      } else if (key_left && !key_right) {
        jump_x = -1;
      }
    } else if (key_right) {
      px++;
    } else if (key_left) {
      px--;
    }
  }
  if (jumping) {
    py--;
    px += jump_x;
    if (py < jump_min) {
      jumping = false;
      falling = true;
    }
  }
  if (falling) {
    py++;
    px += jump_x;
    if (py >= jump_floor) {
      falling = false;
    }
  }
  if (px < 0) {
    px = 0;
  }
  if (px > endmark) {
    $(".game").hide();
    $(".theend").show();
    $(".restart").show();
  }
  $(".ghost").css({left: px + "px", top: py + "px"});
  setTimeout(loop, 10);
}
function start() {
  $(".about").hide();
  $(".theend").hide();
  $(".gameover").hide();
  $(".restart").hide();
  $(".game").show();
  var position = $(".ghost").position();
  px = position.left;
  jump_min = px;
  py = position.top;
  jump_floor = py;
  leftmark = $(".leftmark").position().left;
  rightmark = $(".rightmark").position().left;
  endmark = $(".endmark").position().left;
  run = true;
  loop();
}
$(function(){
  $(".start").click(start);
  $(".restart").click(start);
  $("html").keydown(function(e){
    var k = e.which;
    if (k == 38) {
      up();
    } else if (k == 37) {
      left();
    } else if (k == 39) {
      right();
    }
  }).keyup(function(e){
    var k = e.which;
    if (k == 38) {
      no_up();
    } else if (k == 37) {
      no_left();
    } else if (k == 39) {
      no_right();
    }
  });
  $(".fa-arrow-up").mousedown(function(){
    up();
  }).mouseup(function(){
    no_up();
  });
  $(".fa-arrow-left").mousedown(function(){
    left();
  }).mouseup(function(){
    no_left();
  });
  $(".fa-arrow-right").mousedown(function(){
    right();
  }).mouseup(function(){
    no_right();
  });
});