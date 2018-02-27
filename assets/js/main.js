'use strict';

$(document).ready(function () {

    //slider
    (function () {
        var $headerSlider = $('.header-slider');

        $headerSlider.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            dots: true
        });

        //custom control for slider
        $('.header-slider__right-arrow').on('click', function () {
            $headerSlider.slick('slickNext');
        });
        $('.header-slider__left-arrow').on('click', function () {
            $headerSlider.slick('slickPrev');
        });
    })();

    //customers slider
    $('.customers-slider').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        nextArrow: '<div class="customers-slider__next"></div>',
        prevArrow: '<div class="customers-slider__prev"></div>',
        arrows: true,
        variableWidth: true
    });

    //fancybox-popup
    $('.js-modal').fancybox({
        closeBtn: true,
        maxWidth: 386,
        padding: 0,
        helpers: {
            overlay: {
                css: {
                    'background': 'rgba(0,0,0,0.65)'
                }
            }
        }
    });

    //only digit keypress
    $('.only-digits').keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    });

    //height for title
    $('.production-position__title').setMaxHeights();
    $('.customers-slider__item').setMaxHeights();

    //production spoilar js_collapsed
    (function () {
        var $container = $('.production-position'),
            height = parseInt($container.height()),
            maxHeight = parseInt($('.production-position__item:nth-of-type(9)').position().top) - 15,
            $btn = $('.production-spoilar-btn'),
            btnTitle = $btn.find('span').text();

        $container.addClass('js_collapsed').css({ 'height': maxHeight + 'px' });

        $btn.on('click', function () {
            $container.toggleClass('js_collapsed');

            if ($container.hasClass('js_collapsed')) {

                $container.css({ 'height': maxHeight + 'px' });
                $btn.removeClass('active').find('span').text(btnTitle);
            } else {

                $container.css({ 'height': height + 'px' });
                $btn.addClass('active').find('span').text('Свернуть');
            }
        });
    })();

    //up button
    (function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 500) {
                $('#toUp').show();
            } else {
                $('#toUp').hide();
            }
        });

        $(document).on('click', '#toUp', function () {
            $('html, body').animate({ scrollTop: 0 }, 500);
        });
    })();

    //scroll menu
    (function () {
        var headerHeight = $('div.slider-overlay-wrap div.header').height(),
            $scrollMenu = $('div.scroll-menu');

        if ($(window).scrollTop() > headerHeight) {
            $scrollMenu.removeClass('hidden');
        }

        $(window).scroll(function () {
            if ($(this).scrollTop() > headerHeight) {
                $scrollMenu.removeClass('hidden');
            } else {
                $scrollMenu.addClass('hidden');
            }
        });
    })();

    //nav menu
    (function () {
        var scrollMenuHeight = $('div.scroll-menu').height(),
            $links = $('ul.nav'),
            id;

        $links.on('click', function (e) {
            if (e.target.tagName === 'A') {
                e.preventDefault();

                id = $(e.target).attr('href');
                console.log(id);

                $('html, body').animate({ scrollTop: $(id).offset().top - scrollMenuHeight }, 500);
            }
        });
    })();

    //map
    (function () {
        ymaps.ready(init);
        var myMap, myPlacemark;

        function init() {
            myMap = new ymaps.Map("map", {
                center: [53.928, 27.69852],
                zoom: 17
                // controls: []
            });

            myPlacemark = new ymaps.Placemark([53.928206, 27.703298], {
                hintContent: '',
                balloonContent: ''
            }, {
                // Необходимо указать данный тип макета.
                iconLayout: 'default#image',
                // Своё изображение иконки метки.
                iconImageHref: '../images/map-marker.png',
                // Размеры метки.
                iconImageSize: [23, 34]
            });

            myMap.behaviors.disable("scrollZoom");
            myMap.geoObjects.add(myPlacemark);
        }
    })();
});

$.fn.setMaxHeights = function () {
    var maxHeight = this.map(function (i, e) {
        return $(e).height();
    }).get();

    return this.height(Math.max.apply(this, maxHeight));
};

/**
 *
 * @param status - string ()
 * @param timeOut - window will close after "timeOut" ms
 */
function messageWindow(status, timeOut) {
    if (status === 'success') {
        swal({
            title: "Спасибо!",
            text: "Ваше сообщение отправлено! \n Мы свяжемся с Вами в ближайшее время.",
            icon: "success",
            button: false,
            timer: timeOut
        });
    } else {
        swal({
            title: "Ошибка!",
            text: "Сообщение не отправлено! \n Попробуйте еще раз.",
            icon: "error",
            button: false,
            timer: timeOut
        });
    }
}