
jQuery($(document).ready(function ($) {
  // ナビバータグル
  $('.js-hamburger').on('click', function () {
    if ($('.js-hamburger').hasClass('is-open')) {
      $('.js-drawer').fadeOut();
      $(this).removeClass('is-open');
      $('.body').removeClass('is-open');
      $('.gotop').removeClass('is-open');
      $('.header').removeClass('headerColorScroll');
    } else {
      $('.js-drawer').fadeIn();
      $(this).addClass('is-open');
      $('.body').addClass('is-open');
      $('.gotop').addClass('is-open');
      $('.header').addClass('headerColorScroll');
    }
  });

  // ページ内リンクがクリックされたときの処理
  $('#menu a').on('click', function (event) {
    var href = $(this).attr('href');
    if (href.startsWith('#')) {
      $('.js-drawer-menu').fadeOut();
      $('.js-drawer').removeClass('is-open');
    }
  });

  // slick1のスライダー
  $(".js-mv-slick").on("init", function () {
    $('.slick-slide[data-slick-index="0"]').addClass("add-animation");
  }).slick({
    autoplay: true,
    fade: true,
    arrows: false,
    speed: 2000,
    autoplaySpeed: 4000,
    pauseOnFocus: false,
    pauseOnHover: false,
  }).on({
    beforeChange: function (event, slick, currentSlide, nextSlide) {
      $(".mv__slick-img", this).eq(nextSlide).addClass("add-animation");
      $(".mv__slick-img", this).eq(currentSlide).addClass("remove-animation");
    },
    afterChange: function () {
      $(".remove-animation", this).removeClass("remove-animation add-animation");
    }
  });

  
  // slick2のスライダー
  $(".campaign-slider").slick({
    autoplay: false,
    dots: false,
    swipe: true,
    variableWidth: true,
    prevArrow: '<img src="./assets/images/common/arrow-l.png" class="slide-arrow arrow__prev" alt="左矢印" >',
    nextArrow: '<img src="./assets/images/common/arrow-r.png" class="slide-arrow arrow__next" alt="右矢印" >',
    responsive: [
      {
        breakpoint: 768, // スマートフォンの幅を考慮したブレイクポイント
        settings: {
          arrows: false // スマートフォンの場合に矢印を非表示にする
        }
      }
    ]
  });




  // 要素の取得とスピードの設定
  $('.color-box').each(function () {
    $(this).append('<div class="color"></div>');
    var color = $(this).find('.color');
    var image = $(this).find('img');
    var counter = 0;
    image.css('opacity', '0');
    color.css('width', '0%');
    color.on('inview', function () {
      if (counter == 0) {
        $(this).delay(200).animate({ 'width': '100%' }, 700, function () {
          image.css('opacity', '1');
          $(this).css({ 'right': '0', 'left': 'auto' });
          $(this).animate({ 'width': '0%' }, 700);
        });
        counter = 1;
      }
    });

  // pagetop
  var topBtn = $('.gotop');
  topBtn.hide();

  var showButtonPosition = 200; // ボタンを表示するスクロール位置（ピクセル数）

  $(window).scroll(function () {
    var scrollPosition = $(window).scrollTop();

    // メインビューから一定のスクロール位置までボタンを表示
    if (scrollPosition > showButtonPosition) {
      topBtn.fadeIn();
    } else {
      topBtn.fadeOut();
    }
  });

  // ページを読み込んだ際の処理
  $(window).on('load', function () {
    var footer = $('footer');
    var footerHeight = footer.outerHeight();
    var goToTopLink = $('#goToTop');
    var svgElement = goToTopLink.find('svg'); // SVG要素を取得

    $(window).scroll(function () {
      var scrollPosition = $(window).scrollTop();
      var maxScrollPosition = scrollPosition + $(window).height();
      var footerTop = footer.offset().top;
      var footerBottom = footerTop + footerHeight;

      if (maxScrollPosition >= footerTop && maxScrollPosition <= footerBottom) {
        // スクロール位置がフッターに差し掛かったらSVGのクラスを変更
        svgElement.removeClass('custom-svg').addClass('custom-svg--white');
      } else {
        // スクロール位置がフッターの範囲外にある場合、クラスを戻す
        svgElement.removeClass('custom-svg--white').addClass('custom-svg');
      }
    });
  });

  window.addEventListener('load', function () {
    var maxHeight = 0;
    $('.card__subtitle').each(function (idx, elem) {
      var height = $(elem).height();
      if (maxHeight < height) {
        maxHeight = height;
      }
    });
    $('.card__subtitle').height(maxHeight);
  });

  //下層campaignのタブ切り替え
  $('.js-tab-menu').on('click', function () {
    $('.js-tab-menu').removeClass('is-active');
    $('.js-tab-content').removeClass('is-active');
    $(this).addClass('is-active');

    var number = $(this).data("number");
    $('#' + number).addClass('is-active');

    // クリックされたタブが"ALL"（tab01）の場合は、他のすべてのタブメニューにも'is-active'クラスを追加
    if (number === 'tab01') {
      $('.js-tab-content').addClass('is-active');
    }
  });

});
}));
