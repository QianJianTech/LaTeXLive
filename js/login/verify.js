export var LoginVerify = {
  loginPath: "../login",
  obj_api: {},
  /** 初始化
   * @param {*} opt
   */
  init: function (opt) {
    LoginVerify.obj_api = opt.obj_api;
  },

  /** 验证是否已经登录
   * @param {*} isRedirect 是否重定向至登录界面
   * @returns
   */
  isLogined: function (isRedirect) {
    let pro = new Promise(function (resolve, reject) {
      if (isRedirect == undefined || isRedirect == "undefined") {
        isRedirect = false;
      }
      let _mytoken = LoginVerify.obj_api.getMyTokenFromLocal();
      if (_mytoken == false) {
        if (isRedirect) {
          window.location.href = LoginVerify.loginPath;
          reject();
        } else {
          LoginVerify.showNavLogin();
          reject();
        }
      } else {
        LoginVerify.obj_api.loginByMyToken().then(function (re) {
          if (re.result == 0) {
            LoginVerify.showNavPersonal();
            let userinfo = JSON.parse(re.detail.userinfo);
            LoginVerify.setNicknameAndPortrait(userinfo.Portrait, userinfo.Nickname);
            resolve(re.detail);
          } else {
            if (isRedirect) {
              window.location.href = LoginVerify.loginPath;
              reject(re);
            } else {
              LoginVerify.showNavLogin();
              reject(re);
            }
          }
        });
      }
    });
    return pro;
  },

  /** 获得地址栏携带的参数
   * @param {*} key
   * @returns
   */
  getUrlParm: function (key) {
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

  /** 使导航栏登陆区域呈现[待登录]状态 */
  showNavLogin: function () {
    $("#wrap_btn_href_login").css("display", "block");
    $("#wrap_btn_href_personal").css("display", "none");
  },

  /** 使导航栏登陆区域呈现[已登录-个人信息]状态 */
  showNavPersonal: function () {
    $("#wrap_btn_href_login").css("display", "none");
    $("#wrap_btn_href_personal").css("display", "block");
  },

  /** 根据后台数据渲染头像和昵称
   * @param {*} src
   * @param {*} nick
   */
  setNicknameAndPortrait: function (src, nick) {
    document.getElementById("img-nav-portrait").src = src;
    document.getElementById("span-nav-portrait").innerHTML = nick;
  },
};
