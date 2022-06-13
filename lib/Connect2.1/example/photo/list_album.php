<?php

/*
 *调用接口代码
 *
 **/
require_once("../../API/qqConnectAPI.php");
$qc = new QC();
$arr = $qc->list_album();

?>
<meta charset="utf-8" />
<?php
foreach($arr['album'] as $v){
?>
    <div style="float:left;width:300px;height:400px;">
        <div>
            <img src="<?=$v['coverurl']?>" style="width:150px;height:150px;" />
        </div>
        <ul>
            <li>名称  <?=$v['name']?></li>
            <li>albumid <?=$v['albumid']?></li>
            <li>classid <?=$v['classid']?></li>
            <li>简介  <?=$v['desc']?></li>
            <li>创作时间  <?=date("Y-m-d",$v['createtime'])?></li>
            <li>图片数量 <?=$v['picnum']?></li>
        </ul>
    </div>
        

<?php
}
?>
