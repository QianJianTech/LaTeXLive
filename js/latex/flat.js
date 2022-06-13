export var flat = {
  obj_element: {},
  isOpenFlat: false,
  init: function (opt) {
    flat.obj_element = opt.obj_element;
    if (flat.isOpenFlat && document.body.clientWidth > 1700) {
      flat.addClass(flat.obj_element.el_flat_container, "container-fluid");
      flat.addClass(flat.obj_element.el_flat_row, "row");
      flat.addClass(flat.obj_element.el_flat_col, "col-xl-6");
      // flat.obj_element.el_flat_header_container.setAttribute("class", "container-fluid");
    }
    $(window).resize(function () {
      flat.reinit();
    });
  },
  reinit: function () {
    if (flat.isOpenFlat && document.body.clientWidth > 1700) {
      flat.addClass(flat.obj_element.el_flat_container, "container-fluid");
      flat.addClass(flat.obj_element.el_flat_row, "row");
      flat.addClass(flat.obj_element.el_flat_col, "col-xl-6");
      // flat.obj_element.el_flat_header_container.setAttribute("class", "container-fluid");
    } else {
      flat.removeClass(flat.obj_element.el_flat_container, "container-fluid");
      flat.removeClass(flat.obj_element.el_flat_row, "row");
      flat.removeClass(flat.obj_element.el_flat_col, "col-xl-6");
      // flat.obj_element.el_flat_header_container.setAttribute("class", "container");
    }
  },
  addClass: function (els, classname) {
    els.forEach((el) => {
      el.classList.add(classname);
    });
  },
  removeClass: function (els, classname) {
    els.forEach((el) => {
      el.classList.remove(classname);
    });
  },
};
