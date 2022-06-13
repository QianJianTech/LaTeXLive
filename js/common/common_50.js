

document.writeln("<script src='" + boot_body + "/lib/JQuery-3.4.1/jquery-3.4.1.min.js'></script>");
document.writeln("<script src='" + boot_body + "/lib/bootstrap-4.3.1-dist/js/bootstrap.bundle.min.js'></script>");

var scriptLoader = {
  script_list: {
    latex: ["<script src='" + boot_body + "/lib/tippy/popper.min.js'></script>", "<script src='https://cdn.bootcss.com/tippy.js/6.1.0/tippy-bundle.umd.min.js'></script>", "<script src='" + boot_body + "/lib/caret/caret.js'></script>", "<script src='" + boot_body + js_body + "?ver=" + ver_body + "' type='module'></script>"],
    readme: ["<script src='" + boot_body + js_body + "?ver=" + ver_body + "' type='module'></script>"],
    update: ["<script src='" + boot_body + js_body + "?ver=" + ver_body + "' type='module'></script>"],
    messageboard: ["<script src='" + boot_body + "/lib/wangEditor/wangEditor.min.js'></script>", "<script src='" + boot_body + js_body + "?ver=" + ver_body + "' type='module'></script>"],
    login: ["<script src='" + boot_body + "/lib/MD5/md5.js'></script>", "<script src='" + boot_body + "/lib/gVerify/gVerify.js'></script>", "<script src='" + boot_body + js_body + "?ver=" + ver_body + "' type='module'></script>"],
    personal: ["<script src='" + boot_body + "/lib/MD5/md5.js'></script>", "<script src='" + boot_body + js_body + "?ver=" + ver_body + "' type='module'></script>"],
  },
  init: function () {
    if (scriptLoader.isIE()) {
      document.getElementById("isJavaScript").style.display = "none";
      document.getElementById("ifIE-show").style.display = "block";
      document.body.style.overflowY = "hidden";
      return false;
    } else {
      document.getElementById("isJavaScript").remove();
      document.getElementById("ifIE-show").remove();
      //更新图片路径
      document.getElementById("img_eqcode").src = boot_body + "/img/wechat.png";
      document.getElementById("img_toutiao").src = boot_body + "/img/toutiao.png";
      document.getElementById("img_police").src = boot_body + "/img/police.png";
      document.getElementById("img_gitee").src = boot_body + "/img/gitee.png";
      //更新标题中的版本号
      document.getElementById("ver_h1").innerHTML = "ver" + ver_body;
      //更新版权中的版本号
      let date = new Date();
      let month = date.getMonth() + 1;
      let month_0 = month < 10 ? "0" + month : "" + month;
      let date_join = "." + date.getFullYear() + month_0 + date.getDate();
      document.getElementById("copyver").innerHTML = "Copyright &copy; 2019 妈咪说（北京）科技传媒Co.,Ltd. All Rights Reserved&nbsp;&nbsp;ver:" + ver_body + date_join;
      //加载body资源
      scriptLoader.loadOuterScript();
      scriptLoader.googleads();
      document.body.removeChild(document.getElementById("common_50"));
    }
  },
  isIE: function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1;
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
        return true; //IE版本<=7
      }
    } else if (isEdge) {
      return true; //edge
    } else if (isIE11) {
      return true; //IE11
    } else {
      return false; //不是ie浏览器
    }
  },
  loadOuterScript: function () {
    let array = scriptLoader.script_list[page_type];
    array.forEach((script) => {
      document.writeln(script);
    });
  },
  googleads: function () {
    if (Environment != "development") {
      document.writeln("<script async src='https://www.googletagmanager.com/gtag/js?id=UA-164353536-1'></script>");
      document.writeln("  <script>");
      document.writeln("    window.dataLayer = window.dataLayer || [];");
      document.writeln("    function gtag() {");
      document.writeln("      dataLayer.push(arguments);");
      document.writeln("    }");
      document.writeln("    gtag('js', new Date());");
      document.writeln("");
      document.writeln("    gtag('config', 'UA-164353536-1');");
      document.writeln("  </script>");
    }
  },
};

scriptLoader.init();
