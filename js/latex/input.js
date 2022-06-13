export var input = {
  el_input: "",//输入框元素
  obj_element: {},
  fn_refresh: function () {
    console.error("刷新函数还未定义，请调用input.init()，并传入初始化参数");
  },
  /**
   * 初始化
   * @param {*} opt -参数表：{el_input,refresh} 
   */
  init: function (opt) {
    input.obj_element = opt.obj_element;
    input.fn_refresh = opt.fn_refresh;
    $(input.obj_element.el_input).on("input", function () {
      input.fn_refresh();
    })
    //设置输入框内选中的文字禁止拖动
    input.obj_element.el_input.ondragstart = function () {
      return false;
    };
  },
  /** 输入框插入内容
   * @param {*} tex -插入内容
   * @param {*} back -退格数
   */
  input: function (tex, back) {
    let ins = input.removeSelection(); //无论是否圈选都把圈选值存入内存
    let txta = input.obj_element.el_input;
    input.insertAtCursor(txta, tex);
    let getpos = input.getCursortPosition(txta);
    let setpos = getpos - back;
    input.setCaretPosition(txta, setpos);
    if (back != 0) {
      input.insertAtCursor(txta, ins);
    }
    input.fn_refresh();
  },
  /** 删除光标圈选内容并返回圈选值 */
  removeSelection: function () {
    if (window.getSelection) {
      let selecter = window.getSelection().toString();
      if (selecter != null && selecter.trim() != "") {
        document.execCommand("cut");
        return selecter;
      } else {
        return "";
      }
    } else if (document.selection) {
      let selecter = document.selection.createRange().text;
      if (selecter != null && selecter.trim() != "") {
        document.execCommand("cut");
        return selecter;
      } else {
        return "";
      }
    } else {
      return "";
    }
  },
  /** 在光标所在位置插入内容
   * @param {*} myField -dom节点
   * @param {*} myValue -插入字符串值
   */
  insertAtCursor: function (myField, myValue) {
    //IE 浏览器
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      // sel.select();
    }
    //FireFox、Chrome等
    else if (myField.selectionStart || myField.selectionStart == "0") {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
      // 保存滚动条
      var restoreTop = myField.scrollTop;
      myField.value = myField.value.substring(0, startPos) + myValue + myField.value.substring(startPos, myField.value.length);
      if (restoreTop > 0) {
        myField.scrollTop = restoreTop;
      }
      myField.focus();
      myField.selectionStart = startPos + myValue.length;
      myField.selectionEnd = startPos + myValue.length;
    } else {
      myField.value += myValue;
      myField.focus();
    }
  },
  /** 获取光标位置
   * @param {*} ctrl -dom节点
   */
  getCursortPosition: function (ctrl) {
    var CaretPos = 0;
    // IE Support
    if (document.selection) {
      ctrl.focus(); // 获取焦点
      var Sel = document.selection.createRange(); // 创建选定区域
      Sel.moveStart("character", -ctrl.value.length); // 移动开始点到最左边位置
      CaretPos = Sel.text.length; // 获取当前选定区的文本内容长度
    }
    // Firefox support (非ie)
    else if (ctrl.selectionStart || ctrl.selectionStart == "0") {
      CaretPos = ctrl.selectionStart; // 获取选定区的开始点
    }
    return CaretPos;
  },
  /** 设置光标位置
   * @param {*} ctrl -dom节点
   * @param {*} pos -位置
   */
  setCaretPosition: function (ctrl, pos) {
    if (ctrl.setSelectionRange) {
      //非ie
      ctrl.focus(); // 获取焦点
      ctrl.setSelectionRange(pos, pos); // 设置选定区的开始和结束点
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange(); // 创建选定区
      range.collapse(true); // 设置为折叠,即光标起点和结束点重叠在一起
      range.moveEnd("character", pos); // 移动结束点
      range.moveStart("character", pos); // 移动开始点
      range.select(); // 选定当前区域
    }
  },
  /** 设置选区
     * @param {*} ctrl -dom节点
     * @param {*} start -选区开始位置
     * @param {*} end -选区结束位置
     */
  setRange: function (ctrl, start, end) {
    if (ctrl.setSelectionRange) {
      //非ie
      ctrl.focus(); // 获取焦点
      ctrl.setSelectionRange(start, end); // 设置选定区的开始和结束点
    } else if (ctrl.createTextRange) {
      var range = ctrl.createTextRange(); // 创建选定区
      range.collapse(true); // 设置为折叠,即光标起点和结束点重叠在一起
      range.moveEnd("character", end); // 移动结束点
      range.moveStart("character", start); // 移动开始点
      range.select(); // 选定当前区域
    }
  },
  /** 返回圈选值 */
  getSelectionContent: function () {
    if (window.getSelection) {
      let selecter = window.getSelection().toString();
      if (selecter != null && selecter.trim() != "") {
        return selecter;
      } else {
        return "";
      }
    } else if (document.selection) {
      let selecter = document.selection.createRange().text;
      if (selecter != null && selecter.trim() != "") {
        return selecter;
      } else {
        return "";
      }
    } else {
      return "";
    }
  },
};
