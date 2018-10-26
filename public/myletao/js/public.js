$(function () {
    // 恢复a链接的默认跳转
    $('body').on('tap','a',function () {
        mui.openWindow({
            url: $(this).attr('href')
        });
    });
});