<?php

/*
 *调用接口代码
 *
 **/
require_once("../../API/qqConnectAPI.php");
$qc = new QC();
$arr = $qc->add_album($_POST);

?>
<meta charset="utf-8" />
<?php
if($arr['ret'] == 0){
    echo "创建成功,请到空间相册查看您的相册";
}else{
    echo "创建失败";
}
?>
