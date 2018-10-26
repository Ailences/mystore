// 保存用户信息
var userInfo = null;

$.ajax({
    url: '/user/queryUserMessage',
    type: 'get',

    async: false,
    success: function (res) {
        // console.log(res);
        if (res.error && res.error == 400) {
            location.href = './login.html'
        }
        userInfo = res;
    }
})

$(function () {
    // 退出登录

    // 给退出按钮注册事件
    $('#logout').on('click', function () {
        // 调用接口 退出登录
        $.ajax({
            url: '/user/logout',
            type: 'get',
            success: function (res) {
                // console.log(res);
                if (res.success) {
                    mui.toast("退出登录成功");
                    setTimeout(function () {
                        location.href = "./index.html";
                    }, 1000);
                }
            }
        })
    })


    // 将用户信息加载到页面
    var html = template('userInfo', userInfo);
    $('#userInfoBox').html(html);
});