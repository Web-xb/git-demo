// 购物车模块
$(function() {
	// 1.全选和全不选
	$(".checkall").change(function() {
		$(".checkall, .j_checkbox").prop("checked", $(this).prop("checked"));
		if ($(this).prop("checked")) {
			$(".car_item").addClass("check_car_item");
		} else {
			$(".car_item").removeClass("check_car_item");
		}
	});
	$(".j_checkbox").change(function() {
		if ($(".j_checkbox:checked").length === $(".j_checkbox").length) {
			$(".checkall").prop("checked", true);
		} else {
			$(".checkall").prop("checked", false);
		}
		if ($(this).prop("checked")) {
			$(this).parents(".car_item").addClass("check_car_item");
		} else {
			$(this).parents(".car_item").removeClass("check_car_item");
		}
	});
	// 2.增减商品数量
	$(".increment").click(function() {
		var n = $(this).siblings(".itxt").val();
		n++;
		$(this).siblings(".itxt").val(n);
		// 计算小计模块
		var p = $(this).parents(".p_num").siblings(".p_price").text();
		p = p.substr(1);
		$(this).parents(".p_num").siblings(".p_sum").text("￥" + (p * n).toFixed(2));
		getSum();
	});
	$(".decrement").click(function() {
		var n = $(this).siblings(".itxt").val();
		if (n == 1) {
			return false;
		}
		n--;
		$(this).siblings(".itxt").val(n);
		// 计算小计模块
		var p = $(this).parents(".p_num").siblings(".p_price").text();
		p = p.substr(1);
		$(this).parents(".p_num").siblings(".p_sum").text("￥" + (p * n).toFixed(2));
		getSum();
	});
	// 3.文本框的值发生改变时
	$(".itxt").change(function() {
		var n = $(this).val();
		var p = $(this).parents(".p_num").siblings(".p_price").text();
		p = p.substr(1);
		$(this).parents(".p_num").siblings(".p_sum").text("￥" + (p * n).toFixed(2));
		getSum();
	});
	// 4.计算总计和总额模块
	getSum();

	function getSum() {
		var count = 0; //计算总件数
		var money = 0; //计算总额
		$(".itxt").each(function(i, ele) {
			count += parseInt($(ele).val());
		});
		$(".amount_sum em").text(count);
		$(".p_sum").each(function(i, ele) {
			money += parseFloat($(ele).text().substr(1));
		});
		$(".price_sum em").text("￥" + money.toFixed(2));
	}
	//5.删除商品模块
	//(1)商品后面的删除按钮
	$(".del").click(function() {
		$(this).parents(".car_item").remove();
		getSum();
	});
	//(2)删除选中按钮
	$(".remove_batch").click(function() {
		$(".j_checkbox:checked").parents(".car_item").remove();
		getSum();
	});
	//(3)清空购物车 删除全部商品
	$(".clear_all").click(function() {
		$(".car_item").remove();
		getSum();
	});
});
