export var highlight = {
  isOpenCodeHighLight: true,
  obj_element: {},
  init: function (opt) {
    highlight.obj_element = opt.obj_element;
    $(highlight.obj_element.el_input).scroll(function () {
      highlight.asyncScroll();
    });
    this.textareaToDiv();
  },
  /** 同步input框内容到代码高亮的div */
  textareaToDiv: function () {
    if (highlight.isOpenCodeHighLight) {
      let temp = highlight.obj_element.el_input.value;
      temp = temp
        .replace(/\n$/g, "_65a5ba9e52a3761bd68eb531e9794ae12c1d34c167f071a6b239c855b5cf57b2") //最后一个换行符
        .replace(/\n/g, "_dafd41284316e72de3a0b07bd1262cd142151708353024244238eec3699e22ae") //普通换行符
        .replace(/\s/g, "_e613de3e0d3b707ade3d6a289abbab35c67d4476dc12211865d70a493d7e144c") //空格
        .replace(/(\+|-|\*|\/|=|>|<|!|\^|\(|\)|%)/g, '<span style="color: SeaGreen;" class="hl">$1</span>')
        .replace(/(\\{2})/g, '<span style="color: orange;" class="hl">$1</span>')
        .replace(/(\\[a-zA-Z]+)/g, '<span style="color: #008de9;" class="hl">$1</span>')
        .replace(/<span style="color: #008de9;" class="hl">(\\begin|\\end)<\/span>/g, '<span style="color:orange;" class="hl">$1</span>')
        .replace(/([{}])/g, '<span style="color: #608b4e;" class="hl">$1</span>')
        .replace(/_dafd41284316e72de3a0b07bd1262cd142151708353024244238eec3699e22ae/g, "<br>")
        .replace(/_e613de3e0d3b707ade3d6a289abbab35c67d4476dc12211865d70a493d7e144c/g, "&nbsp;")
        .replace(/_65a5ba9e52a3761bd68eb531e9794ae12c1d34c167f071a6b239c855b5cf57b2/g, "<br><span style='color:rgba(0,0,0,0);'>_</span>");
      highlight.obj_element.el_copydiv.innerHTML = temp;
      highlight.asyncScroll();
    }
  },
  /** 同步input框和代码高亮div的滚动条 */
  asyncScroll: function () {
    $(highlight.obj_element.el_copydiv).scrollLeft($(highlight.obj_element.el_input).scrollLeft());
    $(highlight.obj_element.el_copydiv).scrollTop($(highlight.obj_element.el_input).scrollTop());
  },
};
