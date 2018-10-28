$(function () {
    // 获取用户信息
    $.ajax({
        url: '/user/queryUser',
        type: 'get',
        data: {
            page: 1,
            pageSize: 10
        },
        success: function (res) {
            // console.log(res);
            var html = template('userTpl', res)
            // console.log(html)
            $('#user-box').html(html);
        }
    });


    // 管理用户状态
    $('#user-box').on('click', '.edit-btn', function () {
        // 用户当前状态
        // var del = $(this).data('isDelete');
        // console.log(del)
        var isDelete = parseInt($(this).attr('data-isDelete'));

        // 用户id
        var id = $(this).data('id');
        $.ajax({
            url: '/user/updateUser',
            type: 'post',
            data: {
                id: id,
                isDelete: isDelete ? 0 : 1
            },
            success: function (res) {
                // console.log(res)
                if (res.success) {
                    location.reload();
                }
            }
        })
    })
})