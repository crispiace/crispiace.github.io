<?php
$lineToken = 'YOUR_LINE_NOTIFY_TOKEN'; // 替換成你的 LINE Notify 權杖

// 讀取網站清單
$sites = file('sites.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$site_err = [];
foreach ($sites as $site) {
    $status = checkWebsite($site);

    if ($status === 200) {
        $message = "網站正常: $site" . " [" . $status . "]\n";
        // sendLineNotify($message);
    } else {
        $message = "網站不可用: $site" . " [" . $status . "]\n";
        $site_err[] = $message;
        // sendLineNotify($message);
        // 在這裡可以添加發送通知的邏輯
    }
}

if(count($sites)==0){
    sendLineNotify('沒有取得網站清單.');
}elseif(count($site_err) > 0) {
    sendLineNotify(implode(',',$site_err));
}else{
    sendLineNotify('網站都很健康!');
}
// print_r($site_err);

function sendLineNotify($message)
{
    global $lineToken;
    $data = http_build_query(['message' => $message]);
    $ch   = curl_init("https://notify-api.line.me/api/notify");
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/x-www-form-urlencoded',
        'Authorization: Bearer ' . $lineToken,
    ));
    $result   = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
}

function checkWebsite($url) {
    // 嘗試 HTTPS 檢查
    $httpCode = performCheck($url);

    // 如果 HTTPS 檢查失敗，則嘗試 HTTP 檢查
    if ($httpCode !== 200) {
        // 將 URL 轉換為 HTTP
        $httpUrl = str_replace('https://', 'http://', $url);
        $httpCode = performCheck($httpUrl);
    }

    return $httpCode;
}

function performCheck($url) {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_NOBODY, true); // 只獲取標頭
    curl_setopt($ch, CURLOPT_TIMEOUT, 10); // 設定超時
    // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // 忽略 SSL 驗證（如需要）
    // curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0'); // 如果需要，可以添加 User-Agent 標頭

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    if (curl_errno($ch)) {
        $httpCode = 'Curl error: ' . curl_error($ch) . "\n";
    }

    curl_close($ch);

    return $httpCode;
}
