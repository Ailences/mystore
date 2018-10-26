$(function () {

    // 给注册按钮注册点击事件
    $('#register-btn').on('click', function () {

        // 获取用户注册信息
        var username = $('[name="username"]').val();
        var mobile = $('[name="mobile"]').val();
        var password = $('[name="password"]').val();
        var againpass = $('[name="againpass"]').val();
        var vCode = $('[name="vCode"]').val();

        // 对用户信息进行校验
        if (!username) {
            mui.toast("请输入用户名");
            return;
        }

        if (mobile.length < 11) {
            mui.toast("请输入正确的手机号");
            return;
        }

        if (password != againpass) {
            mui.toast("两次输入的密码不一致");
            return;
        }

        // 调用注册借口 实现注册功能
        $.ajax({
            url: '/user/register',
            type: 'post',
            data: {
                username: username,
                password: password,
                mobile: mobile,
                vCode: vCode
            },
            success: function (res) {
                alert("注册成功,即将前往登录页面");
                location.href = "./login.html";
            }

        })
    });

    // 获取认证码
    $('#getCode').on('click', function () {
        $.ajax({
            url: '/user/vCode',
            type: 'get',
            success: function (res) {
                console.log(res.vCode);
            }
        })
    })
});