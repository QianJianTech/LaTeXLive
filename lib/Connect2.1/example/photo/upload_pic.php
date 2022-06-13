<?php
/*
 *调用接口代码
 *
 * */
require_once("../../API/qqConnectAPI.php");

$qc = new QC();
$arr = $qc->list_album();
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>TEST UPLOAD PIC</title>
</head>

<body>
<form action="upload_pic_p.php" method="post" enctype="multipart/form-data">
    <input type="hidden" name="photodesc" value="test" /><br />
经度<input type="text" name="x" value="1" /><br />
纬度<input type="text" name="y" value="1" /><br />
相册ID：<select name='albumid'>
<?php
foreach($arr['album'] as $v){
?>
<option  value="<?=$v['albumid']?>"><?=$v['name']?></option>
<?php } ?>
</select>
<input type="hidden" name="format" value="json"/><br />
<input type="hidden" name="title" value="test" /><br />
<input type="file" name="picture" /><br />
<input type="submit" value="提交"/><br />
</form>
</body>
</html>
