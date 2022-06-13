export var wechatimg = {
    obj_element: {},
    flag_wechatIsHover: false, //存储公众号图标是否被悬浮的标志
    init: function (opt) {
        wechatimg.obj_element = opt.obj_element;
        // #region 微信公众号链接点击
        $(wechatimg.obj_element.el_wechatlink).click(function () {
            let temp = wechatimg.obj_element.el_wechatimg;
            if (temp.style.visibility == "visible") {
                temp.style.visibility = "hidden";
            } else {
                temp.style.visibility = "visible";
            }
        });
        /** 微信公众号链接失去焦点 */
        $(wechatimg.obj_element.el_wechatlink).blur(function () {
            if (wechatimg.flag_wechatIsHover) {
                $(wechatimg.obj_element.el_wechatlink).focus();
                console.log('yes');
            } else {
                console.log("no");
                wechatimg.obj_element.el_wechatimg.style.visibility = "hidden";
            }
        });
        /** 微信公众号二维码鼠标移入 */
        $(wechatimg.obj_element.el_wechatimg).mouseenter(function () {
            wechatimg.flag_wechatIsHover = true;
        });
        /** 微信公众号二维码鼠标移出 */
        $(wechatimg.obj_element.el_wechatimg).mouseleave(function () {
            wechatimg.flag_wechatIsHover = false;
        });
    }
}