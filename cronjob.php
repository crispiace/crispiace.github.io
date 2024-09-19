<?php

curl_sample();

function curl_sample($httpheader = '', $postfields = '')
{
    // $cookie_jar = 'c:/cookie.txt' ;

    // 建立 curl 連線
    $ch = curl_init();

    // 設定擷取的 URL 網址
    curl_setopt($ch, CURLOPT_URL, "https://example.com/cronjob/fetch_websites.php");
    curl_setopt($ch, CURLOPT_HEADER, false);

    // 將 curl_exec() 獲取的訊息以文件流的形式返回，而不是直接輸出
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_jar);
    // curl_setopt($ch, CURLOPT_NOBODY, false); //true忽略內容


    if ($httpheader) {
        $httpheader1 = "application/x-www-form-urlencoded";
        $httpheader2 = "Authorization: Bearer $access_token";

        curl_setopt($ch, CURLOPT_HTTPHEADER, array($httpheader));
    }

    if ($postfields) {
        // 設定要傳的參數
        $postfields1 = "a=abc&b=def";
        $postfields2 = array('a' => 'abc', 'b' => 'def');

        // 設定 CURLOPT_POST 為 true
        // curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
        // CURLOPT_POSTFIELDS 後面則是要傳接的 POST 資料
        curl_setopt($ch, CURLOPT_POSTFIELDS, $postfields);
    }

    // 執行
    $temp = curl_exec($ch);

    // echo '<pre>';
    // echo strip_tags($temp);
    // echo '</pre>';

    // 關閉 curl 連線
    curl_close($ch);
}