$(function () {
    // 初始化区域滑动组件
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });

    // 获取一级分类数据
    $.ajax({
        type: "get",
        url: "/category/queryTopCategory",
        success: function (response) {
            // console.log(response);
            var html = template('category-first', {
                result: response.rows
            });
            // console.log(html)
            $('#links').html(html);

            // 如果一级分类有数据
            if (response.rows.length) {
                // 给第一个li添加选中状态
                $('#links').find('a').eq(0).addClass('active');

                var id = response.rows[0].id;
                getSecondCategory(id);
            }

        }
    });


    // 点击一级分类获取二级分类的数据
    // 给一级分类添加点击事件
    $('#links').on('click', 'a', function () {
        // 获取一级分类的id
        var id = $(this).data('id');
        // 给当前点击的li添加选中状态
        $(this).addClass('active').siblings().removeClass('active');

        getSecondCategory(id);
    });
})

// 根据一级分类ID获取二级分类的ID
function getSecondCategory(id) {
    $.ajax({
        url: '/category/querySecondCategory',
        type: 'get',
        data: {
            id: id
        },
        success: function (response) {
            // console.log(response);
            var html = template('category-second',response);
            $('.brand-list').html(html);
        }

    });
}