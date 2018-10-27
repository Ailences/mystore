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
            // console.log(html);
            $('#addressBox').html(html);
        }
    });


    // 删除收货地址
    $('#addressBox').on('click', '.delete-btn', function () {
        // 获取要删除的地址对应的id
        var id = $(this).data('id');
        // var id = this.getAttribut\\e('data-id');
        // 获取对应的li 元素
        var li = $(this).parent().parent()[0];
        // var li = this.parentNode.parentNode;
        // console.log(li);

        mui.confirm('确认要删除吗?', function (message) {
            // console.log(message.index);
            if (message.index == 1) { // 确认删除
                $.ajax({
                    url: '/address/deleteAddress',
                    type: 'post',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        // 删除成功
                        if (res.success) {
                            // 重新加载页面
                            location.reload();
                        }
                    }
                })
            } else {
                // 取消删除
                // 关闭列表滑出效果
                mui.swipeoutClose(li);
            }

        })
    });

    // 编辑收货地址

    // 给编辑按钮注册点击事件
    $('#addressBox').on('click', '.edit-btn', function () {
        var id = $(this).data('id');
        // console.log(id);
        for (var i = 0; i < address.length; i++) {
            if (address[i].id == id) {
                localStorage.setItem('editAddres', JSON.stringify(address[i]));
                break;
            }
        }
        location.href = "./addAddress.html?isEdit=1"
    });

})