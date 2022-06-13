<?php
/*
 *调用接口代码
 *
 **/
require_once("../../API/qqConnectAPI.php");
$qc = new QC();
$setting = array(
    "reqnum" => 10,//请求获取的听众个数。取值范围为1-30。
    "startindex" => 0//开始
   );
$ret = $qc->get_fanslist($setting);

// show result
if($ret['ret'] == 0){
    echo "<meta charset='utf-8' />";
    require_once("get_fanslist.html");
}else{
    echo "<meta charset='utf-8' />";
    echo "获取失败，请开启调试查看原因";
}
