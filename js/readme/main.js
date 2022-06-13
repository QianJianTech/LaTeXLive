import "../../css/style.css";
import "../../css/navbar.css";
import "../../css/readme.css";
import "../../css/abouttheme.css";
import "../../css/footer.css";

import { navbar } from "../common/navbar.js";
import { api } from "../common/api.js";
import { LoginVerify } from "../login/verify.js";
import { element_readme } from "./element.js";
import { readme } from "./readme.js";
import { LoadComplete } from "../common/item.js";

class NavBarOption {
  constructor() {
    NavBarOption.prototype.obj_api = api;
    NavBarOption.prototype.pageType = "readme";
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

class ReadmeOption {
  constructor() {
    ReadmeOption.prototype.el = element_readme;
  }
}

var navbar_opt = new NavBarOption();
var api_opt = new ApiOption();
var verify_opt = new VerifyOption();
var readme_opt = new ReadmeOption();

$(function () {
  api.init(api_opt);
  navbar.init(navbar_opt);
  LoginVerify.init(verify_opt);
  LoginVerify.isLogined(false).then(
    function () {
      readme.init(readme_opt);
      LoadComplete.closeLoadingMask();
    },
    function () {
      readme.init(readme_opt);
      LoadComplete.closeLoadingMask();
    }
  );
});
