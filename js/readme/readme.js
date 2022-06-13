export var readme = {
  el: {},
  init: function (opt) {
    readme.el = opt.el;
    readme.makeDir();
  },
  makeDir: function () {
    let toc = readme.el.tocDoc;
    toc.innerHTML = "";
    let padding = [1, 3, 5, 7, 9];
    $(readme.el.readmeWrap)
      .find("h3,h4,h5")
      .each(function (index) {
        let nm = document.createElement("a");
        nm.name = "d" + index;
        $(nm).insertBefore($(this));
        let headerText = $(this).text();
        let tagName = $(this)[0].tagName.toLowerCase();
        let tagIndex = parseInt(tagName.charAt(1)) - 1;
        let style = " style='padding-left:" + padding[tagIndex] + "rem;color:#3c72ca;display:block;'>";
        $(toc).append($("<a href='#d" + index + "'" + style + headerText + "</a>"));
      });
  },
};
