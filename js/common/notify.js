export var notify = {
    keyname_shownotify: "shownotify",
    init: function () {
        notify.consoleNotify();
        // notify.showModel();        
        // notify.bindEvent();
    },
    init_onlyconsole:function(){
        notify.consoleNotify();
    },
    /** 绑定模态框消失事件 */
    bindEvent: function () {
        let md = document.getElementById("modal-notify");
        $(md).on("hidden.bs.modal", function (e) {
            let check = document.getElementById("check_noshow");
            if (check.checked) {
                //参数yes代表-是，不再显示了
                notify.setStateToLocal("yes");
            } else {
                notify.removeStateFromLocal();
            }
        });
    },
    /** 显示通知模态框 */
    showModel: function () {
        if (!notify.getStateFromLocal()) {
            let md = document.getElementById("modal-notify");
            $(md).modal("show");
        }
    },
    /** 在控制台输出招聘信息 */
    consoleNotify: function () {
        console.log("%c _        _______  __   ___      _\n| |      |__   __| \\ \\ / / |    (_)  \n| |     __ _| | ___ \\ V /| |     ___   _____ \n| |    / _` | |/ _ \\ > < | |    | \\ \\ / / _ \\\n| |___| (_| | |  __// . \\| |____| |\\ V /  __/\n|______\\__,_|_|\\___/_/ \\_\\______|_| \\_/ \\___|\n", "color:blue;");
        
    },
    /** 读取本地磁盘存储的“是否显示通知模态框”信息 */
    getStateFromLocal: function () {
        if (localStorage.hasOwnProperty(notify.keyname_shownotify)) {
            let rtnstr = localStorage.getItem(notify.keyname_shownotify);
            if (rtnstr == undefined || rtnstr == "" || rtnstr == "undefined") {
                return false;
            } else {
                return rtnstr;
            }
        } else {
            return false;
        }
    },
    /** 把“是否显示通知模态框”信息存储到本地磁盘
     * @param {*} obj -将要在本地序列化存储的对象
     */
    setStateToLocal: function (state) {
        localStorage.setItem(notify.keyname_shownotify, state);
    },
    /** 删除本地“是否显示通知模态框”信息 */
    removeStateFromLocal: function () {
        localStorage.removeItem(notify.keyname_shownotify);
    },
}