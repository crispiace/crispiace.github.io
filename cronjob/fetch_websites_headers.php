<?php
$lineToken = 'YOUR_LINE_NOTIFY_TOKEN'; // 替換成你的 LINE Notify 權杖

$sites = [
    "https://example1.com",
    "https://example2.com",
    // 繼續添加其他網站
];

foreach ($sites as $site) {
    $headers = @get_headers($site);
    if (!$headers || strpos($headers[0], '200') === false) {
        $message = "網站不可用: $site" . " [" . $headers[0] . "]";
        sendLineNotify($message);
        // 在這裡可以添加發送通知的邏輯
    } else {
        $message = "網站正常: $site" . " [" . $headers[0] . "]";
        sendLineNotify($message);
    }
}

function sendLineNotify($message)
{
    global $lineToken;
    $data    = http_build_query(['message' => $message]);
    $options = [
        'http' => [
            'header'  => [
                "Content-Type: application/x-www-form-urlencoded",
                "Authorization: Bearer $lineToken",
            ],
            'method'  => 'POST',
            'content' => $data,
        ],
    ];
    $context = stream_context_create($options);
    file_get_contents('https://notify-api.line.me/api/notify', false, $context);
}
