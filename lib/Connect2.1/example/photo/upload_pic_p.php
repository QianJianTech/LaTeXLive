<?php


/*
 *调用接口代码
 *
 **/
require_once("../../API/qqConnectAPI.php");

$qc = new QC();
$arr = $qc->upload_pic($_POST);

print_r($arr);

echo '<meta charset="utf-8" />';
if($arr['ret'] == 0){
    echo "上传成功";
}else{
    echo "失败";
}
?>
