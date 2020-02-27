window.addEventListener('load', function() {
	var preview_img = document.querySelector('.preview_img');
	var mask = document.querySelector('.mask');
	var big_box = document.querySelector('.big_box');
	var bigImg = document.querySelector('.bigImg');
	preview_img.addEventListener('mouseover', function() {
		mask.style.display = 'block';
		big_box.style.display = 'block';
	});
	preview_img.addEventListener('mouseout', function() {
		mask.style.display = 'none';
		big_box.style.display = 'none';
	});
	preview_img.addEventListener('mousemove', function(e) {
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		var maskX = x - mask.offsetWidth / 2;
		var maskY = y - mask.offsetHeight / 2;
		var maskMax = preview_img.offsetWidth - mask.offsetWidth;
		if (maskX <= 0) {
			maskX = 0;
		} else if (maskX >= maskMax) {
			maskX = maskMax;
		}
		if (maskY <= 0) {
			maskY = 0;
		} else if (maskY >= maskMax) {
			maskY = maskMax;
		}
		mask.style.left = maskX + 'px';
		mask.style.top = maskY + 'px';
		var bigMax = bigImg.offsetWidth - big_box.offsetWidth; //大图片最大移动距离
		var bigX = maskX * bigMax / maskMax; //大图片移动距离
		var bigY = maskY * bigMax / maskMax; //大图片移动距离
		bigImg.style.left = -bigX + 'px';
		bigImg.style.top = -bigY + 'px';
	});
});

// 商品详细信息模块
$(function() {
	$(".detail_wrap li").click(function() {
		$(this).addClass("current").siblings().removeClass("current");
		var index = $(this).index();
		$(".detail_info .item").eq(index).show().siblings().hide();
	});
});
