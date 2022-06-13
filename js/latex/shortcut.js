export var shortcut = {
  const_boot: "", //存储OSS图床路径
  obj_element: {},
  obj_common: {},
  obj_input: {}, //存储input功能组件对象
  obj_theme: {},
  map_shortcut: {}, //存储快捷方式字典的变量
  map_word: {}, //存储语言分词字典的变量

  flag_menuConstrut_shortcut_layer1: [], //存储一级菜单是否已经渲染完毕的标志组
  flag_menuConstrut_shortcut_layer2: [], //存储二级菜单是否已经渲染完毕的标志组
  flag_menuShow_shortcut: [], //存储二级菜单是否已经拉出的标志组
  flag_menuDelay_shortcut: { show: [], hide: [] }, //存储菜单打开和收起延迟定时器的容器组
  flag_matrixbtn: "", //保存当前打开的矩阵按钮编号

  init: function (opt) {
    shortcut.const_boot = opt.const_boot;
    shortcut.obj_element = opt.obj_element;
    shortcut.obj_common = opt.obj_common;
    shortcut.obj_input = opt.obj_input;
    shortcut.obj_theme = opt.obj_theme;
    shortcut.map_shortcut = opt.map_all[0].shortcut;
    shortcut.map_word = opt.map_all[0].word;
    shortcut.init_shortcut_navtabs();
    $(document).keydown(function (event) {
      if (shortcut.flag_matrixbtn != "") {
        //矩阵确定事件
        if (event.keyCode == 13) {
          $("#" + shortcut.flag_matrixbtn).click();
        }
      }
    });
  },
  /** 初始化标签 */
  init_shortcut_navtabs: function () {
    let len = shortcut.map_shortcut.length;
    let ul = document.createElement("ul");
    ul.className = "nav nav-tabs";
    ul.id = shortcut.obj_element.id_navtabs;
    shortcut.obj_element.el_shortcut.appendChild(ul);
    // 创建快捷工具的标签结构
    for (let i = 0; i < len; i++) {
      let li = document.createElement("li");
      li.className = "nav-item";
      let a = document.createElement("a");
      a.className = "nav-link";
      a.href = "##";
      a.id = "a_shortcut_" + i;
      a.innerHTML = shortcut.map_shortcut[i].descript;
      ul.appendChild(li);
      li.appendChild(a);
      // 创建二级菜单是否已经拉出的标志组的数据结构
      shortcut.flag_menuShow_shortcut[i] = [];
      //创建二级菜单是否已经渲染完毕的标志组的数据结构
      shortcut.flag_menuConstrut_shortcut_layer2[i] = [];
      // 绑定标签点击事件
      $("#a_shortcut_" + i).on("click", function () {
        $(".area .nav-link").attr("class", "nav-link");
        $(".wrap-shortcut").hide();
        $("#a_shortcut_" + i).attr("class", "nav-link active");
        shortcut.obj_theme.reinit(); //重新刷新一次主题
        //如果该一级菜单还没有渲染出来，则渲染之
        if (!shortcut.flag_menuConstrut_shortcut_layer1[i]) {
          shortcut.init_shortcut_layer1(i);
        }
        $("#wrap_shortcut_" + i).show();
      });
    }
    //设定第一个tab为激活样式
    document.getElementById("a_shortcut_0").classList.add("active");
    //渲染第一个一级菜单组
    shortcut.init_shortcut_layer1(0);
    shortcut.obj_theme.reinit();
  },
  /** 初始化一级菜单 */
  init_shortcut_layer1: function (index) {
    //引入字典
    let path = shortcut.const_boot + shortcut.map_shortcut[index].layer1.path;
    let fragment = document.createDocumentFragment();
    //创建一级菜单组容器
    let wrap = document.createElement("div");
    wrap.className = "wrap-shortcut";
    wrap.id = "wrap_shortcut_" + index;
    fragment.appendChild(wrap);
    //创建一级菜单组内的flex容器
    let wrap_in = document.createElement("div");
    wrap_in.style.display = "flex";
    wrap_in.style.flexDirection = "row";
    wrap_in.style.flexWrap = "nowrap";
    wrap_in.style.justifyContent = "space-around";
    wrap_in.style.alignItems = "center";
    //引入字典
    let cls = shortcut.map_shortcut[index].layer1.cont;
    let len = cls.length;
    // let devicewidth = document.body.clientWidth;
    // 创建一级菜单
    for (let m = 0; m < len; m++) {
      //创建一级菜单元素容器
      let dropdown = document.createElement("div");
      dropdown.className = "dropdown";
      dropdown.style.padding = "0";
      dropdown.style.margin = "0.5rem";
      if (m == 0) {
        dropdown.style.marginLeft = "0";
      }
      if (m == len - 1) {
        dropdown.style.marginRight = "0";
      }
      dropdown.style.order = m;
      dropdown.style.flexGrow = 0;
      //创建按钮
      let btn = document.createElement("button");
      btn.className = "btn btn-light theme-fill";
      btn.type = "button";
      //创建图像
      let img = document.createElement("img");
      img.className = "layer1-img";
      img.src = path + cls[m].name;
      img.ondragstart = function () {
        return false;
      };
      img.oncontextmenu = function () {
        return false;
      };
      //创建中文描述段落（仅宽屏状态显示）
      let p = document.createElement("p");
      p.className = "layer1-p";
      if (shortcut.obj_common.isPC()) {
        p.innerHTML = cls[m].descript;
      }
      p.style.fontSize = "0.5rem";
      p.style.margin = "0 auto 0.2rem auto";
      //创建箭头
      let arrow = document.createElement("div");
      arrow.className = "layer1-p";
      arrow.style.margin = "-0.3rem auto -0.4rem auto";
      arrow.style.fontSize = "1rem";
      arrow.innerHTML = "<i class='fa fa-caret-down'></i>";
      //绑定重绘时中文描述段落和箭头
      $(window).resize(function () {
        if (document.body.clientWidth > 1100) {
          p.innerHTML = cls[m].descript;
        } else {
          p.innerHTML = "";
        }
        let arrow = document.createElement("div");
        arrow.style.margin = "-0.3rem auto -0.4rem auto";
        arrow.style.fontSize = "1rem";
        arrow.innerHTML = "<i class='fa fa-caret-down'></i>";
        p.appendChild(arrow);
      });
      wrap.appendChild(wrap_in); //渲染一级菜单组内的flex容器
      wrap_in.appendChild(dropdown); //渲染一级菜单元素容器
      dropdown.appendChild(btn); //渲染按钮
      btn.appendChild(img); //渲染图像
      btn.appendChild(p); //渲染中文描述段落
      p.appendChild(arrow); //渲染箭头
      //创建二级菜单组（空）
      let menu = document.createElement("div");
      //确定二级菜单出现的方向
      if (m < len / 2) {
        menu.className = "dropdown-menu";
      } else {
        menu.className = "dropdown-menu dropdown-menu-right";
      }
      menu.id = "shortcut_" + index + "_layer2_" + m;
      //序号信息嵌入二级菜单组容器
      menu.dataset.layer1index = index;
      menu.dataset.layer2index = m;
      menu.style.backgroundColor = "rgba(255,255,255,0.95)";
      menu.style.boxShadow = "4px 4px 4px 1px rgba(0,0,0,0.2)";
      menu.style.marginTop = "-1px";
      menu.style.padding = "1rem";
      //菜单宽度为组容器宽度减去padding
      menu.style.width = shortcut.obj_element.el_shortcut.clientWidth / 2 + "px";
      //菜单参数绑定到重绘事件
      $(window).resize(function () {
        menu.style.width = shortcut.obj_element.el_shortcut.clientWidth / 2 + "px";
      });
      //绑定悬浮事件(按键事件)
      dropdown.onmouseenter = function () {
        // 菜单拉出
        shortcut.flag_menuDelay_shortcut.show[m] = setTimeout(function () {
          //如果该二级菜单还没有渲染出来，则渲染之
          if (!shortcut.flag_menuConstrut_shortcut_layer2[index][m]) {
            shortcut.init_shortcut_layer2(index, m);
          }
          $(menu).slideDown(50);
          btn.focus();
          shortcut.flag_menuShow_shortcut[index][m] = true;
        }, 200);
        clearTimeout(shortcut.flag_menuDelay_shortcut.hide[m]);
      };
      dropdown.onmouseleave = function () {
        // 菜单收起
        shortcut.flag_menuDelay_shortcut.hide[m] = setTimeout(function () {
          $(menu).slideUp(0);
          btn.blur();
          shortcut.obj_element.el_input.focus();
          shortcut.flag_menuShow_shortcut[index][m] = false;
          $(".matrixmenu").slideUp(0); //收起所有矩阵的小菜单
          $(".matrixmenu input").value = ""; //清空所有矩阵的小菜单内容
          shortcut.flag_matrixbtn = ""; //清空矩阵菜单打开标志
        }, 200);
        clearTimeout(shortcut.flag_menuDelay_shortcut.show[m]);
      };
      //如果是移动端，并且是矩阵，则多绑定一个点击事件（在移动端点击二级菜单后二级菜单就消失，这个功能不要应用于矩阵）
      if (!shortcut.obj_common.isPC() && cls[m].tag != "matrix") {
        dropdown.onclick = function () {
          if (shortcut.flag_menuShow_shortcut[index][m]) {
            $(menu).slideUp(0);
            shortcut.flag_menuShow_shortcut[index][m] = false;
          } else {
            $(menu).slideDown(0);
            shortcut.flag_menuShow_shortcut[index][m] = true;
          }
        };
      }
      dropdown.appendChild(menu);
    }
    // 标签初始显示状态
    if (index == 0) {
      wrap.style.display = "block";
    } else {
      wrap.style.display = "none";
    }
    shortcut.obj_element.el_shortcut.appendChild(fragment);
    shortcut.flag_menuConstrut_shortcut_layer1[index] = true;
    shortcut.obj_theme.reinit();
  },
  /** 初始化二级菜单 */
  init_shortcut_layer2: function (index, m) {
    //参数
    let cls = shortcut.map_shortcut[index].layer1.cont;
    let path2 = shortcut.const_boot + shortcut.map_shortcut[index].layer2.path;
    let tag_father = cls[m].tag;
    let cls2_father = shortcut.map_shortcut[index].layer2.cont[tag_father];
    let cls2 = cls2_father.cont;
    let len3 = cls2.length;
    let menu = document.getElementById("shortcut_" + index + "_layer2_" + m);
    let fragment = document.createDocumentFragment();
    //创建二级菜单图标
    for (let n = 0; n < len3; n++) {
      if (cls2[n].tag == "divider") {
        //分割线
        let divider1 = document.createElement("div");
        let divider2 = document.createElement("div");
        divider1.className = "dropdown-divider";
        divider2.className = "dropdown-divider";
        divider2.style.marginBottom = "0.6rem";
        let p = document.createElement("p");
        p.innerHTML = cls2[n].name;
        p.style.margin = "0.5rem auto 0 1rem";
        fragment.appendChild(divider1);
        fragment.appendChild(p);
        fragment.appendChild(divider2);
      } else {
        //正常图标
        // 创建图像容器
        let imgwrap = document.createElement("div");
        imgwrap.className = "btn btn-light theme-fill";
        imgwrap.style.margin = "0.2rem";
        // 设置图像容器内填充
        if (cls2[n].padding == "") {
          imgwrap.style.padding = cls2_father.defaultpadding;
        } else {
          imgwrap.style.padding = cls2[n].padding;
        }
        //创建图像
        let img = document.createElement("img");
        img.className = "layer2-img";
        img.src = path2 + cls[m].tag + "/" + cls2[n].name;
        // 设置图像尺寸(支持数字和百分比两种形式)
        if (cls2[n].size == "") {
          // console.log(cls2_father.defaultsize.toString());
          if (cls2_father.defaultsize.toString().indexOf("%") > 0) {
            imgwrap.style.width = cls2_father.defaultsize;
          } else {
            imgwrap.style.width = cls2_father.defaultsize + "rem";
          }
        } else {
          // console.log(cls2[n].size.toString());
          if (cls2[n].size.toString().indexOf("%") > 0) {
            img.style.width = cls2[n].size;
          } else {
            img.style.width = cls2[n].size + "rem";
          }
        }
        img.oncontextmenu = () => {
          return false;
        };
        img.ondragstart = () => {
          return false;
        };
        // 如果是PC端绑定气泡
        if (shortcut.obj_common.isPC() && !shortcut.obj_common.isIE()) {
          // 设置tooltip气泡内容(如果是PC端)
          let str = "<div style='text-align:left;'>";
          str += "<strong>";
          let temp = cls2[n].latex;
          temp = temp.replace(/\r\n/g, "<br/>");
          temp = temp.replace(/ /g, "&nbsp;");
          str += temp;
          str += "</strong>";
          str += "<hr style='width: 100%; height: 1px; border: none; background-color: #987cb9;margin:4px auto 4px auto;'></hr>";
          if (cls2[n].zh != "-" || cls2[n].en != "-") {
            str += "<span style='font-size:smaller'>" + shortcut.map_word.remark + "：</span>";
            str += "<div style='margin-left:0.6rem'>";
            if (cls2[n].zh != "-") {
              str += cls2[n].zh;
              str += "<br/>";
            }
            if (cls2[n].en != "-") {
              str += cls2[n].en;
            }
            str += "</div>";
          }
          str += "</div>";
          let show1 = document.createElement("div");
          show1.innerHTML = str;
          //offset第一个数代表top，第二个数代表left
          tippy(img, { content: str, placement: "right", allowHTML: true, offset: [10, 6], theme: "mythem", delay: [600, 0] });
        }
        //如果是矩阵
        if (tag_father == "matrix") {
          // 创建三级菜单容器
          let matrixwrap = document.createElement("div");
          matrixwrap.className = "dropdown";
          matrixwrap.style.display = "inline-block";
          // imgwrap.setAttribute("data-toggle", "dropdown");
          let matrixmenu = document.createElement("div");
          matrixmenu.className = "dropdown-menu matrixmenu";
          matrixmenu.style.marginTop = "-2px";
          matrixmenu.style.width = "50%";
          matrixmenu.style.padding = "0.5rem";
          let inputwrap = document.createElement("div");
          let input1 = document.createElement("input");
          input1.type = "text";
          input1.className = "form-control";
          input1.style.width = "45%";
          input1.style.display = "inline-block";
          input1.style.margin = "0.2rem";
          input1.tabIndex = "1";
          input1.placeholder = shortcut.map_word.row;
          let input2 = document.createElement("input");
          input2.type = "text";
          input2.className = "form-control";
          input2.style.width = "45%";
          input2.style.display = "inline-block";
          input2.style.margin = "0.2rem";
          input2.tabIndex = "2";
          input2.placeholder = shortcut.map_word.col;
          let matrixbtn = document.createElement("button");
          matrixbtn.type = "button";
          matrixbtn.className = "btn btn-light btn-block theme-block";
          matrixbtn.innerHTML = "确定";
          matrixbtn.style.marginTop = "0.2rem";
          matrixbtn.tabIndex = "3";
          matrixbtn.id = "matrixbtn_" + n; //给矩阵确定按钮编号
          imgwrap.onclick = function () {
            $(matrixmenu).slideToggle(50);
            matrixmenu.classList.remove("matrixmenu");
            $(".matrixmenu").slideUp(0);
            input1.value = "";
            input2.value = "";
            input1.focus();
            matrixmenu.classList.add("matrixmenu");
            shortcut.flag_matrixbtn = matrixbtn.id; //把当前打开的矩阵确定按钮的编号传递给标志变量
          };
          matrixbtn.onclick = function () {
            let row = input1.value;
            let col = input2.value;
            let ltx = cls2[n].latex;
            let bck = cls2[n].cursor;
            let matrixstr = shortcut.makeMatrix(row, col, ltx);
            shortcut.obj_input.input(matrixstr, bck);
            imgwrap.click();
            $(menu).slideUp(0);
          };
          imgwrap.appendChild(img);
          inputwrap.appendChild(input1);
          inputwrap.appendChild(input2);
          inputwrap.appendChild(matrixbtn);
          matrixmenu.appendChild(inputwrap);
          matrixwrap.appendChild(imgwrap);
          matrixwrap.appendChild(matrixmenu);
          fragment.appendChild(matrixwrap);
        } else {
          //如果不是矩阵
          // 绑定输入事件
          imgwrap.onclick = function () {
            let tex = cls2[n].latex;
            let back = cls2[n].cursor;
            shortcut.obj_input.input(tex, back);
          };
          fragment.appendChild(imgwrap);
          imgwrap.appendChild(img);
        }
      }
    }
    menu.appendChild(fragment);
    shortcut.flag_menuConstrut_shortcut_layer2[index][m] = true;
    shortcut.obj_theme.reinit();
  },
  /** 生成矩阵模板字符串
   * @param {*} row -行数
   * @param {*} col -列数（默认为2）
   * @param {*} latex -以“...”为分隔符的latex表达式
   * @returns {*} -生成的字符串
   */
  makeMatrix: function (row, col, latex) {
    let la = latex.split("…");
    let str1 = "";
    let str2 = "";
    for (let i = 0; i < col - 1; i++) {
      str1 += "  " + la[1];
    }
    for (let i = 0; i < row; i++) {
      if (i == row - 1) {
        str2 += str1 + "\n";
      } else {
        str2 += str1 + " \\\\" + "\n";
      }
    }
    return la[0] + "\n" + str2 + la[2];
  },
};
