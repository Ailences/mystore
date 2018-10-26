$(function () {
    // 给登录按钮注册点击事件
    $('#login-btn').on('click', function () {
        var username = $.trim($('[name="username"]').val());
        var password = $.trim($('[name="password"]').val());
        // 判断是否输入用户信息
        if (!username) {
            mui.toast('请输入用户名');
            
            return;
        }

        if (!password) {
            mui.toast('请输入密码');
            return;
        }

        // 调用借口
        $.ajax({
            url: '/user/login',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            beforeSend: function () {
                $('#login-btn').html('正在登录...');
            },
            success: function (res) {
                mui.toast("登录成功");
                $('#login-btn').html('登录');

                // 延时跳转=
                setTimeout(function () {
                    location.href = "./user.html";
                }, 1000);
            }
        })
    })
})