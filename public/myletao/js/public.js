$(function () {
    // 恢复a链接的默认跳转
    $('body').on('tap', 'a', function () {
        mui.openWindow({
            url: $(this).attr('href')
        });
    });
});


// 获取地址栏中的参数
function getPrarmsByUrl(url, name) {
    var params = url.substr(url.indexOf('?') + 1);
    var param = params.split('&');
    for (var i = 0; i < param.length; i++) {
        var current = param[i].split('=');
        if (current[0] == name) {
            return current[1];
        }
    }

    return null;
}