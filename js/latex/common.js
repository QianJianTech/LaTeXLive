export var common = {
  init: function (opt) {
    // $("button,input,a").attr("tabindex", "-1");
    common.PreventDefaultFileDrop(document, function () { return false; })
  },
  isPC: function () {
    let userAgentInfo = navigator.userAgent;
    let Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); //"Macintosh"
    let flag = true;
    for (let v = 0; v < Agents.length; v++) {
      if (userAgentInfo.indexOf(Agents[v]) > 0) {
        flag = false;
        break;
      }
    }
    let devicewidth = document.body.clientWidth;
    return flag && devicewidth > 1100;
  },
  isIE: function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串  
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器  
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器  
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if (isIE) {
      var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
      reIE.test(userAgent);
      var fIEVersion = parseFloat(RegExp["$1"]);
      if (fIEVersion == 7) {
        return true;
      } else if (fIEVersion == 8) {
        return true;
      } else if (fIEVersion == 9) {
        return true;
      } else if (fIEVersion == 10) {
        return true;
      } else {
        return true;//IE版本<=7
      }
    } else if (isEdge) {
      return true;//edge
    } else if (isIE11) {
      return true; //IE11  
    } else {
      return false;//不是ie浏览器
    }
  },
  isMac: function () {
    var userAgentInfo = navigator.userAgent;
    var Agent = "Macintosh";
    var flag = false;
    if (userAgentInfo.indexOf(Agent) > 0) {
      flag = true;
      return flag;
    }
    return flag;
  },
  /** 复制到剪切板
     * @param {*} cont -要复制到剪切板的内容
     */
  copyToClip: function (cont) {
    let aux = document.createElement("input");
    aux.setAttribute("value", cont);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  },
  /** 如传入 document 对象，文件拖到页面任何位置，浏览器都不打开文件
   * @param target {HTMLDocument|HTMLElement|jQuery} 目标
   * @param [onDrop] {Function}
   */
  PreventDefaultFileDrop: function (target, onDrop) {
    var targetEl;
    // ie9及以下，不支持拖放，所以直接返回false
    if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE", "")) <= 9) {
      return false;
    }
    if (target instanceof jQuery) {
      targetEl = target[0];
    } else if (target instanceof Element || target instanceof Document) {
      targetEl = target;
    } else {
      console.error("Target must be a HTMLDocument|HTMLElement|jQuery.");
    }

    targetEl.ondragover = function () {
      return false;
    };
    targetEl.ondrop = function (e) {
      e.preventDefault();
      onDrop && onDrop();
    };
  },
};
