<?php
if($_POST){

    /*
     *调用接口代码
     *
     **/
    require_once("../../API/qqConnectAPI.php");
    $qc = new QC();
    $ret = $qc->add_idol($_POST);

    echo "<meta charset='utf-8' />";
    if($ret['ret'] == 0){
        echo "收听成功,请查看微博";
    }else{
        echo "收听失败，请开启调试查看原因";
    }
    
}else{
    //load view
    require_once("add_idol.html");
}
