export class Eject {
  constructor() {
    var _this = this;
    // 全屏遮罩背景
    var qback = $('<div class="qback"></div>');
    // alert提示窗
    _this.Ealert = function (obj) {
      if (typeof obj.type == "undefined") {
        obj.type = "info";
      }
      if (typeof obj.title == "undefined") {
        obj.title = "提示";
      }
      if (typeof obj.message == "undefined") {
        obj.message = "是否要做些什么？";
      }
      if (typeof obj.okbtntext == "undefined") {
        obj.okbtntext = "确定";
      }
      var alertIcon = "";
      switch (obj.type) {
        case "success":
          alertIcon = "<span style='color:#28a745;font-size:25px;'><i class='fa fa-check-circle'></i></span>";
          break;
        case "danger":
          alertIcon = "<span style='color:#dc3545;font-size:25px;'><i class='fa fa-times-circle'></i></span>";
          break;
        case "warning":
          alertIcon = "<span style='color:#ffc107;font-size:25px;'><i class='fa fa-exclamation-circle'></i></span>";
          break;
        case "info":
          alertIcon = "<span style='color:#17a2b8;font-size:25px;'><i class='fa fa-info-circle'></i></span>";
          break;
        default:
          alertIcon = obj.type;
          break;
      }
      var alertBox = $('<div class="alertBox"></div>');
      var alertHead = $('<div class="alertHead">' + alertIcon + obj.title + "</div>");
      var alertMes = $('<div class="alertMes">' + obj.message + "</div>");
      var alertBtn = $('<span class="alertBtn">' + obj.okbtntext + "</span>").on("click", function () {
        qback.remove();
        alertBox.remove();
      });
      alertBox.append(alertHead);
      alertBox.append(alertMes);
      alertBox.append(alertBtn);
      qback.append(alertBox);
      $("body").append(qback);
      alertBox.css({ marginTop: -alertBox.outerHeight() / 2 + "px" });
    };
    // confirm弹窗
    (_this.Econfirm = function (obj) {
      if (typeof obj.type == "undefined") {
        obj.type = "info";
      }
      if (typeof obj.title == "undefined") {
        obj.title = "提示";
      }
      if (typeof obj.message == "undefined") {
        obj.message = "是否要做些什么？";
      }
      if (typeof obj.okbtntext == "undefined") {
        obj.okbtntext = "确认";
      }
      if (typeof obj.cancelbtntext == "undefined") {
        obj.cancelbtntext = "取消";
      }
      if (typeof obj.define == "undefined") {
        obj.define = function () {
          return true;
        };
      }
      if (typeof obj.cancel == "undefined") {
        obj.cancel = function () {
          return false;
        };
      }
      var confirmBox = $('<div class="alertBox"></div>');
      var confirmIcon = "";
      switch (obj.type) {
        case "success":
          confirmIcon = "<span style='color:#28a745;font-size:25px;'><i class='fa fa-check-circle'></i></span>";
          break;
        case "danger":
          confirmIcon = "<span style='color:#dc3545;font-size:25px;'><i class='fa fa-times-circle'></i></span>";
          break;
        case "warning":
          confirmIcon = "<span style='color:#ffc107;font-size:25px;'><i class='fa fa-exclamation-circle'></i></span>";
          break;
        case "info":
          confirmIcon = "<span style='color:#17a2b8;font-size:25px;'><i class='fa fa-info-circle'></i></span>";
          break;
        case "question":
          confirmIcon = "<span style='color:#6c757d;font-size:25px;'><i class='fa fa-question-circle'></i></span>";
          break;
        default:
          confirmIcon = obj.type;
          break;
      }
      var confirmHead = $('<div class="alertHead">' + confirmIcon + obj.title + "</div>");
      var confirmMes = $('<div class="alertMes">' + obj.message + "</div>");
      var confirmBtn = $('<button type="button" class="btn btn-primary ConBtn">' + obj.okbtntext + "</button>").on("click", function () {
        qback.remove();
        confirmBox.remove();
        setTimeout(function () {
          obj.define();
        }, 100);
      });
      var confirmcancel = $('<button type="button" class="btn btn-light cancel">' + obj.cancelbtntext + "</button>").on("click", function () {
        qback.remove();
        confirmBox.remove();
        setTimeout(function () {
          obj.cancel();
        }, 100);
      });
      confirmBox.append(confirmHead);
      confirmBox.append(confirmMes);
      confirmBox.append(confirmBtn);
      confirmBox.append(confirmcancel);
      qback.append(confirmBox);
      $("body").append(qback);
      confirmBox.css({ marginTop: -confirmBox.outerHeight() / 2 + "px" });
    }),
      (_this.Etoast = function (obj) {
        if (typeof obj.type == "undefined") {
          obj.type = "info";
        }
        if (typeof obj.message == "undefined") {
          obj.message = "提示些什么";
        }
        if (typeof obj.time == "undefined") {
          obj.time = 20;
        }
        let ico = "";
        switch (obj.type) {
          case "success":
            ico = "<i class='fa fa-check-circle'></i>";
            break;
          case "danger":
            ico = "<i class='fa fa-times-circle'></i>";
            break;
          case "warning":
            ico = "<i class='fa fa-exclamation-circle'></i>";
            break;
          case "info":
            ico = "<i class='fa fa-info-circle'></i>";
            break;
          default:
            ico = obj.type;
            break;
        }
        var timer = null;
        var ToastBox = $('<div class="ToastBox ToastBox-' + obj.type + '">' + ico + obj.message + "</div>");
        qback.append(ToastBox);
        $("body").append(qback);
        ToastBox.css({ marginTop: -ToastBox.outerHeight() / 2 + "px" });
        clearInterval(timer);
        timer = setInterval(function () {
          obj.time--;
          if (obj.time <= 0) {
            clearInterval(timer);
            qback.remove();
            ToastBox.remove();
          }
        }, 100);
      });
  }
}
