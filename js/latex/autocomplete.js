export var autocomplete = {
  isOpenAutocomplete: true,
  map_autocomplete: {},
  obj_element: {},
  obj_input: {},
  obj_theme: {},
  flag_isMenuShowed: false, //自动补全菜单是否已经处于弹出状态
  pointerINdex: 0, //当前选中的额自动补充全菜单的激活项编号
  flag_isMouseMove: false, //鼠标是否在移动
  tmr_mouseMove: null, //鼠标是否移动的计时器
  init: function (opt) {
    autocomplete.obj_element = opt.obj_element;
    autocomplete.obj_input = opt.obj_input;
    autocomplete.obj_theme = opt.obj_theme;
    autocomplete.map_autocomplete = opt.map_all[2].map;
    // 监听回车事件(矩阵确定和自动补全)（跟捕捉顺序有关，现在是矩阵优先）
    $(document).keydown(function (event) {
      if ((autocomplete.flag_isMenuShowed && event.keyCode == 9) || (autocomplete.flag_isMenuShowed && event.keyCode == 13)) {
        autocomplete.enterInput();
        return false;
      }
    });
    //关于自动补全部分的按键事件捕捉
    $(document).keydown(function (e) {
      //如果自动补全框已经打开，并且是上下键，则1.屏蔽系统事件 2.移动指针
      if ((autocomplete.flag_isMenuShowed && e.keyCode == 38) || (autocomplete.flag_isMenuShowed && e.keyCode == 40)) {
        e.preventDefault();
        if (e.keyCode == 38) {
          let count = document.getElementsByClassName("autocomp").length;
          autocomplete.menuPointerSub(count);
          return false;
        }
        if (e.keyCode == 40) {
          let count = document.getElementsByClassName("autocomp").length;
          autocomplete.menuPointerAdd(count);
          return false;
        }
      }
      //如果是“ESC”，无条件销毁自动补全框
      else if (e.keyCode == 27) {
        autocomplete.disposeMenu();
      }
      // ★如果是字母键、大中括号、回退键，在不同时按住ctrl键的时候，呼出自动补全框
      else if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode == 8 || e.keyCode == 219 || e.keyCode == 221 || e.keyCode == 229) {
        if (autocomplete.flag_isMenuShowed) {
          if (!(e.ctrlKey || e.metaKey)) {
            autocomplete.disposeMenu();
            autocomplete.showMenu();
          }
        }
      }
      // 如果是“\”，无条件呼叫出自动补全
      else if (e.keyCode == 220) {
        autocomplete.disposeMenu();
        autocomplete.showMenu();
      }
      // 一切未捕捉情况都销毁自动补全框（如果有键盘情况出现bug，改这里）
      else {
        autocomplete.disposeMenu();
      }
    });
    //鼠标是否移动的事件
    window.onmousemove = function () {
      autocomplete.flag_isMouseMove = true;
      clearTimeout(autocomplete.tmr_mouseMove);
      autocomplete.tmr_mouseMove = setTimeout(function () {
        autocomplete.flag_isMouseMove = false;
      }, 100);
    };
    //监听浏览器重绘
    $(window).resize(function () {
      autocomplete.disposeMenu();
    });
  },
  /** 销毁所有自动补全菜单 */
  disposeMenu: function () {
    $(".autocomplete-menu").remove();
    autocomplete.flag_isMenuShowed = false;
  },
  /** 生成并弹出自动补全菜单 */
  showMenu: function () {
    if (autocomplete.isOpenAutocomplete) {
      setTimeout(function () {
        let input_autocomplete = autocomplete.obj_element.el_input; //定义输入框控件
        let dropdown = document.createElement("div");
        dropdown.className = "autocomplete-menu";
        //主题
        if (autocomplete.obj_theme.currentTheme != "default") {
          dropdown.className = "autocomplete-menu theme-" + autocomplete.obj_theme.currentTheme + "-autocomp-main theme-" + autocomplete.obj_theme.currentTheme + "-scroll";
        }
        dropdown.id = "autocomplete-menu";
        let pos = $(input_autocomplete).caret("offset");
        dropdown.style.top = pos.top + pos.height + "px";
        dropdown.style.left = pos.left + "px";
        //生成列表数组
        let map = autocomplete.map_autocomplete;
        let showlist1 = [];
        let showlist2 = [];
        let showlist = []; //定义返回数组
        let cursorPosition = autocomplete.obj_input.getCursortPosition(input_autocomplete); //获取按键刹那光标位置
        //延时 1毫秒 等待选中选区底层逻辑完成，以便获得字符落定之后的光标位置；
        setTimeout(function () {
          autocomplete.obj_input.setRange(input_autocomplete, 0, cursorPosition); //设置选区为光标前所有内容
          let val_selected = autocomplete.obj_input.getSelectionContent(); //获取选区中的所有内容
          autocomplete.obj_input.setCaretPosition(input_autocomplete, cursorPosition); //还原光标位置
          //检测是否存在"\"命令符，如果不存在则关闭自动补全
          if (!/\\/.test(val_selected)) {
            autocomplete.flag_isMenuShowed = false;
            return;
          }
          let arr_iscommand = val_selected.split("\\"); //将包含"\"的文本切分为数组
          let len_iscommand = arr_iscommand.length; //获取数组长度
          let el_iscommand = arr_iscommand[len_iscommand - 1]; //获取该数组最后一项
          if (len_iscommand > 2) {
            if (arr_iscommand[len_iscommand - 2] == "") {
              //如果是双\\则关闭自动补全
              autocomplete.flag_isMenuShowed = false;
              return;
            }
          }
          //过滤非法字符
          el_iscommand = el_iscommand.replace(/([\|\[\]()*?+{}])/g, "\\$1");
          let reg = new RegExp("^" + el_iscommand, "i");
          let reg2 = new RegExp("[a-zA-Z]+[{}]*" + el_iscommand.trim() + "[a-zA-Z}]*[{}]*", "i");
          map.forEach((obj) => {
            if (reg.test(obj.tag)) {
              showlist1.push(obj);
            }
          });
          //按权重排序
          showlist1 = showlist1.sort(autocomplete.compare("sort"));
          //如果不为空
          if (el_iscommand != "") {
            map.forEach((obj) => {
              if (reg2.test(obj.tag)) {
                showlist2.push(obj);
              }
            });
            //按权重排序
            showlist2 = showlist2.sort(autocomplete.compare("sort"));
          }
          showlist = showlist1.concat(showlist2);
          //制造列表
          if (showlist.length > 0) {
            let len_showlist = showlist.length;
            //只显示符合条件的前100个值
            if (len_showlist > 100) {
              len_showlist = 100;
            }
            for (let i = 0; i < len_showlist; i++) {
              //创造容器
              let wrap = document.createElement("div");
              wrap.className = "autocomp";
              //主题
              if (autocomplete.obj_theme.currentTheme != "default") {
                wrap.className = "autocomp theme-" + autocomplete.obj_theme.currentTheme + "-autocomp-main";
              }
              wrap.id = "autocomp-" + i;
              //创造类别
              let typ = document.createElement("span");
              typ.className = "autocomp-typ";
              typ.style.color = showlist[i].type[1];
              typ.innerHTML = showlist[i].type[0];
              //创造tag部分
              let tg = document.createElement("span");
              tg.className = "autocomp-tg";
              //主题
              if (autocomplete.obj_theme.currentTheme != "default") {
                tg.className = "autocomp-tg theme-" + autocomplete.obj_theme.currentTheme + "-autocomp-main";
              }
              let reg_g = new RegExp("(" + el_iscommand + ")", "gi");
              //自动补全菜单高亮(判断需要高亮的部分是否为空)
              let html_reg = "";
              if (el_iscommand != "") {
                html_reg = "\\" + showlist[i].tag.replace(reg_g, "<span class='reg-bold'>$1</span>");
              } else {
                html_reg = "\\" + showlist[i].tag;
              }

              tg.innerHTML = html_reg;
              //创造备注（图标）部分
              let ico = document.createElement("span");
              ico.className = "autocomp-ico";
              //主题
              if (autocomplete.obj_theme.currentTheme != "default") {
                ico.className = "autocomp-ico theme-" + autocomplete.obj_theme.currentTheme + "-autocomp-ico";
              }
              ico.innerHTML = showlist[i].icon;
              //把数据绑定在元素本身上
              wrap.dataset.latex = showlist[i].cmd; //输出的latex
              wrap.dataset.cursor = showlist[i].cursor; //回退光标数
              wrap.dataset.exist = el_iscommand.length; //光标前已经录入的文字长度
              //绑定鼠标滑过事件
              wrap.onmouseover = function () {
                if (autocomplete.flag_isMouseMove) {
                  autocomplete.setMenuPointer(i);
                }
              };
              //绑定鼠标点击事件
              wrap.onclick = function () {
                autocomplete.enterInput();
              };
              //渲染列表
              wrap.appendChild(typ);
              wrap.appendChild(tg);
              wrap.appendChild(ico);
              dropdown.appendChild(wrap);
            }
            document.getElementsByTagName("body")[0].appendChild(dropdown);
            autocomplete.setMenuPointer(0);
            autocomplete.flag_isMenuShowed = true;
          } else {
            autocomplete.flag_isMenuShowed = false;
          }
        }, 0);
      }, 0);
    }
  },
  /** 获得菜单指针 */
  getMenuPointer: function () {
    return autocomplete.flag_autoComplete_pointer != "" ? autocomplete.flag_autoComplete_pointer : 0;
  },
  /** 设置菜单指针 */
  setMenuPointer: function (pos) {
    if (autocomplete.obj_theme.currentTheme == "default") {
      $(".autocomp").removeClass("autocomp-active");
      $("#autocomp-" + pos).addClass("autocomp-active");
    } else {
      $(".autocomp").removeClass("theme-" + autocomplete.obj_theme.currentTheme + "-autocomp-active");
      $("#autocomp-" + pos).addClass("theme-" + autocomplete.obj_theme.currentTheme + "-autocomp-active");
    }

    autocomplete.flag_autoComplete_pointer = pos;
  },
  /** 菜单指针向下1位
   * @param {*} total -菜单记录总数
   */
  menuPointerAdd: function (total) {
    let currentPointer = autocomplete.getMenuPointer();
    if (currentPointer < total - 1) {
      currentPointer++;
    }
    autocomplete.setMenuPointer(currentPointer);
    let hei = window.getComputedStyle(document.getElementById("autocomp-" + currentPointer)).height;
    hei = parseFloat(hei);
    $(".autocomplete-menu").scrollTop(hei * currentPointer);
  },
  /** 菜单指针向上1位 */
  menuPointerSub: function () {
    let currentPointer = autocomplete.getMenuPointer();
    if (currentPointer > 0) {
      currentPointer--;
    }
    autocomplete.setMenuPointer(currentPointer);
    let hei = window.getComputedStyle(document.getElementById("autocomp-" + currentPointer)).height;
    hei = parseFloat(hei);
    $(".autocomplete-menu").scrollTop(hei * currentPointer);
  },
  /** 将选中自动补全项填入输入框 */
  enterInput: function () {
    let input_autocomplete = autocomplete.obj_element.el_input; //定义输入框控件
    let position = autocomplete.obj_input.getCursortPosition(input_autocomplete);
    let pos = autocomplete.getMenuPointer();
    let pointer = document.getElementById("autocomp-" + pos);
    let tex = pointer.dataset.latex;
    let back = pointer.dataset.cursor;
    let exist = pointer.dataset.exist;
    autocomplete.obj_input.setRange(input_autocomplete, position - exist, position);
    autocomplete.obj_input.removeSelection();
    autocomplete.obj_input.input(tex, back);
    autocomplete.disposeMenu();
  },
  /** 自定义排序算法 */
  compare: function (property) {
    return function (obj1, obj2) {
      var value1 = obj1[property];
      var value2 = obj2[property];
      return value2 - value1; // 升序
    };
  },
};
