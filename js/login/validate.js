export var validate = {
  loginname: function (str, el) {
    str = str.trim();
    if (str == "") {
      validate.showTheErrorInfo(el, "登录名不可为空");
      return false;
    }
    return true;
  },
  /** 密码格式
   * @param {string} str 用户输入密码
   * @param {string} el 错误信息容器id
   */
  password: function (str, el) {
    str = str.trim();
    if (str == "") {
      validate.showTheErrorInfo(el, "密码不可为空");
      return false;
    }
    if (str.length < 6) {
      validate.showTheErrorInfo(el, "密码不可小于6位");
      return false;
    }
    return true;
  },
  /** 确认密码格式
   * @param {string} str1 第一次密码
   * @param {string} str2 第二次密码
   * @param {string} el 错误信息容器id
   */
  passwordAgain: function (str1, str2, el) {
    str1 = str1.trim();
    str2 = str2.trim();
    if (str2 == "") {
      validate.showTheErrorInfo(el, "密码不可为空");
      return false;
    }
    if (str1 != str2) {
      validate.showTheErrorInfo(el, "两次输入密码不一致");
      return false;
    }
    return true;
  },
  /** 验证用户名格式
   * @param {string} str 用户所填用户名
   * @param {string} el 错误信息容器id
   * @param {Boolean} canusetel 是否可用手机号
   */
  username: function (str, el, canusetel) {
    str = str.trim();
    if (str == "") {
      validate.showTheErrorInfo(el, "用户名不可为空");
      return false;
    }
    if (!/^[a-zA-Z0-9_]{4,16}$/.test(str)) {
      validate.showTheErrorInfo(el, "用户名只可为4-16位字母、数字或下划线");
      return false;
    }
    if (!canusetel) {
      if (/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(str)) {
        validate.showTheErrorInfo(el, "手机号不能当作用户名");
        return false;
      }
    }
    return true;
  },
  /** 验证手机号格式
   * @param {string} str 用户所填手机号
   * @param {string} el 错误信息容器id
   * @param {Boolean} canempty 是否可空
   */
  tel: function (str, el, canempty) {
    str = str.trim();
    if (canempty) {
      if (str != "") {
        if (!/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(str)) {
          validate.showTheErrorInfo(el, "手机号格式有误");
          return false;
        }
      }
    } else {
      if (str == "") {
        validate.showTheErrorInfo(el, "手机号不可为空");
        return false;
      }
      if (!/^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\d{8}$/.test(str)) {
        validate.showTheErrorInfo(el, "手机号格式有误");
        return false;
      }
    }
    return true;
  },
  /** 验证邮箱格式
   * @param {string} str 用户所填邮箱
   * @param {string} el 错误信息容器id
   * @param {boolean} canempty 是否可空
   */
  mail: function (str, el, canempty) {
    if (canempty) {
      if (str != "") {
        if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str)) {
          validate.showTheErrorInfo(el, "邮箱格式不正确");
          return false;
        }
      }
    } else {
      if (str == "") {
        validate.showTheErrorInfo(el, "邮箱不可为空");
        return false;
      }
      if (!/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(str)) {
        validate.showTheErrorInfo(el, "邮箱格式不正确");
        return false;
      }
    }
    return true;
  },
  code: function (str, el) {
    if (str == "") {
      validate.showTheErrorInfo(el, "验证码不可为空");
      return false;
    }
    if (!/\d{6}$/.test(str)) {
      validate.showTheErrorInfo(el, "验证码格式有误");
      return false;
    }
    return true;
  },
  /** 显示指定错误信息
   * @param {string} el 错误信息容器id
   * @param {string} info 错误信息内容
   */
  showTheErrorInfo: function (el, info) {
    el.innerHTML = info;
    el.style.visibility = "visible";
  },
  /** 隐藏指定错误信息
   * @param {string} el 错误信息容器id
   */
  hideTheErrorInfo: function (el) {
    el.innerHTML = "";
    el.style.visibility = "hidden";
  },
  /** 隐藏所有错误信息 */
  hideAllErrorInfo: function () {
    $(".errinfo-login").css("visibility", "hidden");
  },
  /** 图形验证码是否正确
   * @param {*} temp_obj 临时存储gVerify对象引用
   * @param {*} val 要验证的值
   * @param {*} el 呈现错误信息的元素
   * @returns
   */
  gVerifyValidate: function (temp_obj, val, el) {
    if (val == "") {
      validate.showTheErrorInfo(el, "图形验证码不可为空");
      return false;
    }
    if (temp_obj.validate(val) == false) {
      validate.showTheErrorInfo(el, "图形验证码不正确，如看不清请点击图片刷新");
      return false;
    }
    return true;
  },
  /** 一旦开始输入清空所有错误信息 */
  beginInputClearErrorInfo: function () {
    $(".form-control").on("input", function () {
      validate.hideAllErrorInfo();
    });
  },
  /** 初始化数字类型的输入框不许输入数字以外的字符 */
  setNumberInputForbidChar: function () {
    $(".input-number").keypress(function (e) {
      return /[\d]/.test(String.fromCharCode(e.keyCode));
    });
  },
  /** 初始化限制数字类型的输入框最大长度
   * @param {string} inputid -输入框id
   * @param {number} maxlen -输入框最大长度
   */
  setNumberInputMaxLen: function (input, maxlen) {
    $(input).on("input", function () {
      let str = $(input).val();
      let temp = str.length;
      if (temp >= maxlen) {
        $(input).val($(input).val().slice(0, maxlen));
      }
    });
  },
};
