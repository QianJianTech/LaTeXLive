<?php

/*
 *调用接口代码
 *
 **/
require_once("../../API/qqConnectAPI.php");
$qc = new QC();
$_POST['title'] = urlencode($_POST['title']);
$_POST['title'] = urlencode($_POST['content']);

$ret = $qc->add_one_blog($_POST);
?>
<meta charset="utf-8" />

<?php
if($ret['ret'] == 0){
    echo "成功";
}else{
    echo "失败";
}
