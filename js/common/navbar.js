export var navbar = {
  obj_api: {},
  pageType: "home",
  currentTheme: "default",
  init: function (opt) {
    navbar.obj_api = opt.obj_api;
    navbar.pageType = opt.pageType;
    navbar.init_background();
    navbar.init_navLink();
    navbar.bindEvent();
  },

  /** 初始化导航栏背景 */
  init_background: function () {
    $(".navbar").css("background-color", "rgba(0,0,0,0.05)");
    $(".nav-link").css("color", "#000000");
  },

  /** 初始化选中链接样式 */
  init_navLink: function () {
    if (navbar.pageType != "home") {
      let el = navbar.getNavLinkElement();
      $(el).css("background-color", "#ddd");
    }
  },

  /** 绑定事件 */
  bindEvent: function () {
    $("#a-logout").click(function () {
      navbar.obj_api.removeMyTokenFromLocal();
      window.location.href = "../home";
    });
  },

  /** 获取当前导航栏选中链接元素 */
  getNavLinkElement: function () {
    switch (navbar.pageType) {
      case "readme":
        return document.getElementById("btn_help");
      case "update":
        return document.getElementById("btn_update");
      case "login":
        return document.getElementById("btn_href_login");
      case "personal":
        return document.getElementById("a-login-ed");
    }
  },

  /** 获取当前导航栏选中链接样式 */
  getStyleOfNavLink: function () {
    if (navbar.pageType != "home") {
      return [
        { key: "background-color", val: "#ddd" },
        { key: "border", val: "none" },
      ];
    }
    switch (navbar.currentTheme) {
      case "default":
        return [
          { key: "background-color", val: "#ddd" },
          { key: "border", val: "none" },
        ];
      case "dark":
        return [
          { key: "background-color", val: "#363636" },
          { key: "border", val: "none" },
        ];
      case "blue":
        return [
          { key: "background-color", val: "#9cc2e2" },
          { key: "border", val: "none" },
        ];
      case "pink":
        return [
          { key: "background-color", val: "#ddb9dd" },
          { key: "border", val: "none" },
        ];
      case "simple":
        return [
          { key: "background-color", val: "#fff" },
          { key: "border", val: "1px solid #000" },
          { key: "border-radius", val: "2px" },
        ];
    }
  },

  /** 获取当前主题 */
  getCurrentTheme: function () {
    let keyname = "setting";
    if (localStorage.hasOwnProperty(keyname)) {
      let localdata_str = localStorage.getItem(keyname);
      let localdata_obj = JSON.parse(localdata_str);
      navbar.currentTheme = localdata_obj.theme;
    }
  },
};
