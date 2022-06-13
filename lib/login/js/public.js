/* 命名空间 myfunc  myconst */

$(function () {
    myfunc.init();//初始化
})

var myfunc = {
    /** 初始化汇总 */
    init: function () {
        myfunc.init_imgForbidDrag();
    },
    /** 初始化禁止页面图片被拖动 */
    init_imgForbidDrag: function () {
        $('img').on('mousedown', function (e) {
            e.preventDefault()
        })
    },
    /** 初始化数字类型的输入框不许输入数字以外的字符
     * @param {*} e -按键事件
     */
    init_inputForbidChar: function (e) {
        return (/[\d]/.test(String.fromCharCode(e.keyCode)));
    },
    /** 初始化限制数字类型的输入框最大长度
     * @param {*} inputid -输入框id
     * @param {*} maxlen -输入框最大长度
     */
    init_inputSetMaxLen: function (inputid, maxlen) {
        var temp = $('#' + inputid).val().length;
        if (temp >= maxlen) {
            $('#' + inputid).val($('#' + inputid).val().slice(0, maxlen));
        }
    },
    /** 获取国际区号下拉菜单填充值 */
    getTelAreaStr: function () {
        for (var i = 0, len = myconst.telarea_list.length; i < len; i++) {
            this.telarea_temp += "<option>";
            this.telarea_temp += myconst.telarea_list[i];
            this.telarea_temp += "</option>";
        }
        return "<select class=\"form-control\">" + this.telarea_temp + "</select>";
    },
    /** 检查手机号是否合法 */
    checkTel: function (tel) {
        var regtel = myconst.myreg.reg_tel;//验证手机号格式正则表达式
        if (tel == "") {
            return "手机号不能为空";
        } else if (!regtel.test(tel)) {
            return "手机号格式不正确";
        } else {
            return "";
        }
    },
    /** 检查验证码是否合法 */
    checkCode: function (code) {
        var regcode = myconst.myreg.reg_code;//验证验证码格式正则表达式
        if (code == "") {
            return "验证码不能为空";
        } else if (!regcode.test(code)) {
            return "验证码格式不正确";
        } else {
            return "";
        }
    },
    /** 显示指定的错误信息
     * @param {*} dockid -错误信息的容器id
     * @param {*} info -错误信息
     * @param {*} fatherid -对应需要设置边框样式的控件id
     */
    showErrorInfo: function (dockid, info, fatherid) {
        $("#" + dockid + " " + "span").html(info);
        $("#" + fatherid).addClass("redborder-login-errinfo");
        $("#" + dockid).css('visibility', 'visible');-
    },
    /** 隐藏指定的错误信息
     * @param {*} dockid -错误信息的容器id
     * @param {*} fatherid -对应需要设置边框样式的控件id
     */
    hideErrorInfo: function (dockid, fatherid) {
        $("#" + fatherid).removeClass("redborder-login-errinfo");
        $("#" + dockid).css('visibility', 'hidden');
    },
    /** 设置过期时间的localstorage封装 */
    expirseLocalStorage: {
        /** 设置localstorage过期时间
         * @param {*} key -键名
         * @param {*} value -键值
         * @param {*} ttl_ms -过期时间
         */
        set: function (key, value, ttl_ms) {
            var data = { value: value, expirse: new Date(ttl_ms).getTime() };
            localStorage.setItem(key, JSON.stringify(data));
        },
        /** 获取localstorage
         * @param {*} key -键名
         */
        get: function (key) {
            var data = JSON.parse(localStorage.getItem(key));
            if (data !== null) {
                debugger
                if (data.expirse != null && data.expirse < new Date().getTime()) {
                    localStorage.removeItem(key);
                } else {
                    return data.value;
                }
            }
            return null;
        }
    },
    /** 检查是否已经登录 */
    checkIsLogined: function () {
    },
}

var myconst = {
    myreg: {
        reg_tel: /^[1][3,4,5,7,8][0-9]{9}$/,
        reg_code: /^[0-9]{6}$/
    },
    telarea_list: ["中国 \+86", "中国台湾 \+886", "中国香港 \+852", "中国澳门 \+853", "加拿大 \+1", "美国 \+1", "埃及 \+20", "南非 \+27", "希腊 \+30", "荷兰 \+31", "比利时 \+32", "法国 \+33", "西班牙 \+34", "意大利 \+39", "瑞士 \+41", "英国 \+44", "丹麦 \+45", "瑞典 \+46", "挪威 \+47", "波兰 \+48", "德国 \+49", "阿根廷 \+54", "巴西 \+55", "澳大利亚 \+61", "新加坡 \+65", "俄罗斯 \+7", "日本 \+81", "韩国 \+82", "印度 \+91", "巴基斯坦 \+92", "葡萄牙 \+351", "爱尔兰 \+353", "冰岛 \+354", "芬兰 \+358", "克罗地亚 \+385", "巴拉圭 \+595", "乌拉圭 \+598", "朝鲜 \+850"],
}

var myAJAX = {
    /** 遮罩元素id */
    maskid: "loading",
    /** AJAX
     * @param {*} url -接收请求的地址
     * @param {*} data -发送到服务器的数据
     * @param {*} callback -返回成功函数（回调）
     * @param {*} ismask -是否启用遮罩
     */
    Commu: function (url, data, callback, ismask) {
        $.ajax({
            url: url,//接收请求的地址
            type: "POST",//请求方式
            timeout: 6000,//请求超时时间（毫秒）
            //contentType: "application/json",//发送信息至服务器时内容编码类型
            data: data,//发送到服务器的数据
            dataType: 'json',//预期服务器返回的数据类型
            crossDomain: true,
            async: true,//是否异步
            cache: true,//是否从浏览器缓存中加载请求信息
            global: true,//是否触发全局 AJAX 事件
            ifModified: false,//是否仅在服务器数据改变时获取新数据
            processData: true,//发送的数据是否被转换为对象
            beforeSend: function () {//发送请求之前函数（加载遮罩）
                if (document.getElementById(myAJAX.maskid)) {
                    if (ismask) {
                        $("#" + myAJAX.maskid).show();
                    }
                }
            },
            success: function (result) {//返回成功函数（回调）
                console.log("异步通信成功");
                callback(result);
            },
            error: function (ex) {//通信错误函数（日志）
                console.log("异步通信异常");
                console.log(ex);
            },
            complete: function () {//最终处理函数（解除遮罩）
                if (document.getElementById(myAJAX.maskid)) {
                    if (ismask) {
                        $("#" + myAJAX.maskid).hide();
                    }
                }
            }
        })
    }
}

var myconfig = {
    backhandler: {
        sendecode: "../BackHandler/OurSiteBackHandler.asmx/SendVerifyCode",
        gologin: "../BackHandler/OurSiteBackHandler.asmx/Login",
    },
    local: {
        key_usertoken: "usertoken",
        key_usernick:"usernick",
    }
}