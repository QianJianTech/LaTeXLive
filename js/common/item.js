export var setStyle = {
  buttongroup_primary: function (btn) {
    $(btn).click(function () {
      $(".btn-filter").attr("class", "btn btn-outline-primary btn-filter");
      $(this).attr("class", "btn btn-outline-primary btn-filter myactive");
    });
  },
};

export var UrlParams = {
  get: function (key) {
    let query = window.location.search.substring(1);
    let vars = query.split("&");
    for (let i = 0; i < vars.length; i++) {
      let pair = vars[i].split("=");
      if (pair[0] == key) {
        return pair[1];
      }
    }
    return false;
  },
};

export var StringDeal = {
  dealHide_Mail: function (mail) {
    if (mail == "") {
      return "未绑定";
    }
    // var reg = /^(.*).{4}$/;
    // mail = mail.replace(reg, "$1****");
    // return mail;
    if (String(mail).indexOf("@") > 0) {
      let str = mail.split("@"),
        _s = "";
      if (str[0].length > 3) {
        for (var i = 0; i < str[0].length - 3; i++) {
          _s += "*";
        }
      }
      let new_email = str[0].substr(0, 3) + _s + "@" + str[1];
      return new_email;
    }
  },
  dealHide_Tel: function (tel) {
    if (tel == "") {
      return "未绑定";
    }
    tel = tel.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
    return tel;
  },
  toMD5: function (str) {
    return hex_md5(str);
  },
};

export var LoadComplete = {
  closeLoadingMask: function () {
    setTimeout(function () {
      document.getElementById("loading").style.display = "none";
    }, 200);
  },
};

export var Mask = {
  init: function () {
    //定义等待遮罩的样式
    let styleNode = document.createElement("style");
    styleNode.id = "style_ajaxCircleMask";
    styleNode.setAttribute("type", "text/css");
    styleNode.innerHTML = "#back_ajaxCircleMask{background-color: #000;height: 100%;width: 100%;position: fixed;z-index: 1059;margin-top: 0;top: 0;opacity: 0.1;} #ajaxCircleMask{width:160px;height:200px;position: absolute;top:40%;left:50%;line-height:56px;color:#fff;font-size:15px;background: #000 url(../img/ajaxCircle.gif) no-repeat center center;background-size: 90px;opacity: 0.5;z-index:1060;-moz-border-radius:20px;-webkit-border-radius:20px;border-radius:20px;filter:progid:DXImageTransform.Microsoft.Alpha(opacity=50);}";
    let headNode = document.querySelector("head");
    headNode.appendChild(styleNode);

    let mask = document.createElement("div");
    mask.id = "ajaxCircleMask";
    mask.innerHTML = "<div style='text-align:center;margin-top:140px;color:#ccc;font-size:16px;'>正在处理</div>";
    let back = document.createElement("div");
    back.id = "back_ajaxCircleMask";
    let bodyNode = document.querySelector("body");
    bodyNode.appendChild(back);
    bodyNode.appendChild(mask);
  },
  show: function () {
    let mask = document.getElementById("ajaxCircleMask");
    let back = document.getElementById("back_ajaxCircleMask");
    if (mask) {
      mask.style.display = "block";
      back.style.display = "block";
    } else {
      Mask.init();
      document.getElementById("ajaxCircleMask").style.display = "block";
      document.getElementById("back_ajaxCircleMask").style.display = "block";
    }
  },
  hide: function () {
    let mask = document.getElementById("ajaxCircleMask");
    let back = document.getElementById("back_ajaxCircleMask");
    if (mask) {
      mask.style.display = "none";
      back.style.display = "none";
    }
  },
};

export var MaskOpacity = {
  init: function () {
    //定义等待遮罩的样式
    let styleNode = document.createElement("style");
    styleNode.id = "style_ajaxOpacityMask";
    styleNode.setAttribute("type", "text/css");
    styleNode.innerHTML = "#back_ajaxOpacityMask{background-color: #fff;height: 100%;width: 100%;position: fixed;z-index: 1058;margin-top: 0;top: 0;opacity: 0.01;}";
    let headNode = document.querySelector("head");
    headNode.appendChild(styleNode);

    let back = document.createElement("div");
    back.id = "back_ajaxOpacityMask";
    let bodyNode = document.querySelector("body");
    bodyNode.appendChild(back);
  },
  show: function () {
    let back = document.getElementById("back_ajaxOpacityMask");
    if (back) {
      back.style.display = "block";
    } else {
      MaskOpacity.init();
      document.getElementById("back_ajaxOpacityMask").style.display = "block";
    }
  },
  hide: function () {
    let back = document.getElementById("back_ajaxOpacityMask");
    if (back) {
      back.style.display = "none";
    }
  },
};

export var Performance = {
  timer_debounce: "",
  /**
   * 防抖-延迟执行回调函数
   * @param {*} fun 回调函数
   * @param {*} delay 延迟回调时间间隔（毫秒）
   * @returns {Function}
   */
  debounce: function (fun, delay) {
    return function () {
      clearTimeout(Performance.timer_debounce);
      Performance.timer_debounce = setTimeout(function () {
        fun();
      }, delay);
    };
  },
  /**
   * 防抖-延迟执行回调函数(异步)
   * @param {*} fun 回调函数
   * @param {*} delay 延迟回调时间间隔（毫秒）
   * @returns {Function}
   */
  debounceAsync: function (fun, delay) {
    return new Promise(function (resolve, reject) {
      clearTimeout(Performance.timer_debounce);
      Performance.timer_debounce = setTimeout(function () {
        fun().then(resolve, reject);
      }, delay);
    });
  },
};
