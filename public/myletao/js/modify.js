$(function () {
    // 修改密码

    // 给按钮注册点击事件
    $('#modify-btn').on('click', function () {
        // 收集用户输入数据
        // var origanPass = $('[name = "origanPass"]').val().trim();
        var origanPass = $.trim($('[name = "origanPass"]').val());
        var newPass = $.trim($('[name = "newPass"]').val());
        var againNewPass = $.trim($('[name = "againNewPass"]').val());
        var vCode = $.trim($('[name = "vCode"]').val());

        // 对数据进行校验
        if (!origanPass) {
            mui.toast("请输入原密码");
            return;
        }

        if (newPass != againNewPass) {
            mui.toast('两次输入的密码不一致');
            return;
        }

        // 调用接口 实现密码修改
        $.ajax({
            url: '/user/updatePassword',
            type: 'post',
            data: {
                oldPassword: origanPass,
                newPassword: newPass,
                vCode: vCode
            },
            success: function (res) {
                // console.log(res);
                if (res.success) {
                    mui.rotat('密码修改成功');

                    setTimeout(function () {
                        location.href = "./user.html"
                    }, 1000)
                }
            }
        });


    });
    // 获取认证码
    $('#getCode').on('click', function () {
        $.ajax({
            url: '/user/vCodeForUpdatePassword',
            type: 'get',
            success: function (res) {
                console.log(res.vCode);
            }
        })
    })
});