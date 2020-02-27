//1.鼠标移入显示左右按钮,移出时隐藏按钮
//2.每隔一段时间切换图片(自动)
//3.点击左右按钮图片切换
//4.点击焦点切换焦点所对应的图片
//5.鼠标移入时,图片暂停自动播放
$(function() {
	$(".focus_img").mouseover(function() {
		$(".arrow_l").css("display","block");
		$(".arrow_r").css("display","block");
		clearInterval(timer);
		timer = null;
	}).mouseout(function() {
		$(".arrow_l").css("display","none");
		$(".arrow_r").css("display","none");
		autoplay();
	})
	function changeImg(e){
		$(".imgList li").eq(e).fadeIn().siblings().fadeOut();
		$(".circle li").eq(e).addClass("current").siblings().removeClass("current");
	};
	var step = 0;
	changeImg(step);
	var timer = null;
	function autoplay(){
		timer = setInterval(function(){
			step ++;
			if (step === $(".imgList li").length){
				step = 0;
			}
			changeImg(step);
		},3000);
	}
	autoplay();
	$(".arrow_l").click(function() {
		clearInterval(timer);
		step --;
		if (step === -1){
			step = $(".imgList li").length - 1;
		}
		changeImg(step);
		autoplay();
	});
	$(".arrow_r").click(function() {
		clearInterval(timer);
		step ++;
		if (step === $(".imgList li").length){
			step = 0;
		}
		changeImg(step);
		autoplay();
	});
	$(".circle li").click(function() {
		step = $(this).index();
		clearInterval(timer);
		changeImg(step);
		autoplay();
	})
});

//电梯导航
$(function() {
	var flag = true;
	//1.显示/隐藏电梯导航
	var toolTop = $(".recom").offset().top;
	toggleToll();

	function toggleToll() {
		if ($(document).scrollTop() >= toolTop) {
			$(".fixedtool").fadeIn();
		} else {
			$(".fixedtool").fadeOut();
		}
	}
	$(window).scroll(function() {
		toggleToll();
		if (flag) {
			$(".floor .w").each(function(i, ele) {
				if ($(document).scrollTop() >= $(ele).offset().top) {
					$(".fixedtool li").eq(i).addClass("current").siblings().removeClass();
				}
			});
		}
	});
	//2. 滚动到相应的内容区域
	$(".fixedtool li").click(function() {
		flag = false;
		var current = $(".floor .w").eq($(this).index()).offset().top;
		$("body, html").stop().animate({
			scrollTop: current
		}, function() {
			flag = true;
		});
		$(this).addClass("current").siblings().removeClass();
	});
});
