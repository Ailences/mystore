$(function () {
    var isEdit = parseInt(getPrarmsByUrl(location.href, 'isEdit'));
    console.log(isEdit);
    if (isEdit) {
        // 编辑收货地址
        $('.mui-title').html('编辑收货地址');

        if (localStorage.getItem('editAddres')) {
            var address = JSON.parse(localStorage.getItem('editAddres'));

            var html = template('editTpl', address);
            // console.log(html)
            $('#editForm').html(html);
        }
    } else {
        // 添加操作
        var html = template('editTpl', {});

        $('#editForm').html(html);
    }

    // 添加省市区选择组件

    // 创建picker选择器
    var picker = new mui.PopPicker({
        layer: 3
    });
    // 为picker选择器添加数据
    picker.setData(cityData);
    // 点击是触发picker选择器
    $('#selectCity').on('click', function () {
        // 显示picker选择器
        picker.show(function (selectItems) {
            $('#selectCity').val(selectItems[0].text + selectItems[1].text + selectItems[2].text)
        });
    });


    // 添加收货地址
    $('#addAddress').on('click', function () {
        // 获取用户输入数据
        var username = $.trim($('[name = "username"]').val());
        var postCode = $.trim($('[name = "postCode"]').val());
        var city = $.trim($('[name = "city"]').val());
        var detailAddr = $.trim($('[name = "detailAddr"]').val());

        // 校验数据
        if (!username) {
            mui.toast('请输入收货人姓名');
            return;
        }
        if (!postCode) {
            mui.toast('请输入邮政编码');
            return;
        }
        if (!city) {
            mui.toast('请选择省市区');
            return;
        }
        if (!detailAddr) {
            mui.toast('请输入详细地址');
            return;
        }

        var data = {
            address: city,
            addressDetail: detailAddr,
            recipients: username,
            postcode: postCode
        }

        if (isEdit) {
            // 编辑
            var url = '/address/updateAddress';
            data.id = address.id;
        } else {
            var url = '/address/addAddress';
        }

        // 调用接口 添加收货地址
        $.ajax({
            url: url,
            type: 'post',
            data: data,
            success: function (res) {
                // console.log(res);
                // alert(1)
                if (res.success) {
                    if (isEdit) {
                        // 编辑
                        mui.toast('地址编辑成功');
                    } else {
                        mui.toast('地址修改成功');
                    }
                    setTimeout(function () {
                        location.href = "./address.html"
                    }, 1000)
                }
            }
        })
    })

})