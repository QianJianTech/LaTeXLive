import "../../css/style.css";
import "../../css/navbar.css";
import "../../css/abouttheme.css";
import "../../css/footer.css";
import "../../css/log.css";

import { navbar } from "../common/navbar.js";
import { api } from "../common/api.js";
import { LoginVerify } from "../login/verify.js";
import { update } from "./update.js";
import { LoadComplete } from "../common/item.js";

class NavBarOption {
  constructor() {
    NavBarOption.prototype.obj_api = api;
    NavBarOption.prototype.pageType = "update";
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

var navbar_opt = new NavBarOption();
var api_opt = new ApiOption();
var verify_opt = new VerifyOption();
var update_opt = {};

$(function () {
  api.init(api_opt);
  navbar.init(navbar_opt);
  LoginVerify.init(verify_opt);
  LoginVerify.isLogined(false).then(
    function () {
      update.init(update_opt);
      LoadComplete.closeLoadingMask();
    },
    function () {
      update.init(update_opt);
      LoadComplete.closeLoadingMask();
    }
  );
});
