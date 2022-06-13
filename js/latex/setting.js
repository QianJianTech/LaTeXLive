export var setting = {
  obj_element: {},
  obj_theme: {},
  obj_highlight: {},
  obj_autocomplete: {},
  obj_flat: {},
  obj_mathjaxCore: {},
  map_setting: {},
  map_word: {},
  map_theme: {},
  localData: {
    theme: "default",
    preference: {
      highlight: true,
      autocomplete: true,
      flat: false,
    },
    extend: [],
  },
  fn_refresh: function () {},
  init: function (opt) {
    setting.obj_element = opt.obj_element;
    setting.obj_theme = opt.obj_theme;
    setting.obj_highlight = opt.obj_highlight;
    setting.obj_autocomplete = opt.obj_autocomplete;
    setting.obj_flat = opt.obj_flat;
    setting.obj_mathjaxCore = opt.obj_mathjaxCore;
    setting.map_setting = opt.map_all[0].setting;
    setting.map_word = opt.map_all[0].word;
    setting.map_theme = opt.map_all[1].root;
    setting.fn_refresh = opt.fn_refresh;
    setting.getLocalStorageSetting();
    setting.init_theme();
    setting.init_prefrence();
    setting.init_extend();
    setting.obj_element.el_settingbtn.onclick = function () {
      setting.screenModalShow("25%");
      $("#autocomplete-menu").remove();
    };
    setting.obj_element.el_settingmask.onclick = function () {
      setting.screenModalHide();
    };
  },
  init_theme: function () {
    let el = document.createElement("div");
    el.className = "container";
    el.id = "wrap_setting_theme";
    el.style.marginTop = "0rem";
    el.style.padding = "1rem";
    el.className = "container radio-beauty-container";
    //绘制主题设置区
    let p = document.createElement("p");
    p.innerHTML = setting.map_word.setting.theme;
    let divider = document.createElement("div");
    divider.className = "dropdown-divider";
    el.appendChild(p);
    el.appendChild(divider);
    //获取主题根
    let cls = setting.map_theme;
    let themes = [];
    //获得主题列表
    for (var prop in cls) {
      themes.push(cls[prop]);
    }
    let len = themes.length;
    for (let i = 0; i < len; i++) {
      let group = document.createElement("div");
      group.className = "form-group";
      let lb = document.createElement("label");
      lb.dataset.val = themes[i].themename;
      let sp = document.createElement("span");
      sp.className = "radio-theme";
      sp.innerHTML = themes[i].themedescript;
      let ipt = document.createElement("input");
      ipt.type = "radio";
      ipt.className = "radios-theme";
      ipt.name = "themeradio";
      ipt.id = "radio-" + themes[i].themename;
      ipt.hidden = true;
      let lbfor = document.createElement("label");
      lbfor.htmlFor = ipt.id;
      lbfor.className = "radio-beauty";
      lb.appendChild(ipt);
      lb.appendChild(lbfor);
      lb.appendChild(sp);
      group.appendChild(lb);
      el.appendChild(group);
      ipt.onclick = function () {
        let currenttheme = lb.dataset.val;
        setting.obj_theme.currentTheme = currenttheme;
        setting.obj_theme.reinit();
        setting.localData.theme = currenttheme;
        setting.setLocalStorageSetting();
      };
    }
    setting.obj_element.el_setting.appendChild(el);
    //按照本地存储设置主题区状态
    let currenttheme = setting.localData.theme;
    document.getElementById("radio-" + currenttheme).checked = true;
    setting.obj_theme.currentTheme = currenttheme;
  },
  init_prefrence: function () {
    let wrap = document.createElement("div");
    wrap.className = "container";
    wrap.id = "wrap_setting_prefrence";
    //绘制偏好设置区
    let p = document.createElement("p");
    p.innerHTML = setting.map_word.setting.prefrence;
    let divider = document.createElement("div");
    divider.className = "dropdown-divider";
    wrap.appendChild(p);
    wrap.appendChild(divider);
    let makecheck = function (name, descript, obj, fd, fn) {
      let fmgroup = document.createElement("div");
      fmgroup.className = "form-group";
      let check = document.createElement("input");
      check.className = "switch";
      check.type = "checkbox";
      check.value = name;
      check.id = "check_" + name;
      let lb = document.createElement("label");
      lb.htmlFor = check.id;
      lb.innerHTML = descript;
      fmgroup.appendChild(check);
      fmgroup.appendChild(lb);
      wrap.appendChild(fmgroup);
      check.onclick = function () {
        obj[fd] = check.checked;
        fn(check.checked);
        setting.localData.preference[name] = check.checked;
        setting.setLocalStorageSetting();
      };
    };
    makecheck("highlight", setting.map_word.setting.prefrences.highlight, setting.obj_highlight, "isOpenCodeHighLight", function (ishl) {
      setting.obj_theme.isOpenCodeHighLight = ishl;
      setting.obj_theme.reinit();
      setting.fn_refresh();
    });
    makecheck("autocomplete", setting.map_word.setting.prefrences.autocomplete, setting.obj_autocomplete, "isOpenAutocomplete", function () {});
    makecheck("flat", setting.map_word.setting.prefrences.flat, setting.obj_flat, "isOpenFlat", function () {
      setting.obj_flat.reinit();
    });
    setting.obj_element.el_setting.appendChild(wrap);
    //按照本地存储设置偏好区状态
    let hl = setting.localData.preference.highlight;
    let ac = setting.localData.preference.autocomplete;
    let fl = setting.localData.preference.flat;
    let setcheck = function (name, bool, obj, fd) {
      document.getElementById("check_" + name).checked = bool;
      obj[fd] = bool;
    };
    setcheck("highlight", hl, setting.obj_highlight, "isOpenCodeHighLight");
    setcheck("autocomplete", ac, setting.obj_autocomplete, "isOpenAutocomplete");
    setcheck("flat", fl, setting.obj_flat, "isOpenFlat");
  },
  init_extend: function () {
    let wrap = document.createElement("div");
    wrap.className = "container";
    wrap.id = "wrap_setting_extend";
    //绘制扩展设置区
    let p = document.createElement("p");
    p.innerHTML = setting.map_word.setting.extend;
    let divider = document.createElement("div");
    divider.className = "dropdown-divider";
    wrap.appendChild(p);
    wrap.appendChild(divider);
    let cls = setting.map_setting.cont;
    let len = cls.length;
    for (let i = 0; i < len; i++) {
      let fmgroup = document.createElement("div");
      fmgroup.className = "form-group";
      let check = document.createElement("input");
      check.className = "switch";
      check.type = "checkbox";
      check.value = cls[i].name;
      check.id = "check_" + cls[i].name;
      check.onclick = function () {
        let arr = [];
        let checks = wrap.getElementsByTagName("input");
        let lencks = checks.length;
        for (let i = 0; i < lencks; i++) {
          if (checks[i].checked) {
            arr.push(checks[i].value);
          }
        }
        setting.obj_mathjaxCore.arr_extend = arr;
        setting.obj_mathjaxCore.reinit();
        setting.localData.extend = arr;
        setting.setLocalStorageSetting();
      };
      let lb = document.createElement("label");
      lb.htmlFor = check.id;
      lb.innerHTML = cls[i].descript;
      fmgroup.appendChild(check);
      fmgroup.appendChild(lb);
      wrap.appendChild(fmgroup);
    }
    setting.obj_element.el_setting.appendChild(wrap);
    //按照本地存储设置扩展区状态
    let checks = wrap.getElementsByTagName("input");
    let lencks = checks.length;
    let arr = setting.localData.extend;
    let arrlen = arr.length;
    for (let m = 0; m < lencks; m++) {
      for (let n = 0; n < arrlen; n++) {
        if (checks[m].value == arr[n]) {
          checks[m].checked = true;
        }
      }
    }
    setting.obj_mathjaxCore.arr_extend = arr;
  },
  screenModalShow: function (width) {
    setting.obj_element.el_setting.style.display = "block";
    setting.obj_element.el_setting.classList.add("screenmodal-open");
    setting.obj_element.el_setting.style.width = width;
    setting.obj_element.el_settingmask.style.display = "block";
  },
  screenModalHide: function () {
    setting.obj_element.el_setting.classList.remove("screenmodal-open");
    setting.obj_element.el_setting.classList.add("screenmodal");
    setting.obj_element.el_settingmask.style.display = "none";
  },
  getLocalStorageSetting: function () {
    let keyname = "setting";
    if (localStorage.hasOwnProperty(keyname)) {
      let localdata_str = localStorage.getItem(keyname);
      setting.localData = JSON.parse(localdata_str);
    }
  },
  setLocalStorageSetting: function () {
    let keyname = "setting";
    let localdata_str = JSON.stringify(setting.localData);
    localStorage.setItem(keyname, localdata_str);
  },
};
