var canvas_draw = document.getElementById("cans");
var cxt = canvas_draw.getContext("2d");
var startX, startY, endX, endY;
var shapes = new Array();
var mousedown, mouseout;
var shape = 4;
var to64 = "";

// 创建图形对象，保存该图形的开始、结束坐标以及相关属性
function create_shape(Shape, startx, starty, endx, endy) {
  var color = cxt.strokeStyle.toString();
  var size = cxt.lineWidth;
  shapes[shapes.length] = {
    Shape: Shape,
    startx: startx,
    endx: endx,
    starty: starty,
    endy: endy,
    color: color,
    size: size,
    x: [],
    y: [],
  };
}

//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//
//【心路历程】如果html元素使用了zoom缩放，那么getBoundingClientRect这个方法取不到对的值，而且跟缩放的变化没有规律。所以经过试验，在这里用这个方法取对象的宽高，这两个是准确的（因为是相对值不是绝对值），然后用这个宽高和canvas的像素宽高做运算，用以获得横轴和纵轴分别的比例尺，用这个比例尺的最基本元素乘以鼠标坐标偏移量再乘以zoom缩放系数满足了当前需求。
//
//* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
//点击画布，获取起始坐标
function StartPos(e) {
  mousedown = 0;
  mouseout = 0;
  let rect = canvas_draw.getBoundingClientRect();
  startX = (e.offsetX / 0.9) * (canvas_draw.width / rect.width);
  startY = (e.offsetY / 0.9) * (canvas_draw.height / rect.height);
  //创建对象
  create_shape(4, startX, startY, endX, endY);
  shapes[shapes.length - 1].x.push(startX);
  shapes[shapes.length - 1].y.push(startY);
}

// 获取终点坐标
function EndPos(e) {
  if (startX != null) {
    let rect = canvas_draw.getBoundingClientRect();
    endX = (e.offsetX / 0.9) * (canvas_draw.width / rect.width);
    endY = (e.offsetY / 0.9) * (canvas_draw.height / rect.height);
  }
}

// 松开鼠标
function Mouseup() {
  startX = null;
}

// 按下鼠标
function Mousedown() {
  //如果鼠标是在画布外按下的，mousedown=1
  if (mouseout == 1) {
    mousedown = 1;
  }
}

// 鼠标移出了画布，mouseout=1
function MouseOut() {
  mouseout = 1;
  startX = null;
}

// 鼠标移动过程中画画
function draw() {
  // 如果起始坐标不为空
  if (startX != null) {
    cxt.strokeStyle = "rgba(0,0,0,0.5)";
    cxt.lineWidth = 3;
    shapes[shapes.length - 1].x.push(endX);
    shapes[shapes.length - 1].y.push(endY);
    cxt.beginPath();
    cxt.lineJoin = "round";
    cxt.moveTo(startX, startY);
    cxt.lineTo(endX, endY);
    cxt.stroke();
    cxt.closePath();
    startX = endX;
    startY = endY;
    to64 = canvas_draw.toDataURL("image/jpg", 1);
  }
}

//清除
function clear_drawboard() {
  cxt.clearRect(0, 0, canvas_draw.width, canvas_draw.height);
  cxt.fillStyle = "#fff";
  cxt.fillRect(0, 0, canvas_draw.width, canvas_draw.height);
  to64 = "";
}

function _toBase64() {
  if (to64 != "") {
    let toimg = document.createElement("img");
    toimg.src = to64;
    document.getElementsByTagName("body")[0].append(toimg);
  }
}

canvas_draw.addEventListener("mousedown", StartPos, false);
canvas_draw.addEventListener("mouseout", MouseOut, false);
document.getElementById("wrap_cans").addEventListener("mousedown", Mousedown, false);
document.getElementById("wrap_cans").addEventListener("mouseup", Mouseup, false);
document.getElementById("wrap_cans").addEventListener("mousemove", EndPos, false);
document.getElementById("wrap_cans").addEventListener("mousemove", draw, false);
