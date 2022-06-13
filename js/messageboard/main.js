import "../../css/style.css";
import "../../css/navbar.css";
import "../../css/messageboard.css";
import "../../css/log.css";
import "../../css/footer.css";
var xss = require("xss");

import { navbar } from "../common/navbar.js";
import { setStyle } from "../common/item.js";
import { LoginVerify } from "../login/verify.js";

$(function () {
  messageboard.init();
  LoginVerify.isLogined();
  setStyle.buttongroup_primary(".btn-filter");
  $("#btn_writemessage").click(function () {});
});

var messageboard = {
  init: function () {
    messageboard.init_wangeditor();
    // theme_except_latex.init_navLink("#btn_messageboard");
  },
  init_wangeditor: function () {
    const E = window.wangEditor;
    const editor = new E("#wrap_writemessage");
    editor.config.height = 150;
    editor.config.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic",
      "underline",
      "strikeThrough",
      "indent",
      "lineHeight",
      "foreColor",
      "backColor",
      // 'link',
      "list",
      // 'todo',
      "justify",
      "quote",
      // "emoticon",
      // "image",
      // 'video',
      // 'table',
      // 'code',
      "splitLine",
      "undo",
      "redo",
    ];
    editor.config.showLinkImg = false;
    editor.config.placeholder = "请输入您的留言";
    editor.config.uploadImgShowBase64 = true;

    editor.create();
  },
  getWangeditorHtml: function (edit) {
    let html = xss(edit.txt.html());
    console.log(html);
    edit.txt.append(html);
  },
  Messges: {
    getMessageFromAPI: function () {},
  },
};
