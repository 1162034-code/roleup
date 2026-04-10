$(function () {
  $(window).on('scroll', function () {
      if ($('.mv').height() < $(this).scrollTop()) {
          $('.js-header').addClass('change-color');
    } else {
          $('.js-header').removeClass('change-color');
    }
  });
});

$(".openbtn2").click(function () {
    $(this).toggleClass('active');
    $(".menu-content").toggleClass('active');
    $("a.line").toggleClass('active');
});

$('.menu-list a[href]').on('click', function (event) {
    $('.openbtn2').trigger('click');
});

/* swiper */
$(function(){
    var mySwiper = new Swiper('.c_slider', {
        loop: true, // ループさせる
        effect: 'slide',
        slidesPerView: 'auto',
        loopAdditionalSlides: 1,
        allowTouchMove: true,
        centeredSlides: true,
        speed: 1000, // ２秒かけながら次の画像へ移動
        allowTouchMove: false, // マウスでのスワイプを禁止
        allowTouchMove: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          768: {
            slidesPerView: 1,
          },
        },
    });
});

/* sample */
const splide = new Splide(".splide", {
    autoplay: true, // 自動再生
    type: "loop", // ループさせる
    pauseOnHover: false, // カーソルが乗ってもスクロールを停止させない
    pauseOnFocus: false, // 矢印をクリックしてもスクロールを停止させない
    interval: 3000, // 自動再生の間隔
    speed: 2000, // スライダーの移動時間
    destroy: true, // スライダーを破棄
    breakpoints: {
      768: {
        destroy: false, 
        arrows:false,
        pagination: true,
        drag:true,
        classes: {
          pagination: "splide__pagination c_slide-pagination",
          page: "splide__pagination__page c_slide-page",
        },
      },
    },
  }).mount();

  /* faq */
  $('.faq__list .list__item .faq__list--ttl').click(function() {
    var $answer = $(this).next();
    $answer.slideToggle();
    $(this).toggleClass('open', 200);
});

  /* モーダル */
  $('.image').modaal({
    type: 'image'
});

/* pagetop */
//スクロールした際の動きを関数でまとめる
function PageTopAnime() {
	var scroll = $(window).scrollTop();
  if ($('.mv').height() < $(this).scrollTop()) {
		$('.pagetop').removeClass('DownMove');//.pagetopについているDownMoveというクラス名を除く
		$('.pagetop').addClass('UpMove');//.pagetopについているUpMoveというクラス名を付与
	}else{
		if($('.pagetop').hasClass('UpMove')){//すでに.pagetopにUpMoveというクラス名がついていたら
			$('.pagetop').removeClass('UpMove');//UpMoveというクラス名を除き
			$('.pagetop').addClass('DownMove');//DownMoveというクラス名を.pagetopに付与
		}
	}
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).scroll(function () {
	PageTopAnime();/* スクロールした際の動きの関数を呼ぶ*/
});

// .pagetopをクリックした際の設定
$('.pagetop a').click(function () {
    $('body,html').animate({
        scrollTop: 0//ページトップまでスクロール
    }, 500);//ページトップスクロールの速さ。数字が大きいほど遅くなる
    return false;//リンク自体の無効化
});




new WOW().init();