<?php
if($_POST){

    /*
     *调用接口代码
     *
     **/
    require_once("../../API/qqConnectAPI.php");
    $qc = new QC();
    $ret = $qc->add_pic_t($_POST);

    echo "<meta charset='utf-8' />";
    if($ret['ret'] == 0){
        echo "发表成功,请查看微博";
    }else{
        echo "发表失败，请开启调试查看原因";
    }
    
}else{
    //load view
    require_once("add_pic_t.html");
}
