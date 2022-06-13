export var immediate = {
  const_boot: "", //存储OSS图床路径
  obj_element: {},
  obj_common: {},
  obj_input: {},
  obj_theme: {},
  map_immediate: {}, //存储控制面板字典的变量
  map_word: {}, //存储语言分词字典的变量

  flag_menuConstrut_control_layer2: [], //存储二级菜单是否已经渲染完毕的标志组
  flag_menuDelay_control: { show: [], hide: [] }, //存储菜单打开和收起延迟定时器的容器组（控制面板）
  flag_menuShow_control: [], //存储二级菜单是否已经拉出的标志组（控制面板）
  removedOptions: {}, //默认环境暂存数组

  init: function (opt) {
    immediate.obj_common = opt.obj_common;
    immediate.const_boot = opt.const_boot;
    immediate.obj_element = opt.obj_element;
    immediate.obj_input = opt.obj_input;
    immediate.obj_theme = opt.obj_theme;
    immediate.map_immediate = opt.map_all[0].immediate;
    immediate.map_word = opt.map_all[0].word;
    immediate.init_immediate_layer1();
  },
  /** 初始化控制面板一级菜单 */
  init_immediate_layer1: function () {
    // 控制面板
    let devicewidth = document.body.clientWidth;
    let row = document.createElement("row");
    row.className = "row";
    row.style.padding = "0 15px";
    immediate.obj_element.el_immediate.appendChild(row);
    let group1 = document.createElement("div");
    group1.className = "col-5 col-sm-5 col-md-5 col-lg-5 col-xl-5";
    group1.style.padding = "0";
    row.appendChild(group1);
    let cls1 = immediate.map_immediate.control.layer1.cont;
    let len1 = cls1.length;
    for (let i = 0; i < len1; i++) {
      let dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      dropdown.style.display = "inline-block";
      let btn1 = document.createElement("button");
      btn1.className = "btn btn-light theme-fill";
      btn1.type = "button";
      btn1.id = "btn_" + cls1[i].tag;
      btn1.innerHTML = cls1[i].name;
      if (devicewidth < 1100) {
        btn1.innerHTML = cls1[i].nameforphone;
      }
      $(window).resize(function () {
        if (document.body.clientWidth < 1100) {
          btn1.innerHTML = cls1[i].nameforphone + "<i class='fa fa-caret-down'></i>";
        } else {
          btn1.innerHTML = cls1[i].name + "<i class='fa fa-caret-down'></i>";
        }
      });
      let arrow = document.createElement("span");
      arrow.innerHTML = "&nbsp;<i class='fa fa-caret-down'></i>";
      btn1.appendChild(arrow);
      let menu = document.createElement("div");
      menu.className = "dropdown-menu";
      menu.id = "wrap_" + cls1[i].tag;
      menu.style.boxShadow = "4px 4px 4px 1px rgba(0,0,0,0.2)";
      //绑定悬浮事件(按键事件)
      dropdown.onmouseenter = function () {
        // 菜单拉出
        immediate.flag_menuDelay_control.show[i] = setTimeout(function () {
          //如果该二级菜单还没有渲染出来，则渲染之
          if (!immediate.flag_menuConstrut_control_layer2[cls1[i].tag]) {
            immediate.init_immediate_layer2(cls1[i].tag, menu);
          }
          $(menu).slideDown(50);
          btn1.focus();
          immediate.flag_menuShow_control[i] = true;
        }, 200);
        clearTimeout(immediate.flag_menuDelay_control.hide[i]);
      };
      dropdown.onmouseleave = function () {
        // 菜单收起
        immediate.flag_menuDelay_control.hide[i] = setTimeout(function () {
          $(menu).slideUp(0);
          btn1.blur();
          immediate.flag_menuShow_control[i] = false;
        }, 200);
        clearTimeout(immediate.flag_menuDelay_control.show[i]);
      };
      //如果是移动端，则多绑定一个点击事件
      if (!immediate.obj_common.isPC()) {
        dropdown.onclick = function () {
          if (immediate.flag_menuShow_control[i]) {
            $(menu).slideUp(0);
            immediate.flag_menuShow_control[i] = false;
          } else {
            $(menu).slideDown(0);
            immediate.flag_menuShow_control[i] = true;
          }
        };
      }
      group1.appendChild(dropdown);
      dropdown.appendChild(btn1);
      dropdown.appendChild(menu);
    }
    // 环境按钮
    let cls3 = immediate.map_immediate.environment.layer2.cont;
    let len3 = cls3.length;
    let group2 = document.createElement("div");
    group2.className = "col-6 col-sm-6 col-md-6 col-lg-6 col-xl-6";
    group2.style.padding = "0";
    row.appendChild(group2);
    for (let n = len3 - 1; n >= 0; n--) {
      let btn2 = document.createElement("button");
      btn2.className = "btn btn-light theme-fill";
      btn2.type = "button";
      btn2.style.float = "right";
      btn2.id = "btn_" + cls3[n].name;
      btn2.innerHTML = cls3[n].tag;
      if (devicewidth < 1100) {
        btn2.innerHTML = cls3[n].tagforphone;
      }
      $(window).resize(function () {
        if (document.body.clientWidth < 1100) {
          btn2.innerHTML = cls3[n].tagforphone;
        } else {
          btn2.innerHTML = cls3[n].tag;
        }
      });
      btn2.onclick = function (event) {
        immediate.insertEnvironment(cls3[n].name, cls3[n].descript);
        event.stopPropagation();
        event.preventDefault();
      };
      group2.appendChild(btn2);
    }
    let group3 = document.createElement("div");
    group3.className = "col-1 col-sm-1 col-md-1 col-lg-1 col-xl-1";
    group3.style.padding = "0";
    row.appendChild(group3);
    //清空按钮
    let btn3 = document.createElement("button");
    btn3.className = "btn btn-light theme-fill";
    btn3.type = "button";
    btn3.style.float = "right";
    btn3.id = "btn_clear";
    btn3.innerHTML = "<i class='fa fa-trash-o'></i>清空";
    if (devicewidth < 1100) {
      btn3.innerHTML = "<i class='fa fa-trash-o'></i>";
    }
    $(window).resize(function () {
      if (document.body.clientWidth < 1100) {
        btn3.innerHTML = "<i class='fa fa-trash-o'></i>";
      } else {
        btn3.innerHTML = "<i class='fa fa-trash-o'></i>清空";
      }
    });
    btn3.onclick = function () {
      immediate.obj_element.el_input.value = "";
      immediate.obj_input.input("", 0);
    };
    group3.appendChild(btn3);
    immediate.obj_theme.reinit();
  },
  /** 初始化控制面板二级菜单
   * @param {*} tag -菜单标签
   * @param {*} menu -菜单控件容器
   */
  init_immediate_layer2: function (tag, menu) {
    let cls2 = immediate.map_immediate.control.layer2.cont[tag].cont;
    let path2 = immediate.map_immediate.control.layer2.path;
    let len2 = cls2.length;
    // 填充菜单内容
    for (let m = 0; m < len2; m++) {
      // 创建图像容器
      let imgwrap = document.createElement("div");
      imgwrap.className = "btn btn-light theme-fill";
      imgwrap.style.margin = "0.2rem";
      imgwrap.style.padding = "0.2rem";
      // 创建图像
      let img = document.createElement("img");
      //为了不让颜色控制按钮反色而增加一个类名control-color
      if (tag == "color") {
        img.className = "control-color";
      }
      img.src = immediate.const_boot + path2 + tag + "/" + cls2[m].name;
      // 设置图像尺寸
      img.width = "100%";
      // 绑定事件
      img.oncontextmenu = () => {
        return false;
      };
      img.ondragstart = () => {
        return false;
      };
      // 如果是PC端绑定气泡
      if (immediate.obj_common.isPC() && !immediate.obj_common.isIE()) {
        // 设置tooltip气泡内容(如果是PC端)
        let str = "<div style='text-align:left;'>";
        str += "<strong>";
        let temp = cls2[m].latex;
        temp = temp.replace(/\r\n/g, "<br/>");
        temp = temp.replace(/ /g, "&nbsp;");
        str += temp;
        str += "</strong>";
        str += "<hr style='width: 100%; height: 1px; border: none; background-color: #987cb9;margin:4px auto 4px auto;'></hr>";
        if (cls2[m].zh != "-" || cls2[m].en != "-") {
          str += "<span style='font-size:smaller'>备注：</span>";
          str += "<div style='margin-left:0.6rem'>";
          if (cls2[m].zh != "-") {
            str += cls2[m].zh;
            str += "<br/>";
          }
          if (cls2[m].en != "-") {
            str += cls2[m].en;
          }
          str += "</div>";
        }
        str += "</div>";
        let show1 = document.createElement("div");
        show1.innerHTML = str;
        //offset第一个数代表top，第二个数代表left
        tippy(img, { content: str, placement: "right", allowHTML: true, offset: [10, 6], theme: "mythem", delay: [600, 0] });
      }
      imgwrap.onclick = function () {
        let tex = cls2[m].latex;
        let back = cls2[m].cursor;
        immediate.obj_input.input(tex, back);
      };
      imgwrap.appendChild(img);
      menu.appendChild(imgwrap);
    }
    immediate.flag_menuConstrut_control_layer2[tag] = true;
    immediate.obj_theme.reinit();
  },
  /** 插入默认环境
   * @param {*} el -环境名
   * @param {*} defaultopn -环境默认参数
   */
  insertEnvironment: function (el, defaultopn) {
    let text = immediate.obj_element.el_input.value;
    let match = text.match(/^\s*\\begin\{([a-zA-Z0-9]*)\}(\{[a-zA-Z0-9]*\}|)\n?([\s\S]*?)\n?\\end\{([a-zA-Z0-9]*)\}\s*$/);
    if (match) {
      text = match[3];
      immediate.removedOptions[match[1]] = match[2];
      if (match[1] == "eqnarray" || match[1] == "align") {
        text = text.replace(/\s*&\s*=\s*&\s*/g, " = ");
        text = text.replace(/\s*&\s*=\s*/g, " = ");
        text = text.replace(/\s*=\s*&\s*/g, " = ");
      }
    }
    if (el == "eqnarray") {
      text = text.replace(/\s*=\s*/g, " & = & ");
    } else if (el == "align") {
      text = text.replace(/\s*=\s*/g, " & = ");
    }
    if (defaultopn != null) text = "\\begin{" + el + "}" + (immediate.removedOptions[el] || defaultopn) + "\n" + text + "\n\\end{" + el + "}";
    immediate.obj_element.el_input.value = "";
    immediate.obj_input.input(text, 0);
  },
};
