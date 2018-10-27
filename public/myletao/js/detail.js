$(function () {
    // 库存
    var kucunNum = 0;
    // 尺码
    var size = null;
    // 产品id 
    var productId = 0;


    var id = getPrarmsByUrl(location.href, "id");

    // console.log(id)
    $.ajax({
        url: '/product/queryProductDetail',
        type: 'get',
        data: {
            id: id
        },
        success: function (res) {
            console.log(res);

            kucunNum = res.num;

            productId = res.id;

            var html = template('productTpl', res);
            // console.log(html);
            $('#product-box').html(html);
            $('#kucun').html(kucunNum)

            var gallery = mui('.mui-slider');
            gallery.slider();
        }
    });

    $('#product-box').on('click', '.size span', function () {
        $(this).addClass('active').siblings('span').removeClass('active');

        // 用户选择的尺码
        size = $(this).html();

    });

    var oInp = $('#inp');
    var num = 0;
    // 增加数量
    $('#increase').on('click', function () {
        num = oInp.val();
        num++;
        if (num > kucunNum) {
            num = kucunNum;
        }
        oInp.val(num);
    });
    // 减少数量
    $('#reduce').on('click', function () {
        num = oInp.val();
        num--;
        if (num < 1) {
            num = 1;
        }
        oInp.val(num);
    });

    // 加入购物车
    $('#addCart').on('click', function () {
        if (!size) {
            alert('请选择尺码');
            return;
        }

        $.ajax({
            url: '/cart/addCart',
            type: 'post',
            data: {
                productId: productId,
                num: num,
                size: size
            },
            success: function (res) {
                if (res.success) {
                    mui.confirm("加入购物车成功,去购物车看看?",function(message){
                        // console.log(message)
                        if(message.index) {
                            location.href= "./cart.html"
                        }
                    })
                }
            }
        })
    })
})