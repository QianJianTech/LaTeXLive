/**
 * @Copyright Copyright © 2022
 * @Createdon 2022-6-12
 * @Author Panda_YueTao
 * @Version 1.6.4
 * @Title 妈叔出品-LaTeX公式编辑器脚本
 */

import "../../css/rem.css";
import "../../css/style.css";
import "../../css/navbar.css";
import "../../css/checkbox.css";
import "../../css/radiobutton.css";
import "../../css/latex.css";
import "../../css/abouttheme.css";
import "../../css/footer.css";

import { action } from "./action.js";
import { autocomplete } from "./autocomplete.js";
import { common } from "./common.js";
import { Eject } from "../common/eject.js";
import { element } from "./element.js";
import { flat } from "./flat.js";
import { highlight } from "./highlight.js";
import { immediate } from "./immediate.js";
import { input } from "./input.js";
import { mapjson } from "./mapjson.js";
import { mathjaxCore } from "./mathjaxCore.js";
import { mathpix } from "./mathpix.js";
import { output } from "./output.js";
import { setting } from "./setting.js";
import { shareurl } from "./shareurl.js";
import { shortcut } from "./shortcut.js";
import { theme } from "./theme.js";
import { wechatimg } from "./wechatimg.js";
import { navbar } from "../common/navbar.js";
import { api } from "../common/api.js";
import { LoginVerify } from "../login/verify.js";
import { LoadComplete } from "../common/item.js";
import { notify } from "../common/notify.js";

class NavBarOption {
  constructor() {
    NavBarOption.prototype.obj_api = api;
    NavBarOption.prototype.pageType = "home";
  }
}

class ApiOption {
  constructor() {
    ApiOption.prototype.path_api = Config[Environment].WebAPI;
  }
}

class VerifyOption {
  constructor() {
    VerifyOption.prototype.obj_api = api;
  }
}

class GolbalOption {
  constructor() {
    GolbalOption.prototype.const_boot = Config[Environment].Boot_OSS;
    GolbalOption.prototype.const_hostName = Config[Environment].Hostname;
    GolbalOption.prototype.obj_autocomplete = autocomplete;
    GolbalOption.prototype.obj_common = common;
    GolbalOption.prototype.obj_eject = new Eject();
    GolbalOption.prototype.obj_element = element;
    GolbalOption.prototype.obj_flat = flat;
    GolbalOption.prototype.obj_highlight = highlight;
    GolbalOption.prototype.obj_input = input;
    GolbalOption.prototype.obj_mathjaxCore = mathjaxCore;
    GolbalOption.prototype.obj_mathpix = mathpix;
    GolbalOption.prototype.obj_output = output;
    GolbalOption.prototype.obj_setting = setting;
    GolbalOption.prototype.obj_theme = theme;
    GolbalOption.prototype.obj_api = api;
    GolbalOption.prototype.fn_refresh = function () {
      highlight.textareaToDiv();
      output.render();
      theme.setMathJax();
    };
  }
}

var navbar_opt = new NavBarOption();
var api_opt = new ApiOption();
var verify_opt = new VerifyOption();
var latex_opt = new GolbalOption();

var init_latex = function (opt) {
  mapjson.init(opt).then(function (data) {
    GolbalOption.prototype.map_all = data;
    setting.init(opt);
    theme.init(opt);
    input.init(opt);
    shortcut.init(opt);
    mathpix.init(opt);
    immediate.init(opt);
    action.init(opt);
    wechatimg.init(opt);
    highlight.init(opt);
    autocomplete.init(opt);
    flat.init(opt);
    common.init(opt);
    notify.init();
    mathjaxCore.init(opt).then(function () {
      output.init(opt);
      shareurl.init(opt);
      LoadComplete.closeLoadingMask();
    });
  });
};

$(function () {
  api.init(api_opt);
  navbar.init(navbar_opt);
  LoginVerify.init(verify_opt);
  LoginVerify.isLogined(false).then(
    function () {
      init_latex(latex_opt);
    },
    function () {
      init_latex(latex_opt);
    }
  );
});
