/**
 * Created by Ins on 29.08.17.
 */
$(document).ready(function(){
    var swiperBanners = new Swiper('.slider-banners', {
        slidesPerView: 1,
        pagination : '.swiper-pagination',
        paginationClickable: true,
        loop: true,
        speed: 1000,
        autoplay: 5000,
        effect: 'slide'
    });
    var swiper1 = new Swiper('.slider_news', {
        nextButton: '.but_news_next',
        prevButton: '.but_news_prev',
        slidesPerView: adaptivSlides(),
        loop: true,
        spaceBetween: 30
    });
    var swiper2 = new Swiper('.swiper_pop', {
        nextButton: '.but_pop_next',
        prevButton: '.but_pop_prev',
        slidesPerView: adaptivSlides(),
        loop: true,
        spaceBetween: 30
    })
});
