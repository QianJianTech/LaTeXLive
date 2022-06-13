export var output = {
  obj_element: {},
  obj_common: {},

  emptyPath: "",
  svgSource: "", //供下载的svg元素
  svgSurce_size: [], //供下载的svg元素的宽和高（原始）

  init: function (opt) {
    output.obj_element = opt.obj_element;
    output.obj_common = opt.obj_common;
    output.emptyPath = opt.const_boot + "/img/empty1.png";
    output.obj_element.el_output.style.backgroundImage = "url(" + output.emptyPath + ")";
    if (output.obj_common.isMac()) { output.scrollForMAC(); }
    output.render();
  },
  /** 渲染mathjax预览 */
  render: function () {
    if (output.obj_element.el_input.value.trim() == "") {
      output.obj_element.el_output.style.backgroundImage = "url(" + output.emptyPath + ")";
      output.obj_element.el_output.innerHTML = "";
      output.svgSource = "";
      output.svgSurce_size = [];
      return;
    } else {
      output.obj_element.el_output.style.backgroundImage = "none";
    }
    try {
      output.toMathjax();
      output.getVirtualEl();
    }
    catch (err) {
      output.obj_element.el_output.innerHTML = "";
      output.svgSource = "";
      output.svgSurce_size = [];
      console.log("渲染内容非法");
    }
  },
  /** 文本转Mathjax并填充页面元素 */
  toMathjax: function () {
    let _input = output.obj_element.el_input.value;
    let _output = output.obj_element.el_output;
    _output.innerHTML = "";
    MathJax.texReset();
    let options = MathJax.getMetricsFor(_output);
    options.display = true;
    MathJax.tex2svgPromise(_input, options)
      .then(function (node) {
        _output.innerHTML = "";
        _output.appendChild(node);
      })
      .catch(function (err) {
        console.log(err);
      });
  },
  /** 文本转svg并填充虚拟元素 */
  getVirtualEl: function () {
    let _input = output.obj_element.el_input.value;
    let options = {};
    let node = MathJax.tex2svg(_input, options);
    let elsvg = node.firstElementChild;
    output.svgSurce_size[0] = elsvg.width.animVal.valueAsString;
    output.svgSurce_size[1] = elsvg.height.animVal.valueAsString;
    elsvg.removeAttribute("style");
    elsvg.removeAttribute("focusable");
    elsvg.removeAttribute("role");
    output.svgSource = elsvg;
  },
  /** 输出框对苹果电脑滚动条的优化 */
  scrollForMAC: function () {
    let el = output.obj_element.el_output;
    if (output.obj_common.isMac()) {
      el.classList.add("scroll-formac");
    }
  },
};
