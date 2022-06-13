<?php
if($_GET){

    /*
     *调用接口代码
     *
     **/
    require_once("../../API/qqConnectAPI.php");
    $qc = new QC();
    $ret = $qc->check_page_fans($_GET);

    echo "<meta charset='utf-8' />";
    if($ret['isfans']){
        echo "是认证空间{$_GET['page_id']}的粉丝";
    }else{
        echo "不是认证空间{$_GET['page_id']}的粉丝";
    }
    
}else{
    require_once("check_page_fans.html");
}
