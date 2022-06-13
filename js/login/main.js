import "../../css/style.css";
import "../../css/navbar.css";
import "../../css/footer.css";
import "../../css/login.css";

import { StringDeal } from "../common/item.js";
import { Mask } from "../common/item.js";
import { Eject } from "../common/eject.js";
import { navbar } from "../common/navbar.js";
import { api } from "../common/api";
import { LoginVerify } from "./verify.js";
import { element_login } from "./element.js";
import { login } from "./login.js";
import { LoadComplete } from "../common/item.js";
import { validate } from "./validate.js";

class NavBarOption {
  constructor() {
    NavBarOption.prototype.obj_api = api;
    NavBarOption.prototype.pageType = "login";
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

class LoginOption {
  constructor() {
    LoginOption.prototype.obj_stringDeal = StringDeal;
    LoginOption.prototype.obj_mask = Mask;
    LoginOption.prototype.el = element_login;
    LoginOption.prototype.obj_api = api;
    LoginOption.prototype.obj_eject = new Eject();
    LoginOption.prototype.obj_validate = validate;
    LoginOption.prototype.appid = Config[Environment].WXLogin.AppID;
    LoginOption.prototype.redirectURL = Config[Environment].WXLogin.RedirectURL;
  }
}

var navbar_opt = new NavBarOption();
var api_opt = new ApiOption();
var verify_opt = new VerifyOption();
var login_opt = new LoginOption();

$(function () {
  api.init(api_opt);
  navbar.init(navbar_opt);
  LoginVerify.init(verify_opt);
  let wxcode = LoginVerify.getUrlParm("code");
  if (wxcode != false && wxcode != "") {
    LoginOption.prototype.wxcode = wxcode;
  } else {
    LoginOption.prototype.wxcode = false;
  }
  LoginVerify.showNavLogin();
  login.init(login_opt);
  LoadComplete.closeLoadingMask();
});
