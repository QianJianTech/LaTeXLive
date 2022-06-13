export var mathjaxCore = {
  const_boot: "",
  arr_extend: [],
  obj_output: {},
  fn_refresh: function () {},
  init: function (opt) {
    mathjaxCore.const_boot = opt.const_boot;
    mathjaxCore.obj_output = opt.obj_output;
    mathjaxCore.fn_refresh = opt.fn_refresh;
    return mathjaxCore.init_mathjaxCore(mathjaxCore.arr_extend);
  },
  reinit: function () {
    mathjaxCore.init_mathjaxCore(mathjaxCore.arr_extend).then(function () {
      //   mathjaxCore.obj_output.render();
      mathjaxCore.fn_refresh();
    });
  },
  init_mathjaxCore: function (params) {
    let pro = new Promise(function (resolve, reject) {
      window.MathJax = {};
      /** MathJax核心库配置对象(默认) */
      window.MathJax = {
        options: {
          ignoreHtmlClass: "ig",
          renderActions: {
            addMenu: [0, "", ""],
          },
        },
        loader: {
          load: ["[tex]/color", "[tex]/require", "[tex]/boldsymbol"],
        },
        tex: {
          packages: {
            "[+]": ["color"],
            "[+]": ["boldsymbol"],
          },
          inlineMath: [
            ["$", "$"],
            ["\\(", "\\)"],
          ],
        },
        startup: {
          ready: () => {
            if (MathJax.version === "3.0.5") {
              const SVGWrapper = MathJax._.output.svg.Wrapper.SVGWrapper;
              const CommonWrapper = SVGWrapper.prototype.__proto__;
              SVGWrapper.prototype.unicodeChars = function (text, variant) {
                if (!variant) variant = this.variant || "normal";
                return CommonWrapper.unicodeChars.call(this, text, variant);
              };
            }
            // console.log("MathJax is loaded, but not yet initialized");
            MathJax.startup.defaultReady();
            // console.log("MathJax is initialized, and the initial typeset is queued");
            MathJax.startup.promise
              .then(() => {
                // console.log("MathJax initial typesetting complete");
                resolve();
              })
              .catch(() => {
                reject();
              });
          },
        },
      };
      if (params) {
        let len = params.length;
        for (let i = 0; i < len; i++) {
          if (params[i] == "ams") {
            window.MathJax.tex.tags = "ams";
          } else {
            window.MathJax.loader.load.push("[tex]/" + params[i]);
            window.MathJax.tex.packages["[+]"].push(params[i]);
          }
        }
      }
      let script_MJ = document.createElement("script");
      script_MJ.src = mathjaxCore.const_boot + "/lib/MathJax-master__/es5/tex-svg.js";
      document.body.appendChild(script_MJ);
    });
    return pro;
  },
};
