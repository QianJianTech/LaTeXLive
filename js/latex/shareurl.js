export var shareurl = {
    obj_input: {},
    init: function (opt) {
        shareurl.obj_input = opt.obj_input;
        shareurl.fillByURLQuery();

    },
    /** 读取base64编码的参数并填充输入框 */
    fillByURLQuery: function () {
        let qu = window.location.hash.substring(1);
        if (qu == "" || qu == "#") {
            return;
        }
        let uncode_qu = window.atob(qu); //base64解密
        uncode_qu = decodeURI(uncode_qu); //encode解密
        shareurl.obj_input.input(uncode_qu, 0);
    },
}