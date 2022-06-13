export var mapjson = {
    const_boot: "",
    init: function (opt) {
        mapjson.const_boot = opt.const_boot;
        return Promise.all([
            mapjson.getJSON("input"),
            mapjson.getJSON("theme"),
            mapjson.getJSON("autocomplete")
        ])
    },
    getJSON: function (jsontype) {
        let path = mapjson.const_boot + "/json/map_" + jsontype + ".json"
        let pro = new Promise(function (resolve, reject) {
            $.ajax({
                url: path,
                success: function (data) {
                    resolve(data);
                },
                error: function (err) {
                    reject(err);
                }
            })
        });
        return pro;
    }
}