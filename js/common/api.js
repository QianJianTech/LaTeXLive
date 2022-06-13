import { Performance } from "../common/item.js";
import { MaskOpacity } from "../common/item.js";

export var api = {
  MasterThreadBusy: false,
  debounceWait: 200,
  requestStamp: "",
  reponseStamp: "",
  path_api: {},
  init: function (opt) {
    api.path_api = opt.path_api;
  },

  loginByMyToken: function () {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let _token = api.getMyTokenFromLocal();
        if (!_token) {
          reject();
          return;
        }
        let url = api.path_api.Root + api.path_api.Controller.LoginByMyToken;
        let data = {
          mytoken: _token,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  loginByAccount: function (loginname, password) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let url = api.path_api.Root + api.path_api.Controller.LoginByAccount;
        let data = {
          loginname: loginname,
          password: password,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  regByAccount: function (username, password, tel, mail) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let url = api.path_api.Root + api.path_api.Controller.RegByAccount;
        let data = {
          username: username,
          password: password,
          tel: tel,
          mail: mail,
          equiptype: navigator.userAgent,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  updateUser: function (obj_userinfo, code) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        code = code == "" || code == undefined || code == "undefined" ? "" : code;
        obj_userinfo.Tel = obj_userinfo.Tel == "" ? "ForceEmpty" : obj_userinfo.Tel;
        obj_userinfo.Mail = obj_userinfo.Mail == "" ? "ForceEmpty" : obj_userinfo.Mail;
        obj_userinfo.Wechat = obj_userinfo.Wechat == "" ? "ForceEmpty" : obj_userinfo.Wechat;
        obj_userinfo.Qq = obj_userinfo.Qq == "" ? "ForceEmpty" : obj_userinfo.Qq;
        obj_userinfo.Weibo = obj_userinfo.Weibo == "" ? "ForceEmpty" : obj_userinfo.Weibo;

        let _token = api.getMyTokenFromLocal();
        if (!_token) {
          reject();
          return;
        }
        let url = api.path_api.Root + api.path_api.Controller.UpdateUser;
        let data = {
          mytoken: _token,
          code: code,
          username: obj_userinfo.Username,
          password: obj_userinfo.Password,
          tel: obj_userinfo.Tel,
          mail: obj_userinfo.Mail,
          wechat: obj_userinfo.Wechat,
          qq: obj_userinfo.Qq,
          weibo: obj_userinfo.Weibo,
          portrait: obj_userinfo.Portrait,
          nickname: obj_userinfo.Nickname,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  removeUser: function () {
    return Performance.debounceAsync(function () {
      //
    }, api.debounceWait);
  },
  loginByWX: function (wxcode) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let url = api.path_api.Root + api.path_api.Controller.LoginByWX;
        let data = {
          code: wxcode,
          equiptype: navigator.userAgent,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  WXBind: function (wxcode) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let _token = api.getMyTokenFromLocal();
        if (!_token) {
          reject();
          return;
        }
        let url = api.path_api.Root + api.path_api.Controller.WXBind;
        let data = {
          mytoken: _token,
          code: wxcode,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  loginByMessage: function (tel, code) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let url = api.path_api.Root + api.path_api.Controller.LoginByMessage;
        let data = {
          tel: tel,
          code: code,
          equiptype: navigator.userAgent,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  sendMessageCode_Identity: function () {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let _token = api.getMyTokenFromLocal();
        if (!_token) {
          reject();
          return;
        }
        let url = api.path_api.Root + api.path_api.Controller.SendMessageCode_Identity;
        let data = {
          mytoken: _token,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  sendMessageCode_Login: function (tel) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let url = api.path_api.Root + api.path_api.Controller.SendMessageCode_Login;
        let data = {
          tel: tel,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  getRemainTime: function (tel) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let url = api.path_api.Root + api.path_api.Controller.GetRemainTime;
        let data = {
          tel: tel,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },
  getLaTexFromMathPix: function (src) {
    return Performance.debounceAsync(function () {
      let pro = new Promise(function (resolve, reject) {
        let _token = api.getMyTokenFromLocal();
        if (!_token) {
          reject("未登录");
          return;
        }
        let url = api.path_api.Root + api.path_api.Controller.GetLaTexFromMathPix;
        let data = {
          mytoken: _token,
          src: src,
        };
        api.ajax(url, data).then(
          function (re) {
            if (re.detail.token) {
              api.setMyTokenToLocal(re.detail.token);
            }
            resolve(re);
          },
          function (re) {
            console.log(re);
            reject(re);
          }
        );
      });
      return pro;
    }, api.debounceWait);
  },

  /** 向后台发送http请求
   * @param {*} url
   * @param {*} data
   * @returns
   */
  ajax: function (url, data) {
    if (api.MasterThreadBusy == false) {
      // console.log("主线程空闲，发送请求");
      // console.log("flag: " + api.MasterThreadBusy);
      api.MasterThreadBusy = true;
      // console.log("将主线程设置为繁忙");
      // console.log("flag: " + api.MasterThreadBusy);
      let pro = new Promise(function (resolve, reject) {
        $.ajax({
          type: "POST",
          dataType: "json",
          contentType: "application/json",
          url: url,
          data: JSON.stringify(data),
          beforeSend: function () {
            MaskOpacity.show();
          },
          success: function (re) {
            resolve(re);
          },
          error: function (err) {
            reject(err);
          },
          complete: function () {
            MaskOpacity.hide();
            api.MasterThreadBusy = false;
            // console.log("主线程任务结束，空闲");
            // console.log("flag: " + api.MasterThreadBusy);
          },
        });
      });
      return pro;
    } else {
      // console.log("主线程忙，100毫秒后重新尝试发送请求");
      // console.log("flag: " + api.MasterThreadBusy);
      setTimeout(function () {
        // console.log("重新发送请求中……");
        // console.log("flag: " + api.MasterThreadBusy);
        api.ajax(url, data);
      }, 1000);
    }
  },
  /** 读取本地磁盘存储的token信息 */
  getMyTokenFromLocal: function () {
    let keyname = "mytoken";
    if (localStorage.hasOwnProperty(keyname)) {
      let rtnstr = localStorage.getItem(keyname);
      if (rtnstr == undefined || rtnstr == "" || rtnstr == "undefined") {
        return false;
      } else {
        return rtnstr;
      }
    } else {
      return false;
    }
  },
  /** 把token信息存储到本地磁盘
   * @param {*} obj -将要在本地序列化存储的对象
   */
  setMyTokenToLocal: function (token) {
    let keyname = "mytoken";
    localStorage.setItem(keyname, token);
  },
  /** 删除本地token信息 */
  removeMyTokenFromLocal: function () {
    let keyname = "mytoken";
    localStorage.removeItem(keyname);
  },
};
