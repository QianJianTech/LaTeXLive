export var login = {
  obj_mask: {},
  obj_api: {},
  obj_eject: {},
  obj_validate: {},
  el: {},
  appid: "",
  redirect_url: "",
  timer_remainTime: "",
  currentType: "account",
  docker_gVerify: {},
  timer_gVerify: "",

  init: function (opt) {
    login.obj_mask = opt.obj_mask;
    login.obj_stringDeal = opt.obj_stringDeal;
    login.obj_api = opt.obj_api;
    login.obj_eject = opt.obj_eject;
    login.obj_validate = opt.obj_validate;
    login.el = opt.el;
    login.appid = opt.appid;
    login.redirect_url = opt.redirectURL + "/login";
    login.WX.goLogin(opt);
    login.obj_validate.beginInputClearErrorInfo();
    login.obj_validate.setNumberInputForbidChar();
    login.obj_validate.setNumberInputMaxLen(login.el.accountGVerify, 4);
    login.obj_validate.setNumberInputMaxLen(login.el.messageCodeLoginTel, 11);
    login.obj_validate.setNumberInputMaxLen(login.el.messageCodeGVerify, 4);
    login.obj_validate.setNumberInputMaxLen(login.el.messageCodeCode, 6);
    login.obj_validate.setNumberInputMaxLen(login.el.regTel, 11);
    login.obj_validate.setNumberInputMaxLen(login.el.regGVerify, 4);
    login.switchTab("account");
    login.setOtherLoginImgMouseoverColor();
    login.init_LoginByWechat(login.appid, login.redirect_url);
    login.BindEvent();
  },

  /** 绑定事件 */
  BindEvent: function () {
    //默认回车
    $(document).keydown(function (e) {
      if (e.keyCode == 13) {
        switch (login.currentType) {
          case "account":
            $(login.el.accountLoginButton).click();
            break;
          case "message":
            $(login.el.messageCodeLoginButton).click();
            break;
          case "reg":
            $(login.el.regRegButton).click();
            break;
        }
      }
    });

    //#region 提交按钮
    $(login.el.regRegButton).click(function () {
      login.Reg.goReg();
    });
    $(login.el.accountLoginButton).click(function () {
      login.account.goLogin();
    });
    $(login.el.messageCodeSendButton).click(function () {
      login.message.sendCode();
    });
    $(login.el.messageCodeLoginButton).click(function () {
      login.message.goLogin();
    });
    $(login.el.messageCodeLoginTel).blur(function () {
      login.message.setSendButtonEnable();
    });
    //#endregion

    //#region 切换
    $(login.el.accountToRegButton).click(function () {
      login.switchTab("reg");
    });
    $(login.el.accountToMessageButton).click(function () {
      login.switchTab("message");
    });
    $(login.el.messageCodeToAccountButton).click(function () {
      login.switchTab("account");
    });
    $(login.el.messageCodeToRegButton).click(function () {
      login.switchTab("reg");
    });
    $(login.el.regToAccountButton).click(function () {
      login.switchTab("account");
    });
    $(login.el.regToMessageButton).click(function () {
      login.switchTab("message");
    });
    //#endregion
  },

  /** 切换tab
   * @param {*} type account/message/reg
   */
  switchTab: function (type) {
    let wrap = {};
    let canvasid = "";
    switch (type) {
      case "account":
        wrap = login.el.accountWrap;
        canvasid = login.el.accountGVerifyCanvas.id;
        break;
      case "message":
        wrap = login.el.messageWrap;
        canvasid = login.el.messageCodeGVerifyCanvas.id;
        break;
      case "reg":
        wrap = login.el.regWrap;
        canvasid = login.el.regGverifyCanvas.id;
        break;
    }
    login.makeVerifyCodeImg(canvasid);
    $(".login-form").css("display", "none");
    $(wrap).css("display", "block");
  },

  /** 初始化页微信登录 */
  init_LoginByWechat: function (appid, redirect_url) {
    let href_wx = "https://open.weixin.qq.com/connect/qrconnect?appid=" + appid + "&redirect_uri=" + redirect_url + "&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect";
    login.el.wxLoginButton.href = href_wx;
  },

  /** 设置第三方登录图标的样式和动画 */
  setOtherLoginImgMouseoverColor: function () {
    $("#wrap_other_login img").mouseenter(function () {
      $(this).css("box-shadow", "0px 0px 10px #888888");
    });
    $("#wrap_other_login img").mouseleave(function () {
      $(this).css("box-shadow", "0 0 0 #fff");
    });
  },

  /** 微信登录封装 */
  WX: {
    goLogin: function (opt) {
      if (opt.wxcode != false) {
        login.obj_api.loginByWX(opt.wxcode).then(function (re) {
          if (re.result == 0) {
            login.obj_eject.Etoast({
              type: "success",
              message: "登录成功,即将跳转回编辑器页",
            });
            setTimeout(function () {
              window.location.href = "../home";
            }, 2000);
          } else {
            login.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
          history.pushState({}, "", "login?code=");
        });
      }
    },
  },

  /** 账户登录封装 */
  account: {
    goLogin: function () {
      let v1 = login.account.loginname();
      let v2 = login.account.password();
      let v3 = login.account.gVerify();
      if (v1.r && v2.r && v3.r) {
        let v2_md5 = login.obj_stringDeal.toMD5(v2.val);
        login.obj_api.loginByAccount(v1.val, v2_md5).then(function (re) {
          if (re.result == 0) {
            login.obj_eject.Etoast({
              type: "success",
              message: "登录成功,即将跳转回编辑器页",
            });
            setTimeout(function () {
              window.location.href = "../home";
            }, 2000);
          } else {
            login.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
        });
      }
    },
    loginname: function () {
      let str = login.el.accountLoginName.value;
      let el = login.el.accountLoginNameError;
      return {
        r: login.obj_validate.loginname(str, el),
        val: str,
      };
    },
    password: function () {
      let str = login.el.accountLoginPassword.value;
      let el = login.el.accountLoginPasswordError;
      return {
        r: login.obj_validate.password(str, el),
        val: str,
      };
    },
    gVerify: function () {
      let obj = login.docker_gVerify;
      let val = login.el.accountGVerify.value;
      let el = login.el.accountGverifyError;
      return {
        r: login.obj_validate.gVerifyValidate(obj, val, el),
      };
    },
  },

  /** 短信登录封装 */
  message: {
    intervalObj: "",
    setSendButtonEnable: function () {
      let v1 = login.message.tel();
      if (v1.r) {
        login.obj_api.getRemainTime(v1.val).then(function (re) {
          if (re.result == 0) {
            if (re.detail.remaintime != 0) {
              login.message.startSendLock(re.detail.remaintime);
            } else {
              login.message.stopSendLock();
            }
          } else {
            login.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
        });
      }
    },
    startSendLock: function (time) {
      $(login.el.messageCodeSendButton).attr({ disabled: "disabled" });
      let second = time;
      login.message.intervalObj = setInterval(function () {
        $(login.el.messageCodeSendButton).text("请" + second + "秒后尝试");
        if (second == 0) {
          login.message.stopSendLock();
        }
        second--;
      }, 1000);
    },
    stopSendLock: function () {
      clearInterval(login.message.intervalObj);
      $(login.el.messageCodeSendButton).text("发送验证码");
      $(login.el.messageCodeSendButton).removeAttr("disabled");
    },
    sendCode: function () {
      let v1 = login.message.tel();
      let v2 = login.message.gVerify();
      if (v1.r && v2.r) {
        login.obj_api.sendMessageCode_Login(v1.val).then(function (re) {
          if (re.result == 0) {
            login.message.setSendButtonEnable();
            login.obj_eject.Etoast({
              type: "success",
              message: re.detail.info,
            });
          } else {
            login.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
        });
      }
    },
    goLogin: function () {
      let v1 = login.message.tel();
      let v2 = login.message.gVerify();
      let v3 = login.message.code();
      if (v1.r && v2.r && v3.r) {
        login.obj_mask.show();
        login.obj_api.loginByMessage(v1.val, v3.val).then(function (re) {
          if (re.result == 0) {
            login.obj_mask.hide();
            login.obj_eject.Etoast({
              type: "success",
              message: "登录成功,即将跳转回编辑器页",
            });
            setTimeout(function () {
              window.location.href = "../home";
            }, 2000);
          } else {
            login.obj_mask.hide();
            login.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
        });
      }
    },
    tel: function () {
      let str = login.el.messageCodeLoginTel.value;
      let el = login.el.messageCodeLoginTelError;
      return {
        r: login.obj_validate.tel(str, el, false),
        val: str,
      };
    },
    gVerify: function () {
      let obj = login.docker_gVerify;
      let val = login.el.messageCodeGVerify.value;
      let el = login.el.messageCodeGverifyError;
      return {
        r: login.obj_validate.gVerifyValidate(obj, val, el),
      };
    },
    code: function () {
      let str = login.el.messageCodeCode.value;
      let el = login.el.messageCodeCodeError;
      return {
        r: login.obj_validate.code(str, el),
        val: str,
      };
    },
  },

  /** 注册封装 */
  Reg: {
    goReg: function () {
      let v1 = login.Reg.username();
      let v2 = login.Reg.password();
      let v3 = login.Reg.passwordAgain();
      let v4 = login.Reg.tel();
      let v5 = login.Reg.mail();
      let v6 = login.Reg.gVerify();
      if (v1.r && v2.r && v3.r && v4.r && v5.r && v6.r) {
        login.obj_mask.show();
        let v2_md5 = login.obj_stringDeal.toMD5(v2.val);
        login.obj_api.regByAccount(v1.val, v2_md5, v4.val, v5.val).then(function (re) {
          if (re.result == 0) {
            login.obj_mask.hide();
            login.obj_eject.Etoast({
              type: "success",
              message: "注册成功,直接用此账号登录",
            });
            setTimeout(function () {
              window.location.href = "../home";
            }, 2500);
          } else {
            login.obj_mask.hide();
            login.obj_eject.Etoast({
              type: "warning",
              message: re.detail.errinfo,
            });
          }
        });
      }
    },
    username: function () {
      let str = login.el.regUsername.value;
      let el = login.el.regUsernameError;
      return {
        r: login.obj_validate.username(str, el, false),
        val: str,
      };
    },
    password: function () {
      let str = login.el.regPassword.value;
      let el = login.el.regPasswordError;
      return {
        r: login.obj_validate.password(str, el),
        val: str,
      };
    },
    passwordAgain: function () {
      let str1 = login.el.regPassword.value;
      let str2 = login.el.regPasswordAgain.value;
      let el = login.el.regPasswordAgainError;
      return {
        r: login.obj_validate.passwordAgain(str1, str2, el),
      };
    },
    tel: function () {
      let str = login.el.regTel.value;
      let el = login.el.regTelError;
      return {
        r: login.obj_validate.tel(str, el, true),
        val: str,
      };
    },
    mail: function () {
      let str = login.el.regMail.value;
      let el = login.el.regMailError;
      return {
        r: login.obj_validate.mail(str, el, true),
        val: str,
      };
    },
    gVerify: function () {
      let obj = login.docker_gVerify;
      let val = login.el.regGVerify.value;
      let el = login.el.regGverifyError;
      return {
        r: login.obj_validate.gVerifyValidate(obj, val, el),
      };
    },
  },

  /** 生成验证码图形
   * @param {string} elid 容器id
   */
  makeVerifyCodeImg: function (elid) {
    setTimeout(function () {
      login.docker_gVerify = new GVerify({
        id: elid,
        type: "number",
        canvasId: elid + "_gVerify",
      });
    }, 100);
    //重绘+防抖（暂不用）
    // $(window).resize(function () {
    //   clearTimeout(login.timer_gVerify);
    //   login.timer_gVerify = setTimeout(function () {
    //     login.docker_gVerify = new GVerify({
    //       id: elid,
    //       type: "number",
    //       canvasId: elid + "_gVerify",
    //     });
    //   }, 200);
    // });
  },
};
