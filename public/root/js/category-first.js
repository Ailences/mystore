$(function () {
    // 设置初始数据
    var page = 1;
    var pageSize = 8;
    var totalPage = 0;
    // 默认加载第一页数据
    getData();

    // 上一页
    $('#prve-btn').on('click', function () {
        // alert(1)
        page--;
        if (page < 1) {
            page = 1;
            alert('已经是第一页了');
            return;
        }
        getData();
    });

    // 下一页
    $('#next-btn').on('click', function () {
        page++;
        if (page > totalPage) {
            page = totalPage;
            alert('已经是最后一页了');
            return;
        }
        getData();
    });


    // 添加一级分类
    $('#save').on('click', function () {
        var firstName = $('[name = "firstName"]').val().trim();
        // 校验分类名
        if (!firstName) {
            alert('请输入一级分类名称');
            return;
        }
        $.ajax({
            url: '/category/addTopCategory',
            type: 'post',
            data: {
                categoryName: firstName
            },
            success: function (res) {
                console.log(res);
                if (res.success) {
                    location.reload();
                } else {
                    alert(res.message);
                }
            }
        })
    })


    // 获取一级分类信息
    function getData() {
        $.ajax({
            url: '/category/queryTopCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                // console.log(res);
                totalPage = Math.ceil(res.total / pageSize);
                var html = template('categoryFirstTpl', res);
                $('#categoryFirstBox').html(html);
            }
        })
    }
});