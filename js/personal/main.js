import "../../css/style.css";
import "../../css/rem.css";
import "../../css/navbar.css";
import "../../css/footer.css";
import "../../css/personal.css";

import { Mask } from "../common/item.js";
import { Performance } from "../common/item.js";
import { StringDeal } from "../common/item.js";
import { Eject } from "../common/eject.js";
import { navbar } from "../common/navbar.js";
import { api } from "../common/api.js";
import { LoginVerify } from "../login/verify.js";
import { element_personal } from "./element.js";
import { personal } from "./personal.js";
import { LoadComplete } from "../common/item.js";
import { validate } from "../login/validate.js";

class NavBarOption {
  constructor() {
    NavBarOption.prototype.obj_api = api;
    NavBarOption.prototype.pageType = "personal";
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

class PersonalOption {
  constructor() {
    PersonalOption.prototype.obj_mask = Mask;
    PersonalOption.prototype.obj_performance = Performance;
    PersonalOption.prototype.detail = {};
    PersonalOption.prototype.obj_stringDeal = StringDeal;
    PersonalOption.prototype.el = element_personal;
    PersonalOption.prototype.obj_api = api;
    PersonalOption.prototype.obj_eject = new Eject();
    PersonalOption.prototype.obj_validate = validate;
    PersonalOption.prototype.obj_verify = LoginVerify;
    PersonalOption.prototype.appid = Config[Environment].WXLogin.AppID;
    PersonalOption.prototype.redirectURL = Config[Environment].WXLogin.RedirectURL;
  }
}

var navbar_opt = new NavBarOption();
var api_opt = new ApiOption();
var verify_opt = new VerifyOption();
var personal_opt = new PersonalOption();

$(function () {
  api.init(api_opt);
  navbar.init(navbar_opt);
  LoginVerify.init(verify_opt);
  let wxcode = LoginVerify.getUrlParm("code");
  if (wxcode != false && wxcode != "") {
    PersonalOption.prototype.wxcode = wxcode;
  } else {
    PersonalOption.prototype.wxcode = false;
  }
  LoginVerify.isLogined(true).then(function (detail) {
    PersonalOption.prototype.detail = detail;
    personal.init(personal_opt);
    LoadComplete.closeLoadingMask();
  });
});
