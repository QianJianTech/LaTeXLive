let page_type = document.getElementById("common_config").dataset.pagetype;
let boot_body = Config[Environment].Boot_OSS;
let ver_body = Config[Environment].Version;
let js_body = Config[Environment].MainJS[page_type];

document.writeln("<link href='" + boot_body + "/lib/bootstrap-4.3.1-dist/css/bootstrap.min.css' rel='stylesheet' />");
document.writeln("<link href='" + boot_body + "/lib/font-awesome-4.7.0/Font-Awesome-master/css/font-awesome.min.css' rel='stylesheet' />");
document.writeln("  <div id='loading'>");
document.writeln("    <div id='loading-center'>");
document.writeln("      <div id='loading-center-absolute'>");
document.writeln("        <div id='loading-object'></div>");
document.writeln("      </div>");
document.writeln("    </div>");
document.writeln("  </div>");

document.head.removeChild(document.getElementById("common_05"));
