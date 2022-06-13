export var action = {
    const_hostName: "",
    obj_eject: {},
    obj_element: {},
    obj_common: {},
    obj_output: {},
    obj_theme: {},
    map_action: {},
    NAME_PREFIX: "MommyTalk", //下载文件前缀
    init: function (opt) {
        action.const_hostName = opt.const_hostName;
        action.obj_eject = opt.obj_eject;
        action.obj_element = opt.obj_element;
        action.obj_common = opt.obj_common;
        action.obj_output = opt.obj_output;
        action.obj_theme = opt.obj_theme;
        action.map_action = opt.map_all[0].action;
        this.init_action();
    },
    init_action: function () {
        let group = document.createElement("div");
        group.style.float = "right";
        action.obj_element.el_action.appendChild(group);
        let cls = action.map_action.cont;
        let len = cls.length;
        for (let i = 0; i < len; i++) {
            let btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn btn-outline-primary theme-outline";
            btn.id = "btn_" + cls[i].tag;
            let devicewidth = document.body.clientWidth;
            if (devicewidth > 1100) {
                btn.innerHTML = cls[i].name;
            } else {
                btn.innerHTML = cls[i].descript;
            }
            $(window).resize(function () {
                let devicewidth = document.body.clientWidth;
                if (devicewidth > 1100) {
                    btn.innerHTML = cls[i].name;
                } else {
                    btn.innerHTML = cls[i].descript;
                }
            });
            btn.style.marginLeft = "0.5rem";
            let type = cls[i].tag;
            switch (type) {
                case "svg":
                    btn.onclick = function () {
                        action.action(
                            function () {
                                action.downloadSVG();
                            },
                            "已下载至默认文件夹",
                            "下载失败"
                        );
                    };
                    break;
                case "png":
                    btn.onclick = function () {
                        action.action(
                            function () {
                                action.downloadPNG();
                            },
                            "已下载至默认文件夹",
                            "下载失败"
                        );
                    };
                    break;
                case "jpg":
                    btn.onclick = function () {
                        action.action(
                            function () {
                                action.downloadJPG();
                            },
                            "已下载至默认文件夹",
                            "下载失败"
                        );
                    };
                    break;
                case "mathml":
                    btn.onclick = function () {
                        action.action(
                            function () {
                                action.copyMLToClip();
                            },
                            "已复制到剪切板",
                            "复制失败"
                        );
                    };
                    break;
                case "svg_copy":
                    btn.onclick = function () {
                        action.action(
                            function () {
                                action.copySVGToClip();
                            },
                            "已复制到剪切板",
                            "复制失败"
                        );
                    };
                    break;
                case "transfer":
                    btn.onclick = function () {
                        action.action(
                            function () {
                                action.copyTransferedToClip();
                            },
                            "已复制到剪切板",
                            "复制失败"
                        );
                    };
                    break;
                case "shareurl":
                    btn.onclick = function () {
                        action.action(
                            function () {
                                action.copyShareURLToClip();
                            },
                            "已复制该LaTeX公式的URL地址，可以将公式分享给别人啦~",
                            "复制失败"
                        );
                    };
                    break;
                default:
                    btn.onclick = function () {
                        alert("我是新按钮");
                    };
                    break;
            }
            group.appendChild(btn);
        }
        action.obj_theme.reinit();
    },
    /** 输出操作动作
     * @param {*} fun -动作函数
     * @param {*} ms_succ -执行成功显示消息
     * @param {*} ms_er -执行失败显示消息
     */
    action: function (fun, ms_succ, ms_er) {
        let msgbox = action.obj_eject;
        if (action.obj_element.el_input.value.trim() == "") {
            msgbox.Etoast({
                type: "warning",
                message: "没有发现LaTeX表达式",
            });
        } else {
            try {
                fun();
                msgbox.Etoast({
                    type: "success",
                    message: ms_succ,
                    time: 10,
                });
            } catch (err) {
                msgbox.Etoast({
                    type: "warning",
                    message: ms_er,
                });
            }
        }
    },
    /** 下载svg */
    downloadSVG: function () {
        let svgsource = action.obj_output.svgSource;
        svgsource.setAttribute("width", action.obj_output.svgSurce_size[0]);
        svgsource.setAttribute("height", action.obj_output.svgSurce_size[1]);
        let xmlHeader = "<" + '?xml version="1.0" encoding="UTF-8" standalone="no" ?' + ">\n";
        let hiddenLink = document.createElement("a");
        if (hiddenLink.href) URL.revokeObjectURL(hiddenLink.href);
        let svgSourceCodeToDownload = xmlHeader + svgsource.outerHTML;
        let blob = new Blob([svgSourceCodeToDownload], {
            type: "image/svg+xml",
        });
        hiddenLink.href = URL.createObjectURL(blob);
        hiddenLink.download = action.NAME_PREFIX + new Date().getTime() + ".svg";
        hiddenLink.click();

    },
    /** 下载png */
    downloadPNG: function () {
        let svgsource = action.obj_output.svgSource;
        svgsource.setAttribute("width", "1920px");
        svgsource.setAttribute("height", "1080px");
        let svgXml = svgsource.outerHTML;
        let image = new Image();
        image.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgXml)));
        image.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = 3840;
            canvas.height = 2160;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, 3840, 2160); //裁剪透明像素并加边儿
            var imgData = canvas.getContext("2d").getImageData(0, 0, 3840, 2160).data;
            var lOffset = canvas.width,
                rOffset = 0,
                tOffset = canvas.height,
                bOffset = 0;
            for (var i = 0; i < canvas.width; i++) {
                for (var j = 0; j < canvas.height; j++) {
                    var pos = (i + canvas.width * j) * 4;
                    if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] || imgData[pos + 3] > 0) {
                        bOffset = Math.max(j, bOffset); // 找到有色彩的最底部的纵坐标
                        rOffset = Math.max(i, rOffset); // 找到有色彩的最右端
                        tOffset = Math.min(j, tOffset); // 找到有色彩的最上端
                        lOffset = Math.min(i, lOffset); // 找到有色彩的最左端
                    }
                }
            }
            lOffset++;
            rOffset++;
            tOffset++;
            bOffset++;
            let canvas2 = document.createElement("canvas");
            canvas2.width = rOffset - lOffset + 100;
            canvas2.height = bOffset - tOffset + 100;
            let context2 = canvas2.getContext("2d");
            let w = canvas2.width;
            let h = canvas2.height;
            let ow = 50;
            let oh = 50;
            let nw = canvas2.width;
            let nh = canvas2.height;
            context2.drawImage(canvas, lOffset, tOffset, w, h, ow, oh, nw, nh);
            let hiddenLink = document.createElement("a");
            if (action.obj_common.isPC()) {
                hiddenLink.href = canvas2.toDataURL("image/png");
            } else {
                hiddenLink.href = canvas.toDataURL("image/png");
            }
            hiddenLink.download = action.NAME_PREFIX + new Date().getTime() + ".png";
            hiddenLink.click();
        };
    },
    /** 下载jpg */
    downloadJPG: function () {
        let svgsource = action.obj_output.svgSource;
        svgsource.setAttribute("width", "1920px");
        svgsource.setAttribute("height", "1080px");
        let svgXml = svgsource.outerHTML;
        let image = new Image();
        image.src = "data:image/svg+xml;base64," + window.btoa(unescape(encodeURIComponent(svgXml)));
        // console.log(image.src);
        image.onload = function () {
            let canvas = document.createElement("canvas");
            canvas.width = 3840;
            canvas.height = 2160;
            let context = canvas.getContext("2d");
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            //裁剪透明像素并加边儿
            var imgData = canvas.getContext("2d").getImageData(0, 0, canvas.width, canvas.height).data;
            var lOffset = canvas.width,
                rOffset = 0,
                tOffset = canvas.height,
                bOffset = 0;
            for (var i = 0; i < canvas.width; i++) {
                for (var j = 0; j < canvas.height; j++) {
                    var pos = (i + canvas.width * j) * 4;
                    if (imgData[pos] > 0 || imgData[pos + 1] > 0 || imgData[pos + 2] || imgData[pos + 3] > 0) {
                        bOffset = Math.max(j, bOffset); // 找到有色彩的最底部的纵坐标
                        rOffset = Math.max(i, rOffset); // 找到有色彩的最右端
                        tOffset = Math.min(j, tOffset); // 找到有色彩的最上端
                        lOffset = Math.min(i, lOffset); // 找到有色彩的最左端
                    }
                }
            }
            lOffset++;
            rOffset++;
            tOffset++;
            bOffset++;
            let canvas_temp = document.createElement("canvas");
            let x = rOffset - lOffset;
            let y = bOffset - tOffset;
            let m = x + 100;
            let n = y + 100;
            canvas_temp.width = m;
            canvas_temp.height = n;
            let context_temp = canvas_temp.getContext("2d");
            context_temp.fillStyle = "white";
            context_temp.fillRect(0, 0, m, n);
            context_temp.drawImage(canvas, lOffset, tOffset, x, y, 50, 50, x, y);
            let hiddenLink = document.createElement("a");
            hiddenLink.href = canvas_temp.toDataURL("image/jpeg");
            hiddenLink.download = action.NAME_PREFIX + new Date().getTime() + ".jpg";
            hiddenLink.click();
        };
    },
    /** ML代码复制到剪切板 */
    copyMLToClip: function () {
        let ml = document.getElementsByTagName("math")[0].outerHTML;
        action.obj_common.copyToClip(ml);
    },
    /** svg源码复制到剪切板 */
    copySVGToClip: function () {
        let svg = action.obj_output.svgSource.outerHTML;
        action.obj_common.copyToClip(svg);
    },
    /** shareURL复制到剪切板 */
    copyShareURLToClip: function () {
        let str = action.obj_element.el_input.value;
        str = encodeURI(str); //encode加密
        str = window.btoa(str); //base64加密
        let url = action.const_hostName + "/#" + str;
        action.obj_common.copyToClip(url);
    },
    /** 斜杠转义复制到剪切板 */
    copyTransferedToClip: function () {
        let str = action.obj_element.el_input.value;
        str = str.replace(/(\\)/g, "\\$1");
        action.obj_common.copyToClip(str);
    },
}