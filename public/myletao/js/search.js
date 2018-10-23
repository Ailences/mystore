$(function () {
    // 1.点击搜索按钮跳转到搜索结果页面

    // 给搜索按钮注册点击事件
    $('#search-btn').on('click', function () {
        // 获取用户输入的关键字
        var keyword = $(this).siblings('input').val();
        // alert(keyword)
        // 判断是否输入关键字

        if (keyword) { // 输入了
            // 将关键字存放到数组的第一个位置
            keyArr.unshift(keyword);
            // 将关键字数组存储到本地
            localStorage.setItem('keyArr', JSON.stringify(keyArr));
            // 讲结果传递给搜索结果页面
            location.href = "./search-result.html?keyword=" + keyword;
            // 清除搜索框的内容
            $('#keyword').val("");
        } else { // 没输入
            alert("请输入您想搜索的商品");
        }
    });


    // 2.实现历史关键字存储,并渲染到页面

    // 存储关键字的数组
    var keyArr = [];
    if (localStorage.getItem('keyArr')) {
        // 将字符串转换为js对象
        keyArr = JSON.parse(localStorage.getItem('keyArr'));

        // 用模板吧数据渲染到页面
        var html = template('historyTpl', {
            result: keyArr
        });
        $('#history-box').html(html);
    }


    // 3.清空历史
    $('.clear').on('click', function () {

        // 清除页面数据
        $('#history-box').html("");
        // 清空本地缓存
        localStorage.removeItem('keyArr');

    })
});