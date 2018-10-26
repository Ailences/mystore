$(function () {


    // 存储用户地址
    var address = null;
    // 获取用户存储的地址
    $.ajax({
        url: '/address/queryAddress',
        type: 'get',
        success: function (res) {
            // console.log(res);
            address = res;

            var html = template('addressTpl', {
                result: res
            });
            console.log(html);
            $('#addressBox').html(html);
        }
    })
})