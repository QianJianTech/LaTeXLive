export var mathpix = {
  obj_element: {},
  path_api_mathpix: "",
  obj_theme: {},
  obj_eject: {},
  obj_api: {},
  fn_refresh: function () {},
  init: function (opt) {
    mathpix.obj_element = opt.obj_element;
    mathpix.path_api_mathpix = opt.api_mathpix;
    mathpix.obj_theme = opt.obj_theme;
    mathpix.obj_eject = opt.obj_eject;
    mathpix.obj_api = opt.obj_api;
    mathpix.fn_refresh = opt.fn_refresh;
    mathpix.init_mathpix();
  },
  init_mathpix: function () {
    //mathpix功能标签结构
    let li_mathpix = document.createElement("li");
    li_mathpix.className = "nav-item";
    let a_mathpix = document.createElement("a");
    a_mathpix.className = "nav-link";
    a_mathpix.href = "##";
    a_mathpix.id = "a_shortcut_mathpix";
    a_mathpix.innerHTML = "图片识别";
    document.getElementById(mathpix.obj_element.id_navtabs).appendChild(li_mathpix);
    li_mathpix.appendChild(a_mathpix);
    //渲染mathpix功能标签 绑定mathpix标签点击事件
    let wrap_mathpix = document.createElement("div");
    wrap_mathpix.className = "wrap-shortcut";
    wrap_mathpix.id = "wrap_shortcut_mathpix";
    wrap_mathpix.style.display = "none";
    mathpix.obj_element.el_shortcut.appendChild(wrap_mathpix);
    let wrap_mathpix_in = document.createElement("div");
    wrap_mathpix_in.id = "wrap_shortcut_mathpix_in";
    wrap_mathpix_in.style.width = "100%";
    wrap_mathpix_in.style.height = "26rem"; //操作面板的高度
    wrap_mathpix_in.style.border = "1px solid rgba(0,0,0,0.1)";
    wrap_mathpix_in.style.marginTop = "1rem";
    wrap_mathpix_in.style.borderRadius = "0.25rem";
    let wrap_mathpix_in_in1 = document.createElement("div");
    wrap_mathpix_in_in1.className = "form-group";
    wrap_mathpix_in_in1.style.textAlign = "center";
    wrap_mathpix_in_in1.style.marginTop = "1rem";
    let ipt_mathpix = document.createElement("input");
    ipt_mathpix.type = "file";
    ipt_mathpix.id = "upload";
    ipt_mathpix.accept = "image/png,image/jpeg";
    ipt_mathpix.style.display = "none";
    //绑定上传文件事件
    ipt_mathpix.onchange = function () {
      mathpix.localImgLoad.call(this);
    };
    let btn_mathpix_clear = document.createElement("button");
    btn_mathpix_clear.className = "btn btn-light theme-fill";
    btn_mathpix_clear.id = "btn_clearpic";
    btn_mathpix_clear.innerHTML = "<i class='fa fa-trash-o'></i>清除";
    btn_mathpix_clear.style.marginRight = "0.5rem";
    btn_mathpix_clear.onclick = function () {
      img_mathpix.src = "";
      ipt_mathpix.value = "";
    };
    let btn_mathpix = document.createElement("button");
    btn_mathpix.className = "btn btn-light theme-fill";
    btn_mathpix.id = "btn_upload";
    btn_mathpix.innerHTML = "<i class='fa fa-upload'></i>上传";
    btn_mathpix.style.marginLeft = "0.5rem";
    btn_mathpix.onclick = function () {
      $("#upload").click();
    };

    let wrap_mathpix_in_in2 = document.createElement("div");
    wrap_mathpix_in_in2.className = "form-group";
    wrap_mathpix_in_in2.id = "wrap_shortcut_mathpix_drag";
    // wrap_mathpix_in_in2.style.textAlign = "center";
    wrap_mathpix_in_in2.style.width = "90%";
    wrap_mathpix_in_in2.style.height = "20rem";
    // wrap_mathpix_in_in2.style.border = "1px dashed rgba(0,0,0,0.3)";
    wrap_mathpix_in_in2.style.border = "3px solid red";
    wrap_mathpix_in_in2.style.margin = "0 auto";
    wrap_mathpix_in_in2.style.borderRadius = "4px";
    wrap_mathpix_in_in2.style.position = "relative";
    //拖拽上传
    wrap_mathpix_in_in2.ondragstart = function () {
      $("#wrap_shortcut_mathpix_drag").addClass("draging");
    };
    wrap_mathpix_in_in2.ondragend = function () {};
    wrap_mathpix_in_in2.ondragover = function () {
      $("#wrap_shortcut_mathpix_drag").addClass("draging");
    };
    wrap_mathpix_in_in2.ondragenter = function () {
      $("#wrap_shortcut_mathpix_drag").addClass("draging");
    };
    wrap_mathpix_in_in2.ondragleave = function () {
      $("#wrap_shortcut_mathpix_drag").removeClass("draging");
    };
    wrap_mathpix_in_in2.ondrop = function (ev) {
      mathpix.localImgLoad_drag(ev);
      $("#wrap_shortcut_mathpix_drag").removeClass("draging");
      return false;
    };
    let p_mathpix = document.createElement("div");
    p_mathpix.id = "upload-text";
    p_mathpix.style.fontSize = "1.2rem";
    p_mathpix.style.color = "rgba(0,0,0,0.2)";
    p_mathpix.style.position = "absloute";
    p_mathpix.innerHTML = "<div style='text-align:left;width:80%;margin:5rem auto auto auto;'><li>点击“上传”按钮上传本地图片文件</li><li>拖拽本地图片文件至此处</li><li>复制其他网页中的图片,或截取屏幕图片到剪切板后，在当前页面全局粘贴</li></div>";
    p_mathpix.style.pointerEvents = "none";
    p_mathpix.style.userSelect = "none";
    p_mathpix.oncontextmenu = () => {
      return false;
    };
    p_mathpix.onddragstart = () => {
      return false;
    };
    let img_mathpix = document.createElement("img");
    img_mathpix.id = "img_mathpix";
    img_mathpix.style.height = "auto";
    img_mathpix.style.width = "100%";
    img_mathpix.style.maxHeight = "20rem";
    img_mathpix.style.margin = "auto";
    img_mathpix.style.boxShadow = "0px 0px 5px rgba(0,0,0,0.2)";
    img_mathpix.style.borderRadius = "4px";
    img_mathpix.style.position = "absolute";
    img_mathpix.oncontextmenu = () => {
      return false;
    };
    img_mathpix.ondragstart = () => {
      return false;
    };
    wrap_mathpix.appendChild(wrap_mathpix_in);
    wrap_mathpix_in.appendChild(wrap_mathpix_in_in1);
    wrap_mathpix_in.appendChild(wrap_mathpix_in_in2);
    wrap_mathpix_in_in1.appendChild(btn_mathpix_clear);
    wrap_mathpix_in_in1.appendChild(btn_mathpix);
    wrap_mathpix_in_in1.appendChild(ipt_mathpix);
    wrap_mathpix_in_in2.appendChild(img_mathpix);
    wrap_mathpix_in_in2.appendChild(p_mathpix);
    $("#a_shortcut_mathpix").on("click", function () {
      $(".area .nav-link").attr("class", "nav-link");
      $(".wrap-shortcut").hide();
      $("#a_shortcut_mathpix").attr("class", "nav-link active");
      $("#wrap_shortcut_mathpix").show();
      mathpix.obj_theme.reinit();
    });
    mathpix.setPasteImg(); //绑定粘贴事件
  },
  localImgLoad: function () {
    let src = this.files[0];
    let read = new FileReader();
    read.readAsDataURL(src);
    read.onload = function (e) {
      let bs64 = e.target.result;
      let img = document.getElementById("img_mathpix");
      img.src = bs64;
      mathpix.sendToServer(bs64);
      //如果感觉需要压缩就调用mathpix.compress()把后续放在回调里
      // mathpix.compress(bs64, 0.5, function () {
      //   document.getElementById("img_mathpix").src = bs64;
      //   mathpix.sendToServer(bs64);
      // });
    };
  },
  localImgLoad_drag: function (ev) {
    let msgbox = mathpix.obj_eject;
    try {
      let oFile = ev.dataTransfer.files[0];
      let read = new FileReader();
      read.onload = function () {
        let bs64 = read.result;
        let img = document.getElementById("img_mathpix");
        img.src = bs64;
        mathpix.sendToServer(bs64);
      };
      //TODO:这里报错了，准备调整，判断read变量是否是Blob类型，如果为空，则做异常处理，如果为Blob则继续
      read.readAsDataURL(oFile, "base64");
    } catch (err) {
      msgbox.Etoast({
        type: "warning",
        message: "请拖拽本地图片上传",
      });
    }
  },
  sendToServer: function (bs) {
    $("#loadingModal").css("display", "block");
    mathpix.progressRun();
    mathpix.obj_api.getLaTexFromMathPix(bs).then(
      function (re) {
        if (re.result == 0) {
          let info = JSON.parse(re.detail.info);
          if (typeof info.latex_styled == "undefined") {
            if (typeof info.text == "undefined") {
              mathpix.obj_eject.Etoast({
                type: "warning",
                message: "没有识别出有效图像",
              });
            } else {
              //★特事特办，去掉MathPix返回的text值里的斜杠和括号
              let txt = info.text.replace(/\\\(|\\\)|\\\[|\\\]/g, "");
              $(mathpix.obj_element.el_input).val($(mathpix.obj_element.el_input).val() + txt);
              mathpix.fn_refresh();
            }
          } else {
            $(mathpix.obj_element.el_input).val($(mathpix.obj_element.el_input).val() + info.latex_styled);
            mathpix.fn_refresh();
          }
        } else {
          mathpix.obj_eject.Etoast({
            type: "warning",
            message: re.detail.errinfo,
          });
        }
        mathpix.progressReset();
        $("#loadingModal").css("display", "none");
      },
      function (re) {
        mathpix.obj_eject.Etoast({
          type: "info",
          message: "此功能需要登录一下",
        });
        mathpix.progressReset();
        $("#loadingModal").css("display", "none");
        setTimeout(() => {
          window.location.href = "../login";
        }, 2000);
      }
    );
  },
  _sendToServer: function (bs) {
    let data = {
      src: bs,
    };
    $.ajax({
      type: "POST",
      dataType: "json",
      contentType: "application/json",
      url: mathpix.path_api_mathpix,
      data: JSON.stringify(data),
      beforeSend: function () {
        $("#loadingModal").css("display", "block");
        mathpix.progressRun();
      },
      success: function (info) {
        //☆特事特办，增加每日可调用MathPix接口次数功能的判断
        let times = info[0];
        let re = "";
        if (info[1] != "") {
          re = JSON.parse(info[1]);
        }
        if (times >= 0) {
          if (typeof re.latex_styled == "undefined") {
            if (typeof re.text == "undefined") {
              let msgbox = mathpix.obj_eject;
              msgbox.Etoast({
                type: "warning",
                message: "没有识别出有效图像",
              });
            } else {
              //★特事特办，去掉MathPix返回的text值里的斜杠和括号
              let txt = re.text.replace(/\\\(|\\\)|\\\[|\\\]/g, "");
              $(mathpix.obj_element.el_input).val($(mathpix.obj_element.el_input).val() + txt);
              mathpix.fn_refresh();
            }
          } else {
            $(mathpix.obj_element.el_input).val($(mathpix.obj_element.el_input).val() + re.latex_styled);
            mathpix.fn_refresh();
          }
        } else {
          let msgbox = mathpix.obj_eject;
          msgbox.Etoast({
            type: "warning",
            message: "今天的使用次数已用尽。请明日继续使用识图功能",
          });
        }
      },
      error: function (err) {
        console.log(err);
      },
      complete: function () {
        mathpix.progressReset();
        $("#loadingModal").css("display", "none");
      },
    });
  },
  compress: function (base64, rate, callback) {
    var _img = new Image();
    _img.src = base64;
    _img.onload = function () {
      var _canvas = document.createElement("canvas");
      var w = this.width / rate;
      var h = this.height / rate;
      _canvas.setAttribute("width", w);
      _canvas.setAttribute("height", h);
      _canvas.getContext("2d").drawImage(this, 0, 0, w, h);
      var base64 = _canvas.toDataURL("image/jpeg");
      _canvas.toBlob(function (blob) {
        if (blob.size > 750 * 1334) {
          //如果还大，继续压缩
          compress(base64, rate, callback);
        } else {
          callback(base64);
        }
      }, "image/jpeg");
    };
  },
  progressRun: function () {
    let prog = document.getElementById("progressbar");
    let val = 0;
    let tmr = setInterval(function () {
      val += 1;
      $(prog).css("width", val + "%");
      if (val >= 100) {
        clearInterval(tmr);
      }
    }, 8);
  },
  progressReset: function () {
    let prog = document.getElementById("progressbar");
    $(prog).css("width", "0");
  },
  setPasteImg: function () {
    //粘贴事件
    document.addEventListener("paste", function (event) {
      if (event.clipboardData || event.originalEvent) {
        let clipboardData = event.clipboardData || event.originalEvent.clipboardData;
        if (clipboardData.items) {
          try {
            let blob;
            for (let i = 0; i < clipboardData.items.length; i++) {
              if (clipboardData.items[i].type.indexOf("image") !== -1) {
                blob = clipboardData.items[i].getAsFile();
              }
            }
            let render_f = new FileReader();
            render_f.onload = function (evt) {
              //输出base64编码
              let base64 = evt.target.result;
              document.getElementById("img_mathpix").setAttribute("src", base64);
              mathpix.sendToServer(base64);
            };
            render_f.readAsDataURL(blob);
          } catch (err) {
            console.log("剪切板里是文件不是二进制");
          }
        }
      }
    });
  },
};
