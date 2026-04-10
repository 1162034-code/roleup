"use strict";

// Common
var $window = $(window).width();
$(function () {
  $("#js-pagetop").click(function () {
    // pagetop
    $("html,body").animate(
      {
        scrollTop: 0,
      },
      "500"
    );
  });
  $(".js-smooth").click(function () {
    var adjust = 0;
    var speed = 400;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? "html" : href);
    var position = target.offset().top + adjust;
    $("body,html").animate(
      {
        scrollTop: position,
      },
      speed,
      "swing"
    );
    return false;
  });
});
$(function () {
  // nav
  var $body = $("body");
  $("#js-navTrigger").click(function () {
    $body.toggleClass("navopen");
  });
});
// $(function () {
//   // header
//   var $header = $(".header");
//   var headerHeight = $header.height();
//   $(window).on("scroll", function () {
//     if ($(this).scrollTop() < headerHeight) {
//       $header.removeClass("is-scrolled");
//     } else {
//       $header.addClass("is-scrolled");
//     }
//   });
// });

// スクロールのドラッグ有効化
// $.prototype.mousedragscrollable = function () {
//   let target;
//   $(this).each(function (i, e) {
//     $(e).mousedown(function (event) {
//       event.preventDefault();
//       target = $(e);
//       $(e).data({
//         down: true,
//         move: false,
//         x: event.clientX,
//         y: event.clientY,
//         scrollleft: $(e).scrollLeft(),
//         scrolltop: $(e).scrollTop(),
//       });
//       return false;
//     });
//     $(e).click(function (event) {
//       if ($(e).data("move")) {
//         return false;
//       }
//     });
//   });
//   $(document)
//     .mousemove(function (event) {
//       if ($(target).data("down")) {
//         event.preventDefault();
//         let move_x = $(target).data("x") - event.clientX;
//         let move_y = $(target).data("y") - event.clientY;
//         if (move_x !== 0 || move_y !== 0) {
//           $(target).data("move", true);
//         } else {
//           return;
//         }
//         $(target).scrollLeft($(target).data("scrollleft") + move_x);
//         $(target).scrollTop($(target).data("scrolltop") + move_y);
//         return false;
//       }
//     })
//     .mouseup(function (event) {
//       $(target).data("down", false);
//       return false;
//     });
// };
// $(".business").mousedragscrollable();

/* ドロップダウン */

//ドロップダウン
//ドロップダウンの設定を関数でまとめる
function mediaQueriesWin() {
  var width = $(window).width();
  if (width <= 768) {
    //横幅が768px以下の場合
    $(".header__gnav-list--item.haschild>a").off("click"); //menu-item-has-childrenクラスがついたaタグのonイベントを複数登録を避ける為offにして一旦初期状態へ
    $(".header__gnav-list--item.haschild ul.header__nav-sublist").hide();
    $(".header__gnav-list--item.haschild>a").on("click", function () {
      //menu-item-has-childrenクラスがついたaタグをクリックしたら

      var parentElem = $(this).parent(); // aタグから見た親要素の<li>を取得し
      $(parentElem).toggleClass("active"); // 矢印方向を変えるためのクラス名を付与して
      $(parentElem).children("ul").stop().slideToggle(500); //.submenu liの子要素のスライドを開閉させる※数字が大きくなるほどゆっくり開く
      return false; //リンクの無効化
    });
  } else {
    //横幅が768px以上の場合
    $(".menu-item-has-children>a").off("click"); //has-childクラスがついたaタグのonイベントをoff(無効)にし
    $(".menu-item-has-children").removeClass("active"); //activeクラスを削除
    $(".menu-item-has-children").children("ul").css("display", ""); //スライドトグルで動作したdisplayも無効化にする
  }
}

$(window).on("load", function () {
  mediaQueriesWin();
});

// const swiper = new Swiper(".swiper", {});
const swiper = new Swiper(".swiper", {
  // ページネーションが必要なら追加
  pagination: {
    el: ".swiper-pagination",
  },
  // ナビボタンが必要なら追加
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  scrollbar: {
    el: ".swiper-scrollbar",
    draggable: true,
  },
  setWrapperSize: true,
  slidesPerView: "auto",
});

// スクロールでヘッダーの色変更
$(window).on("scroll", function () {
  if (400 < $(this).scrollTop()) {
    $(".header,.header__gnav-list--item,.h_logo").addClass("active");
  } else {
    $(".header,.header__gnav-list--item,.h_logo").removeClass("active");
  }
});
