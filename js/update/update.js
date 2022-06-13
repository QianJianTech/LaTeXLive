export var update = {
  init: function (opt) {
    update.getUpdateJSON().then(function (data) {
      update.makeLog(data.update_log);      
    });
  },
  getUpdateJSON: function () {
    let path = Config[Environment].Boot_OSS + "/json/log_update.json";
    let pro = new Promise(function (resolve, reject) {
      $.ajax({
        url: path,
        success: function (data) {
          resolve(data);
        },
        error: function (err) {
          reject(err);
        },
      });
    });
    return pro;
  },
  makeLog: function (arr) {
    let wrap = document.getElementById("wrap-update-log");
    arr.forEach((el) => {
      let wrap_card = document.createElement("div");
      wrap_card.className = "col-md-6 log";
      let card = document.createElement("div");
      card.className = "card";
      let cheader = document.createElement("div");
      cheader.className = "card-header";
      let ver = document.createElement("h5");
      ver.className = "log-ver";
      ver.innerHTML = el.ver;
      let date = document.createElement("p");
      date.className = "log-date";
      date.innerHTML = el.date;
      let cbody = document.createElement("div");
      cbody.className = "card-body";
      let ul = document.createElement("ul");
      let changes = el.change;
      changes.forEach((cg) => {
        let li = document.createElement("li");
        li.innerHTML = cg;
        ul.appendChild(li);
      });
      cbody.appendChild(ul);
      cheader.appendChild(ver);
      cheader.appendChild(date);
      card.appendChild(cheader);
      card.appendChild(cbody);
      wrap_card.appendChild(card);
      wrap.appendChild(wrap_card);
    });
  },
};
