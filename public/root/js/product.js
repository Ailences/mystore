$(function () {
    // 获取商品信息 展示在页面上
    $.ajax({
        url: '/product/queryProductDetailList',
        type: 'get',
        data: {
            page: 1,
            pageSize: 20
        },
        success: function (res) {
            // console.log(res)
            var html = template('productTpl', res);
            $('#productBox').html(html);
        }

    });

    // 添加商品

    // 获取二级分类
    $.ajax({
        url: '/category/querySecondCategoryPaging',
        type: 'get',
        data: {
            page: 1,
            pageSize: 1000
        },
        success: function (res) {
            // console.log(res)
            var html = template('secondTpl', res);
            $('#secondBox').html(html);
        }
    });

    // 获取图片路径
    var imgArr = [];
    $('#fileUpload').fileupload({
        dataTtype: 'json',
        done: function (e, data) {
            // console.log(data);
            imgArr.push(data.result);
            console.log(imgArr);
        }
    });

    // 获取输入的商品信息
    $('#addProduct').on('click', function () {
        var proName = $('[name = "proName"]').val().trim();
        var proDesc = $('[name = "proDesc"]').val().trim();
        var num = $('[name = "num"]').val().trim();
        var size = $('[name = "size"]').val().trim();
        var oldPrice = $('[name = "oldPrice"]').val().trim();
        var price = $('[name = "price"]').val().trim();
        var brandId = $('[name = "brandId"]').val().trim();

        $.ajax({
            url: '/product/addProduct',
            type: 'post',
            data: {
                proName: proName,
                proDesc: proDesc,
                num: num,
                size: size,
                oldPrice: oldPrice,
                price: price,
                brandId: brandId,
                pic: imgArr,
                statu: 1
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

    // 修改商品状态
    // $('#productBox').on('click', '.edit-btn', function () {
    //     var id = $(this).data('id');
    //     var statu = $(this).data('statu');
    //     console.log(typeof(statu));   
    // })


})