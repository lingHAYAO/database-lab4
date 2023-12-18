<?php

header("content-type:text/html,charset='utf8'");
$link = mysqli_connect("localhost","root","admin123456");
if(!$link){
    echo "服务器忙，请稍后重试";
    exit;
};
mysqli_set_charset($link,"utf8");
mysqli_select_db($link,"成绩_u202211923");
$sql ="select * from sc";
$res = mysqli_query($link, $sql);

if ($res) {
    // 初始化一个空数组来存储所有行数据
    $data = array();

    // 使用 while 循环获取每一行数据
    while ($row = mysqli_fetch_assoc($res)) {
        // 将每一行数据添加到数组中
        $data[] = $row;
    }

    // $data 现在包含了查询结果中的所有行数据
    echo json_encode($data);
} else {
    // 查询失败
    echo "error";
}


mysqli_close($link);
?>
