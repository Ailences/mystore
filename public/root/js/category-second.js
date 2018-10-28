$(function () {
    // 初始设置
    var page = 1;
    var pageSize = 8;
    var totalPage = 0;
    getData();

    // 上一页
    $('#prevBtn').on('click', function () {
        page--;
        if (page < 1) {
            page = 1;
            alert('已经是第一页了')
        }
        getData();
    });

    // 下一页
    $('#nextBtn').on('click', function () {
        page++;
        if (page > totalPage) {
            page = totalPage;
            alert('已经是最后一页了')
        }
        getData();
    })

    function getData() {
        // 获取二级分类数据
        $.ajax({
            url: '/category/querySecondCategoryPaging',
            type: 'get',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                // 总页数
                totalPage = Math.ceil(res.total / pageSize);
                // console.log(res);
                var html = template('categorySecondTpl', res);
                $('#categorySecondBox').html(html);
            }

        });
    }


    // 获取一级分类
    $.ajax({
        url: '/category/queryTopCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 1000000
        },
        success: function (res) {
            // console.log(res);
            var html = template('categoryFirstTpl', res);
            $('#categoryFirstBox').html(html);
        }
    });

    // 上传图片
    var previewImg = "";
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {
            // console.log(data);
            previewImg = data.result.picAddr;
            // 图片预览
            $('#preview').attr('src', previewImg);
        }
    });

    // 二级分类添加
    $('#save').on('click', function () {
        var categoryId = $('[name = "categoryId"]').val().trim();
        var brandName = $('[name = "brandName"]').val().trim();
        if (!categoryId) {
            alert('请选择商品分类');
            return;
        }
        if (!brandName) {
            alert('请输入商品名称');
            return;
        }
        if (!previewImg) {
            alert('请上传商品图片');
            return;
        }

        $.ajax({
            url: '/category/addSecondCategory',
            type: 'post',
            data: {
                categoryId: categoryId,
                brandName: brandName,
                brandLogo: previewImg,
                hot: 0
            },
            success: function (res) {
                // console.log(res)
                if (res.success) {
                    location.reload();
                } else {
                    alert(res.message);
                }
            }
        })
    })
});