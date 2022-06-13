export var personal = {
  debounceWait: 200,

  detail: {},
  obj_mask: {},
  obj_performance: {},
  obj_stringDeal: {},
  obj_api: {},
  obj_eject: {},
  obj_validate: {},
  obj_verify: {},
  el: {},
  userinfo: {},
  userinfo_old: {},
  mathpixtime: {},
  appid: "",
  redirect_url: "",

  timer_remaintime: "",
  remaintime: 0,
  isTiming: false,
  init: function (opt) {
    personal.detail = opt.detail;
    personal.obj_mask = opt.obj_mask;
    personal.obj_performance = opt.obj_performance;
    personal.obj_stringDeal = opt.obj_stringDeal;
    personal.obj_api = opt.obj_api;
    personal.obj_eject = opt.obj_eject;
    personal.obj_validate = opt.obj_validate;
    personal.obj_verify = opt.obj_verify;
    personal.el = opt.el;
    personal.userinfo = JSON.parse(personal.detail.userinfo);
    personal.userinfo_old = JSON.parse(personal.detail.userinfo);
    personal.mathpixtime = JSON.parse(personal.detail.mathpixtime);
    personal.appid = opt.appid;
    personal.redirect_url = opt.redirectURL + "/personal";
    personal.init_setUserInfoValue();
    personal.init_setEditButton();
    personal.init_setMathPixProgress();
    personal.bindEvent();
    personal.init_LoginByWechat(personal.appid, personal.redirect_url);
    personal.WXBind(opt);
  },

  /** 绑定微信
   * @param {*} opt 配置项
   */
  WXBind: function (opt) {
    personal.obj_performance.debounce(function () {
      if (opt.wxcode != false) {
        personal.obj_api.WXBind(opt.wxcode).then(function (re) {
          if (re.result == 0) {
            personal.obj_eject.Etoast({
              type: "success",
              message: "绑定成功",
            });
            personal.reinit_ValueAndButton();
          } else {
            personal.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
          history.pushState({}, "", "personal?code=");
        });
      }
    }, personal.debounceWait)();
  },

  /** 初始化页微信登录 */
  init_LoginByWechat: function (appid, redirect_url) {
    let href_wx = "https://open.weixin.qq.com/connect/qrconnect?appid=" + appid + "&redirect_uri=" + redirect_url + "&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
    personal.el.wechatBind.href = href_wx;
  },

  /** 初始化输入框值 */
  init_setUserInfoValue: function () {
    personal.el.portrait.src = personal.userinfo_old.Portrait;
    personal.el.nickname.value = personal.userinfo_old.Nickname;
    personal.el.username.value = personal.userinfo_old.Username;
    personal.el.tel.value = personal.obj_stringDeal.dealHide_Tel(personal.userinfo_old.Tel);
    personal.el.mail.value = personal.obj_stringDeal.dealHide_Mail(personal.userinfo_old.Mail);
    personal.el.password.value = "********";
    personal.el.wechat.value = personal.userinfo_old.Wechat == "" ? "未绑定" : "已绑定";
    personal.el.qq.value = personal.userinfo_old.Qq == "" ? "未绑定" : "已绑定";
    personal.el.weibo.value = personal.userinfo_old.Weibo == "" ? "未绑定" : "已绑定";
  },

  /** 初始化编辑按钮的状态 */
  init_setEditButton: function () {
    personal.el.nicknameEditor.parentNode.style.display = "inline";
    personal.el.nicknameSaveEdit.parentNode.style.display = "none";
    personal.el.nicknameCancelEdit.parentNode.style.display = "none";

    personal.el.usernameEditor.parentNode.style.display = "inline";
    personal.el.usernameSaveEdit.parentNode.style.display = "none";
    personal.el.usernameCancelEdit.parentNode.style.display = "none";

    personal.el.passwordEditor.parentNode.style.display = "inline";
    personal.el.passwordSaveEdit.parentNode.style.display = "none";
    personal.el.passwordCancelEdit.parentNode.style.display = "none";

    personal.el.telBind.parentNode.style.display = personal.userinfo_old.Tel == "" ? "inline" : "none";
    personal.el.telUnbind.parentNode.style.display = personal.userinfo_old.Tel == "" ? "none" : "inline";
    personal.el.telSaveEdit.parentNode.style.display = "none";
    personal.el.telCancelEdit.parentNode.style.display = "none";

    personal.el.mailBind.parentNode.style.display = personal.userinfo_old.Mail == "" ? "inline" : "none";
    personal.el.mailUnbind.parentNode.style.display = personal.userinfo_old.Mail == "" ? "none" : "inline";
    personal.el.mailSaveEdit.parentNode.style.display = "none";
    personal.el.mailCancelEdit.parentNode.style.display = "none";

    personal.el.wechatBind.parentNode.style.display = personal.userinfo_old.Wechat == "" ? "inline" : "none";
    personal.el.wechatUnbind.parentNode.style.display = personal.userinfo_old.Wechat == "" ? "none" : "inline";

    personal.el.qqBind.parentNode.style.display = personal.userinfo_old.Qq == "" ? "inline" : "none";
    personal.el.qqUnbind.parentNode.style.display = personal.userinfo_old.Qq == "" ? "none" : "inline";

    personal.el.weiboBind.parentNode.style.display = personal.userinfo_old.Weibo == "" ? "inline" : "none";
    personal.el.weiboUnbind.parentNode.style.display = personal.userinfo_old.Weibo == "" ? "none" : "inline";
  },

  /** 设置剩余次数进度条 */
  init_setMathPixProgress: function () {
    let current = parseInt(personal.mathpixtime.current);
    let max = parseInt(personal.mathpixtime.max);
    let priv = parseInt(personal.mathpixtime.private);
    personal.el.currentTime.style.width = (max / (max + priv)) * (current / max) * 100 + "%";
    personal.el.maxTime.style.width = (max / (max + priv)) * ((max - current) / max) * 100 + "%";
    personal.el.privateTime.style.width = (priv / (max + priv)) * 100 + "%";
    personal.el.currentTime.innerHTML = current + "/" + max;
    personal.el.privateTime.innerHTML = "+" + priv;
    let total = current + priv;
    if (total == 0) {
      personal.el.totalTime.style.color = "red";
    } else {
      personal.el.totalTime.style.color = "#007bff";
    }
    personal.el.totalTime.innerHTML = current + priv;
  },

  /** 重新初始化值和按钮 */
  reinit_ValueAndButton: function () {
    personal.obj_performance.debounce(function () {
      personal.obj_api.loginByMyToken().then(function (re) {
        if (re.result == 0) {
          personal.userinfo = JSON.parse(re.detail.userinfo);
          personal.userinfo_old = JSON.parse(re.detail.userinfo);
          personal.init_setUserInfoValue();
          personal.init_setEditButton();
          personal.obj_validate.hideAllErrorInfo();
          personal.init_setMathPixProgress();
          personal.setAllModifyableFalse();
          personal.obj_verify.setNicknameAndPortrait(personal.userinfo_old.Portrait, personal.userinfo_old.Nickname);
        } else if (re.result == 1 && re.detail.errinfo == "token已过期或不存在") {
          //★特事特办：增加判断逻辑-当重新初始化状态时如果发现token丢失则重定向至登录页面
          window.location.href = "../login";
          return false;
        } else {
          console.log(re);
          return false;
        }
      });
    }, personal.debounceWait)();
  },

  /** 绑定事件 */
  bindEvent: function () {
    //#region 验证码模态框
    $(personal.el.messageSendButton).click(function () {
      personal.sendCode();
    });
    $(personal.el.messageModal).on("hidden.bs.modal", function (e) {
      personal.resetSendButtonStatus();
      personal.reinit_ValueAndButton();
    });
    $(personal.el.messageModal).on("shown.bs.modal", function (e) {
      $(personal.el.messageCode).focus();
    });
    $(personal.el.messageSubmitButton).click(function () {
      personal.obj_validate.hideAllErrorInfo();
      if (personal.obj_validate.code(personal.el.messageCode.value, personal.el.messageError)) {
        personal.obj_mask.show();
        personal.updateToServer(personal.el.messageCode.value, function () {
          $(personal.el.messageModal).modal("hide");
        });
      }
    });
    //#endregion

    //#region 头像
    personal.el.portraitEditor.onmouseover = function () {
      personal.el.portraitWord.style.visibility = "visible";
      personal.el.portraitBlackMask.style.visibility = "visible";
    };
    personal.el.portraitEditor.onmouseleave = function () {
      personal.el.portraitWord.style.visibility = "hidden";
      personal.el.portraitBlackMask.style.visibility = "hidden";
    };
    $(personal.el.portraitEditor).click(function () {
      personal.setAllModifyableFalse();
      personal.setModifyable("portrait", true);
    });
    $(personal.el.portraitSaveEdit).click(function () {
      personal.saveValueToObj("portrait");
      personal.updateToServer("", function () {
        personal.setModifyable("portrait", false);
        personal.reinit_ValueAndButton();
      });
    });
    $(personal.el.portraitCancelEdit).click(function () {
      personal.setModifyable("portrait", false);
      personal.reinit_ValueAndButton();
    });
    $(".wrap-default-portrait img").click(function () {
      personal.setImgActive(this);
      personal.el.allPortraitWrap.dataset.currentSrc = this.src;
    });
    //#endregion

    //#region 昵称
    $(personal.el.nicknameEditor).click(function () {
      personal.setAllModifyableFalse();
      personal.setModifyable("nickname", true);
    });
    $(personal.el.nicknameSaveEdit).click(function () {
      personal.saveValueToObj("nickname");
      personal.updateToServer("", function () {
        personal.setModifyable("nickname", false);
        personal.reinit_ValueAndButton();
      });
    });
    $(personal.el.nicknameCancelEdit).click(function () {
      personal.setModifyable("nickname", false);
      personal.reinit_ValueAndButton();
    });
    //#endregion

    //#region 用户名
    $(personal.el.usernameEditor).click(function () {
      personal.setAllModifyableFalse();
      personal.setModifyable("username", true);
    });
    $(personal.el.usernameSaveEdit).click(function () {
      if (personal.saveValueToObj("username") == false) {
        return false;
      }
      if (personal.identity() == false) {
        personal.reinit_ValueAndButton();
      }
      personal.setModifyable("username", false);
    });
    $(personal.el.usernameCancelEdit).click(function () {
      personal.setModifyable("username", false);
      personal.reinit_ValueAndButton();
    });
    //#endregion

    //#region 密码
    $(personal.el.passwordEditor).click(function () {
      personal.setAllModifyableFalse();
      personal.setModifyable("password", true);
    });
    $(personal.el.passwordSaveEdit).click(function () {
      if (personal.saveValueToObj("password") == false) {
        return false;
      }
      personal.setModifyable("password", false);
      if (personal.identity() == false) {
        personal.reinit_ValueAndButton();
      }
    });
    $(personal.el.passwordCancelEdit).click(function () {
      personal.setModifyable("password", false);
      personal.reinit_ValueAndButton();
    });
    //#endregion

    //#region 手机号
    $(personal.el.telBind).click(function () {
      personal.setAllModifyableFalse();
      personal.setModifyable("tel", true);
    });
    $(personal.el.telUnbind).click(function () {
      personal.setAllModifyableFalse();
      if (personal.saveValueToObj("unbindTel") == false) {
        return false;
      }
      if (personal.identity() == false) {
        personal.reinit_ValueAndButton();
      }
    });
    $(personal.el.telSaveEdit).click(function () {
      if (personal.saveValueToObj("tel") == false) {
        return false;
      }
      if (personal.identity() == false) {
        personal.reinit_ValueAndButton();
      }
      personal.setModifyable("tel", false);
    });
    $(personal.el.telCancelEdit).click(function () {
      personal.setModifyable("tel", false);
      personal.reinit_ValueAndButton();
    });
    //#endregion

    //#region 邮箱
    $(personal.el.mailBind).click(function () {
      personal.setAllModifyableFalse();
      personal.setModifyable("mail", true);
    });
    $(personal.el.mailUnbind).click(function () {
      personal.setAllModifyableFalse();
      if (personal.saveValueToObj("unbindMail") == false) {
        return false;
      }
      if (personal.identity() == false) {
        personal.reinit_ValueAndButton();
      }
    });
    $(personal.el.mailSaveEdit).click(function () {
      if (personal.saveValueToObj("mail") == false) {
        return false;
      }
      if (personal.identity() == false) {
        personal.reinit_ValueAndButton();
      }
      personal.setModifyable("mail", false);
    });
    $(personal.el.mailCancelEdit).click(function () {
      personal.setModifyable("mail", false);
      personal.reinit_ValueAndButton();
    });
    //#endregion

    //#region 微信
    $(personal.el.wechatUnbind).click(function () {
      personal.setAllModifyableFalse();
      personal.userinfo.Wechat = "";
      if (personal.identity() == false) {
        personal.reinit_ValueAndButton();
      }
    });
    //#endregion
  },

  setAllModifyableFalse: function () {
    let arr = ["portrait", "nickname", "username", "password", "tel", "mail"];
    arr.forEach((el) => {
      personal.setModifyable(el, false);
    });
  },

  /** 待选头像的激活状态
   * @param {*} el_img
   */
  setImgActive: function (el_img) {
    $(".wrap-default-portrait img").removeClass();
    $(el_img).attr("class", "active-portrait");
  },

  /** 保存待修改值到对象
   * @param {*} setType 设置类型
   * @returns
   */
  saveValueToObj: function (setType) {
    personal.userinfo.Password = personal.userinfo.Password == "********" || personal.userinfo.Password == "" ? "" : personal.userinfo.Password;
    switch (setType) {
      case "portrait":
        personal.userinfo.Portrait = personal.el.allPortraitWrap.dataset.currentSrc;
        break;
      case "nickname":
        personal.userinfo.Nickname = personal.el.nickname.value;
        break;
      case "username":
        if (!personal.obj_validate.username(personal.el.username.value, personal.el.usernameError, false)) {
          return false;
        }
        personal.userinfo.Username = personal.el.username.value;
        break;
      case "password":
        if (!personal.obj_validate.password(personal.el.password.value, personal.el.passwordError)) {
          return false;
        }
        personal.userinfo.Password = personal.obj_stringDeal.toMD5(personal.el.password.value);
        break;
      case "tel":
        if (!personal.obj_validate.tel(personal.el.tel.value, personal.el.telError, false)) {
          return false;
        }
        personal.userinfo.Tel = personal.el.tel.value;
        break;
      case "mail":
        if (!personal.obj_validate.mail(personal.el.mail.value, personal.el.mailError, false)) {
          return false;
        }
        personal.userinfo.Mail = personal.el.mail.value;
        break;
      case "unbindTel":
        personal.userinfo.Tel = "";
        break;
      case "unbindMail":
        personal.userinfo.Mail = "";
        break;
      case "wechat":
        // personal.userinfo.Wechat = personal.el.wechat.value;
        break;
      case "qq":
        // personal.userinfo.Qq = personal.el.qq.value;
        break;
      case "weibo":
        // personal.userinfo.Weibo = personal.el.weibo.value;
        break;
    }
  },

  /** 设置信息可修改状态
   * @param {*} setType 设置类型
   * @param {*} modifyAble 是否可修改
   */
  setModifyable: function (setType, modifyAble) {
    switch (setType) {
      case "portrait":
        if (modifyAble) {
          $(personal.el.allPortraitWrap).collapse("show");
          let imgs = document.querySelectorAll(".wrap-default-portrait img");
          imgs.forEach((img) => {
            if (img.src == personal.userinfo.Portrait) {
              personal.setImgActive(img);
            }
          });
        } else {
          personal.el.portrait.src = personal.userinfo.Portrait;
          $(personal.el.allPortraitWrap).collapse("hide");
        }
        break;
      case "nickname":
        if (modifyAble) {
          $(personal.el.nickname).removeAttr("readonly");
          $(personal.el.nickname).attr("class", "form-control");
          personal.el.nickname.value = personal.userinfo.Nickname;
          personal.el.nicknameEditor.parentNode.style.display = "none";
          personal.el.nicknameSaveEdit.parentNode.style.display = "inline";
          personal.el.nicknameCancelEdit.parentNode.style.display = "inline";
        } else {
          $(personal.el.nickname).attr("readonly", "readonly");
          $(personal.el.nickname).attr("class", "form-control-plaintext modifyable");
          personal.el.nicknameEditor.parentNode.style.display = "inline";
          personal.el.nicknameSaveEdit.parentNode.style.display = "none";
          personal.el.nicknameCancelEdit.parentNode.style.display = "none";
        }
        break;
      case "username":
        if (modifyAble) {
          $(personal.el.username).removeAttr("readonly");
          $(personal.el.username).attr("class", "form-control");
          personal.el.username.value = personal.userinfo.Username;
          personal.el.usernameEditor.parentNode.style.display = "none";
          personal.el.usernameSaveEdit.parentNode.style.display = "inline";
          personal.el.usernameCancelEdit.parentNode.style.display = "inline";
        } else {
          $(personal.el.username).attr("readonly", "readonly");
          $(personal.el.username).attr("class", "form-control-plaintext modifyable");
          personal.el.usernameEditor.parentNode.style.display = "inline";
          personal.el.usernameSaveEdit.parentNode.style.display = "none";
          personal.el.usernameCancelEdit.parentNode.style.display = "none";
        }
        break;
      case "password":
        if (modifyAble) {
          $(personal.el.password).removeAttr("readonly");
          $(personal.el.password).attr("class", "form-control");
          personal.el.password.value = "";
          personal.el.passwordEditor.parentNode.style.display = "none";
          personal.el.passwordSaveEdit.parentNode.style.display = "inline";
          personal.el.passwordCancelEdit.parentNode.style.display = "inline";
        } else {
          personal.el.password.value = "********";
          $(personal.el.password).attr("readonly", "readonly");
          $(personal.el.password).attr("class", "form-control-plaintext modifyable");
          personal.el.passwordEditor.parentNode.style.display = "inline";
          personal.el.passwordSaveEdit.parentNode.style.display = "none";
          personal.el.passwordCancelEdit.parentNode.style.display = "none";
        }
        break;
      case "tel":
        if (modifyAble) {
          $(personal.el.tel).removeAttr("readonly");
          $(personal.el.tel).attr("class", "form-control");
          personal.el.tel.value = personal.userinfo.Tel;
          personal.el.telBind.parentNode.style.display = "none";
          personal.el.telUnbind.parentNode.style.display = "none";
          personal.el.telSaveEdit.parentNode.style.display = "inline";
          personal.el.telCancelEdit.parentNode.style.display = "inline";
        } else {
          $(personal.el.tel).attr("readonly", "readonly");
          $(personal.el.tel).attr("class", "form-control-plaintext modifyable");
          personal.el.tel.value = personal.obj_stringDeal.dealHide_Tel(personal.userinfo.Tel);
          personal.el.telBind.parentNode.style.display = personal.userinfo.Tel == "" ? "inline" : "none";
          personal.el.telUnbind.parentNode.style.display = personal.userinfo.Tel == "" ? "none" : "inline";
          personal.el.telSaveEdit.parentNode.style.display = "none";
          personal.el.telCancelEdit.parentNode.style.display = "none";
        }
        break;
      case "mail":
        if (modifyAble) {
          $(personal.el.mail).removeAttr("readonly");
          $(personal.el.mail).attr("class", "form-control");
          personal.el.mail.value = personal.userinfo.Mail;
          personal.el.mailBind.parentNode.style.display = "none";
          personal.el.mailUnbind.parentNode.style.display = "none";
          personal.el.mailSaveEdit.parentNode.style.display = "inline";
          personal.el.mailCancelEdit.parentNode.style.display = "inline";
        } else {
          $(personal.el.mail).attr("readonly", "readonly");
          $(personal.el.mail).attr("class", "form-control-plaintext modifyable");
          personal.el.mail.value = personal.obj_stringDeal.dealHide_Mail(personal.userinfo.Mail);
          personal.el.mailBind.parentNode.style.display = personal.userinfo.Mail == "" ? "inline" : "none";
          personal.el.mailUnbind.parentNode.style.display = personal.userinfo.Mail == "" ? "none" : "inline";
          personal.el.mailSaveEdit.parentNode.style.display = "none";
          personal.el.mailCancelEdit.parentNode.style.display = "none";
        }
        break;
    }
  },

  /** 身份验证 */
  identity: function () {
    let current = personal.CurrentTelStatus();
    switch (current) {
      case "未绑定":
        personal.obj_eject.Etoast({
          type: "warning",
          message: "此操作须绑定手机号方可继续",
        });
        return false;
      case "新绑定":
        personal.setSendButtonStatus(personal.userinfo.Tel);
        break;
      case "身份验证":
        personal.setSendButtonStatus(personal.userinfo_old.Tel);
        break;
    }
    personal.obj_validate.hideAllErrorInfo();
    $(personal.el.messageModal).modal("show");
    personal.el.messageCode.value = "";
  },

  /** 发送验证码 */
  sendCode: function () {
    personal.obj_performance.debounce(function () {
      personal.obj_validate.hideAllErrorInfo();
      let current = personal.CurrentTelStatus();
      switch (current) {
        case "新绑定":
          personal.sendLoginMessageCode().then(function () {
            personal.setSendButtonStatus(personal.userinfo.Tel);
          });
          break;
        case "身份验证":
          personal.sendIdentityMessageCode().then(function () {
            personal.setSendButtonStatus(personal.userinfo_old.Tel);
          });
          break;
      }
    }, personal.debounceWait)();
  },

  /** 根据是否已经绑定手机号来获得待发验证码的手机号 */
  CurrentTelStatus: function () {
    if (personal.userinfo.Tel == "" && personal.userinfo_old.Tel == "") {
      return "未绑定";
    } else if (personal.userinfo.Tel != "" && personal.userinfo_old.Tel == "") {
      return "新绑定";
    } else if (personal.userinfo_old.Tel != "") {
      return "身份验证";
    }
  },

  /** 已绑定手机号发送验证码 */
  sendIdentityMessageCode: function () {
    let pro = new Promise(function (resolve, reject) {
      personal.obj_api.sendMessageCode_Identity().then(
        function (re) {
          if (re.result == 0) {
            personal.obj_eject.Etoast({
              type: "success",
              message: "已向手机号[" + personal.userinfo_old.Tel + "]发送验证码",
            });
            resolve(re);
          } else {
            personal.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
            resolve(re);
          }
        },
        function (re) {
          reject(re);
        }
      );
    });
    return pro;
  },

  /** 新绑定手机号发送验证码
   * @param {*} tel 手机号
   */
  sendLoginMessageCode: function () {
    let pro = new Promise(function (resolve, reject) {
      personal.obj_api.sendMessageCode_Login(personal.userinfo.Tel).then(
        function (re) {
          if (re.result == 0) {
            personal.obj_eject.Etoast({
              type: "success",
              message: "已向手机号[" + personal.userinfo.Tel + "]发送验证码",
            });
            resolve(re);
          } else {
            personal.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
            resolve(re);
          }
        },
        function (re) {
          reject(re);
        }
      );
    });
    return pro;
  },

  /** 设置发送验证码按钮状态
   * @param {*} tel 手机号
   */
  setSendButtonStatus: function (tel) {
    personal.resetSendButtonStatus();
    $(personal.el.messageSendButton).attr({ disabled: "disabled" });
    personal.obj_performance.debounce(function () {
      personal.obj_api.getRemainTime(tel).then(function (re) {
        personal.remaintime = re.detail.remaintime;
        if (personal.isTiming == false) {
          personal.timer_remaintime = setInterval(function () {
            $(personal.el.messageSendButton).attr({ disabled: "disabled" });
            $(personal.el.messageSendButton).text("请" + personal.remaintime + "秒后重新获取");
            personal.isTiming = true;
            if (personal.remaintime <= 0) {
              personal.resetSendButtonStatus();
            } else {
              personal.remaintime--;
            }
          }, 1000);
        }
      });
    }, personal.debounceWait)();
  },

  /** 重置按钮状态 */
  resetSendButtonStatus: function () {
    personal.isTiming = false;
    personal.remaintime = 0;
    clearInterval(personal.timer_remaintime);
    personal.timer_remaintime = "";
    $(personal.el.messageSendButton).text("获取验证码");
    $(personal.el.messageSendButton).removeAttr("disabled");
  },

  /** 将userinfo对象更新到服务器
   * @param {*} code 若为空则只可修改昵称头像两项
   * @param {*} fnbk 成功后的回调函数
   */
  updateToServer: function (code, fnbk) {
    personal.obj_performance.debounce(function () {
      personal.obj_api.updateUser(personal.userinfo, code).then(
        function (re) {
          if (re.result == 0) {
            personal.obj_mask.hide();
            fnbk();
            personal.obj_eject.Etoast({
              type: "success",
              message: "修改成功",
            });
          } else {
            personal.obj_mask.hide();
            personal.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
        },
        function (re) {
          personal.obj_mask.hide();
          personal.obj_eject.Etoast({
            type: "warning",
            message: re.detail.errinfo,
          });
        }
      );
    }, personal.debounceWait)();
  },
};
