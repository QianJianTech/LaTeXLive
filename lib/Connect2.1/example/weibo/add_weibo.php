<?php

/*
 *调用接口代码
 *
 **/
require_once("../../API/qqConnectAPI.php");
$qc = new QC();

$_POST['img'] = urlencode($_POST['img']);
$ret = $qc->add_t($_POST);

?>
<meta charset="utf-8" />

<?php
if($ret['ret'] == 0){
    echo "成功";
}else{
    echo "失败";
}
