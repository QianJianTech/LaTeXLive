var headCommon = {
  init: function () {
    headCommon.loadingAnimate();
    if (document.getElementById("common_config").dataset.pagetype == "readme") {
      headCommon.preLoadMathJax();
    }
    headCommon.googleads();
    document.body.removeChild(document.getElementById("common_10"));
  },
  loadingAnimate: function () {
    document.writeln("<style>");
    document.writeln("    /* #region加载动画 */");
    document.writeln("    #loading {");
    document.writeln("      background-color: #337ab7;");
    document.writeln("      height: 100%;");
    document.writeln("      width: 100%;");
    document.writeln("      position: fixed;");
    document.writeln("      z-index: 1070;");
    document.writeln("      margin-top: 0;");
    document.writeln("      top: 0;");
    document.writeln("      opacity: 1;");
    document.writeln("    }");
    document.writeln("");
    document.writeln("    #loading-center {");
    document.writeln("      width: 100%;");
    document.writeln("      height: 100%;");
    document.writeln("      position: relative;");
    document.writeln("    }");
    document.writeln("");
    document.writeln("    #loading-center-absolute {");
    document.writeln("      position: absolute;");
    document.writeln("      left: 50%;");
    document.writeln("      top: 50%;");
    document.writeln("      height: 200px;");
    document.writeln("      width: 200px;");
    document.writeln("      margin-top: -100px;");
    document.writeln("      margin-left: -100px;");
    document.writeln("    }");
    document.writeln("");
    document.writeln("    #loading-object {");
    document.writeln("      width: 80px;");
    document.writeln("      height: 80px;");
    document.writeln("      background-color: #fff;");
    document.writeln("      -webkit-animation: animate 1s infinite ease-in-out;");
    document.writeln("      animation: animate 1s infinite ease-in-out;");
    document.writeln("      margin-right: auto;");
    document.writeln("      margin-left: auto;");
    document.writeln("      margin-top: 60px;");
    document.writeln("    }");
    document.writeln("");
    document.writeln("    @-webkit-keyframes animate {");
    document.writeln("      0% {");
    document.writeln("        -webkit-transform: perspective(160px);");
    document.writeln("      }");
    document.writeln("");
    document.writeln("      50% {");
    document.writeln("        -webkit-transform: perspective(160px) rotateY(-180deg);");
    document.writeln("      }");
    document.writeln("");
    document.writeln("      100% {");
    document.writeln("        -webkit-transform: perspective(160px) rotateY(-180deg) rotateX(-180deg);");
    document.writeln("      }");
    document.writeln("    }");
    document.writeln("");
    document.writeln("    @keyframes animate {");
    document.writeln("      0% {");
    document.writeln("        transform: perspective(160px) rotateX(0deg) rotateY(0deg);");
    document.writeln("        -webkit-transform: perspective(160px) rotateX(0deg) rotateY(0deg);");
    document.writeln("      }");
    document.writeln("");
    document.writeln("      50% {");
    document.writeln("        transform: perspective(160px) rotateX(-180deg) rotateY(0deg);");
    document.writeln("        -webkit-transform: perspective(160px) rotateX(-180deg) rotateY(0deg);");
    document.writeln("      }");
    document.writeln("");
    document.writeln("      100% {");
    document.writeln("        transform: perspective(160px) rotateX(-180deg) rotateY(-180deg);");
    document.writeln("        -webkit-transform: perspective(160px) rotateX(-180deg) rotateY(-180deg);");
    document.writeln("      }");
    document.writeln("    }");
    document.writeln("");
    document.writeln("    /* #endregion */");
    document.writeln("  </style>");
  },
  preLoadMathJax: function () {
    document.writeln("<script>");
    document.writeln("    window.MathJax = {");
    document.writeln("      options: {");
    document.writeln("        ignoreHtmlClass: 'ig',");
    document.writeln("        renderActions: {");
    document.writeln("          addMenu: [0, '', ''],");
    document.writeln("        },");
    document.writeln("      },");
    document.writeln("      tex: {");
    document.writeln("        packages: {");
    document.writeln("          '[+]': ['physics'],");
    document.writeln("        },");
    document.writeln("        inlineMath: [");
    document.writeln("          ['$', '$'],");
    document.writeln("          ['////(', '////)'],");
    document.writeln("        ],");
    document.writeln("      },");
    document.writeln("    };");
    document.writeln("  </script>");
    // document.writeln("  <script src='https://polyfill.io/v3/polyfill.min.js?features=es6'></script>");
    document.writeln("  <script id='MathJax-script' async src='https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml-full.js'></script>");
  },
  googleads: function () {
    if (Environment != "development") {
      document.writeln("  <script data-ad-client='ca-pub-4786420636728190' async");
      document.writeln("    src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>");
    }
  },
};
headCommon.init();
