// 查询用户登录信息
$.ajax({
    url: '/employee/checkRootLogin',
    type: 'get',
    // 同步
    async: false,
    success: function (res) {
        // 如果登录强制跳转到user.html
        if (res.success) {
            location.href = "./user.html"
        }
    }
});

// 登录功能
$(function () {
    $('#login-btn').on('click', function () {
        // 获取用户输入信息
        var username = $.trim($('[name = "username"]').val());
        var password = $.trim($('[name = "password"]').val());
        if (!username) {
            alert('请输入用户名');
            return;
        }
        if (!password) {
            alert('请输入密码');
            return;
        }
        $.ajax({
            url: '/employee/employeeLogin',
            type: 'post',
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                // console.log(res)
                if (res.success) {
                    location.href = "./user.html";
                } else {
                    alert(res.message);
                }
            }
        })
    })

})