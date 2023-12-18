<?php
header('content-type:text/html,charset="utf8"');
$Cno = $_POST['Cno'];
$link=mysqli_connect("localhost","root","admin123456");
if(!$link){
    echo "服务器忙，请重试";
    exit;
};
mysqli_set_charset($link,"utf8");
mysqli_select_db($link,"成绩_u202211923");
$sql="delete from course where Cno = '{$Cno}'";
$res =  mysqli_query($link,$sql);
if($res){
    echo "success";
}else{
    echo "error";
};
mysqli_close($link);
?>
