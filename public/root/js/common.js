// 检测是否登录
$.ajax({
	url: '/employee/checkRootLogin',
	type: 'get',
	// 同步
	async: false,
	success: function (res) {
		// 如果未登录强制跳转到login.html
		if (res.error && res.error == 400) {
			location.href = "./login.html"
		}
	}
});

// 退出功能
$(function () {
	$('#login-out').on('click', function () {
		if (confirm('确定退出吗?')) {
			$.ajax({
				url: '/employee/employeeLogout',
				type: 'get',
				success: function (res) {
					// console.log(res);
					if (res.success) {
						location.href = "./login.html"
					} else {
						alert(res.message)
					}
				}
			})
		}
	});
});



$(function () {

	var navLi = $('.navs li')

	navLi.on('click', function () {

		$(this).find('ul').slideToggle();

	});

});